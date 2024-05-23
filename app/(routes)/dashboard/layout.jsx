"use client";
import { Toaster } from "@/components/ui/toaster";
import DashboardHeader from "./_components/dashboardHeader";
import SideNav from "./_components/sideNav";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  async function checkUserBudgets() {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    if (result?.length === 0) {
      router.replace("/dashboard/budgets");
    }
  }

  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  return (
    <div>
      <Toaster />
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64 ">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
