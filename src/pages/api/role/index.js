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
               
                const user = await User.findOne({ email: req.decoded });
                if (!user) return res.status(400).send('Email or Password is wrong');
                
                const roleExit = await Role.findOne({ roleName:req.body.roleName });
                if (roleExit) return res.status(400).send('Role Already Exist');   

                const role = new Role({
                    roleName: req.body.roleName,
                    access:req.body.access, 
                    createdBy:user,
                    updatedBy:user,                                      
                });
                const roleSaved = await role.save();

                res.status(200).send({success: true, message: 'New Role is created'});

            } catch (error) {
                res.status(400).send(error);
            }
            break;
        case 'GET':
            try{
                const user = await User.findOne({ email: req.decoded });
                if (!user) return res.status(400).send('Email or Password is wrong');               

                const role =  await Role.find({});;

                res.status(200).send({ success: true, data: role});

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