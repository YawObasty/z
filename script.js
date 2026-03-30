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
