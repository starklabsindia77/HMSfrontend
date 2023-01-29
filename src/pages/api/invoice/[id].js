/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import Invoice from "../../../model/Invoice";
import User from "../../../model/User";
import verifyTokens from "../middlewares/verify-tokens";



export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;
    await verifyTokens(req, res);
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
        case 'GET':
            try {
                const invoice = await Invoice.findById(id);

                if (!invoice) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: invoice });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const userEmail = await User.findOne({ email: req.decoded });
                if (!userEmail) return res.status(400).send('Email or Password is wrong');
                
                req.body={updatedBy:userEmail, ...req.body}
                const invoice = await Invoice.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!invoice) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: invoice });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedrole = await Invoice.deleteOne({ _id: id });

                if (!deletedrole) {
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