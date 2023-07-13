import { METHOD } from "@/constants";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { email, name } = req.body;
  client.user.create({
    data: {
      name,
      email,
    },
  });

  res.status(200).json({ isSuccess: true, message: "회원가입 완료되었습니다" });
}

export default withHandler({ methods: [METHOD.POST], handler });
