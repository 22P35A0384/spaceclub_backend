import Adityalogins from "../models/adityalogins.js";

const Getlogin=async(req,res,next)=>{
    const user = req.body.username;
    const pass = req.body.password;
    let Resultstatus;
    try{
        Resultstatus = await Adityalogins.findOne({username:user,password:pass})
        if(Resultstatus){
            return res.status(200).json(true)
        }else{
            return res.status(200).json(false)
        }
    }catch(err){
        console.log(err)
    }
};

export default Getlogin;