import {NextApiRequest, NextApiResponse} from "next";
import { connect } from "../../../utils/database";
import {ObjectId} from "bson";

export default async function (req:NextApiRequest, res:NextApiResponse){
    try {
        const {db} = await connect()
        const { id } = req.body
        await db.collection("message").deleteOne({_id: new ObjectId(id)})
        res.status(200).json({success: true});
    } catch (e) {
        res.status(500);
        res.json({error: "Unable to delete comment "})
    }
}