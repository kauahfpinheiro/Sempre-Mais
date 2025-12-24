// ===== Menu Mobile =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        navToggle.setAttribute('aria-expanded', 'true');
    });
}

// Menu hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        navToggle.setAttribute('aria-expanded', 'false');
    });
}

// ===== Remove Menu Mobile =====
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
    if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
    }
}
navLink.forEach(n => n.addEventListener('click', linkAction));

// ===== Change Background Header =====
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
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

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const nameInput = contactForm.querySelector('#contact-name');
        const emailInput = contactForm.querySelector('#contact-email');
        const phoneInput = contactForm.querySelector('#contact-phone');
        const subjectInput = contactForm.querySelector('#contact-subject');
        const messageInput = contactForm.querySelector('#contact-message');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        // Validation
        if (!name) {
            showMessage('Por favor, insira seu nome.', 'error');
            nameInput.focus();
            return;
        }

        if (!email || !isValidEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            emailInput.focus();
            return;
        }

        if (!phone || phone.length < 10) {
            showMessage('Por favor, insira um telefone válido.', 'error');
            phoneInput.focus();
            return;
        }

        if (!subject || subject.length < 3) {
            showMessage('Por favor, insira um assunto.', 'error');
            subjectInput.focus();
            return;
        }

        if (!message || message.length < 10) {
            showMessage('A mensagem deve ter pelo menos 10 caracteres.', 'error');
            messageInput.focus();
            return;
        }

        // Abre o Gmail Compose com os campos preenchidos para o usuário confirmar e enviar
        const corpo = `${message}\n\n---\nNome: ${name}\nEmail: ${email}\nTelefone: ${phone}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contato@sempremais.com.br&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(corpo)}`;
        window.open(gmailUrl, '_blank');
        showMessage('Abrindo o Gmail para você confirmar o envio...', 'success');
    });
}

// ===== Email Validation =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== Show Message Function =====
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.setAttribute('role', 'alert');
    messageDiv.setAttribute('aria-live', 'polite');
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
        max-width: 90%;
    `;

    if (type === 'success') {
        messageDiv.style.backgroundColor = '#2ecc71';
    } else if (type === 'error') {
        messageDiv.style.backgroundColor = '#e74c3c';
    }

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                document.body.removeChild(messageDiv);
            }
        }, 500);
    }, 4000);
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

