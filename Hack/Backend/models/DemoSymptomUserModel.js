const mongoose = require("mongoose");
const Joi = require("joi");

const symptom_user_schema = new mongoose.Schema({
    symptom_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Symptom'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Demo User'
    },
    timestamp : { 
        type : Date, 
        default: Date.now 
        }
});

function validateSymptomUser(SymptomUser) {
    const schema = {
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        relevance: Joi.string()
            .valid('HIGH', 'MEDIUM', 'LOW'),
        description: Joi.string()
            .min(10)
            .max(100)
    }
    return Joi.validate(symptom, schema);
}

const DemoSymptomUser = mongoose.model("Demo SymptomUser", symptom_user_schema);

exports.DemoSymptomUser = DemoSymptomUser;
exports.validateSymptomUser = validateSymptomUser;