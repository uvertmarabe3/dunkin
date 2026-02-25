/**
 * DUNKIN' — Bootstrap + custom (design unchanged)
 * Collapse sync for toggler icon, scroll effects, form UX
 */

(function() {
    'use strict';

    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navbarCollapse = document.getElementById('navbarNav');
    const contactForm = document.querySelector('.contact-form');
    const preloader = document.getElementById('preloader');

    // ----- Hide preloader once page is fully loaded -----
    window.addEventListener('load', function() {
        if (preloader) {
            preloader.classList.add('preloader--hidden');
        }
    });

    // ----- Bootstrap collapse: sync .is-active on our toggler (hamburger → X) -----
    if (navToggle && navbarCollapse) {
        navbarCollapse.addEventListener('show.bs.collapse', function() {
            navToggle.classList.add('is-active');
        });
        navbarCollapse.addEventListener('hide.bs.collapse', function() {
            navToggle.classList.remove('is-active');
        });
        navbarCollapse.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                if (typeof bootstrap !== 'undefined') {
                    var coll = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (coll) coll.hide();
                }
            });
        });
    }

    // ----- Header scroll (add background on scroll)
    let lastScroll = 0;

    function onScroll() {
        const scroll = window.scrollY;
        if (scroll > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = scroll;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ----- Reveal on scroll (menu cards, sections)
    const revealEls = document.querySelectorAll('.menu-card, .rewards-split, .locations-grid, .gallery-section .container, .contact-form');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function(el) {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // ----- Form submit via fetch (server messages removed, toast used instead)
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            if (contactForm.dataset.submitted === 'true') return;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            fetch('submit.php', {
                    method: 'POST',
                    body: formData
                })
                .then(function(res) {
                    return res.json().catch(function() {
                        return { success: true };
                    });
                })
                .then(function(data) {
                    if (data.success) {
                        contactForm.reset();
                        // Removed any feedback div updates; your toast handles success
                    }
                })
                .catch(function() {
                    // Removed network error messages
                })
                .finally(function() {
                    btn.textContent = 'Send Message';
                    btn.disabled = false;
                });
        });
    }

    // ----- Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ----- Enable Bootstrap tooltips (menu images, etc.)
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(function(tooltipTriggerEl) {
            new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // ----- Parallax-ish effect on hero orb (subtle)
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', function() {
            const sc = window.scrollY;
            const rate = sc * 0.15;
            heroVisual.style.transform = 'translateY(' + Math.min(rate, 80) + 'px)';
        }, { passive: true });
    }
})();