export function SizerPicker({ size, setSize } : any) {
  const SMLXL = `w-[3.75rem] h-[3.5rem] flex justify-center  items-center bg-teal-900 border-[1.5px] border-gold`
  const sizebutton = "text-3xl font-bold leading-10 w-full h-full"
  return (
    <div className="flex flex-col gap-3">
      <p className="tracking-wide6 text-[2.145rem] font-bold leading-10">SIZES: </p>
      <div className="sizes flex gap-2 lg:gap-4 justify-start items-center">
        <div className={`${SMLXL} ${size == "S" && "border-[3px] w-[4rem] h-[3.9rem]"}`}> <button className={sizebutton} onClick={() => { setSize("S") }}> S </button> </div>
        <div className={`${SMLXL} ${size == "M" && "border-[3px] w-[4rem] h-[3.9rem]"}`} ><button className={sizebutton} onClick={() => { setSize("M") }}> M </button> </div>
        <div className={`${SMLXL} ${size == "L" && "border-[3px] w-[4rem] h-[3.9rem]"}`}> <button className={sizebutton} onClick={() => { setSize("L") }}> L </button></div>
        <div className={`${SMLXL} ${size == "XL" && "border-[3px] w-[4rem] h-[3.9rem]"} `}> <button className={sizebutton} onClick={() => { setSize("XL") }}> XL </button></div>
        {/*<div  className={sizechart} > <p className={sizeP}  >SIZE CHART</p></div>*/}
      </div>
    </div>
  )
}
