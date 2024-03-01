import express from 'express';
const Router = express.Router();
import Razorpay from 'razorpay';
import crypto from 'crypto';

Router.post('/registration',async(req,res,next)=>{
    try{
        console.log(process.env.KEY_ID)
        console.log(process.env.KEY_SECRET)
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount:req.body.amount * 100,
            currency:'INR',
            receipt:crypto.randomBytes(10).toString('hex'),
        };

        instance.orders.create(options,(err,order)=>{
            if(err){
                console.log(err);
                return res.status(500).json({msg:'Something Went Wrong'})
            }
            res.status(200).json({data:order});
        });
    }catch(err){
        console.log(err)
        res.status(500).json({msg:'Internal Server Error'});
    }
});

// payment verify

Router.post('/verify',async(req,res,next)=>{
    try{
        const{razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature}=req.body;
        const sign = razorpay_order_id+"|"+razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256",process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");
        if(razorpay_signature===expectedSign){
            return res.status(200).json({msg:'Payment Verified Successfully'})
        }else{
            return res.status(400).json({msg:'Invalid Signature Sent!!'})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({msg:'Internal Server Error'});
    }
})

export default Router;