const router = require('express').Router()
const io = require('../utils/socket').getIO()
const BotResponse = require('../controllers/responseController')


router.get('/', (req, res) => {
    res.render('index')

    // TO ACCESS SESSION FROM REQ
    io.on('connection', (socket) => {

        req.session.orderHistory = [] // ORDER HISTORY
        req.session.orderList = []  // UNPLACED ORDER
        req.session.currentOrder = [] // PLACED(CHECKED-OUT ORDER)

        const validItemsInput = ['21', '22', '23', '24', '25', '26', '27', '28']
        const validInput = ['1', '99', '98', '97', '0', ...validItemsInput]

        console.log('Client is connected!', socket.id);


        // WHEN USER DISCONNECTS
        socket.on('disconnect', (data) => {
            console.log('Client disconnected,', socket.id);
        })

        // ON USER INPUT
        socket.on('user-input', (userInput) => {

            if (validInput.includes(userInput)) {

                if (userInput === '1') {
                    return BotResponse.getItems(req)
                }
                if (userInput === '99') {
                    return BotResponse.checkout(req)
                }
                if (userInput === '98') {
                    return BotResponse.orderHistory(req)
                }
                if (userInput === '97') {
                    return BotResponse.currentOrder(req)
                }
                if (userInput === '0') {
                    return BotResponse.cancelOrder(req)
                }

                if (validItemsInput.includes(userInput)) {
                    return BotResponse.addItem(req, userInput)
                }
            }

            return socket.emit('bot-response', 'Please enter a valid input')

        })
    })
})

module.exports = router