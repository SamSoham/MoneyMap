import Link from "next/link";

export default function BudgetItem({ budget }) {

    function calcPercent(){
        const percent = (budget?.totalSpend/budget?.amount)*100
        return percent.toFixed(2)
    }
  return (
    <Link href={`/dashboard/expenses/${budget?.id}`}>
    <div className=" border rounded-md p-5 hover:shadow-md cursor-pointer h-[160px]">
        <div className="flex justify-between items-center ">
      <div className="flex gap-2 items-center">
        <h2 className="text-3xl rounded-full bg-slate-200 p-2">
          {budget?.icon}
        </h2>
        <div>
          <h2 className="font-bold">{budget?.name}</h2>
          <h2 className="text-sm">{budget?.totalItem} Item</h2>
        </div>
      </div>
      <h2 className="font-bold text-primary">${budget?.amount}</h2>
    </div>
    <div className="mt-5">
        <div className="flex justify-between mb-2">
            <h2 className="text-xs text-slate-700 font-medium">${budget?.totalSpend?budget?.totalSpend:0} Spend</h2>
            <h2 className="text-xs text-slate-700 font-medium">${budget?.amount-budget?.totalSpend} Remaining</h2>
        </div>
            <div className="w-full h-2 bg-slate-200 rounded-lg">
                <div className=" bg-primary h-2 rounded-lg" style={{width:`${calcPercent()}%`}}></div>
            </div>
    </div>
    </div>
    </Link>
  );
}
