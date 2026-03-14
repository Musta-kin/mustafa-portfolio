// ==================== SCRIPT.JS - COMPLETE FILE ====================

/* ---------- NAV MENU (mobile) ---------- */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

// hide menu after clicking link (mobile)
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
});

/* ---------- ACTIVE LINK ON SCROLL ---------- */
const sections = document.querySelectorAll('section[id]');
function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 80;
    const sectionId = section.getAttribute('id');
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.add('active-link');
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/* ---------- CHANGE HEADER ON SCROLL ---------- */
function scrollHeader() {
  const header = document.getElementById('header');
  if (window.scrollY >= 100) header.classList.add('scroll-header');
  else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* ---------- SHOW SCROLL UP ---------- */
function scrollUp() {
  const scrollUpBtn = document.getElementById('scroll-up');
  if (window.scrollY >= 560) scrollUpBtn.classList.add('show-scroll');
  else scrollUpBtn.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/* ========== DARK / LIGHT THEME ========== */
const themeButton = document.getElementById('theme-button');
const lightTheme = 'light-theme';
const iconTheme = 'uil-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Function to get current theme
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// Apply saved theme on page load
if (selectedTheme) {
  // If saved theme is light, add light class to body
  if (selectedTheme === 'light') {
    document.body.classList.add(lightTheme);
  } else {
    document.body.classList.remove(lightTheme);
  }
  
  // Set the correct icon
  if (selectedIcon === 'uil-moon') {
    themeButton.classList.add(iconTheme);
  } else {
    themeButton.classList.remove(iconTheme);
  }
}

// Toggle theme when button is clicked
if (themeButton) {
  themeButton.addEventListener('click', () => {
    // Toggle light theme class
    document.body.classList.toggle(lightTheme);
    
    // Toggle icon between moon and sun
    themeButton.classList.toggle(iconTheme);
    
    // Save theme and icon to localStorage
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
}

/* ========== MAILTO FORM - WORKS LOCALLY ========== */
function sendViaMailto() {
  // Get form elements
  const name = document.getElementById('nameInput')?.value;
  const email = document.getElementById('emailInput')?.value;
  const message = document.getElementById('messageInput')?.value;
  
  if (!name || !email || !message) {
    alert('Please fill in all fields');
    return false;
  }
  
  const subject = encodeURIComponent('Contact from Portfolio - ' + name);
  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Email: ${email}\n\n` +
    `Message:\n${message}`
  );
  
  // Open default email client
  window.location.href = `mailto:kingmusta67@gmail.com?subject=${subject}&body=${body}`;
  
  // Show success message
  alert('Your email client will open. Please send the email to complete your message.');
  
  // Reset form
  document.getElementById('contactForm')?.reset();
  
  return false; // Prevent form submission
}

/* ---------- COMMENT SECTION ---------- */
const addCommentBtn = document.getElementById('addCommentBtn');
const commentInput = document.getElementById('commentInput');
const commentList = document.getElementById('commentList');

if (addCommentBtn) {
  addCommentBtn.addEventListener('click', () => {
    const text = commentInput.value.trim();
    if (text) {
      const newComment = document.createElement('div');
      newComment.className = 'comment';
      newComment.textContent = 'Visitor: ' + text;
      commentList.appendChild(newComment);
      commentInput.value = '';
      commentList.scrollTop = commentList.scrollHeight;
    }
  });
  
  // Allow Enter key to post comment
  if (commentInput) {
    commentInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addCommentBtn.click();
      }
    });
  }
}

/* ---------- SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ==================== LIVE CHAT WIDGET ACTIVATION ==================== */
document.addEventListener('DOMContentLoaded', function() {
  // Get all chat elements
  const chatWidget = document.getElementById('chatWidget');
  const chatBox = document.getElementById('chatBox');
  const chatClose = document.getElementById('chatClose');
  const chatSend = document.getElementById('chatSend');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.querySelector('.chat-body');
  
  // Your WhatsApp number for direct contact
  const WHATSAPP_NUMBER = '971589431918';
  
  // Exit if elements don't exist
  if (!chatWidget || !chatBox) return;
  
  // ===== OPEN CHAT =====
  chatWidget.addEventListener('click', function(e) {
    e.stopPropagation();
    chatBox.style.display = 'flex';
    chatWidget.style.display = 'none';
    // Focus on input field
    setTimeout(() => chatInput?.focus(), 100);
  });
  
  // ===== CLOSE CHAT =====
  if (chatClose) {
    chatClose.addEventListener('click', function(e) {
      e.stopPropagation();
      chatBox.style.display = 'none';
      chatWidget.style.display = 'flex';
    });
  }
  
  // ===== SEND MESSAGE FUNCTION =====
  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Display user message in chat
    displayUserMessage(message);
    
    // Clear input
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate response after 1.5 seconds
    setTimeout(() => {
      removeTypingIndicator();
      displayBotResponse(message);
    }, 1500);
  }
  
  // Display user message
  function displayUserMessage(message) {
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message user-message';
    userDiv.textContent = message;
    chatBody.appendChild(userDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  // Show typing indicator
  function showTypingIndicator() {
    // Remove any existing typing indicator first
    removeTypingIndicator();
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = 'Mustafa is typing<span class="typing-dots"></span>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  // Remove typing indicator
  function removeTypingIndicator() {
    document.getElementById('typingIndicator')?.remove();
  }
  
  // Display bot response with WhatsApp option
  function displayBotResponse(originalMessage) {
    const responses = [
      "Thanks for reaching out! I'll get back to you within 24 hours.",
      "Got your message! For faster response, you can WhatsApp me directly.",
      "I appreciate your interest. Let me review and respond soon.",
      "Message received! While you wait, check out my GitHub for project examples."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const responseDiv = document.createElement('div');
    responseDiv.className = 'chat-message bot-message';
    
    responseDiv.innerHTML = `
      <div style="margin-bottom: 10px;">${randomResponse}</div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 10px;">
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Mustafa, I just messaged you on your website about: ' + originalMessage)}" 
           target="_blank"
           class="whatsapp-chat-btn">
          <i class="fab fa-whatsapp"></i> Chat on WhatsApp now
        </a>
        <span style="font-size: 11px; color: var(--text-color-light); text-align: center;">
          ⚡ Typically replies within 2 hours
        </span>
      </div>
    `;
    
    chatBody.appendChild(responseDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  // ===== EVENT LISTENERS =====
  if (chatSend) {
    chatSend.addEventListener('click', sendMessage);
  }
  
  if (chatInput) {
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }
  
  // ===== CLOSE WHEN CLICKING OUTSIDE =====
  document.addEventListener('click', function(e) {
    if (chatBox.style.display === 'flex' && 
        !chatBox.contains(e.target) && 
        !chatWidget.contains(e.target)) {
      chatBox.style.display = 'none';
      chatWidget.style.display = 'flex';
    }
  });
  
  // ===== INITIALIZE CHAT STATE =====
  chatBox.style.display = 'none';
  chatWidget.style.display = 'flex';
});