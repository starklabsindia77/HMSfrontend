/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/User";
// import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

const jwt = require('jsonwebtoken');
export default async (req, res) => {
    const { method } = req;
    await dbConnect();
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

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