import { Navbar } from "./_components/navbar"
import { HeroSection } from "./_components/heroSection"
import { BrandInfo } from "./_components/brandinfo"
import { Categories } from "./_components/categories"
import { TabSection } from "./_components/tabSections"
import { FAQs } from "./_components/faqs"
import { ContactFooter, DownFooter } from "./_components/footer"

import prismadb from "../dashboard/_lib/prismadb"
import { Product } from "@prisma/client"
import { Category } from "@prisma/client"
import { FAQ } from "@prisma/client"


type TProducts = Array<Product & { imagesNames: { imageName: string }[] }>
export default async function Shop() {
  const categories: Array<Category & { imageName: Array<{ imageName: string }> }> = await prismadb.category.findMany({ include: { imageName: { select: { imageName: true } } } });
  const faqs: Array<FAQ> = await prismadb.fAQ.findMany();
  const tabs_products: TProducts = await prismadb.product.findMany({
    where: { OR: [{ isTrending: true }, { isNewArrival: true }, { isComingSoon: true }] },
    include: {
      imagesNames: { select: { imageName: true } }
    }
  })
  function wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("waiting ...")
        resolve("waiting ...");
      }, 1000)
    })
  }
  await wait();

  console.log("tabs products: ", tabs_products)
  return (<div className="pt-1 lg:pt-2 flex bg-pr lg:gap-2 flex-col gap-1">
    <HeroSection />
    <BrandInfo />
    <Categories categories={categories} />
    <TabSection products={tabs_products} />
    <FAQs faqs={faqs} />
    <div className="">
      <ContactFooter />
      <DownFooter />
    </div>
  </div >
  )
}
