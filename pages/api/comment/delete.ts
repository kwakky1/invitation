import {NextApiRequest, NextApiResponse} from "next";
import { connect } from "../../../utils/database";

export default async function (req:NextApiRequest, res:NextApiResponse){
    try {
        const {db} = await connect()
        const { id } = req.body
        res.status(201);
        await db.collection("message").deleteOne({"_id": id})
        res.status(200).json({success: true});
    } catch (e) {
        res.status(500);
        res.json({error: "Unable to delete comment "})
    }
}