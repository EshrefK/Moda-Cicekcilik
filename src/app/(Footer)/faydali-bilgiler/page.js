import Link from 'next/link'
import Image from 'next/image'

export default function FaydaliBilgiler() {
  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <h1 className="text-3xl font-bold mb-8">Faydalı Bilgiler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="group p-4 border rounded-lg hover:bg-gray-50 transition-colors flex flex-col">
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src="/ciceknotları.png"
              alt="Hazır Kart Notları"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Hazır Kart Notları</h2>
          <p className="text-gray-600 mb-4 flex-grow">Özel günler için hazır kart notları ve mesaj önerileri</p>
          <Link href="/faydali-bilgiler/hazir-kart-notlari">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full">
              Devamını Oku
            </button>
          </Link>
        </div>

        <div className="group p-4 border rounded-lg hover:bg-gray-50 transition-colors flex flex-col">
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src="/burclara-gore-cicekler.jpg"
              alt="Burçlara Göre Çiçekler"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Burçlara Göre Çiçekler</h2>
          <p className="text-gray-600 mb-4 flex-grow">Burçlara uygun çiçek seçimleri ve önerileri</p>
          <Link href="/faydali-bilgiler/burclara-gore-cicekler">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full">
              Devamını Oku
            </button>
          </Link>
        </div>

        <div className="group p-4 border rounded-lg hover:bg-gray-50 transition-colors flex flex-col">
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src="/cicek-bakimi.jpg"
              alt="Çiçek Bakımı"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Çiçek Bakımı</h2>
          <p className="text-gray-600 mb-4 flex-grow">Çiçeklerin bakımı ve uzun ömürlü olması için öneriler</p>
          <Link href="/faydali-bilgiler/cicek-bakimi">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full">
              Devamını Oku
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
} 