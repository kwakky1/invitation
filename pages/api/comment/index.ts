import {NextApiRequest, NextApiResponse} from "next";
import { connect } from "../../../utils/database";

export default async function (req:NextApiRequest, res:NextApiResponse){
    try {
        const {db} = await connect()
        let {page, size} = req.body
        if(!page) page = 1;
        if(!size) size = 5;
        const limit = parseInt(size);
        const skip = (parseInt(page) - 1) * size
        const comments = await db.collection("message").find().sort( { "_id": -1 } ).limit(limit).skip(skip).toArray();
        const count = await db.collection("message").find().toArray()
        res.status(201);
        res.json({comments: comments, count: count.length})
    } catch (e) {
        res.status(500);
        res.json({error: "Can't to get comments "})
    }
}