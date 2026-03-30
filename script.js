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
