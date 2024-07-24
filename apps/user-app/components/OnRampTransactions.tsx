import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return " border-yellow-300 text-yellow-500";
      case "failure":
        return " border-red-300 text-red-500";
      case "success":
        return " border-green-300 text-green-500";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t, index) => (
          <div
            key={index}
            className={`flex justify-between p-4 mb-4 border rounded-lg ${getStatusColor(t.status)}`}
          >
            <div className="grid grid-rows-3 gap-1">
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
              <div className="text-base font-semibold">{t.status}</div>
            </div>
            <div className="flex flex-col justify-center font-bold">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
