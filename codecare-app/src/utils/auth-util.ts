import {User} from "../models/User.ts";

export function isUserInRole(user: User, roles: string[]): boolean {
    if(user) {
        const role = user.role;
        return roles.includes(role);
    }
    return false;
}