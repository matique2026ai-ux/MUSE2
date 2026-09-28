<?php
/**
 * AutoResearch - Recherche autonome en boucle avec l'API Anthropic
 * Utilise web_search pour itérer automatiquement sur un sujet
 */

// ─── Configuration ────────────────────────────────────────────────────────────
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL             = 'claude-sonnet-4-20250514';
const MAX_TOKENS        = 4096;
const MAX_ITERATIONS    = 5;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Appel à l'API Anthropic avec gestion des outils (web_search).
 */
function callAnthropic(array $messages, string $systemPrompt, array $tools = []): array
{
    $apiKey = getenv('ANTHROPIC_API_KEY');
    if (!$apiKey) {
        throw new RuntimeException('Variable ANTHROPIC_API_KEY manquante.');
    }

    $body = [
        'model'      => MODEL,
        'max_tokens' => MAX_TOKENS,
        'system'     => $systemPrompt,
        'messages'   => $messages,
    ];
    if ($tools) {
        $body['tools'] = $tools;
    }

    $ch = curl_init(ANTHROPIC_API_URL);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'x-api-key: ' . $apiKey,
            'anthropic-version: 2023-06-01',
        ],
        CURLOPT_POSTFIELDS     => json_encode($body),
    ]);

    $raw      = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($raw === false || $httpCode >= 400) {
        throw new RuntimeException("Erreur API ($httpCode): $raw");
    }

    return json_decode($raw, true);
}

/**
 * Extrait le texte + les blocs tool_use d'une réponse API.
 */
function parseResponse(array $response): array
{
    $text      = '';
    $toolCalls = [];

    foreach ($response['content'] ?? [] as $block) {
        if ($block['type'] === 'text') {
            $text .= $block['text'];
        } elseif ($block['type'] === 'tool_use') {
            $toolCalls[] = $block;
        }
    }

    return ['text' => $text, 'tool_calls' => $toolCalls, 'stop_reason' => $response['stop_reason'] ?? ''];
}

/**
 * Formate joliment une section pour la sortie console.
 */
function printSection(string $title, string $content, string $color = "\033[0;36m"): void
{
    $reset = "\033[0m";
    $bold  = "\033[1m";
    $width = 70;
    $line  = str_repeat('─', $width);

    echo "\n{$color}{$bold}┌{$line}┐{$reset}\n";
    echo "{$color}{$bold}│  {$title}" . str_repeat(' ', max(0, $width - strlen($title) - 1)) . "│{$reset}\n";
    echo "{$color}{$bold}└{$line}┘{$reset}\n";

    // Word-wrap propre
    $wrapped = wordwrap($content, $width, "\n", false);
    foreach (explode("\n", $wrapped) as $line) {
        echo "  $line\n";
    }
}

// ─── Outils disponibles ────────────────────────────────────────────────────────
$tools = [
    [
        'type' => 'web_search_20250305',
        'name' => 'web_search',
    ],
];

// ─── Prompt système ────────────────────────────────────────────────────────────
$systemPrompt = <<<SYSTEM
Tu es un agent de recherche autonome expert. Ton rôle est d'effectuer des recherches approfondies et itératives sur le sujet fourni.

Processus de recherche :
1. Décompose le sujet en sous-questions clés.
2. Utilise web_search pour chaque sous-question.
3. Analyse les résultats, identifie les lacunes, et formule de nouvelles requêtes si nécessaire.
4. Synthétise toutes les informations en une réponse structurée et exhaustive.
5. À chaque itération, indique clairement ce que tu as découvert et ce qu'il reste à explorer.

Format de ta synthèse finale :
- **Résumé exécutif** : 3-5 phrases clés
- **Points principaux** : liste numérotée des découvertes majeures
- **Sources et contexte** : fiabilité des informations trouvées
- **Questions ouvertes** : ce qui reste incertain ou à approfondir

Sois rigoureux, cite les faits importants, et indique les contradictions entre sources.
SYSTEM;

// ─── Point d'entrée ────────────────────────────────────────────────────────────

// Récupération du sujet (CLI ou stdin)
if (PHP_SAPI === 'cli') {
    if (isset($argv[1])) {
        $topic = implode(' ', array_slice($argv, 1));
    } else {
        echo "\033[1;33m🔍 AutoResearch — Entrez le sujet à rechercher :\033[0m ";
        $topic = trim(fgets(STDIN));
    }
} else {
    // Mode HTTP simple
    $topic = $_GET['q'] ?? $_POST['q'] ?? 'intelligence artificielle générative en 2025';
}

