const mongoose = require ('mongoose');
mongoose.set('debug',true)
mongoose.set('useCreateIndex', true);


const CustomerSubscriptionSchema = mongoose.model ('CustomerSubscription', new mongoose.Schema({

  

    email:{type:String, maxlength:25,required:true,trim:true,lowercase: true},
    customer_uid:{type:String, maxlength:25,required:true,trim:true,lowercase: true},
    stripe_id:{type:String,required:true,trim:true},
    stripe_transaction:{type:String,required:true,trim:true},
    package_type:{type:String,required:true,trim:true},
    serving_plates:{type:Number,maxlength:2,required:true,trim:true},
    free_plates:{type:Number,maxlength:2,trim:true},
    total_plates:{type:Number,maxlength:3,required:true,trim:true},
    discount_type:{type:String,maxlength:15,trim:true},
    dicount_code:{type:String,maxlength:10,trim:true},
    sub_total:{type:Number,maxlength:2,required:true,trim:true},
    tax:{type:Number,maxlength:3,required:true,trim:true},
    grand_total:{type:Number,maxlength:2,required:true,trim:true}, 
    create_at : { type: Date, required: true, default: Date.now }

    
    

}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
}));

exports.CustomerSubscriptionSchema = CustomerSubscriptionSchema;


