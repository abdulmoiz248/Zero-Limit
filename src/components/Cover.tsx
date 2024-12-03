import Image from 'next/image'

export default function CoverImage() {
  return (
    <div className="relative w-full bg-gradient-to-b from-neutral-900 to-neutral-800 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
          <div className="relative w-full">
            <Image
              src="/images/cover.jpeg"
              alt="Fashion showcase featuring urban streetwear collection with two models wearing contrasting outfits"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

