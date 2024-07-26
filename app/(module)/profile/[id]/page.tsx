"use client";
import ImageCropper from "@/components/common/upload-image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUserStore } from "@/stores/userStore";
import React, { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";

function Home() {
    const user = useUserStore((state) => state);
    const avatarUrl = useRef(user.avatar ?? "");
    const updateAvatar = (imgSrc: string) => {
        avatarUrl.current = imgSrc;
    };
    const [open, setOpen] = useState(false);
    return (
        <div className="flex flex-col items-center pt-12">
            <div className="relative">
                <img
                    src={avatarUrl.current}
                    alt="Avatar"
                    className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
                />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <button
                            className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
                            title="Change photo"
                        >
                            <MdEdit />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="min-w-[900px]">
                        <DialogHeader>
                            <DialogTitle>{'gggg'}</DialogTitle>
                        </DialogHeader>
                        <ImageCropper
                            closeModal={() => setOpen(false)}
                            updateAvatar={updateAvatar}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default Home;
