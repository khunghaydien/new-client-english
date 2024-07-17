"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
const OtherSignIn = () => {
  return (
    <>
      <div className="w-full max-w-[500px] mt-[100px] flex flex-col gap-6">
        <Button
          size={"xl"}
          variant={"destructive"}
          className="w-full text-[17px] font-semibold text-white py-3 rounded-sm flex items-center gap-6"
        >
          <FaGoogle></FaGoogle> Sign In with Google
        </Button>
        <Button
          size={"xl"}
          variant={"blue"}
          className="w-full text-[17px] font-semibold text-white py-3 rounded-sm flex items-center gap-6"
        >
          <FaFacebook></FaFacebook> Sign In with Facebook
        </Button>
        <Button
          size={"xl"}
          variant={"destructive"}
          className="w-full text-[17px] font-semibold text-white py-3 rounded-sm flex items-center gap-6"
        >
          <FaGoogle></FaGoogle> Sign In with Google
        </Button>
        <Button
          size={"xl"}
          variant={"blue"}
          className="w-full text-[17px] font-semibold text-white py-3 rounded-sm flex items-center gap-6"
        >
          <FaFacebook></FaFacebook> Sign In with Facebook
        </Button>
      </div>
    </>
  );
};
export default OtherSignIn;
