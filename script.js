// Matrix Background Effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.matrix-bg').appendChild(canvas);

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const cols = Math.floor(width / 20);
const ypos = Array(cols).fill(0);

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, width, height);

function matrix() {
    ctx.fillStyle = '#0001';
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = '15pt monospace';
    
    ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
    });
}

setInterval(matrix, 50);

// Floating Code Snippets
const codeSnippets = [
    'const ai = new AI();',
    'ai.optimize(code);',
    'deploy(solution);',
    'while(innovation){',
    'build(future);'
];

function createCodeSnippet() {
    const container = document.getElementById('code-snippets');
    const snippet = document.createElement('div');
    snippet.className = 'code-snippet';
    snippet.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight;
    
    snippet.style.left = `${startX}px`;
    snippet.style.top = `${startY}px`;
    
    container.appendChild(snippet);
    
    let position = startY;
    const animation = setInterval(() => {
        position -= 1;
        snippet.style.top = `${position}px`;
        
        if (position < -50) {
            clearInterval(animation);
            container.removeChild(snippet);
        }
    }, 30);
}

setInterval(createCodeSnippet, 2000);

// Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .profile-image-container, .tech-icon').forEach(el => {
    observer.observe(el);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.nav-mobile');
const body = document.body;

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
    body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-mobile .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = '';
    });
});

// Close mobile menu when resizing to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = '';
    }
});

// Window Resize Handler
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
