"use client";
import ConditionalRender from "@/components/common/conditional-render";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InputSearch, { ISearchOutput } from "@/components/ui/input-search";
import { Skeleton } from "@/components/ui/skeleton";
import { LOGOUT_USER } from "@/graphql/mutation/auth";
import { useUserStore } from "@/stores/userStore";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  lazy,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
const Logo = lazy(() => import("@/components/common/logo"));
import { MdNotifications } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { FaBattleNet } from "react-icons/fa";

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
      <img
        src={avatar}
        alt="Avatar"
        className="w-[40px] h-[40px] rounded-full"
      />
    </div>
  );
};

function layout({ children }: { children: ReactNode }) {
  const [mouted, setMounted] = useState(false);
  const [logoutUser] = useMutation(LOGOUT_USER);
  const { id, avatar, name, logout } = useUserStore((state) => state);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      logout();
      await logoutUser();
      router.push("/sign-in");
    } catch (error) {}
  };

  const handleSearch = useCallback((search: ISearchOutput) => {
    if (search.value) {
      const { scope, relativeId, target } = search.value;
      if (relativeId && target) {
        const { type } = scope;
        router.push(
          `/${
            target === "Chapter" ? "library" : target.toLocaleLowerCase()
          }/${type.toLocaleLowerCase()}/${relativeId}`
        );
      }
    }
  }, []);

  const handleSetting = () => {};
  const handleAccount = () => {
    router.push(`/profile/${id}`);
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
                conditional={Boolean(id)}
                fallback={<UnauthorizedUser />}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    <AvatarUser avatar={avatar ?? ""} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleAccount}>
                      <div className="flex items-center gap-2">
                        <AvatarUser avatar={avatar ?? ""} />
                        <div>{name}</div>
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
}

export default layout;
