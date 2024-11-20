import Credit from "../components/Credit";
import TransactionHistoryComponent from "../components/TransactionHistoryComponent";
import Transfer from "../components/Transfer";

export default function Transactions() {
  return (
    <div className="flex flex-col items-center p-6 space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-6 md:space-y-0">
        <Credit />
        <Transfer />
      </div>
      <div className="w-full">
        <TransactionHistoryComponent />
      </div>
    </div>
  )
}
