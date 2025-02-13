import { NowRequest, NowResponse } from "@vercel/node";

export default async function handler(req: NowRequest, res: NowResponse) {
  res.status(200).json({ message: "Hello from API" });
}
