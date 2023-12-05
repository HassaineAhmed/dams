import { HeroSection } from "./_components/heroSection"
import { BrandInfo } from "./_components/brandinfo"
import { Categories } from "./_components/categories"
import { TabSection } from "./_components/tabSections"
import { FAQs } from "./_components/faqs"
import { ContactFooter, DownFooter } from "./_components/footer"
import { revalidateTag } from "next/cache"
import { getCategories, getFAQs, getTabsProducts } from "./_utils/getMainData"

import Image from "next/image";

function SectionOne() {

  return (
    <div className="w-fit text-primary font-ds bg-white">

      <div className="flex">
        <div className="flex flex-col w-3/5">
          <Image src='/images/barber1.jpg' alt='barber image' width={700} height={494} className="border-r-[8px] border-primary h-2/3 w-full" />
          <Image src='/images/reparateur1.jpg' alt='barber image' width={700} height={400} className="h-2/3 border-[8px] border-l-0 border-primary w-full" />
        </div>
        <div className="flex flex-col w-2/5">
          <Image src='/images/meca1.jpg' alt='barber image' width={700} height={494} className="h-4/5 border-b-[8px]   border-primary" />
          <div className=" flex  flex-col  items-center space-y-4 h-2/4 bg-white py-[27px]">
            <p className="text-primary text-4 text-center font-changa  font-bold rounded-[16px] ">
              دعونا نبني مستقبلك بالشغف والخبرة
            </p>
            <button className="bg-primary text-center  text-6 font-bold text-white rounded-[16px] px-[24px] py-[16px]" >!استكشاف المزيد</button>
          </div>
          <Image src='/images/camera1.jpg' alt='barber image' width={700} height={494} className="h-2/3 border-t-[8px] border-b-[8px] border-primary" />
        </div>
        <div className="flex flex-col w-3/5">
          <Image src='/images/auto_coding1.jpg' alt='barber image' width={700} height={494} className="h-3/6 border-l-[8px] border-primary" />
          <Image src='/images/plombier1.jpg' alt='barber image' width={700} height={400} className="h-5/6 border-[8px] border-r-0 border-primary" />
        </div>
      </div>
      <div className="flex space-x-[48px] items-center p-20 text-primary  justify-center ">
        <div className="flex flex-col space-y-10 items-end font-bold text-primary">
          <div className="flex space-x-3">
            <p className="text-center sm:text-lg md:text-xl xl:text-2xl font-bold " >التوجيه من الخبراء لإتقان المهارات</p>
            <Image src='/images/checkmark.svg' alt='checkmarlk' width={30} height={30} />
          </div>
          <div className="flex space-x-5">

            <p className="text-center  sm:text-lg md:text-xl xl:text-2xl " > التقنيات المتطورة للمهن الحديثة</p>
            <Image src='/images/checkmark.svg' alt='checkmarlk' width={30} height={30} />

          </div>
          <div className="flex space-x-5">

            <p className="text-center sm:text-lg md:text-xl xl:text-2xl " > اتصالات صناعية للحصول على فرص حصرية </p>
            <Image src='/images/checkmark.svg' alt='checkmarlk' width={30} height={30} />

          </div>
          <div className="flex space-x-5">

            <p className="text-center sm:text-lg md:text-xl xl:text-2xl " >المرونة في التدريب الموحد المتوافق مع نمط حياتك</p>
            <Image src='/images/checkmark.svg' alt='checkmarlk' width={30} height={30} />

          </div>
        </div>
        <p className="text-center sm:text-3 md:text-2 xl:text-1 text-primary font-changa " > تشكيل مستقبلك
          معنا</p>
      </div>
      <div className="flex gap-[10px] justify-center py-[88px] bg-primary w-full ">
        <InfoCard number={10}> الشراكات الصناعية </InfoCard>
        <InfoCard number={50}>تدريبات</InfoCard>
        <InfoCard number={40}>المدربون</InfoCard>
        <InfoCard number={200}>طلاب</InfoCard>
      </div>
      <Formations />

    </div >
  )
}


