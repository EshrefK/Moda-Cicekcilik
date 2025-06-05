import Image from 'next/image'
import Link from 'next/link'
export default function Footer() {
    return (
        <footer className="bg-white">
  <div className="mx-auto max-w-screen-xl space-y-6 px-4 py-12 sm:px-6 lg:space-y-12 lg:px-8">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div>
        <div className="text-teal-600 pb-6">
          <Image
            src="/samsunmodacicekciliklogo11.png"
            alt="Samsun Moda Çiçekçilik Logo"
            width={250}
            height={250}
            priority
          />
        </div>
        <h4 className="text-base font-bold">Adres</h4>
        <p className="mt-1 max-w-xs text-sm text-gray-500">
        Cumhuriyet Mah. Atatürk Bulv. No: 323 Atakum - SAMSUN
        </p>
        <h4 className="text-base font-bold mt-3">E-posta</h4>
        <p className="mt-1 max-w-xs text-sm text-gray-500">info@samsunmodacicekcilik.com</p>    

        <ul className="mt-6 flex gap-4">
          <li>
            <a
              href="https://api.whatsapp.com/send?phone=+905416120432&text=Merhaba www.samsunmodacicekcilik.com, web siteniz üzerinden size ulaşiyorum. Çiçek siparişi vermek istiyorum."
              target="_blank"
              className="text-gray-700 transition hover:opacity-75 flex flex-col items-center"
            >
              <span className="text-xs font-medium mb-1">WhatsApp</span>
              <div className="flex items-center gap-2">
                <Image
                  src="/icons8-whatsapp.gif"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="size-6 font-bold"
                />
                <span className="text-xs">+90 541 612 04 32</span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="tel:0362-438-1484"
              target="_blank"
              className="text-gray-700 transition hover:opacity-75 flex flex-col items-center"
            >
                <span className="text-xs font-medium mb-1">Telefon</span>
                <div className="flex items-center gap-2">
                <Image
                  src="/support.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="size-6 font-bold"
                />
                <span className="text-xs">0362-438-1484</span>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
        <div>
          <p className="font-medium text-gray-900">Kurumsal</p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/hakkimizda" className="text-gray-700 transition hover:opacity-75">  Hakkımızda </Link>
            </li>

            <li>
              <Link href="/banka-hesap-bilgileri" className="text-gray-700 transition hover:opacity-75">  Banka Hesap Bilgileri</Link>
            </li>

            <li>
              <Link href="/iletisim" className="text-gray-700 transition hover:opacity-75"> İletişim </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-900">Gizlilik Politikası</p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/guvenli-alisveris" className="text-gray-700 transition hover:opacity-75"> Güvenli Alışveriş </Link>
            </li>

            <li>
              <Link href="/kvkk-bilgilendirmesi" className="text-gray-700 transition hover:opacity-75"> KVKK Bilgilendirmesi </Link>
            </li>

            <li>
              <Link href="/iptal-iade-politikasi" className="text-gray-700 transition hover:opacity-75"> İptal& İade Politikası </Link>
            </li>

            <li>
              <Link href="/gizlilik-sozlesmesi" className="text-gray-700 transition hover:opacity-75"> Gizlilik Sözleşmesi </Link>
            </li>

            <li>
              <Link href="/satis-sozlesmesi" className="text-gray-700 transition hover:opacity-75"> Satış Sözleşmesi </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-gray-900">Faydalı Bilgiler</p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/faydali-bilgiler/hazir-kart-notlari" className="text-gray-700 transition hover:opacity-75"> Hazır Kart Notları </Link>
            </li>

            <li>
              <Link href="/faydali-bilgiler/burclara-gore-cicekler" className="text-gray-700 transition hover:opacity-75"> Burçlara Göre Çiçekler </Link>
            </li>

            <li>
              <Link href="/faydali-bilgiler/cicek-bakimi" className="text-gray-700 transition hover:opacity-75"> Çiçek Bakımı</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-gray-900">Sosyal Medya</p>
          <ul className="mt-4 space-y-2 text-sm">
          <li>
            <a
              href="https://www.instagram.com/samsunmodacicekcilik/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:opacity-75 flex items-center gap-2"
            >
              <Image
                src="/icons8-instagram-ios-17-outlined-120.png"
                alt="Instagram"
                width={24}
                height={24}
                className="size-6 font-bold"
              />
              <span className="text-sm">Instagram</span>
            </a>
          </li>
          </ul>
        </div>
      </div>
    </div>

    <p className="text-xs text-gray-500">&copy; 2025. Samsun Moda Çiçekçilik. All rights reserved.</p>
    </div>
    </footer>
    )
}
