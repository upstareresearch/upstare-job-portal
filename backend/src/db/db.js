const mongoose = require("mongoose");

async function connectDB() {
    try {
        mongoose.connect(process.env.MONGOOSE_URI).then(() => {
            console.log("mongoDb is Connected  successfully")
        })

    } catch (error) {
        console.log("Database connections Faoled", error)
    }
}

module.exports = connectDB;