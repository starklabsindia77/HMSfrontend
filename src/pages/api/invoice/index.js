/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/User";
import Invoice from "../../../model/Invoice";
import verifyTokens from "../middlewares/verify-tokens";
// import jwt from "jsonwebtoken";


export default async (req, res) => {
    const { method } = req;
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
        case 'POST':
            try {
               
                const user = await User.findOne({ email: req.decoded });
                if (!user) return res.status(400).send('Email or Password is wrong');
                
                const invoiceExit = await Invoice.findOne({ invoiceNumber:req.body.invoiceNumber });
                if (invoiceExit) return res.status(400).send('Invoice Already Exist');   

                const invoice = new Invoice({
                    invoiceNumber: req.body.invoiceNumber,
                    BookedOn: req.body.BookedOn,
                    status: req.body.status,
                    tripType: req.body.tripType,
                    airline: req.body.airline,
                    passenger: req.body.passenger,
                    Name: req.body.Name,
                    Email: req.body.Email,
                    Mobile: req.body.Mobile,
                    Card: req.body.Card,
                    AdtFare: req.body.AdtFare,
                    taxes: req.body.taxes,
                    subTotal: req.body.subTotal,
                    travellerAssist: req.body.travellerAssist,
                    flightMonitor: req.body.flightMonitor,
                    GrandTotal: req.body.GrandTotal,
                    userStatus: req.body.userStatus,
                    createdBy:user,
                    updatedBy:user,                                      
                });
                const invoiceSaved = await invoice.save();

                res.status(200).send({success: true, message: 'New invoice is created', data: invoiceSaved});

            } catch (error) {
                res.status(400).send(error);
            }
            break;
        case 'GET':
            try{
                const user = await User.findOne({ email: req.decoded });
                if (!user) return res.status(400).send('Email or Password is wrong'); 
                if (user.role.access.invoice.view){
                    const invoice =  await Invoice.find({});
                    res.status(200).send({ success: true, data: invoice});
                }else if(!user.role.access.invoice.view && user.role.invoice.viewBy){
                    const invoice =  await Invoice.find({"createdBy.email": user.email});
                    res.status(200).send({ success: true, data: invoice});
                }  
                // const invoice =  await Invoice.find({});
                // res.status(200).send({ success: true, data: invoice});            

                

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