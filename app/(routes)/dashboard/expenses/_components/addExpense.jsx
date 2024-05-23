import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/utils/dbConfig";
import { Expenses, Budgets } from "@/utils/schema";
import { Loader } from "lucide-react";
import moment from "moment";
import { useState } from "react";

export default function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loader, setLoader] = useState(false);
  const { toast } = useToast();

  async function addNewExpense() {
    setLoader(true);
    const res = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/YYYY"),
      })
      .returning({ insertedI: Budgets.id });

    if (res) {
      toast({
        title: "Transaction completed",
        description: "New expense added",
      });
      refreshData();
      setAmount("");
      setName("");
    }
    setLoader(false);
  }

  return (
    <div className="p-5 rounded-lg border">
      <div className="font-bold text-2xl">Expense</div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-2">Expense name</h2>
        <Input
          placeholder="e.g Home Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-2">Expense amount</h2>
        <Input
          type="number"
          value={amount}
          placeholder="e.g Home Decor"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        className="w-full mt-4"
        disabled={!(name && amount)}
        onClick={addNewExpense}
      >
        {loader ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}
