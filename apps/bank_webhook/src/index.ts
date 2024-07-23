import express from "express";
import db from "@repo/db/client";
import zod from "zod";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/hdfc", async (req, res) => {
  const paymentinfoSchema = zod.object({
    token: zod.string(),
    userId: zod.number(),
    amount: zod.string(),
  });
  //TODO: Check if this onRampTxns is processing or not
  const paymentInformation: {
    token: string;
    userId: number;
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
          userId: paymentInformation.userId,
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
    res.status(200).json({ message: "Captured" });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
