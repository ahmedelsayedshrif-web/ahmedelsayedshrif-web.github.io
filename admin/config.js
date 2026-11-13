/* Dashboard configuration: which content files exist and which fields each one has.
   Field names here must match the keys read by the site (src/content.js, src/Home.jsx, src/Projects.jsx). */
(() => {
  // a text that exists in both languages: { ar, en }
  const bi = (name, label, widget = 'string', hint) => ({
    name,
    label,
    widget: 'object',
    collapsed: false,
    ...(hint ? { hint } : {}),
    fields: [
      { name: 'ar', label: 'عربي', widget },
      { name: 'en', label: 'English', widget, required: false }
    ]
  });
  const str = (name, label, extra = {}) => ({ name, label, widget: 'string', ...extra });
  const color = (name, label) => ({ name, label, widget: 'color' });

  const GLYPHS = [
    { value: 'bars', label: 'أعمدة (Bar chart)' },
    { value: 'db', label: 'قاعدة بيانات (Database)' },
    { value: 'fx', label: 'معادلة fx' },
    { value: 'grid', label: 'جدول (Grid)' },
    { value: 'pie', label: 'دائرة (Pie chart)' },
    { value: 'line', label: 'خط (Line chart)' },
    { value: 'insight', label: 'عدسة تحليل (Insight)' },
    { value: 'cross', label: 'علامة + (Tableau)' },
    { value: 'braces', label: 'أقواس كود { }' },
    { value: 'code', label: 'كود' },
    { value: 'cloud', label: 'سحابة' },
    { value: 'bolt', label: 'برق' }
  ];
  const glyph = (name = 'glyph') => ({ name, label: 'الأيقونة', widget: 'select', options: GLYPHS });
  const TONES = [
    { value: 'blue', label: 'أزرق' },
    { value: 'black', label: 'أسود' },
    { value: 'green', label: 'أخضر' },
    { value: 'white', label: 'أبيض' },
    { value: 'orange', label: 'برتقالي' }
  ];
  const fixed = { allow_add: false, allow_remove: false, allow_reorder: false, collapsed: true };
  const KASHIDA = 'التطويل (ـــ) جزء من شكل العنوان، زوّده أو قلّله براحتك.';

  const site = (name, label, fields) => ({ name, label, file: `src/content/site/${name}.json`, format: 'json', fields });

  CMS.init({
    config: {
      load_config_file: false,
      backend: { name: 'github', repo: 'ahmedelsayedshrif-web/ahmed-elsayed-portfolio', branch: 'main' },
      site_url: 'https://ahmedelsayedshrif-web.github.io/',
      display_url: 'https://ahmedelsayedshrif-web.github.io/',
      media_folder: 'src/assets/projects',
      public_folder: '/src/assets/projects',
      collections: [
        {
          name: 'site',
          label: 'محتوى الموقع',
          icon: 'edit_note',
          files: [
            site('general', 'بياناتي والقائمة', [
              { name: 'seo', label: 'عنوان التاب في المتصفح', widget: 'object', fields: [bi('title', 'العنوان')] },
              {
                name: 'profile',
                label: 'بياناتي',
                widget: 'object',
                fields: [
                  bi('name', 'الاسم'),
                  str('nameFull', 'الاسم الكامل بالإنجليزي (في آخر الصفحة)'),
                  bi('role', 'المسمى الوظيفي'),
                  str('phone', 'رقم الموبايل زي ما يظهر', { hint: 'مثال: +20 106 016 1524' }),
                  str('whatsapp', 'رقم الواتساب (أرقام بس بكود الدولة)', { hint: 'مثال: 201060161524', pattern: ['^[0-9]{8,15}$', 'أرقام بس، من غير + أو مسافات'] }),
                  str('email', 'الإيميل'),
                  str('linkedin', 'رابط LinkedIn')
                ]
              },
              {
                name: 'nav',
                label: 'أسماء أزرار القائمة والانتقالات',
                widget: 'object',
                collapsed: true,
                fields: [
                  bi('about', 'زرار: مين أنا'),
                  bi('skills', 'زرار: المهارات'),
                  bi('projects', 'زرار: المشاريع'),
                  bi('contact', 'زرار: تواصل'),
                  bi('home', 'زرار: الرئيسية'),
                  bi('curtainProjects', 'كلمة الانتقال لصفحة المشاريع', 'string', KASHIDA),
                  bi('curtainHome', 'كلمة الانتقال للرئيسية', 'string', KASHIDA),
                  bi('top', 'زرار الرجوع لفوق')
                ]
              }
            ]),
            site('hero', 'أول الصفحة (الصورة والفولدرات والأدوات)', [
              {
                name: 'hero',
                label: 'الواجهة',
                widget: 'object',
                fields: [
                  bi('name1', 'الاسم الأول الكبير', 'string', KASHIDA),
                  bi('name2', 'الاسم التاني الكبير', 'string', KASHIDA),
                  str('brand', 'الاسم اللاتيني جوه الجملة', { hint: 'بيظهر مكان {brand} في جملة التعريف' }),
                  bi('cta', 'زرار المشاريع'),
                  { name: 'portrait', label: 'الصورة الشخصية', widget: 'image', hint: 'صورة بخلفية شفافة (PNG أو WebP)، طولية.' },
                  { name: 'visorGlare', label: 'لمعة النضارة', widget: 'boolean', hint: 'اللمعة مظبوطة على الصورة الحالية بس. اقفلها لو غيّرت الصورة.' }
                ]
              },
              {
                name: 'folders',
                label: 'الفولدرات التلاتة',
                widget: 'list',
                ...fixed,
                summary: '{{title.ar}}',
                fields: [
                  bi('tab', 'الكلمة اللي على لسان الفولدر'),
                  bi('title', 'العنوان'),
                  bi('sub', 'السطر الصغير'),
                  str('href', 'بيفتح إيه', { hint: '#contact للتواصل، #projects للمشاريع، أو رابط كامل يبدأ بـ https://' })
                ]
              },
              {
                name: 'tools',
                label: 'كارت الأدوات',
                widget: 'object',
                fields: [
                  bi('title', 'العنوان'),
                  {
                    name: 'items',
                    label: 'الأدوات',
                    label_singular: 'أداة',
                    widget: 'list',
                    min: 1,
                    max: 6,
                    collapsed: true,
                    summary: '{{name}}',
                    fields: [str('name', 'الاسم'), color('color', 'لون المربع'), glyph()]
                  }
                ]
              }
            ]),
            site('story', 'الأقسام المتحركة (الجملة والمهارات)', [
              bi(
                'statement',
                'جملة التعريف',
                'text',
                'اكتب {icon} مكان كل أيقونة (4 بالظبط)، و{brand} مكان اسمك اللاتيني، وعلامة | لسطر جديد. سيب مسافة قبل وبعد كل علامة.'
              ),
              {
                name: 'pillars',
                label: 'الأربع أيقونات الكبار',
                widget: 'list',
                ...fixed,
                summary: '{{title.ar}}',
                fields: [bi('title', 'العنوان'), bi('text', 'الشرح', 'text')]
              },
              {
                name: 'services',
                label: 'قائمة المهارات (5)',
                widget: 'list',
                ...fixed,
                summary: '{{title.ar}}',
                hint: 'الأول والتالت هما اللي بيكبروا في مشهد "إيه؟ وإزاي".',
                fields: [bi('title', 'الاسم'), bi('sub', 'الوصف'), glyph(), { name: 'tone', label: 'اللون', widget: 'select', options: TONES }]
              },
              {
                name: 'how',
                label: 'مشهد "هنعمل إيه؟ وإزاي"',
                widget: 'object',
                collapsed: true,
                fields: [bi('pre', 'الكلمة الصغيرة فوق'), bi('what', 'الكلمة الكبيرة الأولى', 'string', KASHIDA), bi('and', 'حرف الوصل'), bi('how', 'الكلمة الكبيرة التانية')]
              },
              {
                name: 'why',
                label: 'مشهد "ليه نضيع وقت"',
                widget: 'object',
                collapsed: true,
                fields: [bi('line1', 'السطر الأول', 'string', KASHIDA), bi('line2', 'السطر التاني (بعده علامات الاستفهام)')]
              },
              {
                name: 'talk',
                label: 'مشهد "كلّمني دلوقتي"',
                widget: 'object',
                collapsed: true,
                fields: [
                  bi('a', 'قبل النقطة الخضرا', 'string', KASHIDA),
                  bi('b', 'بعد النقطة الخضرا', 'string', KASHIDA),
                  bi('sub', 'السطر التاني', 'string', 'حط الكلمة اللي بتنوّر أخضر بين نجمتين، مثال: ونحط *النقط* عالحروف.')
                ]
              }
            ]),
            site('contact', 'قسم التواصل والفورم', [
              {
                name: 'contact',
                label: 'التواصل',
                widget: 'object',
                fields: [
                  bi('status', 'سطر الحالة (متاح لـ…)'),
                  bi('title1', 'العنوان: السطر الأول', 'string', KASHIDA),
                  bi('title2', 'العنوان: السطر التاني', 'string', KASHIDA),
                  {
                    name: 'form',
                    label: 'نصوص الفورم',
                    widget: 'object',
                    collapsed: true,
                    fields: [
                      bi('name', 'خانة الاسم'),
                      bi('namePh', 'النص الرمادي في خانة الاسم'),
                      bi('email', 'خانة الإيميل'),
                      bi('idea', 'خانة الرسالة'),
                      bi('ideaPh', 'النص الرمادي في خانة الرسالة'),
                      bi('submit', 'زرار الإرسال'),
                      bi('ready', 'الزرار بعد ما الرسالة تجهز'),
                      bi('send', 'رابط الإرسال على واتساب'),
                      bi('note', 'الملاحظة تحت الفورم'),
                      bi('greeting', 'بداية رسالة الواتساب', 'string', 'بعدها بييجي اسم الزائر وإيميله.')
                    ]
                  }
                ]
              }
            ]),
            site('projects-page', 'صفحة المشاريع (العناوين والأرقام)', [
              {
                name: 'projectsPage',
                label: 'صفحة المشاريع',
                widget: 'object',
                fields: [
                  bi('title', 'العنوان الكبير', 'string', KASHIDA),
                  bi('intro', 'المقدمة', 'text'),
                  {
                    name: 'stats',
                    label: 'الأرقام',
                    label_singular: 'رقم',
                    widget: 'list',
                    max: 4,
                    collapsed: true,
                    summary: '{{value}}{{suffix}} {{label.ar}}',
                    fields: [
                      { name: 'value', label: 'الرقم', widget: 'number', value_type: 'float', hint: 'اكتب 0 عشان يظهر عدد المشاريع تلقائي.' },
                      str('suffix', 'اللي بعد الرقم', { required: false, hint: 'مثال: % أو K+ أو B' }),
                      bi('label', 'الوصف')
                    ]
                  },
                  bi('all', 'زرار الفلتر: الكل'),
                  bi('caseTitle', 'عنوان: دراسات حالة'),
                  bi('moreTitle', 'عنوان: مشاريع تانية'),
                  bi('readMore', 'زرار: قراءة المزيد'),
                  bi('readLess', 'زرار: عرض أقل'),
                  bi('ctaTitle', 'عنوان الدعوة في الآخر', 'string', KASHIDA),
                  bi('ctaText', 'نص الدعوة', 'text'),
                  bi('ctaButton', 'زرار صفحة التواصل')
                ]
              }
            ]),
            site('theme', 'الألوان', [
              {
                name: 'theme',
                label: 'ألوان الموقع',
                widget: 'object',
                fields: [
                  color('ink', 'الإطار الغامق حوالين الصفحة'),
                  color('heroHi', 'خلفية الواجهة: النور ورا الصورة'),
                  color('hero', 'خلفية الواجهة: اللون الأساسي'),
                  color('heroLo', 'خلفية الواجهة: الأطراف'),
                  color('name', 'لون الاسم الكبير'),
                  color('accent', 'اللون الأخضر (الواتساب والنقطة)')
                ]
              }
            ])
          ]
        },
        {
          name: 'projects',
          label: 'المشاريع',
          label_singular: 'مشروع',
          icon: 'folder',
          folder: 'src/content/projects',
          extension: 'json',
          format: 'json',
          create: true,
          delete: true,
          identifier_field: 'title',
          slug: '{{title}}',
          summary: '{{title}} ({{year}})',
          sortable_fields: { fields: ['order', 'year', 'title'], default: { field: 'order', direction: 'ascending' } },
          fields: [
            str('title', 'اسم المشروع (بالإنجليزي)'),
            { name: 'order', label: 'الترتيب', widget: 'number', value_type: 'int', default: 5, hint: 'الرقم الأصغر يظهر الأول.' },
            { name: 'featured', label: 'دراسة حالة (كبير فوق)', widget: 'boolean', default: false, hint: 'لو مقفول، المشروع يظهر ككارت في "مشاريع تانية".' },
            str('year', 'السنة'),
            {
              name: 'cats',
              label: 'الفلتر',
              widget: 'select',
              multiple: true,
              min: 1,
              options: ['Power BI', 'SQL', 'Excel', 'Tableau', 'Python']
            },
            { name: 'tools', label: 'الأدوات المستخدمة', label_singular: 'أداة', widget: 'list', field: str('tool', 'أداة') },
            bi('tag', 'التصنيف (السطر الصغير)'),
            bi('summary', 'الوصف', 'text'),
            {
              name: 'kpis',
              label: 'الأرقام المهمة',
              label_singular: 'رقم',
              widget: 'list',
              max: 3,
              collapsed: true,
              summary: '{{v}} {{l.ar}}',
              fields: [str('v', 'الرقم', { hint: 'مثال: 14.10B أو 60%' }), bi('l', 'الوصف')]
            },
            {
              name: 'insights',
              label: 'أهم النتائج',
              label_singular: 'نتيجة',
              widget: 'list',
              collapsed: true,
              summary: '{{ar}}',
              fields: [
                { name: 'ar', label: 'عربي', widget: 'text' },
                { name: 'en', label: 'English', widget: 'text', required: false }
              ]
            },
            {
              name: 'images',
              label: 'الصور',
              label_singular: 'صورة',
              widget: 'list',
              min: 1,
              hint: 'أول صورة هي الغلاف.',
              field: { name: 'image', label: 'صورة', widget: 'image' }
            }
          ]
        }
      ]
    }
  });
})();
