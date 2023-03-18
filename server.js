const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT


process.on('uncaughtException', (error) => {
    console.log('UNCAUGHT EXCEPTION!!! 🔥🤺 SHUTTING DOWN...');
    console.log(error.name, error.message);
    process.exit(1)
})

// const server = app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}...`);
// })

process.on('unhandledRejection', (error) => {
    console.log('UNHANDLED REJECTION!!! 🔥🤺 SHUTTING DOWN...');
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1)
    })
})