"use client"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Collapse } from "react-collapse"
import { useInView } from "react-intersection-observer"
import { clsx } from 'clsx'
import { Element } from "react-scroll"

import { FAQ } from "@prisma/client"


export function FAQs({ faqs }: { faqs: FAQ[] }) {

  function FAQComponent({ question, answer }: { question: string, answer: string }) {
    const [open, setOpen] = useState(false);
    const [chevronAnimataion, setChevronAnimation] = useState("")
    const { inView, ref } = useInView();

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
          <div className="bg-sd w-full py-4 text-gold flex between px-4 lg:px-6 lg:py-5 justify-between items-center">
            <p className="font-mr font-semibold text-[18px] lg:text-[28px] lg:font-medium">{question}</p>
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
          <div className="bg-formGreen lg:px-6 px-4 border-[2px] border-gold border-t-0 p-2" >
            <p className="lg:text-[23px] font-semibold  py-2 lg:py-4 ">
              {answer}
            </p>
          </div>
        </Collapse>
      )
    }
    return (
      <div ref={ref} className={clsx({ "opacity-100 translate-x-0": inView }, "flex-col w-[95%] lg:w-[90%] flex gap-0 translate-x-[0px] transform transition-all duration-700 ease-in-out")}>
        <Head />
        <Body />
      </div>
    )
  }

  return (
    <div className="py-[40px] pb-[60px]">
      <Element name={'FAQs'}>
        <div className="flex flex-col justify-center items-center gap-8">
          <p className="text-[#9FC9C7] font-mr font-bold lg:text-[45px] text-[25px]">
            Frequently Asked Questions
          </p>

          <div className="w-full gap-4 flex flex-col justify-center items-center">
            {faqs.map((faq: FAQ, index: number) => <FAQComponent key={index} question={faq.question} answer={faq.answer} />)}
          </div>

        </div>
      </Element>
    </div>
  )
}
