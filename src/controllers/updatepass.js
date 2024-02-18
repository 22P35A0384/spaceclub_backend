import Userschema from '../models/newuser';

const Updatepass = async (req, res, next) => {
    const mail = req.body.email;
    const newPassword = req.body.newpass; // Corrected destructuring
    
    console.log(mail);
    console.log(req.body);
    
    try {
        const data = await Userschema.findOne({ email: mail });
        const _id = data._id;
        
        const findAndUpdate = await Userschema.findByIdAndUpdate(_id, { password: newPassword }); // Using newPassword directly
        
        console.log(data);
        console.log(findAndUpdate);
        
        if (findAndUpdate) {
            return res.status(200).json(true);
        }
    } catch (err) {
        console.log(err);
        // Handle error appropriately, e.g., return an error response
        return res.status(500).json({ error: 'Internal server error' });
    }
};


export default Updatepass;