if (!$topic) {
    echo "Aucun sujet fourni. Utilisez : php autoresearch.php \"votre sujet\"\n";
    exit(1);
}

// ─── Boucle de recherche autonome ─────────────────────────────────────────────

echo "\n\033[1;35m╔══════════════════════════════════════════════════════════════════╗\033[0m\n";
echo "\033[1;35m║           🤖  AUTORESEARCH — Recherche Autonome                  ║\033[0m\n";
echo "\033[1;35m╚══════════════════════════════════════════════════════════════════╝\033[0m\n";
echo "\n\033[1;37mSujet :\033[0m $topic\n";
echo "\033[0;90mIterations max : " . MAX_ITERATIONS . " | Modèle : " . MODEL . "\033[0m\n";

$messages   = [['role' => 'user', 'content' => "Recherche complète sur : $topic"]];
$allFindings = [];
$iteration  = 0;

while ($iteration < MAX_ITERATIONS) {
    $iteration++;
    echo "\n\033[1;34m[Itération $iteration/" . MAX_ITERATIONS . "]\033[0m En cours...\n";

    // Appel API
    $response = callAnthropic($messages, $systemPrompt, $tools);
    $parsed   = parseResponse($response);

    // Ajouter la réponse assistant à l'historique
    $assistantContent = $response['content'] ?? [];
    $messages[] = ['role' => 'assistant', 'content' => $assistantContent];

    // Afficher le texte intermédiaire si présent
    if ($parsed['text']) {
        printSection("💭 Réflexion — Itération $iteration", $parsed['text'], "\033[0;33m");
        $allFindings[] = $parsed['text'];
    }

    // Traiter les appels d'outils (web_search)
    if (!empty($parsed['tool_calls'])) {
        $toolResults = [];

        foreach ($parsed['tool_calls'] as $toolCall) {
            $toolName  = $toolCall['name'];
            $toolInput = $toolCall['input'] ?? [];
            $toolId    = $toolCall['id'];

            echo "\n  \033[0;32m🔎 Recherche :\033[0m " . ($toolInput['query'] ?? json_encode($toolInput)) . "\n";

            // Résultat simulé (l'API gère réellement la recherche côté serveur)
            $toolResults[] = [
                'type'        => 'tool_result',
                'tool_use_id' => $toolId,
                'content'     => '[Résultats de recherche traités par l\'API]',
            ];
        }

        // Renvoyer les résultats des outils
        $messages[] = ['role' => 'user', 'content' => $toolResults];
        continue; // Reprendre la boucle pour obtenir la réponse après les recherches
    }

    // Si pas d'appels d'outils, vérifier si la recherche est terminée
    if ($parsed['stop_reason'] === 'end_turn') {
        echo "\n\033[1;32m✅ Recherche terminée après $iteration itération(s).\033[0m\n";
        break;
    }
}

// ─── Synthèse finale ────────────────────────────────────────────────────────────
echo "\n";
echo "\033[1;35m╔══════════════════════════════════════════════════════════════════╗\033[0m\n";
echo "\033[1;35m║                    📋  SYNTHÈSE FINALE                           ║\033[0m\n";
echo "\033[1;35m╚══════════════════════════════════════════════════════════════════╝\033[0m\n";

// Demander une synthèse finale consolidée
$messages[] = [
    'role'    => 'user',
    'content' => 'Produis maintenant la synthèse finale complète et structurée de toutes tes recherches sur ce sujet. Inclus le résumé exécutif, les points principaux, et les questions ouvertes.',
];

$finalResponse = callAnthropic($messages, $systemPrompt);
$finalParsed   = parseResponse($finalResponse);

if ($finalParsed['text']) {
    printSection("📊 Rapport de Recherche — $topic", $finalParsed['text'], "\033[1;32m");
} else {
    echo "Aucune synthèse générée.\n";
}

echo "\n\033[0;90m─────────────────────────────────────────────────────────────────\033[0m\n";
echo "\033[0;90m AutoResearch terminé | " . date('Y-m-d H:i:s') . " | Itérations : $iteration\033[0m\n\n";
