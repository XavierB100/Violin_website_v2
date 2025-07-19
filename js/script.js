document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS (replace with your user ID)
  emailjs.init('YOUR_EMAILJS_USER_ID');

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.setAttribute('aria-expanded', navLinks.classList.contains('active'));
  });

  // Close mobile menu when clicking on links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formStatus = document.getElementById('form-status');
      
      formStatus.textContent = 'Sending...';
      formStatus.style.color = '#666';
      
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
          formStatus.textContent = 'Message sent successfully!';
          formStatus.style.color = 'green';
          this.reset();
        }, (error) => {
          formStatus.textContent = 'Error sending message. Please try again.';
          formStatus.style.color = 'red';
          console.error('EmailJS Error:', error);
        });
    });
  }

  // Form validation
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (!this.checkValidity()) {
        this.style.borderColor = 'red';
      } else {
        this.style.borderColor = '#ddd';
      }
    });
  });

  // Animation on scroll
  const animateSections = function() {
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight - 100) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  };

  // Initialize section animations
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s, transform 0.6s';
  });

  // Run once on load
  animateSections();
  
  // Then run on scroll
  window.addEventListener('scroll', animateSections);
});
