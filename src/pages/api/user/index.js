/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/User";
import Role from "../../../model/Role";
import verifyTokens from "../middlewares/verify-tokens";
// import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

const jwt = require('jsonwebtoken');
export default async (req, res) => {
    const { method } = req;
    await verifyTokens(req, res);
    await dbConnect();


    switch (method) {
        case 'POST':
            try {
               
                const userEmail = await User.findOne({ email: req.decoded });
                if (!userEmail) return res.status(400).send('Email or Password is wrong');
                
                const emailExit = await User.findOne({ email:req.body.email });
                if (emailExit) return res.status(400).send('Email Already Exist');       
                //hashed Password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
                //create new user         
                const user = new User({
                    displayName: req.body.displayName,
                    role:req.body.role,
                    email:req.body.email,
                    password:hashedPassword,
                    phoneNumber:req.body.phoneNumber,
                    country: req.body.country,
                    address: req.body.address,
                    state: req.body.state,
                    city: req.body.city,
                    zipCode: req.body.zipCode, 
                    about: req.body.about,
                    createdBy:userEmail,
                    updatedBy:userEmail,                   
                });
            
                const savedUser = await user.save();

                res.status(200).send({success: true, message: 'New User is created'});

            } catch (error) {
                res.status(400).send(error);
            }
            break;
        case 'GET':
            try{
                const user = await User.findOne({ email: req.decoded });
                if (!user) return res.status(400).send('Email or Password is wrong');               

                const userAll =  await User.find({});;

                res.status(200).send({ success: true, data: userAll});

            }catch(error){
                res.status(400).send(error);
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
    //user check   

};