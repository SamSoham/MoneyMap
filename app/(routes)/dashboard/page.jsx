"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq, sql, getTableColumns, desc } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import BudgetCard from "./_components/budgetCard";
import MainChart from "./_components/mainChart";
import BudgetItem from "./budgets/_components/budgetItem";


export default function Dashboard(){
    const {user} = useUser()
    const [budgetlist, setBudgetlist] = useState([]);

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

      }
    
      useEffect(() => {
        user && getBudgetList();
      }, [user]);
    
    return(
        <div className="p-5">
            <h2 className="font-bold text-3xl">Hi, {user?.fullName} ✌️</h2>
            <p className="text-gray-500 ">Here's a breakdown of your spending; let's get your expenses under control</p>
            <BudgetCard budgetList={budgetlist}/>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2">
                    <h2 className="font-bold text-lg mb-3">Statistics</h2>
                        <MainChart list={budgetlist}/>
                    </div>
                    <div className="flex flex-col gap-3" >
                        <h2 className="font-bold text-lg">Budget List</h2>
                        <div className="grid gap-3 overflow-y-scroll h-[430px] border p-2 rounded-md">
                        {
                            budgetlist.map((x,index)=>(
                                <BudgetItem budget={x} key={index}/>
                            ))
                        }
                        </div>
                    </div>
            </div>

        </div>
    )
}