/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/User";
// import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

const jwt = require('jsonwebtoken');
export default async (req, res) => {
    const { method } = req;
    await dbConnect();
    

    switch (method) {
        case 'POST':
            try {
                const user = await User.findOne({ email: req.body.email });
                if (!user) return res.status(400).send('Email or Password is wrong');
                // password check
                const validPass = await bcrypt.compare(req.body.password, user.password);
                if (!validPass) return res.status(400).send('Invalid Password')
                
                
                const token = await jwt.sign(user.email, process.env.SECRET);
                res.status(200).send({accessToken: token, user:user});

            } catch (error) {
                res.status(400).send(error);
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
    //user check   

};