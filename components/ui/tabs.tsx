"use client";

import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  ReactNode,
  useTransition,
} from "react";
import { cn } from "@/lib/utils";

interface TabsContextType {
  value: string;
  setValue: (value: string) => void;
  isPending: boolean;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  children: ReactNode;
  value: string;
  className?: string;
  onClick?: () => void;
}

interface TabsContentProps {
  children: ReactNode;
  value: string;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback(
    (newValue: string) => {
      startTransition(() => {
        if (controlledValue === undefined) {
          setValue(newValue);
        }
        onValueChange?.(newValue);
      });
    },
    [controlledValue, onValueChange]
  );

  const currentValue = controlledValue !== undefined ? controlledValue : value;

  return (
    <TabsContext.Provider
      value={{ value: currentValue, setValue: handleChange, isPending }}
    >
      {children}
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 border-muted shadow-lg",
        className
      )}
    >
      {children}
    </div>
  )
);
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ children, value, className, onClick }, ref) => {
    const context = useContext(TabsContext);
    if (!context) {
      throw new Error("TabsTrigger must be used within a Tabs component");
    }

    const { value: selectedValue, setValue, isPending } = context;

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          selectedValue === value ? "bg-background text-foreground shadow" : "",
          isPending ? "bg-muted-foreground text-foreground shadow" : "",
          className
        )}
        onClick={() => {
          !!onClick && onClick();
          setValue(value);
        }}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ children, value, className }, ref) => {
    const context = useContext(TabsContext);
    if (!context) {
      throw new Error("TabsContent must be used within a Tabs component");
    }

    const { value: selectedValue } = context;

    return (
      <div
        ref={ref}
        className={cn(
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        hidden={selectedValue !== value}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
