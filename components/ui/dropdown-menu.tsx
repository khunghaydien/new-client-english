"use client";

import * as React from "react";
import { cn, useClickOutside } from "@/lib/utils";

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {}
interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}
interface DropdownMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DropdownMenuContext = React.createContext<
  | { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }
  | undefined
>(undefined);

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className,
  children,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setOpen(false);
  });

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={ref} className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ className, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenuTrigger must be used within a DropdownMenu");
  }

  const { setOpen } = context;

  return (
    <button
      ref={ref}
      className={cn("", className)}
      {...props}
      onClick={() => setOpen((open) => !open)}
    />
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ className, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("DropdownMenuContent must be used within a DropdownMenu");
  }

  const { open } = context;

  return open ? (
    <div
      ref={ref}
      className={cn(
        "origin-top-right absolute right-0 top-10 px-2 py-1 rounded-md shadow-lg bg-muted",
        className
      )}
      {...props}
    />
  ) : null;
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "px-4 py-2 text-sm p-3 rounded-lg min-w-[200px] flex justify-start bg-muted hover:bg-primary/10",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};
