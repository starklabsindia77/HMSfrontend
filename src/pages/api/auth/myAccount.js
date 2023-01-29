/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/User";
import verifyTokens from "../middlewares/verify-tokens";
// import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

const jwt = require('jsonwebtoken');
export default async (req, res) => {
    const { method } = req;
    await verifyTokens(req, res);
    await dbConnect();
   
    switch (method) {
        case 'GET':
            try {
               
                const user = await User.findOne({ email: req.decoded });
                if (!user) return res.status(400).send('Email or Password is wrong');
                // password check
                res.status(200).send({data:{user:user}});

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