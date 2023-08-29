'use client';
import {Navbar} from "../../_components/navbar"
import Image from "next/image"
import React, {useState}  from 'react'

export default function Page(){
	const [size, SetSize] = useState("")
	console.log(size)
	const bigParent = "bigParent flex flex-row flex-wrap gap-0 justify-center"
	const sliderDiv = "slider pt-[6%] flex flex-row"
	const picCircles = "w-2.5 h-2.5 bg-sky-200 bg-opacity-50 rounded-full" 
	const productinfoFirst = "text-xl font-bold leading-10"
	const productinfoSecond ="text-gold w-96 pt-[0.25rem] text-x font-bold leading-relaxed tracking-widest" 
	const productinfoSecondSpan = "inline-block  h-6 text-whitish text-l font-bold leading-relaxed tracking-widest"
	const SMLXL = "w-[14%] px-4 py-1  h-14 bg-teal-900 border border-gold "
	const sizechart = "w-[35%] px-2  py-1 pr-0 bg-teal-900 border border-gold justify-start items-start gap-0.5 inline-flex"
	const sizebutton = "text-3xl font-bold leading-10"
	const sizeP ="text-xl font-bold leading-10 "
	const buydiv = "mt-3 ml-0 px-[5%]   h-12 bg-teal-900 border border-gold text-center"
	const buybutton ="text-3xl font-bold leading-10"
	return(
			<div className="text-whitish min-w-[100vh] " >
				<Navbar />
				<div className={bigParent}>
					<div className="picslider flex flex-col">
							<Image className="productpic  border border-gold w-[350px] lg:w-[750px]" height={800} width={800} src="/" alt="pic-product"/>
							<div className={sliderDiv}>
							   	<button onClick={()=>console.log("next image")}> <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 24L3 13L14 2" stroke="#D8B4A0" stroke-width="3"/></svg></button>

								<div className={picCircles}/>
								<div className={picCircles} />
								<div className={picCircles} />
								<div className={picCircles} />
								<div className={picCircles} />
								<div className={picCircles} />
								<button onClick={()=> console.log("previous image")}> <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 2L13 13L2 24" stroke="#D8B4A0" stroke-width="3"/> </svg> </button>
							</div>

					</div>
					<div className="productinfo flex flex-wrap flex-col">
							<p className={productinfoFirst}> black pants </p>
							<p className={productinfoFirst}>3500 dzd </p>
							<p className={productinfoSecond} >material: <span className={productinfoSecondSpan} >81%coton, 19%els</span></p>
							<p className={productinfoSecond} >fit: <span className={productinfoSecondSpan}>81%coton, 19%els</span></p>
							<p className={productinfoSecond}>deisgn: <span className={productinfoSecondSpan}>81%coton, 19%els</span> </p>
							<p  className="text-xl  font-bold leading-10">sizes: </p>
							<div className="sizes w-96 flex gap-1">
								<div className={SMLXL}> <button  className={sizebutton}  onClick={()=>{SetSize("S")}}> S </button> </div>
								<div className={SMLXL}><button className={sizebutton} onClick={()=>{SetSize("M")}}> M </button> </div>
								<div className="w-[14%] px-4 py-1.5  h-14 bg-teal-900 border border-gold"> <button  className={sizebutton} onClick={()=>{SetSize("L")}}> L </button></div>
								<div className={SMLXL}> <button className={sizebutton} onClick={()=>{SetSize("XL")}}> XL </button></div>
								<div  className={sizechart} > <p className={sizeP}  > SIZE CHART </p></div>
							</div>
							<button className={buybutton} onClick={()=>console.log("buy now")}>buy now </button>
					</div>
				</div>
				<div className="rest-text">

				</div>
			</div>
		)
		}
