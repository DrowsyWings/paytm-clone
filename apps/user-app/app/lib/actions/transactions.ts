"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

// Define types for each transaction kind

enum OnRampStatus {
  Success,
  Failure,
  Processing,
}

type OnRampTransaction = {
  type: "onRamp";
  id: number;
  status: OnRampStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId: number;
};

type P2PTransaction = {
  type: "sent" | "received";
  id: number;
  amount: number;
  timestamp: Date;
  fromUserId: number;
  toUserId: number;
  fromUser?: { name: string | null; number: string };
  toUser?: { name: string | null; number: string };
};

// Union type for all transactions
type Transaction = OnRampTransaction | P2PTransaction;

type TransactionListResult = {
  transactions: Transaction[];
  error?: string;
};

export default async function transactionList(): Promise<TransactionListResult> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return { transactions: [], error: "Unauthenticated" };
  }

  try {
    const onRampTransactions = await prisma.onRampTransaction.findMany({
      where: { userId: Number(userId) },
      orderBy: { startTime: "desc" },
    });

    const sentTransfers = await prisma.p2pTransfer.findMany({
      where: { fromUserId: Number(userId) },
      include: { toUser: { select: { name: true, number: true } } },
      orderBy: { timestamp: "desc" },
    });

    const receivedTransfers = await prisma.p2pTransfer.findMany({
      where: { toUserId: Number(userId) },
      include: { fromUser: { select: { name: true, number: true } } },
      orderBy: { timestamp: "desc" },
    });

    const allTransactions: Transaction[] = [
      ...onRampTransactions.map(
        (t): OnRampTransaction => ({
          ...t,
          type: "onRamp",
          status: t.status as unknown as OnRampStatus,
        })
      ),
      ...sentTransfers.map((t): P2PTransaction => ({ ...t, type: "sent" })),
      ...receivedTransfers.map(
        (t): P2PTransaction => ({ ...t, type: "received" })
      ),
    ].sort((a, b) => {
      const dateA = "startTime" in a ? a.startTime : a.timestamp;
      const dateB = "startTime" in b ? b.startTime : b.timestamp;
      return dateB.getTime() - dateA.getTime();
    });

    return { transactions: allTransactions };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { transactions: [], error: "Error fetching transactions" };
  }
}
