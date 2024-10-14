import mongoose from "mongoose";
const d = new mongoose.Schema({
    fields: [{
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        }
    }],
    email:{
        type:String,
        required:true

    }
})
const Data = mongoose.models.data || mongoose.model('data', d)


const submit=new mongoose.Schema({
    formBuilderid:String,
    submittedData:[
        {
            key:String,
            value:String
        }
    ]
})
const formSubmission=mongoose.models.formSubmission || mongoose.model('formSubmission',submit)
export {Data,formSubmission}