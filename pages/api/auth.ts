// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const { type, email, password } = req.body;
    switch (type) {
      case "signup": {
        const user = await prisma.user.create({
          data: {
            email,
            password,
          },
          select: {
            email: true,
            password: false,
          },
        });
        return res.status(200).json({ user, message: "ok" });
      }

      case "login": {
        try {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
            include: {
              transaction: true,
            },
          });
          if (user?.password === password) {
            return res.status(200).json({
              user: { id: user?.id, email: user?.email, amount: user?.amount },
              transaction: user?.transaction,
              verified: true,
              message: "ok",
            });
          } else {
            return res
              .status(404)
              .json({ verified: false, message: "Password incorrect" });
          }
        } catch (error) {
          return res
            .status(404)
            .json({ verified: false, message: "User not found" });
        }
      }
      default:
        return res.status(405).json({ message: "Type not allowed" });
    }
  } catch (error) {}
  res.status(200).json({ name: "John Doe" });
}
