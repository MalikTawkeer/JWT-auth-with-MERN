import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    } ,
    password:{
        type: String,
        required: [true, 'password is required']
    }
})

//encrypt password before saving
userSchema.pre("save", async function (){
    const salt = await bcryptjs.genSalt()
    this.password = await bcryptjs.hash(this.password, salt)
})

//custom login funtion
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({email})
    if(user){
        const auth = await bcryptjs.compare(password, user.password)
        if(auth) {
            return user;
        }
        throw Error("incorrect password")
    }
    throw Error("incorrect email")
}

export const User = mongoose.model('User', userSchema)