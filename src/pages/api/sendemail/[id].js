/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../utils/dbConnect';
import Invoice from '../../../model/Invoice';
import User from '../../../model/User';
import verifyTokens from '../middlewares/verify-tokens';

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  // await verifyTokens(req, res);
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
        const invoice = await Invoice.findById(id);

        if (!invoice) {
          return res.status(400).json({ success: false });
        }
        let nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          port: 465,
          host: 'premium233.web-hosting.com',
          auth: {
            user: 'info@tripdeals.net',
            pass: 'Noki@lumi@52',
          },
          secure: true,
        });
        const mailData = {
          from: 'info@tripdeals.net',
          to: invoice.Email,
          subject: `Booking Confirmation to ${invoice.Name}`,
          // text: req.body.message + ' | Sent from: ' + req.body.Email,
          html: `<body>
                <h3>Dear ${invoice.Name},</h3>
                <p>Congratulations! You have completed your booking with https://www.hms-travel.com/</p>
                <p>Click on below link to confirm the itinerary.</p>
                <p>Xyz .com</p>
                <p>Your Booking ID: ${invoice.invoiceNumber}</p>
                <p>For latest updates related to COVID-19 please visit https://www.hms-travel.com/</p>
                </body>`,
        };
        transporter.sendMail(mailData, function (err, info) {
          if (err) console.log(err);
          else console.log(info);
        });
        // res.status(200);

        res.status(200).json({ success: true, data: invoice });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
