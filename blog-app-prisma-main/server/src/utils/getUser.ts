import JWT from "jsonwebtoken";
import { JWT_SIGNATURE } from "../keys";

export const getUser = (token: string) => {
    try {
        return JWT.verify(token, JWT_SIGNATURE) as { userId: number };
    } catch (error) {
        return null;
    }
};