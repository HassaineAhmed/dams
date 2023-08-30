"use client"
import { useRouter } from "next/navigation";
import Image from "next/image"

export default function Page() {
  const router = useRouter()
  return <div className="h-screen w-screen bg-pr flex justify-center items-center">
    <div className="flex gap-4 justify-center items-center">
      <Image src={'/logo.svg'} height={120} width={120} alt='logo' />
    </div>
  </div>
}
