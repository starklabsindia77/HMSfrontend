/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import User from "../../../model/User";
import Invoice from "../../../model/Invoice";
import InvoiceCounter from "../../../model/InvoiceCounter";
import verifyTokens from "../middlewares/verify-tokens";
// import jwt from "jsonwebtoken";


export default async (req, res) => {
    const { method } = req;
    await verifyTokens(req, res);
    await dbConnect();
   
    switch (method) {
        case 'POST':
            try {
                let InvoiceNumber;
               
                const user = await User.findOne({ email: req.decoded });
                if (!user) return res.status(400).send('Email or Password is wrong');

                const Counter = await InvoiceCounter.findOneAndUpdate(
                    {id:"autoVal"},
                    {"$inc": {"seq": 1}},
                    {new: true}, async (err, cd) => {
                        if(cd == null){
                            const newVal = new InvoiceCounter({
                                id: "autoVal",
                                seq: 2000, 
                            })

                            const newValSaved = await newVal.save();
                            InvoiceNumber = 2000;
                        }else{
                            InvoiceNumber= cd.seq;
                        }

                    }
                
                )
                
                const invoiceExit = await Invoice.findOne({ invoiceNumber:req.body.invoiceNumber });
                if (invoiceExit) return res.status(400).send('Invoice Already Exist');   

                const invoice = new Invoice({
                    // invoiceNumber: req.body.invoiceNumber,
                    invoiceNumber: InvoiceNumber,
                    BookedOn: req.body.BookedOn,
                    status: req.body.status,
                    tripType: req.body.tripType,
                    airline: req.body.airline,
                    passenger: req.body.passenger,
                    baggage: req.body.baggage,
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

                console.log("role value", user.role.access.invoice)
                if (user.role.access.invoice.viewAll){
                    const invoice =  await Invoice.find({});
                    res.status(200).send({ success: true, data: invoice});
                }else if (!user.role.access.invoice.viewAll && user.role.access.invoice.view){
                    const juniorUser = await User.find({'associationSenior.email':req.decoded})
                    let invoiceData = [];
                    Promise.all(
                        juniorUser.map(async (item) => {
                            const invoice =  await Invoice.find({"createdBy.email": item.email});
                            invoiceData = [...invoice, ...invoiceData];
                        })
                    );
                    const invoice2 =  await Invoice.find({"createdBy.email": user.email});
                    invoiceData = [...invoiceData, ...invoice2];                    
                    res.status(200).send({ success: true, data: invoiceData});
                }else {
                    const invoice =  await Invoice.find({"createdBy.email": user.email});
                    res.status(200).send({ success: true, data: invoice});
                }  
                // const invoice =  await Invoice.find({});
                // res.status(200).send({ success: true, data: invoice});            

                

            }catch(error){
                res.status(200).send({ success: false, data: error.message});
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
    //user check   

};