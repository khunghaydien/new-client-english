"use client";
import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { Skeleton } from "../ui/skeleton";
import clsx from "clsx";

export function WholeLoading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <ImSpinner2 className="animate-spin w-12 h-12 text-primary" />
    </div>
  );
}
interface IListLoading {
  quantity: number
  width?: number
  height?: number
  direction: "vertical" | "horizontal"
}
export const ListLoading = ({ quantity, height, width, direction }: IListLoading) => {
  return (
    <div className={clsx('flex gap-2', { ['flex-col']: direction === 'vertical' })}>{
      Array.from({ length: quantity }).map((_, index) => (
        <Skeleton key={index} style={{ maxHeight: `${height}px`, maxWidth: `${width}px` }} className="w-full h-full rounded-lg" />
      ))}
    </div>
  )
}

