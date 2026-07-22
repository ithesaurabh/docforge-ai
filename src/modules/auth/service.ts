import authRepository from "./repository.js";
import ApiError from "../../utils/ApiError.js";
import bcrypt from "bcrypt";
import { V4 } from "paseto";
import { privateKey } from "../../utils/paseto.js";


const login = async (email: string, password: string) => {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new ApiError(400, "Invalid email or password.");
    }

    if(!user.isActive){
        throw new ApiError(400, "Your account is inactive. Please contact admin.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid email or password.");
    }

    const token = await V4.sign(
        {
            sub: user.id,
            version: user.tokenVersion
        },
        privateKey,
        {
            expiresIn: "7 days"
        }
    );
    return {
        token
    };
};

export default { login };