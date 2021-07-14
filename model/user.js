const mongoose = require('mongoose')

const SymptomSchmea = new mongoose.Schema(
    {
        coughing: { type: Boolean },
        snezzing: { type: Boolean },
        aches: { type: Boolean },
        fever: { type: Boolean },
        coughing: { type: Boolean },
        coughing: { type: Boolean },
    }
)


const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true},
        symptoms: [SymptomSchmea],
        password: { type: String, required: true }
    },
    { collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model