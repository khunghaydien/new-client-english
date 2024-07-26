"use client";
import ImageCropper from "@/components/common/upload-image";
import { useUserStore } from "@/stores/userStore";
import React, { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";

function Home() {
  const user = useUserStore((state) => state);
  const avatarUrl = useRef(user.avatar ?? "");
  const updateAvatar = (imgSrc: string) => {
    avatarUrl.current = imgSrc;
  };
  const [showPreview, closeReview] = useState(false);
  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <img
          src={avatarUrl.current}
          alt="Avatar"
          className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
        />
        <button
          className="absolute -bottom-3 left-0 right-0 m-auto w-fit p-[.35rem] rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
          title="Change photo"
          onClick={() => closeReview(true)}
        >
          <MdEdit />
        </button>
      </div>
      {showPreview && (
        <ImageCropper
          closeModal={() => closeReview(false)}
          updateAvatar={updateAvatar}
        />
      )}
    </div>
  );
}

export default Home;
