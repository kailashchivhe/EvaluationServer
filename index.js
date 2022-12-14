const expressModule = require('express');
const app = expressModule();
const cookieParser = require('cookie-parser');
var cors = require('cors');

const PORT = process.env.PORT || 3000;



app.use(expressModule.json());
app.use(expressModule.urlencoded({ extended: true }));
app.use(expressModule.text());
app.use(cookieParser());
app.use(cors({credentials: true, origin: '*'}));

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

app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname+'/login/login.html'));
  });
  
  app.get('/home', function(req, res){
    res.sendFile(path.join(__dirname+'/home/home.html'));
  });