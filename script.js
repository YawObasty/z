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
