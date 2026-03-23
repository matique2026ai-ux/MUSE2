import { notFound } from 'next/navigation';
import { locales, type Locale, isValidLocale } from '@/lib/i18n';
import type { Metadata } from 'next';
import { ServiceHero } from '@/components/service/ServiceHero';
import { ServiceScope } from '@/components/service/ServiceScope';
import { ServiceProcess } from '@/components/service/ServiceProcess';
import { ServiceTeam } from '@/components/service/ServiceTeam';
import { ServiceProjects } from '@/components/service/ServiceProjects';
import { ServiceCTA } from '@/components/service/ServiceCTA';
import { getLocalizedProject, projects as allProjects } from '@/lib/data/projects';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { fetchServiceBySlug } from '@/lib/server-data';
import type { FirestoreService } from '@/lib/cms-types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ServicePageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

interface ServiceUIData {
  isDynamic: boolean;
  title: string;
  subtitle: string;
  description: string;
  features: { title: string; description: string }[];
  image: string;
  // Optional sub-component data from static fallback
  scope?: { title: string; items: { title: string; description: string }[] };
  process?: { title: string; steps: { label: string; text: string }[] };
  team?: { title: string; lead: string; bio: string };
  cta?: { title: string; button: string };
}

const serviceData = {
  'cultural-civic': {
    en: {
      title: 'Cultural & Civic',
      subtitle: 'Spaces that Carry Meaning',
      description: 'Museums, libraries, civic halls, and memorials — buildings where collective memory and public identity converge.',
      scope: {
        title: 'Core Capabilities',
        items: [
          { title: 'Public Infrastructure', description: 'Large-scale civic centers and transport hubs designed for endurance.' },
          { title: 'Cultural Institutions', description: 'Museums and galleries that balance preservation with modern exhibition needs.' },
          { title: 'Heritage Sites', description: 'Sensitive interventions in historically significant public realms.' },
          { title: 'Educational Spaces', description: 'Learning environments that foster community and intellectual growth.' }
        ]
      },
      process: {
        title: 'Our Methodology',
        steps: [
          { label: 'Enquiry', text: 'Deep research into local context, history, and social fabric.' },
          { label: 'Assembly', text: 'Collaborative workshops with stakeholders and community representatives.' },
          { label: 'Form', text: 'Developing an architectural language that resonates with cultural identity.' },
          { label: 'Materiality', text: 'Selection of materials that age with grace and reflect local craft.' }
        ]
      },
      team: {
        title: 'Expert Validation',
        lead: 'Lead Architect: Amine Kallel',
        bio: 'With 15 years of experience in civic design, Amine oversees our cultural projects with a focus on institutional memory.'
      },
      cta: {
        title: 'Ready to build for the future?',
        button: 'Start a Consultation'
      }
    },
    ar: {
      title: 'الثقافي والمدني',
      subtitle: 'فضاءات تفيض بالمعنى',
      description: 'المتاحف، والمكتبات، والقاعات المدنية والأنصاب التذكارية؛ فضاءات تتقاطع فيها الذاكرة الجماعية مع الهوية العامة وتجسّدها.',
      scope: {
        title: 'مجالات الخبرة الجوهرية',
        items: [
          { title: 'البنية التحتية العامة', description: 'مراكز مدنية ومحطات نقل واسعة مصممة لتدوم طويلاً.' },
          { title: 'المؤسسات الثقافية', description: 'متاحف وصالات عرض توازن بين الحفاظ على التراث ومتطلبات العرض الحديثة.' },
          { title: 'المواقع التراثية', description: 'تدخلات معمارية حساسة في الفضاءات العامة ذات الأهمية التاريخية.' },
          { title: 'الفضاءات التعليمية', description: 'بيئات تعلم تعزز الترابط المجتمعي والنمو الفكري.' }
        ]
      },
      process: {
        title: 'منهجيتنا في العمل',
        steps: [
          { label: 'الاستقصاء', text: 'بحث معمق في السياق المحلي، التاريخ، والنسيج الاجتماعي.' },
          { label: 'التجميع', text: 'ورش عمل تعاونية مع أصحاب المصلحة وممثلي المجتمع.' },
          { label: 'التشكيل', text: 'تطوير لغة معمارية تحاكي الهوية الثقافية.' },
          { label: 'المواد', text: 'اختيار مواد تكتسب رونقاً مع مرور الزمن وتعكس الحرفة المحلية.' }
        ]
      },
      team: {
        title: 'فريق الخبراء',
        lead: 'المهندس المسؤول: أمين قلل',
        bio: 'بخبرة تمتد لـ 15 عاماً في التصميم المدني، يشرف أمين على محفظتنا الثقافية مع التركيز على الذاكرة المؤسساتية.'
      },
      cta: {
        title: 'جاهزون للبناء للمستقبل؟',
        button: 'ابدأ استشارة'
      }
    },
    fr: {
      title: 'Culturel & Civique',
      subtitle: 'Des Espaces qui ont du Sens',
      description: 'Musées, bibliothèques, centres civiques et mémoriaux — des édifices où la mémoire collective et l’identité publique convergent.',
      scope: {
        title: 'Expertises Clés',
        items: [
          { title: 'Infrastructures Publiques', description: 'Centres civiques et pôles de transport conçus pour la pérennité.' },
          { title: 'Institutions Culturelles', description: 'Musées et galeries alliant préservation et besoins scénographiques modernes.' },
          { title: 'Sites Patrimoniaux', description: 'Interventions sensibles dans des espaces publics historiquement significatifs.' },
          { title: 'Espaces Éducatifs', description: 'Environnements d’apprentissage favorisant la communauté et le développement intellectuel.' }
        ]
      },
      process: {
        title: 'Notre Méthodologie',
        steps: [
          { label: 'Enquête', text: 'Recherche approfondie sur le contexte local, l’histoire et le tissu social.' },
          { label: 'Assemblage', text: 'Ateliers collaboratifs avec les parties prenantes et les représentants de la communauté.' },
          { label: 'Forme', text: 'Développement d’un langage architectural qui résonne avec l’identité culturelle.' },
          { label: 'Matérialité', text: 'Sélection de matériaux qui vieillissent avec grâce et reflètent l’artisanat local.' }
        ]
      },
      team: {
        title: 'Expertise Validée',
        lead: 'Architecte Responsable : Amine Kallel',
        bio: 'Avec 15 ans d’expérience en design civique, Amine dirige nos projets culturels en mettant l’accent sur la mémoire institutionnelle.'
      },
      cta: {
        title: 'Prêt à bâtir pour l’avenir ?',
        button: 'Démarrer une Consultation'
      }
    }
  },
  'residential': {
    en: {
      title: 'Residential',
      subtitle: 'The Private Realm',
      description: 'From urban apartments to landscape-bound maisons, we design domestic spaces that shelter the full texture of inhabited life.',
      scope: {
        title: 'Project Types',
        items: [
          { title: 'Private Villas', description: 'Custom-designed residences that integrate with their natural surroundings.' },
          { title: 'Urban Housing', description: 'Premium apartment complexes that redefine living in the modern city.' },
          { title: 'Retreats', description: 'Secluded dwellings focused on tranquility and connection to the landscape.' },
          { title: 'Multi-Family', description: 'Innovative housing solutions that prioritize both privacy and community.' }
        ]
      },
      process: {
        title: 'Our Flow',
        steps: [
          { label: 'Intimacy', text: 'Understanding the personal rituals and daily patterns of the inhabitants.' },
          { label: 'Craft', text: 'Executing bespoke interior details and architectural joinery.' },
          { label: 'Light', text: 'Modeling natural lighting scenes throughout the seasonal cycle.' },
          { label: 'Sanctuary', text: 'Ensuring privacy and thermal comfort through material selection.' }
        ]
      },
      team: {
        title: 'Residential Experts',
        lead: 'Design Partner: Sarah Mansour',
        bio: 'Sarah leads our luxury residential studio, specializing in the intersection of traditional craft and contemporary living.'
      },
      cta: {
        title: 'Invisioning your next home?',
        button: 'Get in Touch'
      }
    },
    ar: {
      title: 'السكني',
      subtitle: 'المجال الخاص',
      description: 'من الشقق الحضرية إلى المنازل المنسجمة مع الطبيعة؛ نصمم فضاءات سكنية تحتضن نسيج الحياة المعاشة وتوفر الملاذ الهادئ.',
      scope: {
        title: 'أنواع المشاريع',
        items: [
          { title: 'الفيلات الخاصة', description: 'مساكن مصممة خصيصاً لتتكامل مع محيطها الطبيعي.' },
          { title: 'الإسكان الحضري', description: 'مجمعات شقق فاخرة تعيد تعريف السكن في المدينة الحديثة.' },
          { title: 'أماكن الاستجمام', description: 'بيوت منعزلة تركز على الهدوء والارتباط بالمناظر الطبيعية.' },
          { title: 'السكن العائلي المشترك', description: 'حلول إسكان مبتكرة تعطي الأولوية لكل من الخصوصية والمجتمع.' }
        ]
      },
      process: {
        title: 'مسار العمل',
        steps: [
          { label: 'الألفة', text: 'فهم الطقوس الشخصية والأنماط اليومية للسكان.' },
          { label: 'الحرفة', text: 'تنفيذ تفاصيل داخلية مخصصة ونجارة معمارية رفيعة.' },
          { label: 'الضوء', text: 'نمذجة مشاهد الإضاءة الطبيعية طوال الدورة الموسمية.' },
          { label: 'الملاذ', text: 'ضمان الخصوصية والراحة الحرارية من خلال اختيار المواد.' }
        ]
      },
      team: {
        title: 'خبراء السكن',
        lead: 'شريك التصميم: سارة منصور',
        bio: 'تقود سارة استوديو السكن الفاخر لدينا، متخصصة في نقطة التقاء الحرف التقليدية والحياة المعاصرة.'
      },
      cta: {
        title: 'تتخيل منزلك القادم؟',
        button: 'تواصل معنا'
      }
    },
    fr: {
      title: 'Résidentiel',
      subtitle: 'La Sphère Privée',
      description: 'Des appartements urbains aux maisons enveloppées dans le paysage, nous concevons des espaces domestiques qui abritent la vie.',
      scope: {
        title: 'Types de Projets',
        items: [
          { title: 'Villas Privées', description: 'Résidences sur mesure qui s’intègrent à leur environnement naturel.' },
          { title: 'Habitat Urbain', description: 'Complexes d’appartements haut de gamme redéfinissant la vie citadine.' },
          { title: 'Retraites', description: 'Demeures isolées axées sur la tranquillité et la connexion au paysage.' },
          { title: 'Multi-Familial', description: 'Solutions d’habitat innovantes priorisant à la fois vie privée et communauté.' }
        ]
      },
      process: {
        title: 'Notre Démarche',
        steps: [
          { label: 'Intimité', text: 'Compréhension des rituels personnels et des rythmes de vie des habitants.' },
          { label: 'Artisanat', text: 'Exécution de détails intérieurs sur mesure et menuiserie architecturale.' },
          { label: 'Lumière', text: 'Modélisation des ambiances lumineuses naturelles au fil des saisons.' },
          { label: 'Sanctuaire', text: 'Garantie de l’intimité et du confort thermique via le choix des matériaux.' }
        ]
      },
      team: {
        title: 'Experts Résidentiel',
        lead: 'Partenaire Design : Sarah Mansour',
        bio: 'Sarah dirige notre studio de design résidentiel, spécialisée dans l’alliance entre l’artisanat traditionnel et la vie moderne.'
      },
      cta: {
        title: 'Vous imaginez votre futur foyer ?',
        button: 'Nous Contacter'
      }
    }
  },
  'adaptive-reuse': {
    en: {
      title: 'Adaptive Reuse',
      subtitle: 'Continuity Reconsidered',
      description: 'Transforming buildings that have outlived their original purpose — preserving structure and memory while serving new needs.',
      scope: {
        title: 'Intervention Levels',
        items: [
          { title: 'Historical Renovation', description: 'Restoring historical integrity while adding necessary modern functions.' },
          { title: 'Industrial Conversion', description: 'Turning former warehouses and factories into vibrant creative hubs.' },
          { title: 'Structural Upgrading', description: 'Reinforcing aging skeletons to extend the lifecycle of the built environment.' },
          { title: 'Interior Reprogramming', description: 'Reimaging internal flow without disturbing the external heritage envelope.' }
        ]
      },
      process: {
        title: 'Timeline',
        steps: [
          { label: 'Forensics', text: 'Technical Audit of the existing structure and material decay.' },
          { label: 'Dialogue', text: 'Negotiating between the original intent and the new program requirements.' },
          { label: 'Incision', text: 'Precise architectural interventions that distinguish old from new.' },
          { label: 'Curation', text: 'Retaining material traces of the past as part of the new aesthetic.' }
        ]
      },
      team: {
        title: 'Conservation Team',
        lead: 'Expert: Dr. Elias Haddad',
        bio: 'Elias is a leading voice in heritage conservation, ensuring we honor the past while building for the contemporary world.'
      },
      cta: {
        title: 'Have a site with history?',
        button: 'Request a Review'
      }
    },
    ar: {
      title: 'إعادة التأهيل',
      subtitle: 'إعادة تصور الاستمرارية',
      description: 'تحويل المباني التي تجاوزت غرضها الأصلي؛ مع الحفاظ على الهيكل والذاكرة مع تلبية احتياجات عصرية جديدة.',
      scope: {
        title: 'مستويات التدخل',
        items: [
          { title: 'الترميم التاريخي', description: 'استعادة النزاهة التاريخية مع إضافة وظائف حديثة ضرورية.' },
          { title: 'التحويل الصناعي', description: 'تحويل المستودعات والمصانع السابقة إلى مراكز إبداعية نابضة بالحياة.' },
          { title: 'التحديث الهيكلي', description: 'تعزيز الهياكل القديمة لإطالة دورة حياة البيئة المبنية.' },
          { title: 'إعادة البرمجة الداخلية', description: 'إعادة تصور التدفق الداخلي دون المساس بغلاف التراث الخارجي.' }
        ]
      },
      process: {
        title: 'الجدول الزمني',
        steps: [
          { label: 'التحقيق الفني', text: 'تدقيق تقني للهيكل القائم وتحلل المواد.' },
          { label: 'الحوار', text: 'التفاوض بين الغرض الأصلي ومتطلبات البرنامج الجديد.' },
          { label: 'التدخل الدقيق', text: 'تدخلات معمارية دقيقة تميز بين القديم والجديد.' },
          { label: 'تقييم المواد', text: 'الحفاظ على الآثار المادية للماضي كجزء من الجمالية الجديدة.' }
        ]
      },
      team: {
        title: 'فريق الحفاظ',
        lead: 'الخبير: د. إلياس حداد',
        bio: 'إلياس صوت رائد في الحفاظ على التراث، يضمن احترامنا للماضي أثناء البناء للعالم المعاصر.'
      },
      cta: {
        title: 'لديك موقع ذو تاريخ؟',
        button: 'طلب مراجعة'
      }
    },
    fr: {
      title: 'Réhabilitation',
      subtitle: 'La Continuité Repensée',
      description: 'Transformer des bâtiments qui ont survécu à leur usage d’origine — en préservant la structure et la mémoire tout en répondant à de nouveaux besoins.',
      scope: {
        title: 'Niveaux d’Intervention',
        items: [
          { title: 'Rénovation Historique', description: 'Restauration de l’intégrité historique tout en ajoutant les fonctions modernes.' },
          { title: 'Conversion Industrielle', description: 'Transformer d’anciens entrepôts en pôles créatifs dynamiques.' },
          { title: 'Mise à niveau Structurelle', description: 'Renforcement des squelettes anciens pour prolonger la vie du bâtiment.' },
          { title: 'Reprogrammation Intérieure', description: 'Réimaginer les flux internes sans perturber l’enveloppe patrimoniale.' }
        ]
      },
      process: {
        title: 'Chronologie',
        steps: [
          { label: 'Expertise', text: 'Audit technique de la structure existante et de sa dégradation.' },
          { label: 'Dialogue', text: 'Négociation entre l’intention originelle et le nouveau programme.' },
          { label: 'Incision', text: 'Interventions précises distinguant clairement le neuf de l’ancien.' },
          { label: 'Curation', text: 'Conservation des traces matérielles du passé dans la nouvelle esthétique.' }
        ]
      },
      team: {
        title: 'Équipe Conservation',
        lead: 'Expert : Dr Elias Haddad',
        bio: 'Elias est une voix majeure en conservation, garantissant le respect du passé tout en bâtissant pour le monde contemporain.'
      },
      cta: {
        title: 'Un site chargé d’histoire ?',
        button: 'Demander une Étude'
      }
    }
  },
  'interior-design': {
    en: {
      title: 'Design & Interior Architecture',
      subtitle: 'Atmospheres for Living',
      description: 'Spatial and material design for civic and residential environments, from overall concept to detailed interior atmospheres.',
      scope: {
        title: 'Core Design',
        items: [
          { title: 'Spatial Planning', description: 'Optimizing flow and functional relationships within the interior volume.' },
          { title: 'Material Palettes', description: 'Curating tactile experiences through natural stone, timber, and bespoke finishes.' }
        ]
      },
      team: {
        title: 'Interior Team',
        lead: 'Sarah Mansour',
        bio: 'Expert in luxury interior environments.'
      },
      cta: {
        title: 'Ready for a change?',
        button: 'Contact Us'
      }
    },
    ar: {
      title: 'التصميم والهندسة الداخلية',
      subtitle: 'أجواء مخصصة للحياة',
      description: 'تصميم الفضاءات والمواد للمباني العمومية والسكنية، من الفكرة العامة إلى التفاصيل الداخلية الدقيقة.',
      scope: {
        title: 'التصميم الجوهري',
        items: [
          { title: 'التخطيط الفضائي', description: 'تحسين التدفق والعلاقات الوظيفية داخل الحجم الداخلي.' },
          { title: 'لوحات المواد', description: 'تنسيق تجارب ملموسة عبر المواد الطبيعية والتشطيبات المخصصة.' }
        ]
      },
      team: {
        title: 'فريق التصميم الداخلي',
        lead: 'سارة منصور',
        bio: 'خبيرة في البيئات الداخلية الفاخرة.'
      },
      cta: {
        title: 'جاهزون للتغيير؟',
        button: 'اتصل بنا'
      }
    },
    fr: {
      title: 'Conception & Architecture d\'Intérieur',
      subtitle: 'Des Atmosphères pour Vivre',
      description: 'Conception spatiale et matérielle pour les environnements civiques et résidentiels, du concept global aux ambiances intérieures détaillées.',
      scope: {
        title: 'Design Core',
        items: [
          { title: 'Planification Spatiale', description: 'Optimisation des flux et des relations fonctionnelles dans le volume.' },
          { title: 'Palettes Matières', description: 'Curation d\'expériences tactiles via la pierre naturelle et le bois.' }
        ]
      },
      team: {
        title: 'Équipe Intérieur',
        lead: 'Sarah Mansour',
        bio: 'Experte en environnements intérieurs de luxe.'
      },
      cta: {
        title: 'Prêt pour un changement ?',
        button: 'Contactez-nous'
      }
    }
  },
  'urban-planning': {
    en: {
      title: 'Urban Planning Support',
      subtitle: 'Structuring the City',
      description: 'Urban integration studies, master-planning support, and advisory work aligned with regulatory planning tools.',
      scope: { title: 'Studies', items: [] },
      team: { title: 'Team', lead: 'Urbanist', bio: 'Expert' },
      cta: { title: 'Consult', button: 'Start' }
    },
    ar: { title: 'دعم التخطيط العمراني', subtitle: 'هيكلة المدينة', description: 'دراسات إدماج عمراني، مرافقة في المخططات التهيئية، واستشارات متناسقة مع أدوات التنظيم والتعمير.', scope: { title: 'دراسات', items: [] }, team: { title: 'فريق', lead: 'مخطط عمراني', bio: 'خبير' }, cta: { title: 'استشارة', button: 'بدء' } },
    fr: { title: 'Support en Planification Urbaine', subtitle: 'Structurer la Ville', description: 'Études d\'intégration urbaine, support au plan directeur et conseil alignés sur les outils de planification réglementaire.', scope: { title: 'Études', items: [] }, team: { title: 'Équipe', lead: 'Urbaniste', bio: 'Expert' }, cta: { title: 'Consulter', button: 'Démarrer' } }
  },
  'construction-supervision': {
    en: {
      title: 'Construction Supervision / OPC',
      subtitle: 'Ensuring Intent',
      description: 'Rigorous on-site technical supervision and OPC coordination from foundation to handover.',
      scope: { title: 'Supervision', items: [] },
      team: { title: 'Team', lead: 'Engineer', bio: 'Expert' },
      cta: { title: 'Consult', button: 'Start' }
    },
    ar: { title: 'الإشراف على التنفيذ / OPC', subtitle: 'ضمان التنفيذ الأمثل', description: 'متابعة تقنية صارمة في الورشة وتنسيق OPC من الأساسات إلى التسليم النهائي.', scope: { title: 'إشراف', items: [] }, team: { title: 'فريق', lead: 'مهندس', bio: 'خبير' }, cta: { title: 'استشارة', button: 'بدء' } },
    fr: { title: 'Supervision de Chantier / OPC', subtitle: 'Garantir l\'Intention', description: 'Supervision technique rigoureuse sur site et coordination OPC, des fondations jusqu\'à la livraison.', scope: { title: 'Supervision', items: [] }, team: { title: 'Équipe', lead: 'Ingénieur', bio: 'Expert' }, cta: { title: 'Consulter', button: 'Démarrer' } }
  },
  'building-restoration': {
    en: {
      title: 'Building Restoration',
      subtitle: 'Extending Lifecycle',
      description: 'Structural and architectural restoration of deteriorated or damaged existing buildings.',
      scope: { title: 'Restoration', items: [] },
      team: { title: 'Team', lead: 'Restorer', bio: 'Expert' },
      cta: { title: 'Consult', button: 'Start' }
    },
    ar: { title: 'ترميم المباني', subtitle: 'إطالة عمر المبنى', description: 'ترميم إنشائي ومعماري للمباني المتضررة أو المتدهورة مع احترام طابعها الأصلي قدر الإمكان.', scope: { title: 'ترميم', items: [] }, team: { title: 'فريق', lead: 'مرمم', bio: 'خبير' }, cta: { title: 'استشارة', button: 'بدء' } },
    fr: { title: 'Restauration de Bâtiments', subtitle: 'Prolonger le Cycle de Vie', description: 'Restauration structurelle et architecturale de bâtiments existants détériorés ou endommagés.', scope: { title: 'Restauration', items: [] }, team: { title: 'Équipe', lead: 'Restaurateur', bio: 'Expert' }, cta: { title: 'Consulter', button: 'Démarrer' } }
  },
  'heritage-restoration': {
    en: {
      title: 'Heritage & Archaeological Restoration',
      subtitle: 'The Weight of History',
      description: 'Specialized restoration of listed heritage buildings and archaeological sites in coordination with protection authorities.',
      scope: { title: 'Heritage', items: [] },
      team: { title: 'Team', lead: 'Heritage Expert', bio: 'Expert' },
      cta: { title: 'Consult', button: 'Start' }
    },
    ar: { title: 'ترميم التراث والآثار', subtitle: 'ثقل التاريخ', description: 'تدخلات متخصصة في ترميم المباني المصنَّفة والمعالم الأثرية بالتنسيق مع هيئات حماية التراث.', scope: { title: 'تراث', items: [] }, team: { title: 'فريق', lead: 'خبير تراث', bio: 'خبير' }, cta: { title: 'استشارة', button: 'بدء' } },
    fr: { title: 'Restauration du Patrimoine & Archéologique', subtitle: 'Le Poids de l\'Histoire', description: 'Restauration spécialisée de bâtiments patrimoniaux classés et de sites archéologiques en coordination avec les autorités de protection.', scope: { title: 'Patrimoine', items: [] }, team: { title: 'Équipe', lead: 'Expert Patrimoine', bio: 'Expert' }, cta: { title: 'Consulter', button: 'Démarrer' } }
  },
  'architectural-studies': {
    en: {
      title: 'Architectural Studies',
      subtitle: 'Foundations of Design',
      description: 'Preliminary concept and feasibility studies developed into permit-ready architectural packages.',
      scope: { title: 'Studies', items: [] },
      team: { title: 'Team', lead: 'Architect', bio: 'Expert' },
      cta: { title: 'Consult', button: 'Start' }
    },
    ar: { title: 'الدراسات المعمارية', subtitle: 'أسس التصميم', description: 'دراسات أولية وتحليل جدوى تُطوَّر إلى ملفات معمارية جاهزة للترخيص.', scope: { title: 'دراسات', items: [] }, team: { title: 'فريق', lead: 'معماري', bio: 'خبير' }, cta: { title: 'استشارة', button: 'بدء' } },
    fr: { title: 'Études Architecturales', subtitle: 'Fondations du Design', description: 'Études préliminaires de concept et de faisabilité développées jusqu\'aux dossiers d\'exécution.', scope: { title: 'Études', items: [] }, team: { title: 'Équipe', lead: 'Architecte', bio: 'Expert' }, cta: { title: 'Consulter', button: 'Démarrer' } }
  }
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  
  const fsService = await fetchServiceBySlug(slug);
  if (fsService) {
    const t = fsService[locale as keyof FirestoreService] as FirestoreService['en'] | undefined;
    const title = t?.title || fsService.en.title;
    const subtitle = t?.subtitle || fsService.en.subtitle;
    return {
      title: `${title} | S-Arch Studio`,
      description: subtitle,
    };
  }

  const data = serviceData[slug as keyof typeof serviceData]?.[locale as keyof (typeof serviceData)['residential']];
  if (data) {
    return {
      title: `${data.title} | S-Arch Studio`,
      description: data.subtitle,
    };
  }
  return {};
}

