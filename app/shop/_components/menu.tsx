import { useState } from "react"
import Image from "next/image"
import { Link as ReactScrollLink, Element } from "react-scroll"

const activeSide = "bg-pr border-[2px] justify-center items-center py-8 px-8 border-gold flex-col gap-4 w-60 transform transition-all fixed duration-700 text-white flex justify-center p-2 translate-x-[-250px]"
const hiddenSide = "bg-gray-800 flex-col gap-4 opacity-0 w-60 transform transition-all fixed duration-700 text-white flex justify-center p-2"

const activeButton = "w-10 lg:w-14  lg:h-14 h-10 p-2  top-0 cursor-pointer transition-all transform duration-700 flex items-center justify-center"
const normalButton = "w-10 lg:w-14 animate-borderIn border-gold lg:h-14 h-10 p-2 bg-pr top-0 cursor-pointer transition-all transform duration-700 flex items-center justify-center translate-y-[50px] translate-x-[-250px]"


function Entry({ label, link }: { label: string, link: string }) {
    return <ReactScrollLink to={link} smooth={true} >
        <div className="bg-sd flex justify-center items-center border-[2px] border-gold h-[50px] w-[200px]">
            <p className="text-gold font-mr font-bold text-[22px]">{label}</p>
    </div>
    </ReactScrollLink>
}

export function Menu() {
    const [active, setActive] = useState(false)
    return (<div className="flex">
        <div className={active ? normalButton : activeButton}
            onClick={() => setActive(prev => !prev)} >
            <Image src='/menu_bar.svg' height={90} width={90} alt='logo' />
        </div>

        <div className="flex  transform relative transition-all duration-1000">
            <div className={active ? activeSide : hiddenSide}>
                <Entry label="Men" link="tabSectionMen" />
                <Entry label="Women" link="tabSectionMen" />
                <Entry label="Categories" link="categories" />
                <Entry label="FAQs" link="FAQs" />
                <Entry label="Contact Us" link="contact" />
            </div>
        </div>
    </div>);
}

