// CONST DEFINITION
const trigger = [
    //0 
    ["hi", "hey", "hello"],
    //1
    ["how are you", "how are things"],
    //2
    ["what is going on", "what is up"],
    //3
    ["happy", "good", "well", "fantastic", "cool"],
    //4
    ["bad", "bored", "tired", "sad"],
    //5
    ["tell me story", "tell me joke"],
    //6
    ["thanks", "thank you"],
    //7
    ["bye", "good bye", "goodbye"],
    // 8
    ["go and die"]
];

const reply = [
    //0 
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
    //1
    [
        "Fine... how are you?",
        "Pretty well, how are you?",
        "Fantastic, how are you?"
    ],
    //2
    [
        "Nothing much",
        "Exciting things!"
    ],
    //3
    ["Glad to hear it"],
    //4
    ["Why?", "Cheer up buddy"],
    //5
    ["What about?", "Once upon a time..."],
    //6
    ["You're welcome", "No problem"],
    //7
    ["Goodbye", "See you later"],
    //8
    ["Please forgive me"]
];

const alternative = [
    "Same",
    "Go on...",
    "Try again",
    "I'm listening...",
    "Bro..."
];
const robot = ["How do you do, fellow human", "I am not a bot"];
// OUTPUT ON PRESSING ENTER KEY
document.addEventListener("DOMContentLoaded", () => {
    const userinput = document.getElementById("usrinpt")
    userinput.addEventListener('keydown', (e) => {
        if (e.code === "Enter") {
            let user = userinput.value;
            userinput.innerHTML = user;
            output(user);
        }
    })
})

function runForPhone(){
 const userinput = document.getElementById("usrinpt")
 let user = userinput.value;
 userinput.innerHTML = user;
 output(user);
}

// Function Output
function output(user) {
    let product;
    let text = user.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "");

    //compare arrays
    //then search keyword
    //then random alternative

    if (compare(trigger, reply, text)) {
        product = compare(trigger, reply, text);
    } else if (text.match(/robot/gi)) {
        product = robot[Math.floor(Math.random() * robot.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }

    document.getElementById("chatbot").innerHTML = product;
    speak(product);

    //clear input value
    document.getElementById("usrinpt").value = "";
    //update DOM
    addChat(user, product);
}
// Function Adchat
function addChat(user, product) {
    const mainDiv = document.getElementById("main");
    const userDiv = document.getElementById("user")
    userDiv.innerText = user;

    let botDiv = document.querySelector("#chatbot");
    botDiv.innerText = `${product}`;
    speak(product);
}

// Function Compare
function compare(triggerArray, replyArray, text) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
        for (let y = 0; y < replyArray.length; y++) {
            if (triggerArray[x][y] == text) {
                items = replyArray[x];
                item = items[Math.floor(Math.random() * items.length)];
            }
        }
    }
    return item;
}

// Function Speak
function speak(string) {
    const u = new SpeechSynthesisUtterance();
    allVoices = speechSynthesis.getVoices();
    u.voice = allVoices.filter(voice => voice.name === "Alex")[0];
    u.text = string;
    u.lang = "en-US";
    u.volume = 1; //0-1 interval
    u.rate = 1;
    u.pitch = 1; //0-2 interval
    speechSynthesis.speak(u);
}

/* Context Menu */
window.addEventListener("contextmenu", function (e) {
    e.preventDefault()
    // Showing Hidden ContextMenu
    var contextMenu = document.getElementById("contextmenu")
    contextMenu.style.top = e.offsetY + "px";
    contextMenu.style.left = e.offsetX + "px";
    contextMenu.classList.add("active");
})

// Hiding Contextmenu
const hidecontext = () => {
    document.getElementById("contextmenu").classList.remove("active");
}

// Reloading Page
const pageReload = () => {
    hidecontext();
    window.location.reload();
}

// Printing Page
const printpage = () => {
    hidecontext();
    window.print();
}

// Github
function github(){
    window.location.href ="https://github.com/abindent/chatbot-simple-js"
}
document.addEventListener("click", ()=>{ 
    hidecontext()
})
