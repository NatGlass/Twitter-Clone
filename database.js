const mongoose = require('mongoose');

class database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(process.env.MONGO_DB)
        .then(() => console.log('Connected to database'))
        .catch((err) => console.error('Error connecting to database', err));
    }
}