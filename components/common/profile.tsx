"use client";
import React from "react";
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

function Profile() {
  const router = useRouter();
  const [logoutUser] = useMutation(LOGOUT_USER);
  const { fullname, image, id, logout } = useUserStore((state) => state);

  const handleLogout = async () => {
    try {
      logout();
      await logoutUser();
      router.push("/sign-in");
    } catch (error) {
      console.log("something went wrong: ", error);
    }
  };
  return (
    <>
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
            <DropdownMenuItem onClick={() => {}}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

export default Profile;
