import User from '../models/user.model.js';
import { connect } from '../mongodb/mongoose.js';

export const createOrUpdateUser = async (id, image_url, email_addresses, first_name, last_name) => {
    try {
        await connect();
        const user = await User.findOneAndUpdate(
            { clerkId: id },
            {
                $set: {
                    firstName: first_name,
                    lastName: last_name,
                    profilePicture: image_url,
                    email: email_addresses[0].email_address,
                },
            },
            { upsert: true, new: true }
        );
        return user;
    } catch (error) {
        console.error('Error: Could not create or update user', error);

    }
};

export const deleteUser = async (id) => {
    try {
        await connect();
        await User.findOneAndDelete({ clerkId: id });
    }
    catch (error) {
        console.error('Error: Could not delete user', error);
    }
};