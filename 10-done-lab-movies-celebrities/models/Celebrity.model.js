//  Add your code here
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celebritySchema = new Schema(
    { 
        name: {type: String, required: true},
        occupation: {type: String, enum: ["actor", "singer", "comedian", "unknown"]},
        catchPhrase: {type: String, required: true}
    }
)

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;