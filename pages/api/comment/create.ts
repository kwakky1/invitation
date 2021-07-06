import {NextApiRequest, NextApiResponse} from "next";
import { connect } from "../../../utils/database";

export default async function (req:NextApiRequest, res:NextApiResponse){
    try {
        const {db} = await connect()
        const {
            name, password, text, date
        } = req.body;

        const result = await db.collection("message").insertOne({
            name: name,
            password: password,
            text: text,
            date: date
        })
        res.status(201);
        res.json({comment: result.ops[0]});
    } catch (e) {
        res.status(500);
        res.json({error: "Unable to insert comment "})
    }
}