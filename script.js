// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contentSections = document.querySelectorAll('.content-section');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and content sections
            tabs.forEach(t => t.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add a fun bounce effect
            this.style.transform = 'scale(0.95) rotate(0deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add some interactive doodles that follow mouse movement
    const backgroundSketch = document.querySelector('.background-sketch');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        // Subtle parallax effect for background
        backgroundSketch.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px) rotate(${mouseX * 2}deg)`;
    });
    
    // Add click effects to paper cards
    const paperCards = document.querySelectorAll('.paper-card');
    paperCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(78, 205, 196, 0.4)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.left = (e.clientX - card.offsetLeft - 10) + 'px';
            ripple.style.top = (e.clientY - card.offsetTop - 10) + 'px';
            ripple.style.pointerEvents = 'none';
            ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            // Animate ripple
            setTimeout(() => {
                ripple.style.transform = 'scale(10)';
                ripple.style.opacity = '0';
            }, 10);
            
            // Remove ripple after animation
            setTimeout(() => {
                card.removeChild(ripple);
            }, 600);
        });
    });
    
    // Add floating animation to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Random color changes for tab sketches
    const tabSketches = document.querySelectorAll('.tab-sketch');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fab1a0'];
    
    setInterval(() => {
        tabSketches.forEach(sketch => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            sketch.style.borderColor = randomColor;
            sketch.style.background = randomColor + '33'; // Add transparency
        });
    }, 3000);
    
    // Typewriter effect for the main heading
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Apply typewriter effect to the logo
    const logo = document.querySelector('.logo');
    const originalText = logo.textContent;
    typeWriter(logo, originalText, 150);
    
    // Add scroll-triggered animations
    function animateOnScroll() {
        const cards = document.querySelectorAll('.paper-card');
        
        cards.forEach(card => {
            const cardTop = card.offsetTop;
            const cardHeight = card.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            if (scrollTop + windowHeight > cardTop + cardHeight / 4) {
                card.classList.add('animate-in');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Add a subtle breathing effect to the background
    let breatheScale = 1;
    let breatheDirection = 1;
    
    setInterval(() => {
        breatheScale += 0.001 * breatheDirection;
        if (breatheScale > 1.01) breatheDirection = -1;
        if (breatheScale < 0.99) breatheDirection = 1;
        
        backgroundSketch.style.transform += ` scale(${breatheScale})`;
    }, 50);
    
    // Fun easter egg: konami code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Secret party mode!
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .animate-in {
        animation: slideInFromLeft 0.8s ease-out !important;
    }
    
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px) rotate(-3deg);
        }
        to {
            opacity: 1;
            transform: translateX(0) rotate(-0.5deg);
        }
    }
`;
document.head.appendChild(style);
