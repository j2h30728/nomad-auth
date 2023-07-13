import { NextApiRequest, NextApiResponse } from "next";

import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
import { METHOD } from "@/constants";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { user } = req.session;

  const profile = await client.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  return res.status(200).json({ isSuccess: true, profile });
}

export default withApiSession(
  withHandler({ methods: [METHOD.GET], isPrivate: true, handler })
);
