import * as React from "react"

import { cn } from "@/_lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex bg-[#A9A395] whitespace-pre-wrap focus:outline-none text-[16px] font-semibold border-b-[2px] placeholder:text-opacity-70 border-[#384D49] w-[90%] placeholder:text-[14px] placeholder:text-[#384D49] py-2",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
