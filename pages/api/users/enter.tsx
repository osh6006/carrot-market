import mail from "@sendgrid/mail";
import twilio from "twilio";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

mail.setApiKey(process.env.SENDGRID_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  if (!user) return res.status(400).json({ ok: false });
  // const user = await client.user.upsert({
  //   // 폰번호를 찾은 후
  //   where: {
  //     ...payload,
  //   },
  //   // 없으면 만들어줌
  //   create: {
  //     name: "Anonymous",
  //     ...payload,
  //   },
  //   update: {},
  // });

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MESSAGINGID,
    //   to: process.env.TWILIO_MYPHONE!,
    //   body: `Your login token is ${payload}`,
    // });
    // console.log(message);
  } else if (email) {
    // const email = await mail.send({
    //   from: "tjsanf6043@naver.com",
    //   to: "tjsanf6043@naver.com",
    //   subject: "Your Carrot Market Verification Email",
    //   text: `Your Token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
    // console.log(email);
  }

  // if (email) {
  //   user = await client.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (user) console.log("find!!");

  //   if (!user) {
  //     console.log("Did not find. will create");
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         email,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }
  // if (phone) {
  //   user = await client.user.findUnique({
  //     where: {
  //       phone: +phone,
  //     },
  //   });
  //   if (user) console.log("find!!");

  //   if (!user) {
  //     console.log("Did not find. will create");
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         phone: +phone,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }

  res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
