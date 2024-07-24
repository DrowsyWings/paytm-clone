import TransactionList from "../../../components/transactions";

export default function TransactionsPage() {
  return (
    <div className="container px-4 py-8 bg-gradient-to-r from-sky-100 to-indigo-200">
      <h1 className="text-4xl pl-4 bg-gradient-to-r from-sky-100 to-indigo-200 text-[#6a51a6] pt-8 pb-8 font-bold">
        Transaction History
      </h1>
      <div className="bg-gradient-to-r from-sky-100 to-indigo-200 shadow overflow-hidden sm:rounded-lg">
        <TransactionList />
      </div>
    </div>
  );
}
