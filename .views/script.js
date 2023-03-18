const socket = io();

const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

const appendMessage = (message) => {
    const messageElem = document.createElement('div');
    messageElem.innerHTML = `${message}`
    messageContainer.append(messageElem)
}

socket.on('connect', function () {
    console.log('Server connected')
});

messageForm.addEventListener('submit', e => {
    e.preventDefault()

    const userInput = messageInput.value
    console.log(userInput);

    // EMIT
    socket.emit('user-input', userInput)

    appendMessage(userInput)
    messageInput.value = ''
})

socket.on('bot-response', (botResponse) => {
    appendMessage(botResponse)

})


