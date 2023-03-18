const socket = io();

const messageForm = document.getElementById('chatbot-form');
const messageInput = document.getElementById('chatbot-input')
const messageContainer = document.getElementById('chatbot-body')

const appendMessage = (message) => {
    const messageElem = document.createElement('ul');
    messageElem.innerHTML = `${message}`
    messageContainer.append(messageElem)
}

socket.on('connect', function () {
    console.log('Server connected')
});

messageForm.addEventListener('submit', e => {
    e.preventDefault()

    const userInput = messageInput.value

    // EMIT
    socket.emit('user-input', userInput)

    appendMessage(`YOU: ${userInput}`)
    messageInput.value = ''
})

socket.on('bot-response', (botResponse) => {
    appendMessage(botResponse)
})