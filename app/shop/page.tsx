import { HeroSection } from "./_components/heroSection"
import { BrandInfo } from "./_components/brandinfo"
import { Categories } from "./_components/categories"
import { TabSection } from "./_components/tabSections"
import { FAQs } from "./_components/faqs"
import { ContactFooter, DownFooter } from "./_components/footer"
import { revalidateTag } from "next/cache"
import axios from "~/axios"

export const dynamic = 'force-dynamic'

export default async function Shop() {
  const domainName = process.env.DOMAIN_NAME
  //revalidateTag("mainData")
  //  await fetch(`${domainName}/api/revalidate-data` , { method : "GET", cache : "no-cache"}).then( res => console.log("data revalidated"));
  const res = await axios.get("/api/pages/home")
  const { categories, tabs_products, faqs } = res.data

  return (<div className="pt-1 lg:pt-2 flex bg-pr lg:gap-2 flex-col gap-1">
    <HeroSection />
    <BrandInfo />
    <Categories categories={categories} />
    <TabSection products={tabs_products} />
    <FAQs faqs={faqs} />
    <div>
      <ContactFooter />
      <DownFooter />
    </div>
  </div >
  )
}
