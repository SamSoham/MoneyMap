import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";


export default function ExpenseList({list,refreshData}){

    const {toast} = useToast()

    async function deleteEntry(id){
        const res = await db.delete(Expenses).where(eq(Expenses.id,id)).returning()

        if(res){
            toast({
                title: "Transaction completed",
                description: "Entry deleted",
            })
            refreshData()
        }
    }

    return(
        <div className="mt-5">
            
            <Table>
                <TableHeader className='bg-slate-300'>
                    <TableRow>
                        <TableHead className='font-bold'>Name</TableHead>
                        <TableHead className='font-bold'>Amount</TableHead>
                        <TableHead className='font-bold'>Date</TableHead>
                        <TableHead className='font-bold'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {list?.length>0 ? list?.map((x,index)=>(
                    <TableRow key={index}>
                        <TableCell>{x.name}</TableCell>
                        <TableCell>{x.amount}</TableCell>
                        <TableCell>{x.createdAt}</TableCell>
                        <TableCell><Trash className="text-red-600 cursor-pointer" onClick={()=>deleteEntry(x.id)}/></TableCell>
                    </TableRow>
                )) : <TableRow>
                <TableCell colSpan={4} className='text-center font-bold'>No data to display</TableCell>
        </TableRow>}
                </TableBody>
            </Table>
        </div>
    )
}