// Pure form validation function
function validateForm({ name, email, subject, message }) {
  const errors = {};
  if (!name || !name.trim()) errors.name = 'Name is required';
  if (!email || !email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please enter a valid email address';
  }
  if (!subject || !subject.trim()) errors.subject = 'Subject is required';
  if (!message || !message.trim()) errors.message = 'Message is required';
  return { valid: Object.keys(errors).length === 0, errors };
}

// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('nav.navbar');

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('nav-open');
});

// Close menu when a nav link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('nav-open');
  });
});

// CTA smooth-scroll via event delegation
document.addEventListener('click', (e) => {
  const target = e.target.dataset.target;
  if (!target) return;
  const el = document.getElementById(target);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) {
  galleryGrid.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img || !img.src) return;
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
}

const lightboxClose = document.querySelector('.lightbox-close');
if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  });
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    }
  });
}

// Fade-in animation via IntersectionObserver
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Gallery image error fallback
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('error', () => {
    img.src = 'https://placehold.co/400x300?text=Image+Not+Found';
  });
});

// Contact form submit handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Remove existing error states
    contactForm.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    contactForm.querySelectorAll('.error-msg').forEach(el => el.remove());

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const result = validateForm({ name, email, subject, message });

    if (!result.valid) {
      Object.entries(result.errors).forEach(([field, msg]) => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (!input) return;
        input.classList.add('error');
        const span = document.createElement('span');
        span.className = 'error-msg';
        span.textContent = msg;
        input.insertAdjacentElement('afterend', span);
      });
    } else {
      contactForm.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    }
  });
}
