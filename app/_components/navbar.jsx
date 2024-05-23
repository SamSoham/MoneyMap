"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center shadow-md">
      <Image src={"/logo.jpg"} height={60} width={60} alt="Logo" />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
