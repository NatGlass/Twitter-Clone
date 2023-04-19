require('dotenv').config();
const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(process.env.MONGO_DB)
        .then(() => console.log('Connected to database'))
        .catch((err) => console.error('Error connecting to database', err));
    }
}

module.exports = new Database();