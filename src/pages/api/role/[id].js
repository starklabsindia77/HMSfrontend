/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import Role from "../../../model/Role";
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
                const role = await Role.findById(id);

                if (!role) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: role });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const userEmail = await User.findOne({ email: req.decoded });
                if (!userEmail) return res.status(400).send('Email or Password is wrong');
                
                req.body={updatedBy:userEmail, ...req.body}
                const role = await Role.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                const UserWithTheRole = await User.find({"role.roleName": role.roleName});
                UserWithTheRole.map(async (item) =>{                    
                    await User.findByIdAndUpdate(item.id, { "role": role }, {
                        new: true,
                        runValidators: true
                    });
                })

                if (!role) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: role });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedrole = await Role.deleteOne({ _id: id });

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