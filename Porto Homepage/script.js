document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollBtns = document.querySelectorAll('.scroll-btn');

    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            smoothScroll(href);
        });
    });

    scrollBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href') || '#projects'; 
            smoothScroll(href);
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar && window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (navbar) {
            navbar.classList.remove('scrolled');
        }
    });

 
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: '#ffffff', 
                    opacity: 0.4, 
                    width: 1 
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { 
                    onhover: { enable: true, mode: 'repulse' }, 
                    onclick: { enable: true, mode: 'push' }, 
                    resize: true 
                },
                modes: { 
                    repulse: { distance: 100, duration: 0.4 }, 
                    push: { particles_nb: 4 } 
                }
            },
            retina_detect: true
        });
    } else {
        console.warn('Particles.js not loaded. Background animation skipped.');
    }

    const carousel = document.getElementById('projectsCarousel');
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000, 
            wrap: true
        });

        carousel.addEventListener('mouseenter', () => {
            carouselInstance.pause();
        });
        carousel.addEventListener('mouseleave', () => {
            carouselInstance.cycle();
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' 
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('animate');
                if (element.classList.contains('fade-in')) {
                    element.classList.add('fade-in');
                }
                if (element.classList.contains('slide-in-left')) {
                    element.classList.add('slide-in-left');
                }
                if (element.classList.contains('slide-in-right')) {
                    element.classList.add('slide-in-right');
                }
                if (element.classList.contains('slide-in-up')) {
                    element.classList.add('slide-in-up');
                }
                observer.unobserve(element); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            formFeedback.innerHTML = '';
            [nameInput, emailInput, messageInput].forEach(input => {
                if (input) {
                    input.classList.remove('is-invalid', 'is-valid');
                }
            });

            let isValid = true;

            if (!name) {
                if (nameInput) nameInput.classList.add('is-invalid');
                isValid = false;
            } else {
                if (nameInput) nameInput.classList.add('is-valid');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                if (emailInput) emailInput.classList.add('is-invalid');
                isValid = false;
            } else {
                if (emailInput) emailInput.classList.add('is-valid');
            }

            if (!message) {
                if (messageInput) messageInput.classList.add('is-invalid');
                isValid = false;
            } else {
                if (messageInput) messageInput.classList.add('is-valid');
            }

            if (isValid) {
                formFeedback.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        Terima kasih, ${name}! Pesan Anda telah dikirim. Saya akan menghubungi Anda segera via email.
                    </div>
                `;
                contactForm.reset();
                [nameInput, emailInput, messageInput].forEach(input => {
                    if (input) {
                        input.classList.remove('is-invalid', 'is-valid');
                    }
                });
            } else {
                formFeedback.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Mohon periksa input Anda dan coba lagi. Pastikan semua field terisi dengan benar.
                    </div>
                `;
            }

            setTimeout(() => {
                formFeedback.innerHTML = '';
            }, 5000);
        });
    } else {
        console.warn('Contact form elements not found.');
    }
});