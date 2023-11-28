var mongoose = require('mongoose');

const DATABASE_URL = 'mongodb://127.0.0.1:27017/dogContestForm';

console.log(DATABASE_URL);
const connect = (url) => {
    return mongoose.createConnection(url);
}

module.exports = connect(DATABASE_URL);