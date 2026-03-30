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
