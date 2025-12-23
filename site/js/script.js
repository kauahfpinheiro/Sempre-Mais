// ===== Show Menu =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// ===== Remove Menu Mobile =====
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

// ===== Change Background Header =====
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
}
window.addEventListener('scroll', scrollHeader);

// ===== Active Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ===== Show Scroll Up Button =====
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollUp);

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (name && email && phone && message) {
            // Show success message
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
        } else {
            showMessage('Por favor, preencha todos os campos.', 'error');
        }
    });
}

// ===== Show Message Function =====
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideInFromRight 0.5s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;

    if (type === 'success') {
        messageDiv.style.backgroundColor = '#2ecc71';
    } else {
        messageDiv.style.backgroundColor = '#e74c3c';
    }

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 3000);
}

// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.about__card, .product__card, .offer__card, .contact__card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Dynamic Year in Footer =====
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer__bottom p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Sempre Mais. Todos os direitos reservados.`;
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Site Sempre Mais carregado com sucesso!');
    
    // Add smooth loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Social Links (to be populated later) =====
function addSocialLinks(links) {
    const socialContainer = document.getElementById('social-links');
    if (socialContainer && links) {
        socialContainer.innerHTML = '';
        
        const socialIcons = {
            facebook: 'fab fa-facebook-f',
            instagram: 'fab fa-instagram',
            whatsapp: 'fab fa-whatsapp',
            twitter: 'fab fa-twitter',
            youtube: 'fab fa-youtube',
            linkedin: 'fab fa-linkedin-in',
            tiktok: 'fab fa-tiktok'
        };

        Object.entries(links).forEach(([platform, url]) => {
            if (url && socialIcons[platform]) {
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = 'footer__social-link';
                link.innerHTML = `<i class="${socialIcons[platform]}"></i>`;
                socialContainer.appendChild(link);
            }
        });
    }
}

// Export function for later use
window.addSocialLinks = addSocialLinks;
    
// ===== Carousel Functionality =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel__slide');
const indicators = document.querySelectorAll('.carousel__indicator');
const prevButton = document.getElementById('carousel-prev');
const nextButton = document.getElementById('carousel-next');
let autoSlideInterval;

function showSlide(index) {
    // Loop do carrossel
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    // Remove active de todos os slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Adiciona active ao slide e indicador atual
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Event listeners para botões
if (nextButton) {
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
}

if (prevButton) {
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
}

// Event listeners para indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        resetAutoSlide();
    });
});

// Auto slide a cada 5 segundos
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Pausar auto slide ao passar o mouse
const carouselWrapper = document.querySelector('.carousel__wrapper');
if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    carouselWrapper.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}

// Iniciar auto slide
if (slides.length > 0) {
    startAutoSlide();
}

// Suporte para swipe em touch devices
let touchStartX = 0;
let touchEndX = 0;

if (carouselWrapper) {
    carouselWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
        resetAutoSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
        resetAutoSlide();
    }
}
