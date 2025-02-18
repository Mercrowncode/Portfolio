// Terminal Effect
function createTerminalEffect() {
    const terminal = document.getElementById('terminal');
    const text = "Initializing connection... Ready to collaborate?";
    let index = 0;
    let isTyping = true;

    function type() {
        if (index < text.length) {
            terminal.textContent = text.slice(0, index) + '▋';
            index++;
            setTimeout(type, 100);
        } else {
            terminal.textContent = text + '▋';
            setTimeout(blink, 500);
        }
    }

    function blink() {
        if (terminal.textContent.endsWith('▋')) {
            terminal.textContent = text + ' ';
        } else {
            terminal.textContent = text + '▋';
        }
        setTimeout(blink, 500);
    }

    type();
}

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

// Form Handling
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form elements
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Format the message for WhatsApp
    const message = `*New Message from Portfolio*\n\n` +
        `*Name:* ${data.name}\n` +
        `*Email:* ${data.email}\n` +
        `*Subject:* ${data.subject}\n\n` +
        `*Message:*\n${data.message}`;
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    submitBtn.disabled = true;
    
    // Create WhatsApp URL (replace with your phone number)
    const phoneNumber = '2347018643382'; // Format: country code + phone number without '+' or spaces
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Redirect to WhatsApp after a brief delay
    setTimeout(() => {
        // Reset button state
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        form.reset();
    }, 1000);
    
    return false;
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createTerminalEffect();
    createMatrixBackground();
    
    // Form field animations
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            if (!field.value) {
                field.parentElement.classList.remove('focused');
            }
        });
    });

    // Add form submission event listener
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
});

// Handle window resize for matrix background
window.addEventListener('resize', () => {
    const canvas = document.getElementById('matrix-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
