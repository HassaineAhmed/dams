"use client"
import { ChevronDown } from "lucide-react"
import { ChevronUp } from "lucide-react"
import { useState } from "react"
import styles from "../../style.module.css"
import { Collapse } from "react-collapse"


export function FAQs() {

  function FAQComponent({ question, answer }: { question: string, answer: string }) {
    const [open, setOpen] = useState(false);
    const [chevronAnimataion, setChevronAnimation] = useState("")
    console.log(open)

    function Head() {
      return (
        <button className={`flex border-[2px] border-gold justify-center items-center outline-0`} onClick={() => {
          setOpen(prev => !prev);
          if (open) {
            setChevronAnimation("animate-rotateChevronDown")
          } else {
            setChevronAnimation("animate-rotateChevron")
          }
        }}>
          <div className="bg-sd w-full py-4 text-gold flex between px-4 justify-between items-center">
            <p className="font-mr font-semibold text-[18px]">{question}</p>
            <div className={`${chevronAnimataion}`}>
              <ChevronDown size={26} />
            </div>
          </div>
        </button>
      )
    }

    function Body() {
      return (
        <Collapse isOpened={open}>
          <div className="bg-formGreen border-[2px] border-gold border-t-0 p-2" >
            <p className="text-[10ox]">
              {answer}
            </p>
          </div>
        </Collapse>
      )
    }
    return (
      <div className="flex-col w-[90%] flex gap-0">
        <Head />
        <Body />
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-[#9FC9C7] font-mr font-bold text-[25px]">
          Frequently Asked Questions
        </p>

        <div className="w-full gap-4 flex flex-col justify-center items-center">
          <FAQComponent question='How and when do i pay?' answer="
Not necessarily.
‍
Once inside The Real World, many of our students chose copywriting and freelancing, which are businesses without money requirements, and saw great success!" />
          <FAQComponent question='How much does shipping cost?' answer="askdfj" />
          <FAQComponent question='What is your delivery time frame?' answer="askdfj" />
          <FAQComponent question='Do you have a size chart?' answer="askdfj" />
        </div>

      </div>

    </div>
  )
}
