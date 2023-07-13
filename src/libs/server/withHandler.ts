import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type ResponseType = {
  isSuccess: boolean;
  message: string;
  [key: string]: any;
};

type Method = "GET" | "POST" | "PATCH" | "DELETE";
interface ConfigType {
  methods: Method[];
  handler: NextApiHandler;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  handler,
  isPrivate,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res
        .status(401)
        .json({ isSuccess: false, message: "잘못된 접근입니다." });
    }
    try {
      await handler(req, res);
    } catch (error) {
      return res
        .status(500)
        .json({ isSuccess: false, message: JSON.stringify(error) });
    }
  };
}