// Define valid slugs for static generation
export async function generateStaticParams() {
  const slugs = Object.keys(serviceData);
  const locales = ['en', 'fr', 'ar'];
  
  return locales.flatMap((locale) => 
    slugs.map((slug) => ({ locale, slug }))
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const isRtl = locale === 'ar';
  
  // 1. Try Firestore First
  const fsService = await fetchServiceBySlug(slug);
  let pageTitle = '';
  let uiData: ServiceUIData | null = null;

  if (fsService) {
    const t = fsService[locale as keyof FirestoreService] as FirestoreService['en'] | undefined;
    pageTitle = t?.title || fsService.en.title;
    uiData = {
      isDynamic: true,
      title: pageTitle,
      subtitle: t?.subtitle || fsService.en.subtitle,
      description: t?.description || fsService.en.description,
      features: (t?.features || fsService.en.features || []).map((f: string) => ({ title: f, description: f })),
      image: fsService.image || '',
    };
  } else {
    // 2. Fallback to Static Categories
    const data = serviceData[slug as keyof typeof serviceData]?.[locale as keyof (typeof serviceData)['residential']];
    if (!data) notFound();
    pageTitle = data.title;
    uiData = { isDynamic: false, ...data } as ServiceUIData;
  }

  // Fetch and localize projects for this service
  const serviceProjects = allProjects
    .filter(p => !uiData?.isDynamic ? p.category === slug : p.translations.en.services.some((s: string) => s.toLowerCase() === slug.toLowerCase() || s.toLowerCase() === pageTitle.toLowerCase()))
    .map(p => getLocalizedProject(p, locale))
    .slice(0, 3);

  const labels = {
    en: { home: 'Home', studio: 'Studio', back: 'Services', ctaTitle: 'Ready to build for the future?', ctaBtn: 'Start a Consultation' },
    ar: { home: 'الرئيسية', studio: 'عن الاستوديو', back: 'الخدمات', ctaTitle: 'جاهزون للبناء للمستقبل؟', ctaBtn: 'ابدأ استشارة' },
    fr: { home: 'Accueil', studio: 'Studio', back: 'Services', ctaTitle: 'Prêt à bâtir pour l’avenir ?', ctaBtn: 'Démarrer une Consultation' }
  };
  const t = labels[locale as keyof typeof labels] || labels.en;

  const breadcrumbs = [
    { label: t.home, href: `/${locale}` },
    { label: t.back, href: `/${locale}/services` },
    { label: pageTitle }
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-surface-0)', position: 'relative' }}>
      {/* Breadcrumbs Overlay */}
      <div className="absolute top-0 left-0 w-full z-10" dir={isRtl ? 'rtl' : 'ltr'}>
         <Breadcrumbs items={breadcrumbs} locale={locale} isRTL={isRtl} />
      </div>

      {/* 2. Service Header (Hero) */}
      <ServiceHero 
        title={uiData.title} 
        subtitle={uiData.subtitle} 
        slug={slug} 
        locale={locale}
        isRtl={isRtl} 
      />

      {/* 3. Core Capabilities / Scope */}
      <ServiceScope 
        title={uiData.isDynamic ? '' : (uiData.scope?.title || '')} 
        description={uiData.description} 
        items={uiData.isDynamic ? uiData.features : (uiData.scope?.items || [])} 
      />

      {!uiData.isDynamic && (
        <>
          {/* 4. Methodology / Process */}
          {uiData.process && (
            <ServiceProcess 
              title={uiData.process.title} 
              steps={uiData.process.steps} 
            />
          )}
          
          {/* 6. Lead Expert / Service Team Validation */}
          {uiData.team && (
            <ServiceTeam 
              title={uiData.team.title} 
              lead={uiData.team.lead} 
              bio={uiData.team.bio} 
            />
          )}
        </>
      )}

      {/* 5. Related Projects */}
      {serviceProjects.length > 0 && (
        <ServiceProjects 
          locale={locale} 
          projects={serviceProjects}
        />
      )}

      {/* 7. Final Conversion Block */}
      <ServiceCTA 
        locale={locale} 
        isRtl={isRtl} 
        title={uiData?.isDynamic ? t.ctaTitle : (uiData?.cta?.title || t.ctaTitle)} 
        buttonText={uiData?.isDynamic ? t.ctaBtn : (uiData?.cta?.button || t.ctaBtn)} 
      />
    </main>
  );
}
