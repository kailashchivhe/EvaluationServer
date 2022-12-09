const expressModule = require('express');
const app = expressModule();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

app.use(expressModule.json());
app.use(expressModule.urlencoded({ extended: true }));
app.use(expressModule.text());
app.use(cookieParser());

const db = require("./models")
const dbConfig = require("./config/db.config");

try {
    db.mongoose.connect(dbConfig.DB)
        .then(() => {
            console.log('Successfully connected to MongoDB')
        })
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`);
    });
} catch (err) {
    console.log('Cannot connect to the database' + err)
}

require('./routes/auth.routes')(app);
