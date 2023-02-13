/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import Invoice from "../../../model/Invoice";
import User from "../../../model/User";





export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;
    await dbConnect();
    const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
    
   
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
                // const userEmail = await User.findOne({ email: req.decoded });
                // if (!userEmail) return res.status(400).send('Email or Password is wrong');
                console.log("IP", ip);
                const status = true;
                const date = new Date();
                const invoice = await Invoice.findByIdAndUpdate(id, {'userIPData.IP':ip, userStatus: status, updatedAt: date }, {
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
        // case 'DELETE':
        //     try {
        //         const deletedrole = await Invoice.deleteOne({ _id: id });

        //         if (!deletedrole) {
        //             return res.status(400).json({ success: false })
        //         }

        //         res.status(200).json({ success: true, data: {} });
        //     } catch (error) {
        //         res.status(400).json({ success: false })
        //     }
        //     break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}