import { ChevronDown } from "lucide-react"
import { ChevronUp } from "lucide-react"


export function FAQs() {
  function QuestionBox({ question, answer }: { question: string, answer: string }) {
    return (
      <div className="bg-sd w-[90%] py-4 text-gold flex between px-4 justify-between items-center">
        <p className="font-mr font-semibold text-[18px]">{question}</p>
        <ChevronDown size={26} />
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-[#9FC9C7] font-mr font-bold text-[25px]">
          Frequently Asked Questions
        </p>

        <div className="w-full gap-4 flex flex-col justify-center items-center">
          <QuestionBox question='How and when do i pay?' answer="askdfj" />
          <QuestionBox question='How much does shipping cost?' answer="askdfj" />
          <QuestionBox question='How and when do i pay?' answer="askdfj" />
        </div>

      </div>

    </div>
  )
}
