import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define translations directly in code to avoid import issues
const resources = {
  en: {
    common: {
      nav: {
        home: 'Home',
        services: 'Services',
        projects: 'Projects',
        about: 'About',
        contact: 'Contact',
        request: 'Request Service',
      },
      hero: {
        title: 'Code Craft Technology',
        subtitle: 'Building Digital Solutions for Tomorrow',
        description:
          'We create innovative web applications, mobile apps, and digital solutions that drive business growth and enhance user experiences.',
        cta: 'Get Started',
        learnMore: 'Learn More',
      },
      services: {
        title: 'Our Services',
        subtitle: 'Comprehensive digital solutions tailored to your needs',
        webDevelopment: 'Web Development',
        mobileDevelopment: 'Mobile Development',
        uiUxDesign: 'UI/UX Design',
        consulting: 'Technology Consulting',
        maintenance: 'Maintenance & Support',
      },
      projects: {
        title: 'Our Projects',
        subtitle: 'Showcasing our expertise through real-world solutions',
        viewProject: 'View Project',
        liveDemo: 'Live Demo',
        techStack: 'Tech Stack',
      },
      about: {
        title: 'About Code Craft',
        subtitle: 'Your trusted technology partner',
        description:
          'We are a team of passionate developers and designers dedicated to creating exceptional digital experiences. With years of experience in web and mobile development, we help businesses transform their ideas into reality.',
        mission: 'Our Mission',
        missionText:
          'To empower businesses with cutting-edge technology solutions that drive growth and innovation.',
        vision: 'Our Vision',
        visionText:
          'To be the leading technology partner for businesses seeking digital transformation.',
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Ready to start your next project?',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company',
        message: 'Message',
        send: 'Send Message',
        address: 'Address',
        phoneNumber: 'Phone',
        emailAddress: 'Email',
      },
      request: {
        title: 'Request a Service',
        subtitle: "Tell us about your project and we'll get back to you",
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        company: 'Company Name',
        service: 'Service Needed',
        budget: 'Budget Range',
        deadline: 'Project Deadline',
        description: 'Project Description',
        attachments: 'Attachments',
        submit: 'Submit Request',
        success: "Request submitted successfully! We'll get back to you soon.",
      },
      footer: {
        description: "Building digital solutions for tomorrow's businesses.",
        quickLinks: 'Quick Links',
        services: 'Services',
        contact: 'Contact Info',
        followUs: 'Follow Us',
        rights: 'All rights reserved.',
      },
      admin: {
        dashboard: 'Dashboard',
        services: 'Services',
        projects: 'Projects',
        requests: 'Requests',
        media: 'Media',
        settings: 'Settings',
        users: 'Users',
        logout: 'Logout',
        login: 'Login',
        email: 'Email',
        password: 'Password',
        loginButton: 'Sign In',
        search: 'Search',
      },
    },
  },
  ar: {
    common: {
      nav: {
        home: 'الرئيسية',
        services: 'الخدمات',
        projects: 'المشاريع',
        about: 'من نحن',
        contact: 'اتصل بنا',
        request: 'طلب خدمة',
      },
      hero: {
        title: 'كود كرافت تكنولوجي',
        subtitle: 'بناء الحلول الرقمية للمستقبل',
        description:
          'نحن ننشئ تطبيقات ويب مبتكرة وتطبيقات الهاتف المحمول والحلول الرقمية التي تدفع نمو الأعمال وتعزز تجارب المستخدمين.',
        cta: 'ابدأ الآن',
        learnMore: 'اعرف المزيد',
      },
      services: {
        title: 'خدماتنا',
        subtitle: 'حلول رقمية شاملة مصممة خصيصاً لاحتياجاتك',
        webDevelopment: 'تطوير المواقع',
        mobileDevelopment: 'تطوير التطبيقات',
        uiUxDesign: 'تصميم واجهات المستخدم',
        consulting: 'الاستشارات التقنية',
        maintenance: 'الصيانة والدعم',
      },
      projects: {
        title: 'مشاريعنا',
        subtitle: 'إظهار خبرتنا من خلال الحلول الواقعية',
        viewProject: 'عرض المشروع',
        liveDemo: 'عرض مباشر',
        techStack: 'التقنيات المستخدمة',
      },
      about: {
        title: 'عن كود كرافت',
        subtitle: 'شريكك التقني الموثوق',
        description:
          'نحن فريق من المطورين والمصممين المتحمسين المكرسين لإنشاء تجارب رقمية استثنائية. مع سنوات من الخبرة في تطوير الويب والهاتف المحمول، نساعد الشركات على تحويل أفكارها إلى واقع.',
        mission: 'مهمتنا',
        missionText: 'تمكين الشركات بحلول تقنية متطورة تدفع النمو والابتكار.',
        vision: 'رؤيتنا',
        visionText:
          'أن نكون الشريك التقني الرائد للشركات التي تسعى للتحول الرقمي.',
      },
      contact: {
        title: 'تواصل معنا',
        subtitle: 'مستعد لبدء مشروعك القادم؟',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        company: 'الشركة',
        message: 'الرسالة',
        send: 'إرسال الرسالة',
        address: 'العنوان',
        phoneNumber: 'الهاتف',
        emailAddress: 'البريد الإلكتروني',
      },
      request: {
        title: 'طلب خدمة',
        subtitle: 'أخبرنا عن مشروعك وسنعود إليك',
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        company: 'اسم الشركة',
        service: 'الخدمة المطلوبة',
        budget: 'نطاق الميزانية',
        deadline: 'موعد التسليم',
        description: 'وصف المشروع',
        attachments: 'المرفقات',
        submit: 'إرسال الطلب',
        success: 'تم إرسال الطلب بنجاح! سنعود إليك قريباً.',
      },
      footer: {
        description: 'بناء الحلول الرقمية لشركات الغد.',
        quickLinks: 'روابط سريعة',
        services: 'الخدمات',
        contact: 'معلومات الاتصال',
        followUs: 'تابعنا',
        rights: 'جميع الحقوق محفوظة.',
      },
      admin: {
        dashboard: 'لوحة التحكم',
        services: 'الخدمات',
        projects: 'المشاريع',
        requests: 'الطلبات',
        media: 'الوسائط',
        settings: 'الإعدادات',
        users: 'المستخدمين',
        logout: 'تسجيل الخروج',
        login: 'تسجيل الدخول',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        loginButton: 'دخول',
        search: 'بحث',
      },
    },
  },
};

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
    ns: ['common'],
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
