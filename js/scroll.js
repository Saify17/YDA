// Scroll Animation Handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Intersection Observer with custom options
    const observerOptions = {
        threshold: [0.1, 0.5], // Trigger at 10% and 50% visibility
        rootMargin: '0px 0px -50px 0px'
    };
    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Common animation elements across all pages
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-up, .slide-in-left, .slide-in-right, .scale-up'
    );

    // Add basic animations
    animatedElements.forEach(el => observer.observe(el));

    // Page-specific animations
    function initPageSpecificAnimations() {
        // joinAsAmbassdor.html animations
        const ambassadorElements = document.querySelectorAll(
            '.team-section .team-heading, ' +
            '.partner-section .partner-subtitle, ' +
            '.partner-section .partner-list li'
        );
        ambassadorElements.forEach((el, index) => {
            observer.observe(el);
            // Add staggered delays to list items
            if (el.tagName.toLowerCase() === 'li') {
                el.style.transitionDelay = `${index * 0.1}s`;
            }
        });

        // joinAsPartner.html animations
        const partnerElements = document.querySelectorAll(
            '.partner-section .partner-title, ' +
            '.partner-section .benefit-item'
        );
        partnerElements.forEach((el, index) => {
            observer.observe(el);
            if (el.classList.contains('benefit-item')) {
                el.style.transitionDelay = `${index * 0.1}s`;
            }
        });

        // upcoming-events.html animations
        const eventElements = document.querySelectorAll(
            '.poster-section .poster-img'
        );
        eventElements.forEach(el => observer.observe(el));
    }

    // Initialize page-specific animations
    initPageSpecificAnimations();
    
    // Home page specific animations
    function initHomePageAnimations() {
        // About section animations
        const aboutElements = document.querySelectorAll(
            '.about-section .section-title, ' +
            '.about-section .about-text p, ' +
            '.about-section .image-grid img, ' +
            '.about-section .section-title-yt'
        );
        
        aboutElements.forEach((el, index) => {
            observer.observe(el);
            if (el.tagName.toLowerCase() === 'p') {
                el.style.transitionDelay = `${index * 0.05}s`; // Faster delay between paragraphs
            }
            if (el.tagName.toLowerCase() === 'img') {
                el.style.transitionDelay = `${index * 0.08}s`; // Faster delay between images
            }
        });

        // Mission section animations
        const missionElements = document.querySelectorAll(
            '.organization-c, .font-icon, .heading-underline'
        );
        missionElements.forEach(el => observer.observe(el));

        // Event cards animations
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach((card, index) => {
            observer.observe(card);
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        // Partner cards animations (already handled in HTML)
    }

    // Initialize home page animations if elements exist
    if (document.querySelector('.about-section') || 
        document.querySelector('.organization-c') || 
        document.querySelector('.event-card')) {
        initHomePageAnimations();
    }

    // Enhance super-button interactions
    const superButtons = document.querySelectorAll('.super-button');
    superButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
});