class AppError extends Error{
    constructor(message, statusCode){
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
        this.isOperationalError = true

        // ATTACH ERROR STACK
        Error.captureStackTrace(this, this.constructor)
    }
}