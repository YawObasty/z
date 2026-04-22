function logout() {
    if(confirm("Are you sure you want to sign out of NanaObasty?")) {
        localStorage.removeItem('nana_user');
        // Optional: Also clear their listings from view if you want a full reset
        // localStorage.removeItem('nana_items'); 
        location.reload(); // Refresh the page to reset the UI
    }
}
import { 
    collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, setDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Function to start/open a chat
window.startChat = async (sellerId, sellerName, productId) => {
    const buyerId = auth.currentUser.uid;
    const chatId = buyerId < sellerId ? `${buyerId}_${sellerId}` : `${sellerId}_${buyerId}`;

    // Create the chat room document if it doesn't exist
    await setDoc(doc(db, "chats", chatId), {
        participants: [buyerId, sellerId],
        lastMessage: "Started a conversation",
        timestamp: serverTimestamp(),
        productContext: productId
    }, { merge: true });

    // Open UI and load messages
    openChatUI(chatId, sellerName);
};

// 2. Function to listen for messages in real-time
let unsubscribeChat = null;
function openChatUI(chatId, otherUserName) {
    document.getElementById('chatTitle').innerText = `Chat with ${otherUserName}`;
    document.getElementById('chatModal').style.display = 'flex';
    const messageList = document.getElementById('messageList');

    // Clear previous listener if exists
    if (unsubscribeChat) unsubscribeChat();

    const q = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
    );

    // REAL-TIME LISTENER
    unsubscribeChat = onSnapshot(q, (snapshot) => {
        messageList.innerHTML = "";
        snapshot.forEach((doc) => {
            const msg = doc.data();
            const isMe = msg.senderId === auth.currentUser.uid;
            
            messageList.innerHTML += `
                <div class="msg-wrapper ${isMe ? 'me' : 'them'}">
                    <div class="msg-bubble">${msg.text}</div>
                </div>
            `;
        });
        messageList.scrollTop = messageList.scrollHeight; // Auto-scroll to bottom
    });

    // Handle sending
    document.getElementById('sendBtn').onclick = () => sendMessage(chatId);
}

// 3. Function to send a message
async function sendMessage(chatId) {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
        text: text,
        senderId: auth.currentUser.uid,
        createdAt: serverTimestamp()
    });

    input.value = ""; // Clear input
}
// New Global State
let activeCategory = "All";

// Category Filter Logic
window.filterByCategory = (cat) => {
    activeCategory = cat;
    // Update UI tags
    document.querySelectorAll('.tag').forEach(t => {
        t.classList.toggle('active', t.innerText === cat);
    });
    applyFilters();
};

// Updated applyFilters to include categories
function applyFilters() {
    const s = document.getElementById('searchInput').value.toLowerCase();
    const r = document.getElementById('regFilter').value;
    
    let filtered = allListings.filter(i => {
        const matchesSearch = i.name.toLowerCase().includes(s);
        const matchesRegion = (r === "All" || i.region === r);
        const matchesCategory = (activeCategory === "All" || i.category === activeCategory);
        return matchesSearch && matchesRegion && matchesCategory;
    });
    
    renderListings(filtered);
}

// Format Price Function (e.g., 1000 -> 1,000)
const formatMoney = (num) => new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(num);

// Updated Render function with detail view
function renderListings(data) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = data.length ? "" : "<p style='grid-column:1/-1; text-align:center; opacity:0.5;'>No items found...</p>";
    
    data.forEach(item => {
        const isLiked = likedIds.includes(item.id);
        grid.innerHTML += `
            <div class="product-card" onclick="showProductDetails('${item.id}')">
                <div class="badge">New</div>
                <button class="like-btn ${isLiked?'active':''}" onclick="toggleLike('${item.id}', event)">${isLiked?'❤️':'🤍'}</button>
                <div class="product-img" style="background-image:url('${item.image}')">
                    <div class="view-count">👁️ ${item.views || 0}</div>
                </div>
                <div class="product-info">
                    <span class="loc-tag">📍 ${item.location}, ${item.region}</span>
                    <strong style="display:block; margin-bottom:5px;">${item.name}</strong>
                    <p style="color:var(--success); font-weight:bold; font-size:1.1rem;">${formatMoney(item.price)}</p>
                </div>
            </div>`;
    });
}

// Feature: Safety Modal when clicking an item
window.showProductDetails = (id) => {
    const item = allListings.find(i => i.id === id);
    // You can use your existing authModal or a new one to show full description
    alert(`Item: ${item.name}\n\nDescription: ${item.pDesc || 'No description provided.'}\n\nSafety Tip: Always meet sellers in public places!`);
};
