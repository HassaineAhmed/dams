import Image from "next/image"

export default function Loading() {
  return <div className="h-screen w-screen bg-pr flex justify-center items-center">
    <div className="flex gap-4 justify-center items-center">
      <Image src={'/logo.svg'} height={150} width={150} alt='logo' />
    </div>
  </div>
}
