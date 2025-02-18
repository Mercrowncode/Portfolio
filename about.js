// Matrix Background Effect
function createMatrixBackground() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Terminal Effect
function createTerminalEffect() {
    const terminal = document.getElementById('terminal');
    const text = [
        "Loading AI modules...",
        "Initializing development environment...",
        "Optimizing workflows...",
        "System ready."
    ];
    let line = 0;
    let count = 0;
    let result = '';
    let isTyping = true;

    function typeLine() {
        const currentLine = text[line];
        if (count < currentLine.length) {
            result += currentLine.charAt(count);
            terminal.innerHTML = result + '_';
            count++;
            setTimeout(typeLine, 50);
        } else {
            count = 0;
            line++;
            if (line < text.length) {
                result += '<br/>';
                setTimeout(typeLine, 1000);
            } else {
                terminal.innerHTML = result;
                isTyping = false;
            }
        }
    }

    typeLine();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-motion]').forEach(element => {
        element.classList.add(element.dataset.motion);
        observer.observe(element);
    });
}

// Tech Stack Hover Effects
function initTechStackEffects() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createMatrixBackground();
    createTerminalEffect();
    initScrollAnimations();
    initTechStackEffects();
});

// Handle window resize for matrix background
window.addEventListener('resize', () => {
    const canvas = document.getElementById('matrix-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
