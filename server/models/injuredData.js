const mongoose = require('mongoose')

// Define the subdocument schema with a string and a number.
const injuriesSaved = new mongoose.Schema({
    injuredAreaNumber: Number,
    typeOfInjury: String,
    severityOfInjury: String,
});

const injuredDataSchema = new mongoose.Schema({
    userID: String,
    nameOfTheReporter: String,
    dateOfInjury: String,
    timeOfInjury: String,
    dateOfReport: String,
    injuredAreas: [Number],
    injuriesSaved: [injuriesSaved],
});

const injuredDataModel = mongoose.model("injuredData", injuredDataSchema);
module.exports = injuredDataModel;
