import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { message } = req.body;
        // Process the message (e.g., save to database, send email, etc.)
        console.log("Received message:", message);
        res.status(200).json({ success: true });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
