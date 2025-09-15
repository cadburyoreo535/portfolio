// Auto-scroll to home on page load/refresh
window.addEventListener('load', () => {
    // Scroll to top immediately without animation
    window.scrollTo(0, 0);
    
    // Then smooth scroll to home section after a brief delay
    setTimeout(() => {
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            homeSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 100);
});

// Smooth Scrolling for Navigation Links
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

// Scroll Animation Observer with fade-in and fade-out
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is entering viewport - fade in
            entry.target.classList.add('animate');
            entry.target.classList.remove('fade-out');
        } else {
            // Element is leaving viewport - fade out
            entry.target.classList.remove('animate');
            entry.target.classList.add('fade-out');
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.glass-card, .section-title, .slide-up, .slide-left, .slide-right, .zoom-in, .stagger-item'
    );
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Parallax Effect for Background Orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax1 = document.querySelector('.orb-1');
    const parallax2 = document.querySelector('.orb-2');
    const parallax3 = document.querySelector('.orb-3');
    
    if (parallax1) parallax1.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
    if (parallax2) parallax2.style.transform = `translate(${scrolled * -0.1}px, ${scrolled * 0.05}px)`;
    if (parallax3) parallax3.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * -0.1}px)`;
});

// Synchronized typing animations
let animationRunning = false;

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100, onComplete = null) {
    let i = 0;
    const nameStart = text.indexOf('Christian Paulo Pillado');
    const beforeName = text.substring(0, nameStart);
    const name = 'Christian Paulo Pillado';
    const afterName = text.substring(nameStart + name.length);
    
    function type() {
        if (i < text.length) {
            if (i < nameStart) {
                // Before the name - regular text
                element.innerHTML = beforeName.substring(0, i + 1);
            } else if (i < nameStart + name.length) {
                // During the name - show with highlight class from first character
                const typedName = name.substring(0, i - nameStart + 1);
                element.innerHTML = beforeName + '<span class="highlight">' + typedName + '</span>';
            } else {
                // After the name - add remaining text
                const typedAfter = afterName.substring(0, i - nameStart - name.length + 1);
                element.innerHTML = beforeName + '<span class="highlight">' + name + '</span>' + typedAfter;
            }
            i++;
            setTimeout(type, speed);
        } else {
            // Animation complete
            if (onComplete) onComplete();
        }
    }
    
    // Clear and start animation
    element.innerHTML = '';
    type();
}

// Simple typing animation for subtitle
function simpleTypeWriter(element, text, speed = 80, onComplete = null) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            i++;
            setTimeout(type, speed);
        } else {
            // Animation complete
            if (onComplete) onComplete();
        }
    }
    
    // Clear and start animation
    element.innerHTML = '';
    type();
}

// Synchronized animation controller
function startSynchronizedAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (!heroTitle || !heroSubtitle || animationRunning) return;
    
    animationRunning = true;
    let completedAnimations = 0;
    
    // Reset subtitle visibility at the start of each cycle
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.visibility = 'hidden';
    
    function onAnimationComplete() {
        completedAnimations++;
        if (completedAnimations === 2) {
            // Both animations completed, pause and restart
            setTimeout(() => {
                animationRunning = false;
                startSynchronizedAnimations();
            }, 2000);
        }
    }
    
    // Start with hero title first
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80, () => {
            // When hero title is done, show and start subtitle
            if (heroSubtitle) {
                // Make subtitle visible with a smooth transition
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.visibility = 'visible';
                heroSubtitle.style.transition = 'opacity 0.3s ease-in';
                
                const subtitleText = heroSubtitle.textContent;
                simpleTypeWriter(heroSubtitle, subtitleText, 60, onAnimationComplete);
            }
            onAnimationComplete(); // Mark hero title as complete
        });
    }
}

// Initialize synchronized typing animations when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        startSynchronizedAnimations();
    }, 500);
});

// Project Card Tilt Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    box-shadow: 0 8px 25px rgba(59, 79, 122, 0.4);
    transform: translateY(20px) scale(0.8);
    font-size: 1.2rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    animation: pulse 2s infinite;
`;

