"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { PenBox } from "lucide-react";

export default function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openPicker, setOpenPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);
  const { toast } = useToast();

  async function onUpdateBudget() {
    const res = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .returning();

    if (res) {
      toast({
        title: "Transaction completed",
        description: "Budget details updated",
      });
    }
    refreshData();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          <PenBox />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update the Budget</DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setOpenPicker(!openPicker)}
                className="text-lg"
              >
                {emojiIcon}
              </Button>
              <div className="absolute z-10">
                <EmojiPicker
                  open={openPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenPicker(false);
                  }}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-2">Budget name</h2>
                <Input
                  placeholder="e.g Home Decor"
                  defaultValue={budgetInfo?.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-2">Budget amount</h2>
                <Input
                  placeholder="e.g $500"
                  type="number"
                  defaultValue={budgetInfo?.amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <DialogFooter className="z-0 w-full mt-5">
                <DialogClose asChild>
                  <Button
                    className="w-full"
                    disabled={!(name && amount)}
                    onClick={onUpdateBudget}
                  >
                    Update Budget
                  </Button>
                </DialogClose>
              </DialogFooter>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
