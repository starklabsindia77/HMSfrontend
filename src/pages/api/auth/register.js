/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";

import User from "../../../model/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";




export default async (req, res) => {   
    const { method } = req;
    await dbConnect();
       switch (method) {
        case 'POST':
            try{        
                const emailExit = await User.findOne({ email:req.body.email });
                if (emailExit) return res.status(400).send('Email Already Exist');       
                //hashed Password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
                //create new user         
                const user = new User({
                    displayName: req.body.displayName,
                    role:req.body.role,
                    associationSenior: req.body.associationSenior,
                    email:req.body.email,
                    password:hashedPassword,
                    phoneNumber:req.body.phoneNumber,
                    country: req.body.country,
                    address: req.body.address,
                    state: req.body.state,
                    city: req.body.city,
                    zipCode: req.body.zipCode, 
                    about: req.body.about,                   
                });
            
                const savedUser = await user.save();
                res.status(200).send({ user:user });

            }catch(error){
                res.status(400).send(error);
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;             
    }
  
};