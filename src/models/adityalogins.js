import mongoose from "mongoose";
const schema = mongoose.Schema;

let Aditya_Logins = new schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    type_of_user:{

    }
});

export default mongoose.model('Aditya Logins',Aditya_Logins)