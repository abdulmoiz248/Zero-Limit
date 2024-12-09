import Image from 'next/image';
import Link from 'next/link';

export default function FashionShowcase() {
  return (
    <div className="relative w-full bg-black py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-5xl group cursor-pointer overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(27,3,163,0.3)]">
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
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
              <div className="max-w-md p-6 backdrop-blur-md bg-white bg-opacity-10 rounded-xl border border-white border-opacity-20 transition-all duration-300 group-hover:bg-opacity-20">
                <Link href="/all-products" className="block w-full">
                  <button className="w-full px-6 py-3 bg-[#1b03a3] text-white font-bold text-lg uppercase tracking-wider rounded-lg hover:bg-opacity-90 transition-colors duration-300">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
