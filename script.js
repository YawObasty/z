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
// --- AUTHENTICATION LOGIC ---
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Registration Logic
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = registerForm.querySelector('input[type="text"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    
    // Save to browser memory
    const user = { name: name, email: email, loggedIn: true };
    localStorage.setItem('nanaobasty_user', JSON.stringify(user));
    
    alert(`Welcome to the family, ${name}!`);
    updateUI();
    closeAuth();
});

// Login Logic
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('nanaobasty_user'));
    const loginEmail = loginForm.querySelector('input[type="email"]').value;

    if (savedUser && savedUser.email === loginEmail) {
        savedUser.loggedIn = true;
        localStorage.setItem('nanaobasty_user', JSON.stringify(savedUser));
        updateUI();
        closeAuth();
    } else {
        alert("Account not found. Please register first!");
    }
});

// Update UI (Change 'Login' to the User's Name)
function updateUI() {
    const savedUser = JSON.parse(localStorage.getItem('nanaobasty_user'));
    const loginTriggers = document.querySelectorAll('.login-trigger, .nav-item span:last-child');
    
    if (savedUser && savedUser.loggedIn) {
        // Find the login buttons and change text to user's name
        loginTriggers.forEach(el => {
            if (el.innerText.includes("Login") || el.innerText.includes("Account")) {
                el.innerText = savedUser.name.split(' ')[0]; // Show first name only
            }
        });
    }
}

// Logout Function (Run this from console to test: logout())
function logout() {
    localStorage.removeItem('nanaobasty_user');
    location.reload();
}

// Run UI check on page load
window.onload = updateUI;

// Helper functions
function openAuth() { authModal.classList.add('active'); }
function closeAuth() { authModal.classList.remove('active'); }
