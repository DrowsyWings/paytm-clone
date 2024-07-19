import express from "express";
import db from "@repo/db/client";
import zod from "zod";
const app = express();

app.use(express.json());

app.post("/hdfc", async (req, res) => {
  const paymentinfoSchema = zod.object({
    token: zod.string(),
    userId: zod.string(),
    amount: zod.string(),
  });
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_Identifier,
    amount: req.body.amount,
  };

  if (!paymentinfoSchema.safeParse(paymentInformation).success) {
    res.status(411).json({
      message: "Wrong inputs",
    });
  }
  try {
    await db.$transaction([
      //*First query
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),

      //*Second Query
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({ message: "Captured" });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
