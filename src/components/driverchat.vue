<template>
    <div class="chat-container">
        <div class="message-list">
            <div v-for="message in messages" :key="message.id"
                :class="{ 'sent-message': message.sender === 'driver', 'received-message': message.sender === 'rider' }">
                <div class="message-content">
                    <p class="message-text">{{ message.text }}</p>
                    <p class="message-timestamp">{{ formatDate(message.timestamp) }}</p>
                </div>
            </div>
        </div>
        <div class="input-container">
            <input class="message-input" v-model="newMessage" @keydown.enter="sendMessage"
                placeholder="Type your message..." />
            <button class="send-button" @click="sendMessage">Send</button>
        </div>
    </div>
</template>
    
    
<script>
import { ref } from 'vue';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';

export default {
    props: ['riderId', 'driverId'],
    setup(props) {
        const messages = ref([]);
        const newMessage = ref('');

        const chatId = props.riderId < props.driverId
            ? `${props.riderId}_${props.driverId}`
            : `${props.driverId}_${props.riderId}`;

        const chatRef = collection(db, 'chats', chatId, 'messages');

        onSnapshot(chatRef, (snapshot) => {
            messages.value = snapshot.docs.map(doc => doc.data())
                .sort((a, b) => a.timestamp - b.timestamp);
        });

        const sendMessage = async () => {
            if (newMessage.value.trim() === '') return;

            await addDoc(chatRef, {
                text: newMessage.value,
                timestamp: new Date(),
                sender: 'driver'
            });

            newMessage.value = '';
        };

        const formatDate = (timestamp) => {
            const date = timestamp.toDate();
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        };

        return { messages, newMessage, sendMessage, formatDate };
    }
};
</script>


<style scoped>
/* ... your styles ... */
.message-bubble {
    padding: 8px 12px;
    max-width: 70%;
    word-wrap: break-word;
    border-radius: 12px;
}

.message-timestamp {
    font-size: 10px;
    color: #999;
    text-align: right;
    margin-top: 3px;
}
</style>