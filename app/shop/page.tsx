import { Navbar } from "./_components/navbar"
import { HeroSection } from "./_components/heroSection"
import { BrandInfo } from "./_components/brandinfo"
import { Categories } from "./_components/categories"
import { TabSection } from "./_components/tabSections"
import { FAQs } from "./_components/faqs"
import { Footer } from "./_components/footer"

import prismadb from "../dashboard/_lib/prismadb"
import { Product } from "@prisma/client"
import { Category } from "@prisma/client"


export default async function Shop() {
  const categories: Array<Category & { imageName: Array<{ imageName: string }> }> = await prismadb.category.findMany({ include: { imageName: { select: { imageName: true } } } });
  const tabs_products: Product[] = await prismadb.product.findMany({
    where: { OR: [{ isTrending: true }, { isNewArrival: true }, { isComingSoon: true }] },
    include: {
      imagesNames: { select: { imageName: true } }
    }
  })
  console.log("tabs products: ", tabs_products)
  return (<div className="mt-1 flex flex-col gap-1">
    <div className="bg-[url('/light_bg.png')] mx-1 border-[2px] border-gold overflow-hidden" >
      <Navbar />
      <HeroSection />
    </div>
    <BrandInfo />
    <Categories categories={categories} />
    <TabSection products={tabs_products} />
    <FAQs />
    <Footer />
  </div >
  )
}
