import Image from 'next/image'

export default function BurclaraGoreCicekler() {
  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
        <Image
          src="/burclara-gore-cicekler.jpg"
          alt="Burçlara Göre Çiçekler"
          fill
          className="object-cover"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold mb-6">Burçlara Göre Çiçekler</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Burç</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Çiçekler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">KOÇ</td>
              <td className="px-6 py-4 whitespace-nowrap">21 MART - 20 NİSAN</td>
              <td className="px-6 py-4">LALE - PAPATYA</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">BOĞA</td>
              <td className="px-6 py-4 whitespace-nowrap">21 NİSAN - 20 MAYIS</td>
              <td className="px-6 py-4">KIRMIZI GÜL, PEMBE KARANFİL</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">İKİZLER</td>
              <td className="px-6 py-4 whitespace-nowrap">21 MAYIS - 21 HAZİRAN</td>
              <td className="px-6 py-4">GARDENYA, YASEMİN VE SÜMBÜL</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">YENGEÇ</td>
              <td className="px-6 py-4 whitespace-nowrap">22 HAZİRAN - 22 TEMMUZ</td>
              <td className="px-6 py-4">NİLÜFER, BEYAZ GÜL VE ZAMBAK</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">ASLAN</td>
              <td className="px-6 py-4 whitespace-nowrap">23 TEMMUZ - 23 AĞUSTOS</td>
              <td className="px-6 py-4">KIRMIZI GÜL, SARI KRİZAMTEM VE ORKİDE</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">BAŞAK</td>
              <td className="px-6 py-4 whitespace-nowrap">24 AĞUSTOS - 23 EYLÜL</td>
              <td className="px-6 py-4">AÇELYA, SARI MENEKŞE</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">TERAZİ</td>
              <td className="px-6 py-4 whitespace-nowrap">24 EYLÜL - 23 EKİM</td>
              <td className="px-6 py-4">PEMBE KRİZANTEM, PEMBE GÜL</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">AKREP</td>
              <td className="px-6 py-4 whitespace-nowrap">24 EKİM - 22 KASIM</td>
              <td className="px-6 py-4">KIRMIZI KARANFİL, HANIMELİ</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">YAY</td>
              <td className="px-6 py-4 whitespace-nowrap">23 KASIM - 21 ARALIK</td>
              <td className="px-6 py-4">LEYLAK VE MOR MENEKŞE</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">OĞLAK</td>
              <td className="px-6 py-4 whitespace-nowrap">22 ARALIK - 20 OCAK</td>
              <td className="px-6 py-4">SİYAH GÜL, KADİFE ÇİÇEĞİ VE KAMELYA</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">KOVA</td>
              <td className="px-6 py-4 whitespace-nowrap">21 OCAK - 19 ŞUBAT</td>
              <td className="px-6 py-4">ZENNEN, MENEKŞE VE KARTOPU</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">BALIK</td>
              <td className="px-6 py-4 whitespace-nowrap">20 ŞUBAT - 20 MART</td>
              <td className="px-6 py-4">İNCİ ÇİÇEĞİ, ZAMBAK</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
} 