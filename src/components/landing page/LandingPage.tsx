import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HeroImage() {
  const router = useRouter()

  return (
    <div 
      className="relative w-full h-screen cursor-pointer"
      onClick={() => router.push('/all-products')}
    >
      <Image
        src="/images/dark.jpeg"
        alt="Fashion product showcase"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
    </div>
  )
}

