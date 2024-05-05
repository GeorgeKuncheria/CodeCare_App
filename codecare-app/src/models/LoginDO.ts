import {User} from "./User.ts";

export interface LoginDO {
    user: User,
    token: string
}