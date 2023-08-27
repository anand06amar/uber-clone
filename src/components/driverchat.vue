<template>
    <div class="chat-box">
        <div class="message-list">
            <div v-for="(message, index) in messages" :key="message.id" class="message-wrapper"
                :ref="'messageWrapper_' + index">
                <div class="message-content" :class="[getMessageAlignment(message)]">
                    <p class="message-bubble" :class="{
                        'sent-bubble': message.sender === 'rider',
                        'received-bubble': message.sender === 'driver',
                    }">
                        {{ message.text }}
                    </p>
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
import { ref } from "vue";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";

export default {
    props: ["riderId", "driverId"],
    setup(props) {
        const messages = ref([]);
        const newMessage = ref("");
        const lastMessageRef = ref(null);

        const chatId =
            props.riderId < props.driverId
                ? `${props.riderId}_${props.driverId}`
                : `${props.driverId}_${props.riderId}`;

        const chatRef = collection(db, "chats", chatId, "messages");

        onSnapshot(chatRef, (snapshot) => {
            messages.value = snapshot.docs
                .map((doc) => doc.data())
                .sort((a, b) => a.timestamp - b.timestamp);

            if (messages.value.length > 0) {
                lastMessageRef.value = messages.value[messages.value.length - 1];
            }
        });

        const sendMessage = async () => {
            if (newMessage.value.trim() === "") return;

            await addDoc(chatRef, {
                text: newMessage.value,
                timestamp: new Date(),
                sender: "driver",
            });

            newMessage.value = "";

            // Scroll to the last message after sending
            if (lastMessageRef.value && lastMessageRef.value.$el) {
                lastMessageRef.value.$el.scrollIntoView({ behavior: "smooth" });
            }
        };

        const getMessageAlignment = (message) => {
            return message.sender === "rider" ? "sent-message" : "received-message";
        };

        return {
            messages,
            newMessage,
            sendMessage,
            getMessageAlignment,
            lastMessageRef,
        };
    },
};
</script>
  
<style scoped>
.chat-box {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.message-list {
    max-height: 300px;
    overflow-y: auto;
}

.message-wrapper {
    clear: both;
    margin: 10px;
}

.message-bubble {
    display: inline-block;
    padding: 7px 15px;
    margin: 3px;
    max-width: 70%;
    word-wrap: break-word;
    border-radius: 20px;
    font-size: 14px;
}

.sent-bubble {
    background-color: #f2f2f2;
    color: #333;
    float: right;
}

.received-bubble {
    background-color: #252525;
    color: white;
    float: left;
}

.input-container {
    margin: 10px 0;
    display: flex;
    align-items: center;
    border-top: 1px solid #ccc;
    padding: 10px;
}

.message-input {
    flex: 1;
    border: none;
    padding: 8px;
    border-radius: 20px;
    background-color: #f2f2f2;
    font-size: 14px;
    outline: none;
}

.send-button {
    background-color: #141515;
    color: white;
    border: none;
    width: 116px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
}
</style>