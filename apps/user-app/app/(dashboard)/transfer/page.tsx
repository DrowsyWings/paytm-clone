import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-screen bg-gradient-to-r from-sky-100 to-indigo-200">
      <div className="text-4xl pl-4 bg-gradient-to-r from-sky-100 to-indigo-200 text-[#6a51a6] pt-8 pb-8 font-bold">
        Transfer
      </div>
      <div className="bg-gradient-to-r from-sky-100 to-indigo-200 grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div className="">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>
      </div>
      <div className=" w-full p-4">
        <OnRampTransactions transactions={transactions} />
      </div>
    </div>
  );
}
