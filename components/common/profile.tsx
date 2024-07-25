"use client";
import React, { Suspense } from "react";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { LOGOUT_USER } from "@/graphql/mutation/auth";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

function Profile() {
  const router = useRouter();
  const [logoutUser] = useMutation(LOGOUT_USER);
  const { fullname, id, logout } = useUserStore((state) => state);

  const handleLogout = async () => {
    try {
      logout();
      await logoutUser();
      router.push("/sign-in");
    } catch (error) {}
  };

  return (
    <Suspense fallback={<Skeleton className="h-[36px] w-[100px] rounded-lg" />}>
      {!id && (
        <div className="flex gap-4">
          <Button variant={"outline"}>
            <Link href="/sign-in" className="w-[90px]">
              Sign in
            </Link>
          </Button>
          <Button>
            <Link href="/sign-up" className="w-[90px]">
              Sign up
            </Link>
          </Button>
        </div>
      )}
      {id && (
        <DropdownMenu>
          <DropdownMenuTrigger>{fullname}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="min-w-40" onClick={() => {}}>Profile</DropdownMenuItem>
            <DropdownMenuItem className="min-w-40" onClick={() => {}}>Settings</DropdownMenuItem>
            <DropdownMenuItem className="min-w-40" onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Suspense>
  );
}

export default Profile;
