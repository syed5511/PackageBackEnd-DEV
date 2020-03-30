const mongoose = require ('mongoose');
mongoose.set('debug',true)
mongoose.set('useCreateIndex', true);


const CustomerOrderSchema = mongoose.model ('CustomerOrder', new mongoose.Schema({


    
    customer_email:{type:String,required:true,unique:true,trim:true,},
    order_no:[{ type : String,required: true,trim:true,lowercase: true }],
    stripe_transaction:{type:String,required:true,trim:true},
    kitchen_name:{type:String,required:true,trim:true,lowercase: true},
    item_type:{type:String,required:true,trim:true,lowercase: true},
    item_name:{type:String,required:true,trim:true,lowercase: true},
    order_status :{type:String,default:false},
    delivery_status:{type:String,default:false},
    QR_CODE:{type:Number,default:false},
    create_at : { type: Date, required: true, default: Date.now }
    
    

}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
}));

exports.CustomerOrderSchema = CustomerOrderSchema;


