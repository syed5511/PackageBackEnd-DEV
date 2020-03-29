const mongoose = require ('mongoose');
mongoose.set('debug',true)
mongoose.set('useCreateIndex', true);


const NonServingZipcodeSchema = mongoose.model ('NonServingZipcode', new mongoose.Schema({

   

    email:{type:String, maxlength:25,required:true,trim:true,lowercase: true},
    firstName:{type:String, maxlength:25,required:true,trim:true,lowercase: true},
    lastName:{type:String, maxlength:25,required:true,trim:true,lowercase: true},
    zip_code:{type:String, maxlength:5,required:true,trim:true,lowercase: true},
    device_type:{type:String, maxlength:10,required:true,trim:true,lowercase: true},
    create_at : { type: Date, required: true, default: Date.now }

    
    

}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
}));

exports.NonServingZipcodeSchema = NonServingZipcodeSchema;