import { Navbar } from "./_components/navbar"
import { HeroSection } from "./_components/heroSection"
import { BrandInfo } from "./_components/brandinfo"
import { Categories } from "./_components/categories"
import prismadb from "../dashboard/_lib/prismadb"
import { Category } from "@prisma/client"


export default async function Shop() {
  const categories: Category[] = await prismadb.category.findMany({ include: { imageName: { select: { imageName: true } } } });
  return (<div className="bg-[url('/light_bg.png')]  m-1 border-[2px] border-gold">
    <Navbar />
    <HeroSection />
    <BrandInfo />
    <Categories categories={categories} />
  </div>
  )
}
