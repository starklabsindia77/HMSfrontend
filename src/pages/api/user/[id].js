/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/User";
import verifyTokens from "../middlewares/verify-tokens";
import bcrypt from "bcryptjs";



export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;
    await verifyTokens(req, res);
    await dbConnect();
   
    switch (method) {
        case 'GET':
            try {
                const user = await User.findById(id);

                if (!user) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const userEmail = await User.findOne({ email: req.decoded });
                if (!userEmail) return res.status(400).send('Email or Password is wrong');
                
                req.body={updatedBy:userEmail, ...req.body}
                if(req.body.password.length > 0){
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(req.body.password, salt)
                    req.body.password = hashedPassword;
                }else{
                    delete req.body.password;
                }
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!user) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deleteduser = await User.deleteOne({ _id: id });

                if (!deleteduser) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}