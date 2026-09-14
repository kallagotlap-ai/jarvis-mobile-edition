const input = document.getElementById("msg");
const send = document.getElementById("send");
const mic = document.getElementById("mic");
const chat = document.getElementById("chat");

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function jarvisSpeak(text) {
    speechSynthesis.cancel();

    const voice = new SpeechSynthesisUtterance(text);
    voice.lang = "en-US";
    voice.rate = 0.9;
    voice.pitch = 0.8;
    voice.volume = 1;

    speechSynthesis.speak(voice);
}

function sendMessage() {
    const text = input.value.trim();

    if (!text) return;

    addMessage("YOU: " + text, "user");
    input.value = "";

    let response = "I am online and ready, sir.";

    if (text.toLowerCase().includes("hello")) {
        response = "Hello sir. J.A.R.V.I.S is online.";
    }

    addMessage("J.A.R.V.I.S: " + response, "jarvis");
    jarvisSpeak(response);
}

send.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

/* VOICE RECOGNITION */

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    mic.addEventListener("click", function() {
        recognition.start();
        mic.textContent = "🔴";
    });

    recognition.onresult = function(event) {
        const text = event.results[0][0].transcript;

        input.value = text;
        mic.textContent = "🎤";

        sendMessage();
    };

    recognition.onerror = function() {
        mic.textContent = "🎤";
    };

    recognition.onend = function() {
        mic.textContent = "🎤";
    };

} else {
    mic.disabled = true;
    mic.textContent = "❌";
}


