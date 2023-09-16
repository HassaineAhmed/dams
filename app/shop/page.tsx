import { HeroSection } from "./_components/heroSection"
import { Loading } from "./_components/loading"
import { BrandInfo } from "./_components/brandinfo"
import { Categories } from "./_components/categories"
import { TabSection } from "./_components/tabSections"
import { FAQs } from "./_components/faqs"
import { ContactFooter, DownFooter } from "./_components/footer"
export default async function Shop() {

  // const res = await fetch("https://dams-shop.vercel.app/api/pages/home")
  //const { data } = await axios.get("/api/pages/home")
  await fetch("http://localhost:3000/api/revalidate-data");
  const res = await fetch("http://localhost:3000/api/pages/home", { next: { tags: ["mainData"] } })
  const { categories, tabs_products, faqs } = await res.json()
  console.log(tabs_products);

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
