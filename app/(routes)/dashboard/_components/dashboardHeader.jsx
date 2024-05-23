import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { LayoutDashboard, PiggyBank, ReceiptText } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function DashboardHeader() {
  const [openSheet, setOpenSheet] = useState(false);

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 1,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
  ];

  const path = usePathname();
  return (
    <div className="flex p-5 items-center justify-between border-b-2">
      <div>
        <h2 className="font-bold">MoneyMap</h2>
      </div>
      <div className="hidden md:block">
        <UserButton />
      </div>
      <div className="md:hidden block">
        <Sheet open={openSheet}>
          <SheetTrigger asChild>
            <Button variant="outline" onClick={() => setOpenSheet(true)}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <Image src={"/logo.jpg"} height={60} width={60} alt="Logo" />
            {menuList.map((x) => (
              <Link href={x.path}>
                <h2
                  key={x.id}
                  className={`flex gap-2 items-center text-gray-500 p-5 font-medium cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 m-2 ${
                    path == x.path && "text-primary bg-blue-100"
                  }`}
                  onClick={() => setOpenSheet(false)}
                >
                  <x.icon />
                  {x.name}
                </h2>
              </Link>
            ))}
            <div
              className="m-2 flex items-center gap-2 p-5"
              onClick={() => setOpenSheet(false)}
            >
              <UserButton />
              <h2 className="text-gray-500 font-medium">Profile</h2>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
