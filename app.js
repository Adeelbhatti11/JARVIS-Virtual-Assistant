const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

// Function to make JARVIS speak
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

// Function to greet based on time of day
function wishMe() {
    let hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 18) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

// Initialize speech synthesis and greetings on page load
window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

// Check browser support for Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("Transcript:", transcript);
        content.textContent = transcript;
        handleCommand(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Error occurred in recognition:", event.error);
        content.textContent = "Error: " + event.error;
    };

    // Start speech recognition on button click
    btn.addEventListener('click', () => {
        content.textContent = "Listening...";
        recognition.start();
    });

    // Handle recognized voice commands
    function handleCommand(command) {
        if (command.includes('hello')) {
            speak("Hello Sir, how can I help you?");
        } else if (command.includes("open google")) {
            speak("Opening Google...");
            window.open("https://www.google.com", "_blank");
        } else if (command.includes("open youtube")) {
            speak("Opening YouTube...");
            window.open("https://www.youtube.com", "_blank");
        } else if (command.includes("time")) {
            const time = new Date().toLocaleTimeString();
            speak(`The time is ${time}`);
        } else if (command.includes("date")) {
            const date = new Date().toLocaleDateString();
            speak(`Today's date is ${date}`);
        } else {
            speak("I'm not sure how to respond to that.");
        }
    }
} else {
    alert("Speech Recognition API is not supported in this browser. Please use Google Chrome.");
}
