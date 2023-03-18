const io = require('../socket').getIO()

let botResponse1 = ''

let items = {
    21: 'Italian Pizza', 22: 'Full Grilled Chicken', 23: 'Panera Soup',
    24: 'Original Thick Burger', 25: 'Filled Sandwich',
    26: 'Ceasar Bread', 27: 'Baked Potato', 28: 'Crispy Chicken'
}

for (let item in items) {
    botResponse1 = botResponse1.concat('', `<p> ${item} - ${items[item]} </p>`)
}

// GET AVAILABLE ITEMS 
exports.getItems = ({ session }) => {
    io.emit('bot-response', (botResponse1))
    session.hasGottenItems = true

}

// ADD AN ITEM TO ORDER LIST
exports.addItem = ({ session }, userInput) => {

    if (session.hasGottenItems) {
        console.log('it got it');
        if (items.hasOwnProperty(userInput)) {
            console.log('item: ', items[userInput]);
            session.orderList.push(items[userInput])
            return io.emit('bot-response', `You have selected ${items[userInput]}`)
        }
    } else {
        return io.emit('bot-response', 'Please Enter "1" to request for Items')
    }
}

// CHECKOUT ORDER
exports.checkout = ({ session }) => {

    let botResponse99 = 'Order Placed'

    if (!session.orderList.length) {
        botResponse99 = 'No order to place'
    }

    // UPDATE CUURENT ORDER
    session.currentOrder = session.orderList

    // EMPTY ORDER LIST
    session.orderList = []

    // UPDATE ORDER HISTORY
    session.orderHistory.push(...session.currentOrder)

    console.log(botResponse99);
    return io.emit('bot-response', botResponse99)
}

// GET ALL PLACED ORDER
exports.orderHistory = ({ session }) => {
    let botResponse98 = '';
    let orderHistory = session.orderHistory

    if (!orderHistory.length) {
        return io.emit('bot-response', 'No order history')
    }
    for (let i = 1; i < orderHistory.length; i++) {
        botResponse98 = botResponse98.concat('', `<p> ${i} - ${orderHistory[i - 1]} </p>`)
    }
    return io.emit('bot-response', botResponse98)
}


// GET CURRENT ORDER
exports.currentOrder = ({ session }) => {
    let botResponse97 = ''
    let currentOrder = session.currentOrder
    let orderList = session.orderList

    if (currentOrder.length) {
        console.log('Current Order');
        for (let i = 1; i < currentOrder.length; i++) {
            botResponse97 = botResponse97.concat('', `<p> ${i} - ${currentOrder[i - 1]} </p>`)
        }

        return io.emit('bot-response', botResponse97)
    }

    if (orderList.length) {
        console.log('List Order');
        botResponse97 = '<p> Please Checkout Your Order with 99 </p>'
        for (let i = 1; i < orderList.length; i++) {
            botResponse97 = botResponse97.concat('', `<p> ${i} - ${orderList[i - 1]} </p>`)
        }

        return io.emit('bot-response', botResponse97)
    }

    return io.emit('bot-response', 'No Current Order')
}

exports.cancelOrder = ({ session }) => {
    let botResponse0 = 'Current Order Cancelled!'
    let currentOrder = session.currentOrder
    let orderList = session.orderList

    if (!currentOrder.length || !orderList.length) {
        botResponse0 = 'No Order to cancel'
    }

    // EMPTY ORDER BUCKETS
    currentOrder = []
    orderList = []

    return io.emit('bot-response', botResponse0)
}