import { Button } from "@/components/ui/button";
import { DollarSign, PiggyBank, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

export default function BudgetCard({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  function calculateAmount() {
    let budget = 0;
    let spend = 0;
    budgetList.forEach((element) => {
      budget = budget + Number(element.amount);
      spend = spend + element.totalSpend;
    });
    setTotalBudget(budget);
    setTotalSpend(spend);
  }

  useEffect(() => {
    budgetList && calculateAmount();
  }, [budgetList]);
  return (
    <div className="mt-5 grid lg:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-5">
      <div className="p-5 border rounded-md flex justify-between items-center">
        <div>
          <p>Total Budget</p>
          <h2 className="font-bold text-3xl">${totalBudget}</h2>
        </div>
        <Button className="p-2 rounded-full">
          <PiggyBank />
        </Button>
      </div>
      <div className="p-5 border rounded-md flex justify-between items-center">
        <div>
          <p>Total Spend</p>
          <h2 className="font-bold text-3xl">${totalSpend}</h2>
        </div>
        <Button className="p-2 rounded-full">
          <DollarSign />
        </Button>
      </div>
      <div className="p-5 border rounded-md flex justify-between items-center">
        <div>
          <p>No. of Budget</p>
          <h2 className="font-bold text-3xl">
            {budgetList?.length > 0 ? budgetList?.length : 0}
          </h2>
        </div>
        <Button className="p-2 rounded-full">
          <Wallet />
        </Button>
      </div>
    </div>
  );
}
