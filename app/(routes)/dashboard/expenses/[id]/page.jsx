"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useEffect, useState } from "react";
import { eq, sql, getTableColumns, desc } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_components/budgetItem";
import { Skeleton } from "@/components/ui/skeleton";
import AddExpense from "../_components/addExpense";
import ExpenseList from "../_components/expenseList";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/editBudget";

export default function Expense({ params }) {
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenseInfo,setExpenseInfo] = useState([])
  const { user } = useUser();
  const {toast} = useToast()
  const router = useRouter()


  async function getExpenseInfo(){
    const res = await db
    .select()
    .from(Expenses)
    .where(eq(Expenses.budgetId,params.id))
    .orderBy(desc(Expenses.id))
    setExpenseInfo(res)
  }

  async function getBudgetInfo() {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id);
    setBudgetInfo(result[0]);
    getExpenseInfo()
  }

  async function deleteBudget(){

    const deleteExpense = await db.delete(Expenses).where(eq(Expenses.budgetId,params.id))
    
    if(deleteExpense){
        const res = await db.delete(Budgets).where(eq(Budgets.id,params.id)).returning()
     
    if(res){
        toast({
            title: "Transaction completed",
            description: "Budget deleted",
        })
        router.replace('/dashboard/budgets')
    }
    }
  }


  useEffect(() => {
    getBudgetInfo();
  }, [params]);

  return (
    <div className="p-10">
      <div className="flex justify-between">
      <h2 className="font-bold text-3xl">My Expenses</h2>
      <div className="flex justify-between gap-1">
        {budgetInfo?.name && <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()}/>}
      <AlertDialog>
        <AlertDialogTrigger asChild><Button className='flex gap-2 items-center' variant='destructive'><Trash/>Delete</Button></AlertDialogTrigger>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete
        and remove your data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteBudget}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
      
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5  gap-5">
        {
            budgetInfo? <BudgetItem budget={budgetInfo}/> :
            <div className="flex items-center space-x-4 border rounded-md h-[160px] p-4" >
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        }
              <AddExpense budgetId={params.id} user={user} refreshData={()=>getBudgetInfo()}/>
      </div>
      <div>
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <ExpenseList list={expenseInfo} refreshData={()=>getBudgetInfo()}/>
      </div>
    </div>
  );
}
