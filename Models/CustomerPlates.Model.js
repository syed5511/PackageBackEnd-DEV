const mongoose = require ('mongoose');
mongoose.set('debug',true)
mongoose.set('useCreateIndex', true);


const CustomerPlatesSchema = mongoose.model ('CustomerPlates', new mongoose.Schema({


    
    email:{type:String,required:true,unique:true,trim:true,},
    orders:[{ "order_no" : String,required: true,trim:true,lowercase: true },{ "order_date" : String,required: true,trim:true,lowercase: true }],
    stripe_transaction:{type:String,required:true,trim:true},
    create_at : { type: Date, required: true, default: Date.now }
    
    

}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
}));

exports.CustomerPlatesSchema = CustomerPlatesSchema;


