"use client";
import { db } from "@/utils/dbConfig";
import CreateBudget from "./createBudget";
import { Budgets, Expenses } from "@/utils/schema";
import { eq, sql, getTableColumns, desc } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import BudgetItem from "./budgetItem";

export default function BudgetList() {
  const { user } = useUser();
  const [budgetlist, setBudgetlist] = useState([]);
  const [load, setLoad] = useState(true);

  async function getBudgetList() {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetlist(result);
    setLoad(false);
  }

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  return (
    <div className="mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <CreateBudget refreshList={() => getBudgetList()} />
        {budgetlist?.map((x, index) => (
          <BudgetItem budget={x} key={index} />
        ))}
        {load &&
          [1, 2, 3, 4].map((x) => (
            <div
              className="flex items-center space-x-4 border rounded-md h-[160px] p-4"
              key={x}
            >
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
