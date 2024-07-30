"use client";
import ConditionalRender from "@/components/common/conditional-render";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InputSearch from "@/components/ui/input-search";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { lazy, ReactNode, useEffect, useState } from "react";
const Logo = lazy(() => import("@/components/common/logo"));
import { MdNotifications } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaBattleNet } from "react-icons/fa";
import { AuthState, User } from "@/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, signOut } from "@/reducers/auth.reduce";
import { AppDispatch } from "@/stores";
import { HttpStatusCode } from "@/enum";
import Image from "next/image";
const Icon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[40px] h-[40px] rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center">
      {children}
    </div>
  );
};
const UnauthorizedUser = () => {
  return (
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
  );
};

const AvatarUser = ({ avatar }: { avatar: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={avatar}
        alt="Avatar"
        className="w-[40px] h-[40px] rounded-full"
      />
    </div>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  const [mouted, setMounted] = useState(false);
  const { user }: AuthState = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      if (user?.id) {
        dispatch(signOut(user?.id))
          .unwrap()
          .then((res) => {
            if (res.statusCode === HttpStatusCode.OK) {
              router.push("/sign-in");
            }
          });
      }
    } catch (error) {}
  };

  const handleSearch = () => {};
  const handleSetting = () => {};
  const handleAccount = () => {
    router.push(`/profile/${user?.id}`);
  };
  return (
    <div className="">
      <nav className="w-full flex items-center justify-between px-12 py-3 text-sm border-b-[0.5px] border-muted-foreground bg-muted/30">
        <div className="flex gap-3">
          <Logo />
          <InputSearch className="max-w-[300px]" onSearch={handleSearch} />
        </div>
        <div className="flex items-center gap-2">
          {mouted ? (
            <>
              <Icon>
                <FaBattleNet className="w-[20px] h-[20px]" />
              </Icon>
              <Icon>
                <MdNotifications className="w-[20px] h-[20px]" />
              </Icon>
              <ConditionalRender
                conditional={Boolean(user?.id)}
                fallback={<UnauthorizedUser />}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    {/* <AvatarUser avatar={avatar ?? ""} /> */}avatar
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleAccount}>
                      <div className="flex items-center gap-2">
                        {/* <AvatarUser avatar={avatar ?? ""} /> */} avatar
                        <div>{user?.name}</div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleSetting}
                      className="flex gap-2"
                    >
                      <Icon>
                        <IoMdSettings className="w-[20px] h-[20px]" />
                      </Icon>
                      <div>Setting</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex gap-2"
                    >
                      <Icon>
                        <MdLogout className="w-[20px] h-[20px]" />
                      </Icon>
                      <div>Logout</div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ConditionalRender>
            </>
          ) : (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-[40px] h-[40px] rounded-full"
                />
              ))}
            </>
          )}
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
