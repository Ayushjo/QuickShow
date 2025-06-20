import mongoose, {Schema} from "mongoose"


const UserSchema = new Schema({
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
        type:String,
        requried:true
    }


},{
    timestamps:true
})


export const User = mongoose.model("User",UserSchema)