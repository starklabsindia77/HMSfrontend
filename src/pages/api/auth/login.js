/* eslint-disable import/no-anonymous-default-export */
// import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
// import NextCors from "nextjs-cors";
// import { phraseResolver } from "../../util/api";


dbConnect();

export default async (req, res) => {
    res.status(200).json({ success: true, data: "notes" });
};