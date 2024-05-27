const mongoose = require("mongoose");
const LoginScheme = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        password: {
            type: String,
            required: true
        }
    }
)

const collection = new mongoose.model("users", LoginScheme);

module.exports =collection;