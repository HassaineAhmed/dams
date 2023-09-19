import { HeroSection } from "./_components/heroSection"
import { BrandInfo } from "./_components/brandinfo"
import { Categories } from "./_components/categories"
import { TabSection } from "./_components/tabSections"
import { FAQs } from "./_components/faqs"
import { ContactFooter, DownFooter } from "./_components/footer"

export default async function Shop() {
  console.log("home page");
  const res = await fetch("https://dams-shop.vercel.app/api/pages/home", { next: { tags: ["mainData"] }, method: "GET", cache: "no-cache" })
  const { categories, tabs_products, products, faqs } = await res.json()
  console.log(products);

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
