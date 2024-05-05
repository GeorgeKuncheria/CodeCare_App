import {setErrorCode, setSuccessResponse} from "../utils/response-handler.js";
import {StatusCodes} from "http-status-codes";
import Stripe from "stripe";

export const donate = async (request, response, next) => {
    const stripe = new Stripe(process.env.STRIPE_KEY);
    try {
        let user = {};
        if (request.user) {
            user = request.user.user;
        }
        const amount = request.body.amount;
        let message = "Thank you stranger!";
        if (user) {
            message = "Thank you " + user.firstname + " " + user.lastname + " !";
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Donation",
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            success_url: 'http://localhost:3002/donate/success',
            cancel_url: 'http://localhost:3002/donate/cancel'
        });
        setSuccessResponse(StatusCodes.OK, {url: session.url}, response);
    } catch (error) {
        console.log(error);
        //setErrorCode(StatusCodes.INTERNAL_SERVER_ERROR, response);
    }
}