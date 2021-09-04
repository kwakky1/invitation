import {NextApiRequest, NextApiResponse} from "next";
import { connect } from "../../../utils/database";
import {ObjectId} from "bson";

export default async function (req:NextApiRequest, res:NextApiResponse){
    try {
        const {db} = await connect()
        const { id, name, password, text, date } = req.body
        await db.collection("message").updateOne({_id: new ObjectId(id)},{
            $set : {
                name: name,
                password: password,
                text: text,
                date: date
            }
        })
        res.status(200).json({success: true});
    } catch (e) {
        res.status(500);
        res.json({error: "Unable to delete comment "})
    }
}