const mongoose = require ('mongoose');
mongoose.set('debug',true)
mongoose.set('useCreateIndex', true);


const CustomerDeliveryAddressSchema = mongoose.model ('CustomerDeliveryAddress', new mongoose.Schema({

    

    email:{type:String, maxlength:25,required:true,trim:true,lowercase: true},
    //customer_uid:{type:String, maxlength:25,required:true,trim:true,lowercase: true},
    address:{type:String, maxlength:25,required:true,trim:true,lowercase: true},
    state:{type:String, maxlength:10,required:true,trim:true,lowercase: true},
    city:{type:String, maxlength:10,required:true,trim:true,lowercase: true},
    zip_code:{type:String, maxlength:5,required:true,trim:true,lowercase: true},
    phone:{type:Number, maxlength:10,required:true,trim:true,lowercase: true},
    address_type:{type:String, maxlength:10,required:true,trim:true,lowercase: true},
    default_address:{type:String, maxlength:10,required:true,trim:true,lowercase: true},
    create_at : { type: Date, required: true, default: Date.now }

    
    

}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
}));

exports.CustomerDeliveryAddressSchema = CustomerDeliveryAddressSchema;