/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/User";
import verifyTokens from "../middlewares/verify-tokens";



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