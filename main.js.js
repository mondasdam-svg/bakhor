// Language Switching
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    function switchLanguage(lang) {
        // Update active button
        langButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.lang-btn[data-lang="${lang}"]`).classList.add('active');
        
        // Show/hide content based on language
        document.querySelectorAll('.lang-content').forEach(element => {
            if (element.getAttribute('data-lang') === lang) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
        
        // Update text direction
        if (lang === 'ar') {
            document.body.setAttribute('dir', 'rtl');
            document.body.style.textAlign = 'right';
        } else {
            document.body.setAttribute('dir', 'ltr');
            document.body.style.textAlign = 'left';
        }
        
        // Save language preference
        localStorage.setItem('preferred-language', lang);
    }
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            switchLanguage(selectedLang);
        });
    });
    
    // Initialize with saved language or Russian
    const savedLang = localStorage.getItem('preferred-language') || 'ru';
    switchLanguage(savedLang);
    
    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + 30); // 30 days from now
        
        const timeRemaining = targetDate - now;
        
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Update countdown display
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Add animation for countdown changes
        if (secondsElement) {
            secondsElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                secondsElement.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
    
    // Fade in animation for elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for fade in
    const elementsToAnimate = document.querySelectorAll('.feature-card, .about-text, .about-image');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Add click event to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentLang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
            let message = '';
            
            if (currentLang === 'ru') {
                message = 'Спасибо за ваш интерес! Вскоре вы будете перенаправлены на страницу заказа.';
            } else if (currentLang === 'en') {
                message = 'Thank you for your interest! You will be redirected to the order page shortly.';
            } else {
                message = 'شكراً لاهتمامك! سيتم توجيهك إلى صفحة الطلب قريباً.';
            }
            
            // Show confirmation message
            showNotification(message);
            
            // Simulate order process
            simulateOrderProcess();
        });
    });
    
    // Notification function
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--secondary);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideDown 0.3s ease;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 15px;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Add close functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Simulate order process
    function simulateOrderProcess() {
        // Add loading state to buttons
        ctaButtons.forEach(button => {
            const originalText = button.textContent;
            button.textContent = 'Loading...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        });
        
        // Simulate API call
        setTimeout(() => {
            const currentLang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
            let successMessage = '';
            
            if (currentLang === 'ru') {
                successMessage = 'Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.';
            } else if (currentLang === 'en') {
                successMessage = 'Order successfully placed! We will contact you shortly.';
            } else {
                successMessage = 'تم تقديم الطلب بنجاح! سنتواصل معك قريباً.';
            }
            
            showNotification(successMessage);
        }, 1500);
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        .feature-card, .about-text, .about-image {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .cta-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none !important;
        }
        
        .countdown-number {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Social media link handlers
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = icon.querySelector('i').className.split(' ')[1].replace('fa-', '');
            let message = '';
            const currentLang = document.querySelector('.lang-btn.active').getAttribute('data-lang');
            
            if (currentLang === 'ru') {
                message = `Вы будете перенаправлены на нашу страницу в ${getPlatformName(platform, 'ru')}`;
            } else if (currentLang === 'en') {
                message = `You will be redirected to our ${getPlatformName(platform, 'en')} page`;
            } else {
                message = `سيتم توجيهك إلى صفحتنا على ${getPlatformName(platform, 'ar')}`;
            }
            
            showNotification(message);
        });
    });
    
    function getPlatformName(platform, lang) {
        const platforms = {
            whatsapp: { ru: 'WhatsApp', en: 'WhatsApp', ar: 'واتساب' },
            tiktok: { ru: 'TikTok', en: 'TikTok', ar: 'تيك توك' },
            instagram: { ru: 'Instagram', en: 'Instagram', ar: 'انستغرام' }
        };
        return platforms[platform]?.[lang] || platform;
    }
    
    // Smooth scroll for anchor links
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
    
    // Add hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Initialize the page
    console.log('7alal Perfumes website initialized successfully!');
    
    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
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
    }
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        switchLanguage: (lang) => {
            const event = new CustomEvent('languageChange', { detail: { language: lang } });
            document.dispatchEvent(event);
        }
    };
}