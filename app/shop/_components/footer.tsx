"use client"
import { FeedbackForm } from "./feedback-form"
export function Footer() {
  return (
    <div>
      <div className="flex flex-col gap-0">
        <div className="flex-1 bg-[#A9A395]">

          <div className="m-2 p-4 border-[1.5px] bg-[#A9A395]  text-[#384D49] border-[#384D49]">
            <p className="font-bold text-[20px]">CONTACT US:</p>
            <FeedbackForm />
            <div className="flex flex-col gap-4">
            </div>
          </div>

        </div>

        <div className="flex-1">
        </div>

      </div>
    </div>
  )
}
