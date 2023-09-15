import Image from "next/image"

export function Loading() {
  return <div className="h-screen w-screen bg-pr flex justify-center items-center">
    <div className="flex pb-[110px] gap-4 justify-center items-center">
      <Image src={'/logo.svg'} height={100} width={100} alt='logo' />
    </div>
  </div>
}

