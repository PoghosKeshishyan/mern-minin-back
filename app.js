const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({extended: true}));
const PORT = config.get('port') || 3000;

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('//t', require('./routes/redirect.routes'));

start();

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true })
        
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}...`)
            console.log('DB ok');
        });
    } catch (error) {
        console.log('Server Error', error.message);
        process.exit(1);
    }
}