document.body.appendChild(scrollToTopBtn);

// Show/Hide scroll to top button when in contact section
window.addEventListener('scroll', () => {
    const contactSection = document.querySelector('#contact');
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    if (contactSection) {
        const contactTop = contactSection.offsetTop;
        const contactBottom = contactTop + contactSection.offsetHeight;
        
        // Show button when user is in the contact section
        if (scrollPosition + windowHeight >= contactTop && scrollPosition < contactBottom) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
            scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
            scrollToTopBtn.style.transform = 'translateY(20px) scale(0.8)';
        }
    }
});

// Scroll to top functionality with enhanced animation
scrollToTopBtn.addEventListener('click', () => {
    // Add a loading/clicked effect
    scrollToTopBtn.style.transform = 'translateY(0) scale(0.9)';
    
    // Scroll to the hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Reset button transform after a short delay
    setTimeout(() => {
        scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
    }, 200);
});

// Cursor Trail Effect
const cursor = document.createElement('div');
cursor.className = 'cursor-trail';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, rgba(59, 79, 122, 0.8), transparent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
`;

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Lazy Loading for Images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Performance Optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
const throttledScroll = throttle(() => {
    // Your scroll-heavy code here
}, 16); // 60fps

window.addEventListener('scroll', throttledScroll);

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Animate hero section
    const heroCard = document.querySelector('.hero-card');
    const profileCard = document.querySelector('.profile-card');
    
    if (heroCard) heroCard.classList.add('fade-in');
    if (profileCard) {
        setTimeout(() => {
            profileCard.classList.add('fade-in');
        }, 300);
    }
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Enhanced Animation System
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('skill-item')) {
                const skillBar = entry.target.querySelector('.skill-bar');
                const percentage = entry.target.getAttribute('data-skill');
                if (skillBar && percentage) {
                    skillBar.style.setProperty('--skill-percentage', percentage + '%');
                    setTimeout(() => {
                        skillBar.style.width = percentage + '%';
                    }, 200);
                }
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.slide-up, .slide-left, .slide-right, .zoom-in, .stagger-item, .animate-on-scroll'
    );
    
    animatedElements.forEach(el => {
        enhancedObserver.observe(el);
    });
});

// Particle System
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles-container');
        this.particles = [];
        this.maxParticles = 50;
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
        this.handleMouseInteraction();
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() < 0.3 ? 'small' : Math.random() < 0.7 ? 'medium' : 'large';
        const isAccent = Math.random() < 0.3;
        
        particle.classList.add(size);
        if (isAccent) particle.classList.add('accent');
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        this.container.appendChild(particle);
        this.particles.push(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                const index = this.particles.indexOf(particle);
                if (index > -1) {
                    this.particles.splice(index, 1);
                }
            }
        }, 8000);
    }

    animate() {
        // Continuously create new particles
        setInterval(() => {
            if (this.particles.length < this.maxParticles) {
                this.createParticle();
            }
        }, 300);
    }

    handleMouseInteraction() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Create particles on mouse movement (occasionally)
            if (Math.random() < 0.1) {
                this.createMouseParticle(mouseX, mouseY);
            }
        });
    }

    createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle accent small';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.position = 'fixed';
        particle.style.pointerEvents = 'none';
        particle.style.animation = 'none';
        particle.style.opacity = '0.8';
        
        document.body.appendChild(particle);
        
        // Animate the particle
        let opacity = 0.8;
        let scale = 1;
        const animation = setInterval(() => {
            opacity -= 0.02;
            scale += 0.02;
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;
            
            if (opacity <= 0) {
                clearInterval(animation);
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }
        }, 16);
    }
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});

// Smooth scroll behavior enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

console.log('Portfolio website loaded successfully! 🚀');
