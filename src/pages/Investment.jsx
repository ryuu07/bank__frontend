import InvestmentsAvailable from "../components/InvestmentsAvailable";
import UserInvestments from "../components/UserInvestments";

function Investment() {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* My Investments Section */}
      <div className="mb-6">
        <div className="bg-slate-300 rounded-lg h-10">
          <h1 className="pl-3 font-black pt-2 text-lg sm:text-xl md:text-2xl">
            My Investments
          </h1>
        </div>
        <div className="mt-4">
          <UserInvestments />
        </div>
      </div>

      {/* Investments Available Section */}
      <div>
        <div className="bg-slate-300 rounded-lg h-10">
          <h1 className="pl-3 font-black pt-2 text-lg sm:text-xl md:text-2xl">
            Investments Available
          </h1>
        </div>
        <div className="mt-4">
          <InvestmentsAvailable />
        </div>
      </div>
    </div>
  );
}

export default Investment;
