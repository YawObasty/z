// Get the button
const topBtn = document.getElementById("scrollToTop");

// When the user scrolls down 400px from the top, show the button
window.onscroll = function() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

// When the user clicks, scroll to the top
topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// Simple Filter Logic (Front-end Demo)
const searchInput = document.getElementById('productSearch');
const categorySelect = document.getElementById('categoryFilter');

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;
    
    console.log(`Searching for ${searchTerm} in ${selectedCategory}`);
    // In a real app, this would filter your product list array!
}

searchInput.addEventListener('keyup', handleSearch);
categorySelect.addEventListener('change', handleSearch);
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all
        navItems.forEach(i => i.classList.remove('active'));
        // Add to clicked item
        this.classList.add('active');
    });
});
// Target the "Sell" form
const sellForm = document.querySelector('.sell-form');
const modal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

if (sellForm) {
    sellForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop the page from reloading
        
        // Show the success message
        modal.classList.add('active');
        
        // Optional: Clear the form
        sellForm.reset();
    });
}

// Close the modal when button is clicked
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});
