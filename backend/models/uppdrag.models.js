const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const uppdragSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Uppdrag = mongoose.model('Uppdrag', uppdragSchema);

module.exports = Uppdrag;