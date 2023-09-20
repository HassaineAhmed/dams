import { Navbar } from "../_components/navbar"
import Image from "next/image"
import { Category } from "@prisma/client"
import { DownFooter } from "../_components/footer"
import { PuffSpinner } from "@/_components/ui/loader";
import Link from "next/link"
import { getCategories } from "../_utils/getMainData";
import { CategoryContent } from "../_components/categoryContent";





export default async function Page({ params }: { params: { categoryName: string } }) {
	const categoryname = params.categoryName
	//const res = await fetch(`${domainName}/api/pages/home`, { next: { tags: ["mainData"] } })
	const categories = await getCategories()
	const category = categories.filter((category: Category) => category.name == categoryname)[0]
	return (
		<div className="max-w-[100%]  flex flex-col items-between min-h-[100vh] overflow-hidden text-whitish animate-fadeInFromUp">
			<Navbar variation={"withBg"} />
			<CategoryContent category={category} />
			<DownFooter />
		</div >
	)
}

