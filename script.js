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

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.glass-card, .section-title');
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
            // When hero title is done, start subtitle
            if (heroSubtitle) {
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
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/Hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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

console.log('Portfolio website loaded successfully! 🚀');
