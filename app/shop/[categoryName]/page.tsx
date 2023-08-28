import {Navbar} from "../_components/navbar"
import prismadb from "../../dashboard/_lib/prismadb"
import Image from "next/image"

export default async function Page(){
	const categories = await prismadb.category.findMany({include:{Product:{include:{imagesNames:true}}}})

//	let items = [categories.length]
	let items = [2]
	console.log("cateogirs",categories)
	let item = 0
	const 	category = categories[0]
	const imagename =  categories[item].Product[item].imagesNames[item].imageName
	let descrp = categories[item].Product[item].name
	let price = categories[item].Product[item].price
	let random = `/images/${category.name}/${categories[item].Product[item].name}/${imagename}`

	console.log(category.name)
	const product = category.Product[0]
	return(
		<div className="random">
			<Navbar/>
			<div className="catergory">
				<p className="pl-20 pt-10 text-start text-gray-200 text-6xl font-bold " >{category.name}</p>
			</div>
			<div className="flex flex-wrap gap-x-1 justify-center p-10 pt-5 ">
				{Object.keys(categories).map((item)=>{ return <Itemo number={item} src={random} alt="works?" descreption={descrp} price={price} />})}
				
				{Object.keys(categories).map((item)=>{ return <Itemo number={item} src={random} alt="works?" descreption={descrp} price={price} />})}
			</div>


		</div>
		)
}

function Itemo({src , alt , descreption, price,number}){
	return(
		<div className="pic-of-items">
				

					<div className="max-w-md flex  flex-col min-h-full justify-between">

						<Image className="test" alt="not working" height={800} width={800} src={src}/>
						<div className="para  flex flex-col justify-between">
							<p className="pt-2 pb-2 text-white text-xl font-bold leading-normal ">{descreption}</p>
							<p className="pb-2 text-white text-xl font-medium leading-7">{price} DZD </p>
						</div>
					</div>
			
				</div>

		)
}
	
