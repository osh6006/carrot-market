import { withIronSessionApiRoute } from "iron-session/next";

const cookieOptions = {
  cookieName: "crrotsession",
  password: process.env.COOKIE_PASSWORD!,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
