const mongoose = require ('mongoose');
mongoose.set('debug',true)
mongoose.set('useCreateIndex', true);


const CaptureErrorsSchema = mongoose.model ('Error', new mongoose.Schema({


    error:{type:String,trim:true},
    errorType:{type:String,trim:true},
    email:{type:String,required:true,trim:true},
    route:{type:String,trim:true},
    stripe_id:{type:String,trim:true},
    create_at : { type: Date, required: true, default: Date.now }
    
    

}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
}));

exports.CaptureErrorsSchema = CaptureErrorsSchema;


