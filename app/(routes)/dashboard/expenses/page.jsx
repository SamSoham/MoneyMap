"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import ExpenseList from "./_components/expenseList";


export default function AllExpenses(){
    const [expenseList,setExpenseList] = useState([])
    const {user} = useUser()

    async function getAllExpenses(){
        const res = await db.select({
            id:Expenses.id,
            name:Expenses.name,
            amount:Expenses.amount,
            createdAt:Expenses.createdAt
        }).from(Budgets)
        .rightJoin(Expenses,eq(Expenses.budgetId,Budgets.id))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id))
        setExpenseList(res)
    }

    useEffect(()=>{
        user&&getAllExpenses()
    },[user])

    return(
        <div className="p-5">
        <h2 className="font-bold">Latest Expenses</h2>
        <ExpenseList list={expenseList} refreshData={()=>getAllExpenses()}/>
    </div>
    )
}