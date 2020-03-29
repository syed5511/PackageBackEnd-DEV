const express = require('express');
var nodemailer = require('nodemailer');
require('dotenv').config();
const router = express.Router();
const { CustomerSignupSchema } = require('../Models/CustomerSignup.Model');
const {CaptureErrorsSchema} = require('../Models/Errors.Model');
const { validationResult } = require("express-validator/check");
const { jwtSignin, jwtVerifyToken, validateMeChecks,serving_zipcodes,CustomerSignInValidations } = require('../middleware')
const bcrypt = require('bcrypt')
const rounds = 10
const stripe = require("stripe")(process.env.StripeSecretKey);


// Page - CSignUp  [ Creating new Customer registration ]
// This API is to create New Customer
// API Logic - After registration email will go to customer  
// localhost:3000/API/Customer/CustomerSignup
router.post('/CustomerSignup', validateMeChecks, async function (req, res, next) {


    let zip = serving_zipcodes.find(zipcode=>zipcode===req.body.zipcode) 
    if(zip===undefined) {

        return res.status(200).json({ errors: [{'msg':'we dont server this zipcode!!!'}] });
    }


    console.log("=====",zip)

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array({ onlyFirstError: true }) });
    }


    
    let admin = await CustomerSignupSchema.findOne({ email: req.body.email});

    if (admin) {
        return res.status(200).json({ errors: [{'msg':'This email already exit!!!'}] });

    }

    
    try {
    
     let CreateStripeCustomer = await   stripe.customers.create(
            
        {
              email: req.body.email,
              name: req.body.firstName +' '+ req.body.lastName
            }
          );


            let hashPassword = bcrypt.hashSync(req.body.password, rounds);

            admin = new CustomerSignupSchema({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                zipcode: req.body.zipcode,
                email: req.body.email,
                password: hashPassword,
                device_type:req.body.device_type,
                stripe_id:CreateStripeCustomer.id
               
            });
    
    
            await admin.save();

             //sending email from 
             var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dineout2018@gmail.com',
                    pass: 'dineout@2018'
                }
            });

            // sending mail to 
            var mailOptions = {
                from: 'dineout2018@gmail.com',
                to: 'Syedhaq5511@gmail.com',// req.body.email
                subject: 'Sending Email using Node.js test mail',
                text: 'Thank you for signing up!'
            };

            //sending email method or function
            let mailSentResp =  await transporter.sendMail(mailOptions)

            return res.status(200).send({ response: admin, 'route': 'https://yahoo.com', 'msg': 'Successfully Created ','cust_id':CreateStripeCustomer.id });

        }  catch (error) {
            let str = `E11000 duplicate key error collection: FirstFoodApp.customersignups index`
    
            // This below code will capture error and store it to ERROR collection 
                errs = new CaptureErrorsSchema({
                error: error,
                errorType: 'CustomerSignup',
                email: req.body.email,
                route: '',
                stripe_id:'test'
               
            });
    

            await errs.save();



            if (error.name === 'MongoError' && error.code === 11000) {
            let ermsg = error.errmsg.replace(str, `Duplicate key `).replace(/[':'",.<>\{\}\[\]\\\/]/gi, "").replace('dup key', '').replace('_1',' :')            
            console.log(error,"-------",ermsg)   
            return res.status(500).json({ errors:[{'msg':ermsg}] });
            } else {
                return res.status(500).json({ errors:[{error:error}] });
            }
        }


 

});





//Signin customer 
// This below API is to signin to Customer  portal 
// This API will generate JWT token when on successful sign in 
// localhost:3000/API/Customer/CustomerSignin



router.post('/CustomerSignin',CustomerSignInValidations,async (req, res, next) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array({ onlyFirstError: true }) });
    }


    // Check if this user already exisits
    let admin = await CustomerSignupSchema.findOne({ email: req.body.email, status: true });
    if (admin == null) {

        return res.status(200).json({ errors:[{"msg": 'That admin dose not exisits! Or deactivated, Please check login details' }]});

    }
    let compPassword = bcrypt.compareSync(req.body.password, admin.password)

    if (compPassword == false) {

        return res.status(200).json({ errors:[{"msg": 'That admin dose not exisits! Or deactivated, Please check login details' }]});

    } else {

        let adminId = admin._id

        try {

            let token = jwtSignin(req, res, next, { adminId: adminId })

            res.status(200).send({ auth: true, token: token, admin });

        } catch (err) {
            return next(err)
        }
    }
});








// Below Route is to fetch data which is stored in middleware.js file 
// Get - localhost:3000/API/Customer/Zipcodes
// redis is set to use in cache 


router.get('/Zipcodes', function (req, res) {
    console.log('hello', serving_zipcodes)
      
    //await redisSetKey('PreSetData', list) // redis code 
  
    return res.status(200).send({ 

      "serving_zipcodes": serving_zipcodes});
     
  });



module.exports = router;
