/* ============================================
   GAURAV KUMAR TRIPATHI — PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. ELEMENT SCROLL REVEAL ───
  const revealEls = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // ─── 2. SECTION TRANSITION ANIMATIONS ON SCROLL ───
  const sectionEls = document.querySelectorAll(
    '.section-wipe, .section-slide-blur, .section-curtain, .section-zoom-blur, .section-footer-rise'
  );

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  sectionEls.forEach((el) => sectionObserver.observe(el));

  // ─── 3. SECTION DIVIDER LINE ANIMATION ───
  const dividers = document.querySelectorAll('.section-divider');

  const dividerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          dividerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  dividers.forEach((el) => dividerObserver.observe(el));

  // ─── 4. MOBILE HAMBURGER MENU TOGGLE ───
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when any link is clicked
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when tapping outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ─── 5. ACTIVE NAV LINK HIGHLIGHTING ON SCROLL ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.mobile-menu a:not(.mobile-cta)');

  function setActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
        mobileLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        setActiveNav();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // ─── 6. ANIMATED ICON CLICK TOGGLE (LOCATION, EMAIL, PHONE, SOCIAL) ───
  // Requirements: Clicking icon toggles:
  // - Icon color: White <-> Blue
  // - Background color: Blue <-> White
  // - Border color: White <-> Blue
  
  // Contact Info icons (Location, Email, Phone)
  const contactIcons = document.querySelectorAll('.contact-icon.icon-btn');
  contactIcons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('toggled');
    });
  });

  // Social icons (Facebook, Website, Instagram, LinkedIn in Contact & Footer)
  const socialIcons = document.querySelectorAll('.icon-toggleable');
  socialIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      // Toggle class for instant color & border swap animation
      icon.classList.toggle('toggled');
    });
  });

  // ─── 7. HERO EYEBROW TYPING EFFECT ───
  const eyebrow = document.querySelector('.eyebrow');
  if (eyebrow) {
    const text = eyebrow.textContent;
    eyebrow.textContent = '';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        eyebrow.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, 120);
      }
    }
    setTimeout(typeChar, 400);
  }

  // ─── 8. CONTACT FORM SUBMISSION ───
  const contactForm = document.querySelector('.contact-right form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalContent = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Message Sent! &#10004;';
        submitBtn.style.backgroundColor = '#28a745';
        submitBtn.style.borderColor = '#28a745';

        let statusMsg = contactForm.querySelector('.form-status');
        if (!statusMsg) {
          statusMsg = document.createElement('div');
          statusMsg.className = 'form-status';
          statusMsg.style.cssText = 'margin-top: 15px; padding: 12px; border-radius: 8px; background: #e6f4ea; color: #137333; font-weight: 500; font-size: 0.9rem; text-align: center; border: 1px solid #ceead6;';
          contactForm.appendChild(statusMsg);
        }
        statusMsg.textContent = 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.';

        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalContent;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.borderColor = '';
          if (statusMsg) statusMsg.remove();
        }, 5000);
      }, 800);
    });
  }

});
