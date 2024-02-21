import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const authenticate = async (req: any, res: any) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All inputs are required");
        }
        // Validate if user exist in our database
        const user: any = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                'key',
                {
                    expiresIn: "2h",
                }
            );
            const authenticatedUserData = {
                token,
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    id: user._id,
                }
            }
            // user
            res.status(200).json(authenticatedUserData);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }




}