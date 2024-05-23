"use client";
import Image from "next/image";
import { LayoutDashboard, PiggyBank, ReceiptText } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideNav() {
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
    <div className="h-screen p-5 border shadow-sm">
      <Image src={"/logo.jpg"} height={60} width={60} alt="Logo" />
      <div className="mt-5">
        {menuList.map((x) => (
          <Link href={x.path}>
            <h2
              key={x.id}
              className={`flex gap-2 items-center text-gray-500 p-5 font-medium cursor-pointer rounded-md hover:text-primary hover:bg-blue-100 mb-2 ${
                path == x.path && "text-primary bg-blue-100"
              }`}
            >
              <x.icon />
              {x.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
