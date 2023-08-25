import Image from "next/image"
export function BrandInfo() {
  return <div className="mx-1 bg-sd border-[2px] grid gap-5 border-gold py-6 px-2">
    <div className="grid gap-2">
      <div className="flex gap-3 justify-center items-center">
        <Image src='/logo.svg' height={50} width={50} alt="logo" />
        <p className="text-3xl font-bold text-gold">DAMS</p>
      </div>
      <p className="text-gold px-4 text-[13px] text-center font-semibold">
        We are an Algerian clothing brand with the goal to provide youngsters with world class clothings, blending our rich cultural heritage with global fashion influences.
      </p>
    </div>
    <div className="grid gap-3">

      <p className="text-lg font-bold text-center">
        What should expect from us:
      </p>

      <div className="flex flex-col gap-4 w-full items-center">
        <div className="bg-td py-3 text-center w-[90%]">
          <p className="text-black font-bold text-xl">1-World Class Quality</p>
        </div>

        <div className="bg-td w-[90%] py-3 text-center">
          <p className="text-black font-bold text-xl">2-Very Vast Delivery</p>
        </div>

        <div className="bg-td w-[90%] py-3 text-center">
          <p className="text-black font-bold text-xl">3-Artistic Designs</p>
        </div>
      </div>
    </div>
  </div>
}