function InfoCard({ children, number }: { children: string, number: number }) {
  return (
    <div className="bg-[#1E2B5C] rounded-xl py-[24px] gap-y-[24px] px-[48px] m-10  text-center sm:text-lg  md:text-xl xl:text-3  ">
      <p className="p-5 font-extrabold font-changa text-sd"> {number}+</p>
      <p className="text-white text-4 font-changa">{children}</p>
    </div>
  )
}
function Faq() {
  return (
    <div className="flex w-[70%] justify-between bg-primary rounded-xl ">
      <p className="text-white sm:text-3 md:text-3 xl:text-2xl p-4"> c est quoi cdm</p>
      <button className="text-white  ml-20  text-start p-5 rounded-xl">
        <Image src='/images/arrowdown.svg' alt='barber image' width={30} height={30} className="text-end" />

      </button>

    </div>
  )

}

function Selector({ children }: { children: string }) {
  return <button className="bg-primary rounded-[24px] text-6 text-[#9CA0AD] font-bold px-[24px] py-[8px] ">{children}</button>
}
function FormationCard() {
  return (
    <button className="bg-primary  font-bold rounded-2xl m-5 sm:w-1/6 md:w-1/5 lg:w-1/5 xl:w-1/5 ">
      <Image src='/images/reparateur1.jpg' alt='barber image' width={700} height={400} className="rounded-2xl" />
      <div className='gap-y-[24px] flex flex-col py-[24px] '>
        <div className="w-4/5  bg-blue text-center font-medium px-4 text-white sm:text-base md:text-lg  lg:text-xl xl:text-2xl">
          <p>digitial marketing and e-commerce</p></div>
        <div className="flex justify-between px-[16px] text-gray-600">
          <p className="text-center  sm:text-3 md:text-3 xl:text-xl"> 12415DA </p>
          <p className="text-center  sm:text-3 md:text-3 xl:text-6 font-meduim">90 JOURS</p>
        </div>
      </div>

    </button>
  )
}
function Formations() {
  return (
    <div className="pt-20 w-full flex flex-col items-center gap-[32px] justify-center">
      <p className="text-primary text-1  pb-10 pt-20 text-center sm:text-base md:text-3  lg:text-2 xl:text-1"> explorez des formations inspirantes </p>
      <div className="flex text-gray-600 flex-wrap justify-center w-4/5 gap-[8px] max-w-[90%]">
        <Selector>All</Selector>
        <Selector>Men</Selector>
        <Selector>artisanats</Selector>
        <Selector>medical</Selector>
        <Selector>informatique</Selector>
        <Selector>Info</Selector>
        <Selector>Info</Selector>
        <Selector>Info</Selector>
        <Selector>Info</Selector>
        <Selector>Info</Selector>
        <Selector>Info</Selector>
        <Selector>Info</Selector>
      </div>
      <div className="flex flex-wrap      sm:pl-10 md:pl-20 xl:pl-40">
        <FormationCard />
        <FormationCard />
        <FormationCard />
        <FormationCard />
      </div>

      <div className="w-full">
        <p className=" text-primary text-center  pt-10 pb-10 text-1 "> questions frequemment posees </p>
        <div className="flex gap-[24px] flex-col w-full justify-center items-center">
          <Faq />
          <Faq />
          <Faq />
          <Faq />
          <Faq />
        </div>
      </div>
      <div className="flex flex-col  pt-40">
        <p className="text-primary text-center text-1"> suivez-nous sur:</p>
        <div className="flex justify-center" >
          <button className="text-center pr-20">

            <Image src='/images/facebook.svg' alt='barber image' width={100} height={100} className="rounded-2xl" />
          </button>
          <button >

            <Image src='/images/insta.svg' alt='barber image' width={100} height={100} className="rounded-2xl" />
          </button>
        </div>
      </div>
    </div>
  )
}
export default async function Shop() {
  const domainName = process.env.DOMAIN_NAME
  //revalidateTag("mainData")
  //await fetch(`${domainName}/api/revalidate-data` , { method : "GET", cache : "no-cache"}).then( res => console.log("data revalidated"));
  //const res = await axios.get("/api/pages/home")

  return (<div className="">
    <SectionOne />
  </div >
  )
}
