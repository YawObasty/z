function logout() {
    if(confirm("Are you sure you want to sign out of NanaObasty?")) {
        localStorage.removeItem('nana_user');
        // Optional: Also clear their listings from view if you want a full reset
        // localStorage.removeItem('nana_items'); 
        location.reload(); // Refresh the page to reset the UI
    }
}
