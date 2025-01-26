// import Razorpay from "razorpay";

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,  // Your Razorpay Key ID
//   key_secret: process.env.RAZORPAY_KEY_SECRET,  // Your Razorpay Secret Key
// });

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const { amount } = req.body; // You'll send the amount from the front-end (e.g., cart total)

//       const options = {
//         amount: amount * 100, // Convert to paise
//         currency: "INR", // Currency code
//         receipt: "order_receipt_11", // You can generate unique receipt ids
//       };

//       const order = await razorpayInstance.orders.create(options);
//       res.status(200).json(order);  // Send the order details back to the frontend
//     } catch (error) {
//       console.error("Error creating Razorpay order:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
