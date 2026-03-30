const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', () => {
    // This gets the current link of your GitHub site automatically
    const siteUrl = window.location.href;
    const message = `Check out NanaObasty Marketplace! The best place to buy and sell in Winneba: ${siteUrl}`;
    
    // This creates a WhatsApp link
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    // Opens WhatsApp
    window.open(whatsappUrl, '_blank');
});
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const tabs = document.querySelectorAll('.auth-tab');

// Open Modal
function openAuth() { authModal.classList.add('active'); }

// Close Modal
function closeAuth() { authModal.classList.add('active'); authModal.classList.remove('active'); }

// Switch between Login and Register
function switchAuth(type) {
    tabs.forEach(t => t.classList.remove('active'));
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');

    if(type === 'login') {
        loginForm.classList.add('active');
        tabs[0].classList.add('active');
    } else {
        registerForm.classList.add('active');
        tabs[1].classList.add('active');
    }
}

// Attach to your Navigation (Update your existing Nav links)
// Add 'onclick="openAuth()"' to your Profile/About links to test it!
