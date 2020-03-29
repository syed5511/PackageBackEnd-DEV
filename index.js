const express = require('express')
const app = express()
var morgan = require('morgan')
var cors = require('cors')
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
const session = require('express-session')


require('./db')
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(cors()); // cros is for cross orgin resouce for issue with front end backend ports




// Customer SignUP - Api Route 
const CSignup = require('./Routes/CustomerSignupLogin-Route')
app.use('/API/Customer',CSignup)
// Post - /API/Customer/CustomerSignup
// Get - /API/Customer/Zipcodes





// Error Capture - API Route 
const Errors = require('./Routes/Errors.Route')
app.use('/API/CaptureErr',Errors)
//Post - /API/CaptureErr/ErrorCapture





app.listen(port, () => console.log(`Example app listening on port ${port}!`))