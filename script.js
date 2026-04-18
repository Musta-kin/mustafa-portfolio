// ==================== LANGUAGE SWITCHER ====================
let currentLang = 'en'; // 'en' or 'ar'

const langToggle = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');

// Function to update all text elements based on selected language
function updateLanguage(lang) {
  // Update all elements with data-en and data-ar attributes
  const elementsWithData = document.querySelectorAll('[data-en][data-ar]');
  
  elementsWithData.forEach(element => {
    if (lang === 'en') {
      element.textContent = element.getAttribute('data-en');
    } else {
      element.textContent = element.getAttribute('data-ar');
    }
  });
  
  // Update input placeholders
  const inputsWithPlaceholder = document.querySelectorAll('[data-placeholder-en][data-placeholder-ar]');
  inputsWithPlaceholder.forEach(input => {
    if (lang === 'en') {
      input.placeholder = input.getAttribute('data-placeholder-en');
    } else {
      input.placeholder = input.getAttribute('data-placeholder-ar');
    }
  });
  
  // Update select options
  const selectOptions = document.querySelectorAll('#service option');
  selectOptions.forEach(option => {
    if (lang === 'en') {
      option.textContent = option.getAttribute('data-en') || option.textContent;
    } else {
      option.textContent = option.getAttribute('data-ar') || option.textContent;
    }
  });
  
  // Update lang attribute on html
  document.documentElement.lang = lang === 'en' ? 'en' : 'ar';
  
  // Add RTL class for Arabic
  if (lang === 'ar') {
    document.body.classList.add('rtl');
    langText.textContent = '🇬🇧 English';
  } else {
    document.body.classList.remove('rtl');
    langText.textContent = '🇦🇪 عربي';
  }
  
  // Store language preference
  localStorage.setItem('selected-lang', lang);
}

// Load saved language preference
const savedLang = localStorage.getItem('selected-lang');
if (savedLang) {
  currentLang = savedLang;
  updateLanguage(currentLang);
}

// Language toggle event
if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    updateLanguage(currentLang);
  });
}

// ==================== MOBILE NAVIGATION ====================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('active');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
}

// Close menu when clicking a link
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// ==================== ACTIVE LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.add('active-link');
    } else {
      document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);

// ==================== SCROLL HEADER ====================
function scrollHeader() {
  const header = document.getElementById('header');
  const isLight = document.body.classList.contains('light-theme');
  if (window.scrollY >= 100) {
    header.style.background = isLight ? 'rgba(248, 246, 243, 0.98)' : 'rgba(18, 24, 38, 0.98)';
  } else {
    header.style.background = isLight ? 'rgba(248, 246, 243, 0.95)' : 'rgba(18, 24, 38, 0.95)';
  }
}

window.addEventListener('scroll', scrollHeader);

// ==================== DARK / LIGHT THEME ====================
const themeButton = document.getElementById('theme-toggle');
const lightTheme = 'light-theme';
const iconTheme = 'uil-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

if (selectedTheme) {
  if (selectedTheme === 'light') {
    document.body.classList.add(lightTheme);
    themeButton.classList.add(iconTheme);
  } else {
    document.body.classList.remove(lightTheme);
    themeButton.classList.remove(iconTheme);
  }
}

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(lightTheme);
    themeButton.classList.toggle(iconTheme);
    
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
    scrollHeader();
  });
}

// ==================== SCROLL UP ====================
function scrollUp() {
  const scrollUpBtn = document.getElementById('scroll-up');
  if (window.scrollY >= 560) {
    scrollUpBtn.classList.add('show-scroll');
  } else {
    scrollUpBtn.classList.remove('show-scroll');
  }
}

window.addEventListener('scroll', scrollUp);

// ==================== FAQ ACCORDION ====================
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    document.querySelectorAll('.faq-item').forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
      }
    });
    item.classList.toggle('active');
  });
});

// ==================== CONTACT FORM (Lead Capture) ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !phone || !message) {
      const errorMsg = currentLang === 'en' ? 'Please fill in all required fields.' : 'الرجاء ملء جميع الحقول المطلوبة.';
      alert(errorMsg);
      return;
    }
    
    if (!email.includes('@')) {
      const errorMsg = currentLang === 'en' ? 'Please enter a valid email address.' : 'الرجاء إدخال بريد إلكتروني صحيح.';
      alert(errorMsg);
      return;
    }
    
    const subject = `New Lead: ${name} - ${service || 'General Inquiry'}`;
    const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service || 'Not specified'}

Message:
${message}
    `;
    
    window.location.href = `mailto:kingmusta67@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    const successMsg = currentLang === 'en' 
      ? 'Thank you! Your email client will open. Please send the email to complete your inquiry.\n\nWe will respond within 24 hours.'
      : 'شكراً لك! سيتم فتح بريدك الإلكتروني. الرجاء إرسال البريد لإكمال استفسارك.\n\nسنرد خلال 24 ساعة.';
    
    alert(successMsg);
    contactForm.reset();
  });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==================== REVEAL ON SCROLL ====================
const revealElements = document.querySelectorAll('.service-card, .gov-card, .step-card, .project-card, .faq-item');

const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

revealElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ==================== WHATSAPP FLOATING BUTTON ====================
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
  whatsappBtn.addEventListener('mouseenter', () => {
    whatsappBtn.style.transform = 'scale(1.1)';
  });
  whatsappBtn.addEventListener('mouseleave', () => {
    whatsappBtn.style.transform = 'scale(1)';
  });
}

console.log('Musta Tech Solutions — Bilingual Website Loaded Successfully ✅');
console.log('EN/AR Language Switcher Active 🇬🇧🇦🇪');