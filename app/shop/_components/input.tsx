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

const Input2 = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex bg-pr border-[2px] border-gold whitespace-pre-wrap focus:outline-none text-[20px] font-semibold  placeholder:text-opacity-70  lg:w-[300px]  placeholder:text-white placeholder:opacity-50 placeholder:text-[18px] px-3 py-3",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input2.displayName = "Input"
export { Input, Input2 }
