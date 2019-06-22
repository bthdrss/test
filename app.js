
const express =require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const keys=require('./config/keys.js')

const User=require('./models/User.js');
const cookieParser= require('cookie-parser');
const session= require('express-session');


const passportConfig=require('./config/passport.js')(passport);
//passportConfig(passport);
// load the routes
const authRoute=require('./routes/auth.js');

const app=express();


// mongoose connection

/*const MongoClient = require('mongodb').MongoClient;
const uri = keys.mongoUri;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("db").collection("users");
  // perform actions on the collection object
  client.close();
});*/

//mongoose.Promise = global.Promise;

//Mongoose connect
mongoose.connect(keys.mongoUri, {useNewUrlParser: true});



app.get('/',(req,res)=>{
    res.send('hi guyz');
});
//use routes

app.use(cookieParser());

app.use(session({
     secret: 'nitin', 
     resave: false, 
     saveUninitialized: false })
     );

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// global variables so that it can be used in all the pages
app.use((req, res, next)=> {
    res.locals.user = req.user || null;
    
    next();
 });

app.use('/auth',authRoute);
const port= process.env.port||5000;
app.listen(port,()=>{

    console.log('hi guuyz');
    
});