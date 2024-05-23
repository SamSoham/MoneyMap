'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { db } from "@/utils/dbConfig"
import { Budgets } from "@/utils/schema"
import { useUser } from "@clerk/nextjs"
import EmojiPicker from "emoji-picker-react"
import { useState } from "react"

export default function CreateBudget({refreshList}){

    const [emojiIcon,setEmojiIcon] = useState('😀')
    const [openPicker,setOpenPicker] = useState(false)
    const [name,setName] = useState('')
    const [amount,setAmount] = useState('')
    const {user} = useUser()
    const {toast} = useToast()

    async function onCreateBudget(){
        const result = await db.insert(Budgets)
        .values({
            name:name,
            amount:amount,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            icon:emojiIcon
        }).returning({insertedI:Budgets.id})
        
        if(result){
            toast({
                title: "Transaction completed",
                description: "New budget created",
            })
            refreshList()
        }
       
    }

    return(
         
        <Dialog>
        <DialogTrigger asChild><div className="flex items-center border-dashed border-2 bg-slate-100 p-10 rounded-md cursor-pointer gap-1 flex-col font-medium hover:shadow-md h-[160px]">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
        </div></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new Budget</DialogTitle>
            <DialogDescription>
              <div className='mt-5'>
                <Button variant='outline' size='lg' onClick={()=>setOpenPicker(!openPicker)} className='text-lg'>{emojiIcon}</Button>
                <div className="absolute z-10">
                    <EmojiPicker open={openPicker} onEmojiClick={(e)=>{
                        setEmojiIcon(e.emoji)
                        setOpenPicker(false)
                    }}/>
                </div>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-2">Budget name</h2>
                    <Input placeholder="e.g Home Decor" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-2">Budget amount</h2>
                    <Input placeholder="e.g $500" type='number' onChange={(e)=>setAmount(e.target.value)}/>
                </div>
                
                <DialogFooter className="z-0 w-full mt-5">
          <DialogClose asChild>
                <Button className="w-full" disabled={!(name&&amount)} onClick={onCreateBudget}>Create Budget</Button>
          </DialogClose>
        </DialogFooter>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    
    )
}