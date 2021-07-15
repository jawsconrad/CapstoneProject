const mongoose = require('mongoose')

const SymptomSchmea = new mongoose.Schema(
    {
        coughing: { type: Boolean },
        sneezing: { type: Boolean },
        aches: { type: Boolean },
        fever: { type: Boolean }
    }
)


const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true},
        symptoms: [SymptomSchmea]
    },
    { collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model