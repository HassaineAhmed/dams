'use client';
import {Navbar} from "../../_components/navbar"
import Image from "next/image"
import React, {useState}  from 'react'
import {DownFooter} from "../../_components/footer"
export default function Page(){
	const [size, SetSize] = useState("")
	console.log(size)
	const bigParent = "bigParent flex flex-row flex-wrap gap-0 justify-center"
	const sliderDiv = "slider w-[100%] pt-[1.12rem] flex flex-row gap-2 justify-center"
	const picCircles = "w-3.5 h-3.5 bg-sky-200 bg-opacity-50 rounded-full" 
	const productinfoFirst = "text-[2.9rem] pb-[1.4rem] font-bold leading-10"
	const productinfoSecond ="text-gold w-96 pt-[0.85rem] pb-[0.35rem] text-[1.47rem] font-bold leading-relaxed tracking-widest" 
	const productinfoSecondSpan = "inline-block  h-6 text-whitish text-[1.37rem] font-bold leading-relaxed tracking-widest"
	const SMLXL = "w-[3.75rem] pl-[0.5rem] pt-[0.4rem] h-[3.5rem] ml-[0.5rem] mr-[0.5rem] bg-teal-900 border border-gold "
	const sizechart = "w-[9.5rem] pl-[0.2rem] pr-[0.2rem] pt-[0.4rem] bg-teal-900 border border-gold "
	const sizebutton = "text-3xl font-bold leading-10"
	const sizeP ="text-xl font-bold leading-10 "
	const buydiv = "mt-3 ml-0 px-[5%]   h-12 bg-teal-900 border border-gold text-center"
	const buybutton ="text-[2.75rem] mt-[2.36rem] pb-[1.3rem] pt-[1rem] font-bold leading-10 w-[20rem]  bg-teal-900 border border-gold"
	return(
					<div className="max-w-[100%]  flex flex-col items-between min-h-[100vh] overflow-hidden text-whitish animate-fadeInFromUp">
								<Navbar variation={"withBg"} />
								{/* ----------------------------------- */}
								<div className="flex flex-col lg:flex-row h-[100%]  flex-1 justify-center items-center gap-8">
									<div className="picslider flex flex-col items-center pt-[5.75rem] lg:h-[100vh] ">
											<Image className="productpic  border border-gold w-[350px] lg:w-[554px]" height={800} width={800} src="/" alt="pic-product"/>
											<div className={sliderDiv}>
												<button className="pr-[5.8rem] lg:pr-[12rem]" onClick={()=>console.log("next image")}> <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 24L3 13L14 2" stroke="#D8B4A0" stroke-width="3"/></svg></button>

												<div className={picCircles}/>
												<div className={picCircles} />
												<div className={picCircles} />
												<div className={picCircles} />
												<div className={picCircles} />
												<div className={picCircles} />
												<button className="pl-[5.8rem] lg:pl-[12rem]" onClick={()=> console.log("previous image")}> <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 2L13 13L2 24" stroke="#D8B4A0" stroke-width="3"/> </svg> </button>
											</div>
								</div>

							

								{/* ----------------------------------- */}
								<div className="productinfo flex flex-wrap flex-col pt-[2rem] pl-[3rem] pb-[8%] lg:h-[100vh] lg:pt-[5.6rem]">
											<p className={productinfoFirst}> black pants</p>
											<p className={productinfoFirst}>3500 DZD</p>
											<p className={productinfoSecond} >material: <span className={productinfoSecondSpan} >81%coton, 19%els</span></p>
											<p className={productinfoSecond} >fit: <span className={productinfoSecondSpan}>81%coton, 19%els</span></p>
											<p className={productinfoSecond}>deisgn: <span className={productinfoSecondSpan}>81%coton, 19%els</span> </p>
											<p  className="text-[2.145rem] pt-[2.25rem] pb-[1rem] font-bold leading-10">Sizes: </p>
											<div className="sizes flex ">
												<div className={`${SMLXL} ml-[0rem] pl-[1.2rem]`}> <button  className={sizebutton}  onClick={()=>{SetSize("S")}}> S </button> </div>
												<div className={`${SMLXL} pl-[0.9rem]`} ><button className={sizebutton} onClick={()=>{SetSize("M")}}> M </button> </div>
												<div className="w-[3.75rem] h-[3.5rem] pt-[0.4rem] pl-[1.2rem] bg-teal-900 border border-gold"> <button  className={sizebutton} onClick={()=>{SetSize("L")}}> L </button></div>
												<div className={`${SMLXL} pl-[0.6rem]`}> <button className={sizebutton} onClick={()=>{SetSize("XL")}}> XL </button></div>
												{/*<div  className={sizechart} > <p className={sizeP}  >SIZE CHART</p></div>*/}
											</div>
											<button className={buybutton} onClick={()=>console.log("buy now")}>buy now </button>
					</div>
</div>

								<DownFooter />
							</div>
	
		)
		}

			{/*
				<div className={bigParent}>
					

					</div>
									</div>
				<div className="rest-text">

				</div> */}
