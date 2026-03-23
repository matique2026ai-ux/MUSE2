import type { Locale } from '@/lib/i18n';

export type ProjectCategory = 'cultural-civic' | 'residential' | 'adaptive-reuse' | 'urban-planning' | 'mixed-use' | 'heritage';

export interface LocalizedProjectData {
  title: string;
  location: string;
  year: string;
  type: string;
  tagline: string;
  status: string;
  client: string;
  services: string[];
  narrative: {
    context: string[];
    design: string[];
    outcome: string[];
  };
}

export interface Project {
  slug: string;
  category: ProjectCategory;
  heroImage: string;
  images: string[];
  translations: Record<Locale, LocalizedProjectData>;
}

export const projects: Project[] = [
  {
    slug: 'setif-grand-theatre',
    category: 'cultural-civic',
    heroImage: '/images/projects/civic-hub-hero.jpg',
    images: [
      '/images/projects/civic-hub-gallery-1.jpg',
      '/images/projects/adaptive-reuse-gallery-1.jpg',
      '/images/projects/adaptive-reuse-hero.jpg'
    ],
    translations: {
      en: {
        title: 'Sétif Grand Theatre',
        location: 'Sétif, Algeria',
        year: '2024',
        type: 'Civic / Cultural',
        tagline: 'A modern cultural hub integrating traditional North African motifs with contemporary acoustic engineering.',
        status: 'Built',
        client: 'Ministry of Culture and Arts',
        services: ['Detailed Studies', 'Architectural Design', 'Acoustic Engineering', 'Supervision'],
        narrative: {
          context: [
            'Sétif has a long-standing theatrical and cultural history, yet the city lacked a dedicated, state-of-the-art performance venue capable of hosting grand international symphonies and local dramatic arts alike.',
            'The brief required a monumental structure located at the edge of the historic city center, demanding a delicate balance between municipal grandeur and respectful engagement with the surrounding urban fabric.'
          ],
          design: [
            'Our architectural response focused on a massive, protective outer envelope adorned with intricate geometric perforation inspired by regional vernacular shading techniques, allowing dappled light to penetrate the vast entrance foyer.',
            'Inside, the 1,200-seat main auditorium was engineered as a \"wooden instrument.\" We utilized parametrically designed acoustic paneling crafted from local timber to achieve world-class reverberation times without relying on artificial amplification.'
          ],
          outcome: [
            'The completed Grand Theatre now stands as a primary civic beacon in Sétif. It has revitalized the immediate district, transforming the adjacent plaza into a thriving evening gathering space for citizens.',
            'It successfully serves as the premier destination for the National Symphony Orchestra while remaining heavily utilized by community theater groups during off-peak seasons.'
          ]
        }
      },
      ar: {
        title: 'المسرح الكبير بسطيف',
        location: 'سطيف، الجزائر',
        year: '2024',
        type: 'ثقافي ومدني',
        tagline: 'قطب ثقافي حديث يدمج الزخارف التقليدية لشمال إفريقيا مع الهندسة الصوتية المعاصرة.',
        status: 'مبني',
        client: 'وزارة الثقافة والفنون',
        services: ['دراسات مفصلة', 'التصميم المعماري', 'الهندسة الصوتية', 'الإشراف'],
        narrative: {
          context: [
            'تتمتع سطيف بتاريخ مسرحي وثقافي عريق، ومع ذلك افتقرت المدينة إلى مكان مخصص للأداء الفني على أحدث طراز، قادر على استضافة السمفونيات الدولية الكبرى والفنون المسرحية المحلية على حد سواء.',
            'يتطلب التكليف إنشاء هيكل ضخم يقع على حافة وسط المدينة التاريخي، مما يتطلب توازناً دقيقاً بين العظمة البلدية والمشاركة المحترمة مع النسيج الحضري المحيط.'
          ],
          design: [
            'ركزت استجابتنا المعمارية على غلاف خارجي ضخم وواقي مزين بتخريمات هندسية معقدة مستوحاة من تقنيات التظليل الإقليمية، مما يسمح للضوء المرقط باختراق بهو المدخل الشاسع.',
            'في الداخل، تم تصميم القاعة الرئيسية التي تتسع لـ 1200 مقعد لتكون "آلة موسيقية خشبية". استخدمنا ألواحاً صوتية مصممة بارامترياً ومصنوعة من الخشب المحلي لتحقيق أوقات صدى عالمية دون الاعتماد على التضخيم الاصطناعي.'
          ],
          outcome: [
            'يقف المسرح الكبير المكتمل الآن كمنارة مدنية رئيسية في سطيف. لقد أعاد تنشيط المنطقة المجاورة، وحول الساحة المجاورة إلى مساحة تجمع مسائية مزدهرة للمواطنين.',
            'إنه يعمل بنجاح كوجهة أولى للأوركسترا السيمفونية الوطنية مع استمرار استخدامه بكثافة من قبل المجموعات المسرحية المجتمعية خلال مواسم الذروة.'
          ]
        }
      },
      fr: {
        title: 'Grand Théâtre de Sétif',
        location: 'Sétif, Algérie',
        year: '2024',
        type: 'Civique / Culturel',
        tagline: 'Un pôle culturel moderne intégrant des motifs traditionnels nord-africains à une ingénierie acoustique contemporaine.',
        status: 'Construit',
        client: 'Ministère de la Culture et des Arts',
        services: ['Études Détaillées', 'Conception Architecturale', 'Ingénierie Acoustique', 'Supervision'],
        narrative: {
          context: [
            'Sétif possède une longue histoire théâtrale et culturelle, mais la ville manquait d\'un lieu de spectacle de pointe dédié, capable d\'accueillir à la fois de grandes symphonies internationales et des arts dramatiques locaux.',
            'Le cahier des charges exigeait une structure monumentale située en bordure du centre-ville historique, exigeant un équilibre délicat entre la grandeur municipale et un engagement respectueux avec le tissu urbain environnant.'
          ],
          design: [
            'Notre réponse architecturale s\'est concentrée sur une enveloppe extérieure massive et protectrice ornée d\'une perforation géométrique complexe inspirée des techniques d\'ombrage vernaculaires régionales.',
            'À l\'intérieur, l\'auditorium principal de 1 200 places a été conçu comme un « instrument en bois ». Nous avons utilisé des panneaux acoustiques conçus paramétriquement pour atteindre des temps de réverbération de classe mondiale.'
          ],
          outcome: [
            'Le Grand Théâtre achevé se dresse désormais comme un phare civique de premier plan à Sétif. Il a revitalisé le quartier immédiat, transformant la place adjacente en un espace de rassemblement florissant en soirée pour les citoyens.',
            'Il sert avec succès de destination de choix pour l\'Orchestre Symphonique National tout en restant fortement utilisé par les troupes de théâtre communautaires.'
          ]
        }
      }
    }
  },
  {
    slug: 'el-djazair-residential',
    category: 'residential',
    heroImage: '/images/projects/residential-hero.jpg',
    images: ['/images/projects/residential-gallery-1.jpg'],
    translations: {
      en: {
        title: 'El Djazair Residential Complex',
        location: 'Algiers, Algeria',
        year: '2023',
        type: 'Residential',
        tagline: 'High-density urban housing prioritizing natural ventilation, community spaces, and sustainable materials.',
        status: 'Built',
        client: 'Private Investment Group',
        services: ['Urban Layout', 'Architecture', 'Interior Design'],
        narrative: {
          context: ['A rapidly growing population density required an innovative approach to vertical housing.'],
          design: ['The complex prioritizes deep loggias for every apartment to protect against direct sunlight.'],
          outcome: ['The project successfully delivered 240 units while maintaining an unprecedented 30% of ground footprint dedicated to communal green spaces.']
        }
      },
      ar: {
        title: 'المجمع السكني الجزائر',
        location: 'الجزائر العاصمة، الجزائر',
        year: '2023',
        type: 'سكني',
        tagline: 'إسكان حضري عالي الكثافة يعطي الأولوية للتهوية الطبيعية، المساحات المجتمعية، والمواد المستدامة.',
        status: 'مبني',
        client: 'مجموعة استثمارية خاصة',
        services: ['التخطيط الحضري', 'الهندسة المعمارية', 'التصميم الداخلي'],
        narrative: {
          context: ['تطلبت الكثافة السكانية المتزايدة بسرعة نهجاً مبتكراً للإسكان العمودي.'],
          design: ['يعطي المجمع الأولوية لتراسات عميقة لكل شقة للحماية من أشعة الشمس المباشرة.'],
          outcome: ['قدم المشروع بنجاح 240 وحدة مع الحفاظ على مساحات خضراء مشتركة واسعة.']
        }
      },
      fr: {
        title: 'Complexe Résidentiel El Djazair',
        location: 'Alger, Algérie',
        year: '2023',
        type: 'Résidentiel',
        tagline: 'Logements urbains à haute densité privilégiant la ventilation naturelle.',
        status: 'Construit',
        client: 'Groupe d\'Investissement Privé',
        services: ['Aménagement Urbain', 'Architecture', 'Design d\'Intérieur'],
        narrative: {
          context: ['Une densité de population en croissance rapide a nécessité une approche innovante.'],
          design: ['Le complexe privilégie des loggias profondes pour chaque appartement afin de protéger du soleil.'],
          outcome: ['Le projet a livré avec succès 240 unités tout en maintenant de grands espaces verts.']
        }
      }
    }
  },
  {
    slug: 'constantine-plaza',
    category: 'urban-planning',
    heroImage: '/images/projects/civic-hub-gallery-1.jpg',
    images: ['/images/projects/adaptive-reuse-gallery-1.jpg'],
    translations: {
      en: {
        title: 'Constantine Commemorative Plaza',
        location: 'Constantine, Algeria',
        year: '2022',
        type: 'Urban Planning',
        tagline: 'A massive structural redesign of the historic city center.',
        status: 'Completed',
        client: 'Municipality of Constantine',
        services: ['Masterplan', 'Public Realm Design', 'Traffic Re-routing'],
        narrative: {
          context: ['The heart of Constantine suffered from traffic congestion and disconnected pedestrian zones.'],
          design: ['We introduced a unified stone paving system and subtle grade changes to naturally slow traffic and elevate the pedestrian experience.'],
          outcome: ['The plaza has become the city\'s most photographed and utilized public space.']
        }
      },
      ar: {
        title: 'الساحة التذكارية بقسنطينة',
        location: 'قسنطينة، الجزائر',
        year: '2022',
        type: 'تخطيط عمراني',
        tagline: 'إعادة تصميم هيكلي شامل لوسط المدينة التاريخي.',
        status: 'مكتمل',
        client: 'بلدية قسنطينة',
        services: ['التخطيط الرئيسي', 'تصميم المجال العام', 'إعادة توجيه حركة المرور'],
        narrative: {
          context: ['عانى قلب قسنطينة من الازدحام المروري ومناطق المشاة المنفصلة.'],
          design: ['قدمنا نظام رصف حجري موحد وتغييرات طفيفة في الدرجة لإبطاء حركة المرور بشكل طبيعي.'],
          outcome: ['أصبحت الساحة أكثر الأماكن العامة تصويراً واستخداماً في المدينة.']
        }
      },
      fr: {
        title: 'Place Commémorative de Constantine',
        location: 'Constantine, Algérie',
        year: '2022',
        type: 'Planification Urbaine',
        tagline: 'Une refonte structurelle massive du centre-ville historique.',
        status: 'Terminé',
        client: 'Municipalité de Constantine',
        services: ['Plan Directeur', 'Conception de l\'Espace Public', 'Redirection du Trafic'],
        narrative: {
          context: ['Le cœur de Constantine souffrait d\'embouteillages et de zones piétonnes déconnectées.'],
          design: ['Nous avons introduit un système de pavage en pierre unifié pour ralentir naturellement la circulation.'],
          outcome: ['La place est devenue l\'espace public le plus photographié et utilisé de la ville.']
        }
      }
    }
  },
  {
    slug: 'mediterranean-tower',
    category: 'mixed-use',
    heroImage: '/images/projects/residential-gallery-1.jpg',
    images: ['/images/projects/residential-hero.jpg'],
    translations: {
      en: {
        title: 'Mediterranean Tower',
        location: 'Oran, Algeria',
        year: '2025',
        type: 'Mixed-use',
        tagline: 'An ambitious high-rise development combining commercial offices and luxury apartments.',
        status: 'Under Construction',
        client: 'Oran Coastal Developers',
        services: ['Architectural Design', 'Structural Engineering', 'Facade Consulting'],
        narrative: {
          context: ['A prominent coastal site required a landmark mixed-use tower.'],
          design: ['The aerodynamic facade mitigates coastal winds while maximizing sea views.'],
          outcome: ['Slated for completion in 2025, it is projected to achieve LEED Gold status.']
        }
      },
      ar: {
        title: 'البرج المتوسطي',
        location: 'وهران، الجزائر',
        year: '2025',
        type: 'متعدد الاستخدامات',
        tagline: 'مشروع طموح لبرج شاهق يجمع بين المكاتب التجارية والشقق الفاخرة.',
        status: 'قيد الإنشاء',
        client: 'مطورون ساحل وهران',
        services: ['التصميم المعماري', 'الهندسة الإنشائية', 'استشارات الواجهات'],
        narrative: {
          context: ['تطلب موقع ساحلي بارز برجاً تاريخياً متعدد الاستخدامات.'],
          design: ['تخفف الواجهة الديناميكية الهوائية من الرياح الساحلية مع تعظيم إطلالات البحر.'],
          outcome: ['من المقرر الانتهاء منه في عام 2025، ومن المتوقع أن يحقق التصنيف الذهبي للاستدامة.']
        }
      },
      fr: {
        title: 'Tour Méditerranéenne',
        location: 'Oran, Algérie',
        year: '2025',
        type: 'Usage Mixte',
        tagline: 'Un ambitieux développement de grande hauteur combinant des bureaux et des appartements.',
        status: 'En construction',
        client: 'Promoteurs Côtiers d\'Oran',
        services: ['Conception Architecturale', 'Ingénierie', 'Conseil en Façade'],
        narrative: {
          context: ['Un site côtier de premier plan nécessitait une tour phare.'],
          design: ['La façade aérodynamique atténue les vents côtiers tout en maximisant les vues sur la mer.'],
          outcome: ['Prévu pour être achevé en 2025.']
        }
      }
    }
  },
  {
    slug: 'dar-el-kadi',
    category: 'heritage',
    heroImage: '/images/projects/heritage-hero.jpg',
    images: ['/images/projects/heritage-gallery-1.jpg'],
    translations: {
      en: {
        title: 'Dar El Kadi Restoration',
        location: 'Béjaïa, Algeria',
        year: '2021',
        type: 'Heritage / Archaeological',
        tagline: 'Painstaking structural restoration of a listed historic building.',
        status: 'Completed',
        client: 'Heritage Protection Agency',
        services: ['Historical Research', 'Material Analysis', 'Restoration Contracting'],
        narrative: {
          context: ['A 16th-century administrative building had suffered severe structural decay.'],
          design: ['Using traditional lime mortars and locally sourced cedar, the timber roofs were meticulously reconstructed.'],
          outcome: ['The building now operates as a public museum and cultural lecture space.']
        }
      },
      ar: {
        title: 'ترميم دار القاضي',
        location: 'بجاية، الجزائر',
        year: '2021',
        type: 'ترميم تراث / آثار',
        tagline: 'ترميم إنشائي ومادي دقيق لمبنى تاريخي مصنف.',
        status: 'مكتمل',
        client: 'وكالة حماية التراث',
        services: ['البحث التاريخي', 'تحليل المواد', 'مقاولات الترميم'],
        narrative: {
          context: ['عانى مبنى إداري يعود للقرن السادس عشر من تدهور هيكلي شديد.'],
          design: ['باستخدام الملاط التقليدي وخشب الأرز المحلي، تم إعادة بناء الأسقف الخشبية بدقة.'],
          outcome: ['يعمل المبنى الآن كمتحف عام ومساحة للمحاضرات الثقافية.']
        }
      },
      fr: {
        title: 'Restauration de Dar El Kadi',
        location: 'Béjaïa, Algérie',
        year: '2021',
        type: 'Patrimoine / Archéologique',
        tagline: 'Restauration structurelle et matérielle d\'un bâtiment historique classé.',
        status: 'Terminé',
        client: 'Agence de Protection du Patrimoine',
        services: ['Recherche Historique', 'Analyse des Matériaux', 'Restauration'],
        narrative: {
          context: ['Un bâtiment administratif du 16ème siècle avait subi une grave dégradation.'],
          design: ['En utilisant des mortiers à la chaux traditionnels, les toits ont été reconstruits.'],
          outcome: ['Le bâtiment fonctionne désormais comme un musée public.']
        }
      }
    }
  },
  {
    slug: 's-arch-hq',
    category: 'adaptive-reuse',
    heroImage: '/images/projects/adaptive-reuse-hero.jpg',
    images: ['/images/projects/adaptive-reuse-gallery-1.jpg'],
    translations: {
      en: {
        title: 'S-Arch Headquarters Adaptation',
        location: 'Sétif, Algeria',
        year: '2020',
        type: 'Building Restoration',
        tagline: 'Adaptive reuse of an abandoned industrial warehouse into our own light-filled studio.',
        status: 'Completed',
        client: 'Internal Project',
        services: ['Adaptive Reuse', 'Interior Design', 'Lighting Design'],
        narrative: {
          context: ['We required a new headquarters capable of scaling with our growing multidisciplinary team.'],
          design: ['We retained the heavy steel structural trusses while opening the roof to expansive skylights, creating a naturally lit drafting floor.'],
          outcome: ['The office serves as a living showroom of our design philosophy and sustainable material usage.']
        }
      },
      ar: {
        title: 'تهيئة المقر الرئيسي للمكتب',
        location: 'سطيف، الجزائر',
        year: '2020',
        type: 'ترميم مبنى',
        tagline: 'إعادة استخدام تكييفية لمستودع صناعي مهجور لتحويله إلى استوديو خاص بنا.',
        status: 'مكتمل',
        client: 'مشروع داخلي',
        services: ['إعادة الاستخدام التكيفي', 'التصميم الداخلي', 'تصميم الإضاءة'],
        narrative: {
          context: ['كنا بحاجة إلى مقر جديد قادر على التوسع مع فريقنا المتنامي.'],
          design: ['احتفظنا بالدعامات الهيكلية الفولاذية الثقيلة مع فتح السقف لمناور واسعة، مما خلق طابق صياغة مضاء طبيعياً.'],
          outcome: ['يعمل المكتب كصالة عرض حية لفلسفتنا في التصميم واستخدامنا للمواد المستدامة.']
        }
      },
      fr: {
        title: 'Adaptation du Siège de S-Arch',
        location: 'Sétif, Algérie',
        year: '2020',
        type: 'Restauration de Bâtiment',
        tagline: 'Réutilisation adaptative d\'un entrepôt industriel abandonné en notre propre studio.',
        status: 'Terminé',
        client: 'Projet Interne',
        services: ['Réutilisation Adaptative', 'Design d\'Intérieur', 'Conception d\'Éclairage'],
        narrative: {
          context: ['Nous avions besoin d\'un nouveau siège capable d\'évoluer avec notre équipe.'],
          design: ['Nous avons conservé les lourdes fermes structurelles en acier tout en ouvrant le toit sur de vastes puits de lumière.'],
          outcome: ['Le bureau sert de salle d\'exposition vivante de notre philosophie de conception.']
        }
      }
    }
  }
];

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter(p => p.category === category);
}

export function getLocalizedProject(project: Project, locale: Locale): Project & LocalizedProjectData {
  const t = project.translations[locale] || project.translations.en;
  return {
    ...project,
    title: t.title,
    location: t.location,
    year: t.year,
    type: t.type,
    tagline: t.tagline,
    status: t.status,
    client: t.client,
    services: t.services,
    narrative: t.narrative
  };
}
