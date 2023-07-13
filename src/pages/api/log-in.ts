import type { NextApiRequest, NextApiResponse } from "next";

import { METHOD } from "@/constants";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, name } = req.body;

  if (!email || !name) {
    return res
      .status(404)
      .json({ isSuccess: false, message: "잘못된 입력입니다." });
  }

  const user = await client.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(409).json({
      isSuccess: false,
      message: "잘못된 입력입니다.",
    });
  }

  return res
    .status(200)
    .json({ isSuccess: true, message: "로그인 되었습니다." });
}

export default withApiSession(withHandler({ methods: [METHOD.POST], handler }));
