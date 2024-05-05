import mongoose, {Schema} from "mongoose";
import schemaConfig from "./schema-config.js";
import jwt from "jsonwebtoken";

const loginSchema = new mongoose.Schema({
    id: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    role: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Role"
    },
    tokens: Array
}, schemaConfig);

loginSchema.methods.generateAuthToken = async function (secretKey) {
    const user = this;
    let token;
    if(user.tokens.length === 0) {
        token = jwt.sign({_id: user._id.toString()}, secretKey);
        user.tokens.push(token);
        await user.save();
    } else {
        token = user.tokens[0];
    }
    return token;
};

const Login = mongoose.model('login', loginSchema);
export default Login;