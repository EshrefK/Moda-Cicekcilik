import Image from 'next/image'

export default function CicekBakimi() {
  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
        <Image
          src="/cicek-bakimi.jpg"
          alt="Çiçek Bakımı"
          fill
          className="object-cover"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold mb-6">Çiçek Bakımı</h1>
      
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Orkide Bakımı</h2>
          <ul className="space-y-3 text-gray-700">
            <li>• Orkidenizi direkt olarak güneş ışığı almayacağı ancak aydınlık bir yerde tutun.</li>
            <li>• Işık ihtiyacı yalnızca gövdesi ve yaprakları için geçerli değildir. Orkide kökleri için de ışığa ihtiyaç duyar bu sebeple şeffaf saksı kullanılmalıdır ve çok gerekmedikçe saksısı değiştirilmemelidir.</li>
            <li>• Toprağı özel bir karışımdır. Standart bitki toprakları ile yetiştirilmesi mümkün değildir. Eğer toprak değişimi yapacaksanız özel orkide toprağı edinmelisiniz.</li>
            <li>• Sulama toprak tam kurumadan yapılmalı ancak çok sık yapılmamalıdır. Sulama yaparken yapraklara ve çiçeklere su değdirilmemelidir.</li>
            <li>• Orkide için ideal hava sıcaklığı 13-30 derece arasındadır. Pencere kenarlarında hava akımından korunarak muhafaza edilebilir.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Teraryum Bakımı</h2>
          <ul className="space-y-3 text-gray-700">
            <li>• Teraryum bakımında en önemli husus sulamadır. Sulamanın fısfıs ile yapılması gerekir ve sulama sıklığı bitkinin türüne göre değişim gösterebilir. Genel olarak toprak nemini kaybetmeye yakın sulama yapılması önerilir.</li>
            <li>• Isıtıcı ve klimalara uzak bir bölgede konumlandırılmalıdır.</li>
            <li>• Güneş ışığının dik gelmesinden korunmalıdır.</li>
            <li>• Kesinlikle gübreleme yapılmamalıdır.</li>
            <li>• Teraryum nemi sever. Ancak çok sulama yapılırsa nem oranı istenilenin üzerine çıkar ve çürümeler ile yosunlanmalar meydana gelebilir.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Vazo Çiçekleri Bakımı</h2>
          <p className="text-gray-700 mb-4">
            Saksılı bitkilerimizin haricinde mis kokusu ile bizi mest eden lilyumları, papatyaları, gülleri kısacası vazodaki çiçeklerimizi nasıl uzun süre muhafaza edebiliriz?
          </p>
          <p className="text-gray-700 mb-4">
            Vazodaki çiçeklerimizi çoğu zaman 1 hafta seyre dalar ardından kurutur veya atarız. Aslında vazodaki çiçekleri de 1 ay kadar mis kokuları ile muhafaza edebiliriz. Bunun için öncelikle yapılması gereken; çiçeğin türü ne olursa olsun bağlı olduğu ipi veya lastiği kesmek. Önce çiçeklerimizin biraz rahatlamasını sağlamalıyız. Eğer vazosu yok ise, temiz bir vazo içerisine yerleştirdikten sonra yapılacak işlemleri ise şu şekilde sıralayabiliriz;
          </p>
          <ul className="space-y-3 text-gray-700">
            <li>• Çiçeğin vazo içerisinde kalan saplarındaki yaprakları temizleyin, eğer çiçeğiniz gül ise dikenlerini de temizlemeyi unutmayın. Bu şekilde çiçeğiniz daha rahat su çekecektir.</li>
            <li>• Çiçeklerin saplarının ucundan 3-4 cm kadar eğimli olacak şekilde kesin.</li>
            <li>• Temiz su doldurduğunuz vazo içerisindeki suyunu her gün taze su ile değiştirin.</li>
            <li>• Vazonuzu aydınlık ama direkt olarak güneşle temas etmeyecek bir yere yerleştirin.</li>
          </ul>
        </section>
      </div>
    </div>
  )
}