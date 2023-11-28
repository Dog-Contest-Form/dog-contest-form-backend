var mongoose = require('mongoose');
var database = require('../../database');

const dogContextFormSchema = mongoose.Schema({
    _id: String,
    ownerName: String,
    ownerAddress: String,
    ownerPhoneNumber: String,
    ownerEmail: String,
    dogName: String,
    dogBreed: String,
    dogSex: String,
    dogAge: Number,
    dogWeight: Number,
    dogImage: String,
    contestCriteria: String,
    contestType: String,
    contestClass: String,
    dogTalent: String,
    transferSlip: String,
    agreement: String
}, { versionKey: false });

const dogContestForm = database.model('DogContestForm', dogContextFormSchema);
module.exports = dogContestForm;