"use client";
import { useEffect, useState } from "react";
import transactionList from "../app/lib/actions/transactions";
import Loader from "./Loader";
// Define the types to match your server-side types
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

type Transaction = OnRampTransaction | P2PTransaction;

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await transactionList();
        if (response && "transactions" in response) {
          setTransactions(response.transactions);
        } else if (Array.isArray(response)) {
          setTransactions(response);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center mt-8">
        <Loader />
      </div>
    );
  }
  if (transactions.length === 0) {
    return <div className="text-center mt-8">No transactions found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-indigo-200 to-sky-100 border border-indigo-200 r shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <li
              key={`${transaction.type}-${transaction.id}`}
              className="px-4 py-4 sm:px-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {transaction.type === "onRamp"
                      ? "Money added to Wallet"
                      : transaction.type === "sent"
                        ? "Sent"
                        : "Received"}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    {transaction.type === "onRamp"
                      ? `Provider: ${transaction.provider}`
                      : transaction.type === "sent"
                        ? `To: ${transaction.toUser?.name || transaction.toUser?.number}`
                        : `From: ${transaction.fromUser?.name || transaction.fromUser?.number}`}
                  </p>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <p
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      transaction.type === "sent"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {transaction.type === "onRamp"
                      ? `₹${transaction.amount / 100}`
                      : transaction.type === "sent"
                        ? `-₹${transaction.amount}`
                        : `+₹${transaction.amount}`}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p>{getFormattedDate(transaction)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function getFormattedDate(transaction: Transaction): string {
  const date =
    "startTime" in transaction ? transaction.startTime : transaction.timestamp;
  return date ? new Date(date).toLocaleString() : "Date not available";
}
