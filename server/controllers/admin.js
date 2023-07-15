import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';

export const signIn = async (req, res) => {
    const { password } = req.body;

    try {
        const existingUser = await Admin.findOne({ password });

        const isPasswordCorrect = password == existingUser.password

        if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Invalid Credentials' });

        const token = jwt.sign(
            { id: existingUser._id },
            'test',
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};