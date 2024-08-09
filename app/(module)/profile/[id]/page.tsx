"use client";
import ConditionalRender from "@/components/common/conditional-render";
import ModalUploadImage from "@/components/common/modal-upload-image";
import { Skeleton } from "@/components/ui/skeleton";
import { UPDATE_USER } from "@/graphql/mutation/user";
import { useMutation } from "@apollo/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useCallback, useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
const AvatarUser = ({ avatar }: { avatar: string }) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={avatar}
        alt="Avatar"
        className="w-[150px] h-[150px] rounded-full"
      />
    </div>
  );
};

function ProfilePage({ params }: { params: Params }) {
  const { id } = params;
  const [updateUser, { loading }] = useMutation(UPDATE_USER);
  const [mounted, setMounted] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateAvatar = useCallback(
    async (imgSrc: string) => {
      try {
        if (imgSrc) {
          const res = await updateUser({
            variables: {
              id,
              avatar: imgSrc.split(",")[1],
            },
          });
          if (res.data.updateUser) {
            setNewAvatar(imgSrc);
          }
        }
      } catch (error) {}
    },
    [id, updateUser]
  );
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center pt-12">
      <div className="relative">
        <ConditionalRender
          conditional={mounted}
          fallback={<Skeleton className="w-[150px] h-[150px] rounded-full" />}
        >
          <AvatarUser avatar={newAvatar ? newAvatar : "avatar" ?? ""} />
        </ConditionalRender>
        <button
          className="absolute -bottom-3 left-10 right-0 m-auto w-fit p-[.35rem] rounded-full border bg-muted-foreground/10 hover:bg-muted-foreground/30"
          title="Change photo"
          onClick={() => setOpen(true)}
        >
          <MdEdit />
        </button>
        <ModalUploadImage
          open={open}
          setOpen={setOpen}
          onClose={() => setOpen(false)}
          onSubmit={updateAvatar}
          title="Select avatar"
        />
      </div>
    </div>
  );
}

export default ProfilePage;
