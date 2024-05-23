import BudgetList from "./_components/budgetList";

export default function Budgets(){
    return(
        <div className="p-10">
        <div className="font-bold text-3xl">
        My Budgets
        </div>
            <BudgetList/>
        </div>
    )
}