import {NextApiRequest, NextApiResponse} from "next";
import { connect } from "../../../utils/database";

export default async function (req:NextApiRequest, res:NextApiResponse){
    try {
        const {db} = await connect()
        const comments = await db.collection("message").find().toArray();
        res.status(201);
        res.json({comments})
    } catch (e) {
        res.status(500);
        res.json({error: "Can't to get comments "})
    }
}