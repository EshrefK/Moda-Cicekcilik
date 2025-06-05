import Image from 'next/image'

export default function HazirKartNotlari() {
  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
        <Image
          src="/ciceknotları.png"
          alt="Hazır Kart Notları"
          fill
          className="object-contain"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold mb-6">Hazır Kart Notları</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Doğum Günü</h2>
          <p className="text-gray-700">Bol kahkahalı, bol neşeli, güzelliklerle dolu nice güzel yaşların olsun. Doğum Günün kutlu olsun.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Sevgiliye</h2>
          <p className="text-gray-700">Benimle olan birlikteliğinin gönderdiğim çiçekler kadar renkli geçmesi dileğiyle…</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Özür Dilerim</h2>
          <p className="text-gray-700">Özür dileme konusunda hiçbir zaman iyi olamadım. Ne yapabilirim hiç bilmiyorum. Tek bildiğim seni ne kadar çok sevdiğim. Lütfen beni affet...</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Yeni Bebek</h2>
          <p className="text-gray-700">Aramıza hoş geldin minik melek, yüzünden gülücüklerin eksik olmasın.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Teşekkür Ederim</h2>
          <p className="text-gray-700">Bana inandığınız için teşekkür ederim. Bu güveninizi boşa çıkarmayacağım...</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Tebrik</h2>
          <p className="text-gray-700">Verdiğin her kararda, doğru adımlarla hedefine ulaşman dileğiyle. Tebrikler!</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Özledim</h2>
          <p className="text-gray-700">Özlemek, ne kadar kolay çıkıyor ağızdan. Günleri, saatleri sayıyorum, seni seviyorum...</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Babaya</h2>
          <p className="text-gray-700">Canım Babam, Seni Çok Seviyorum.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Söz/Nişan/Düğün</h2>
          <p className="text-gray-700">Aile olmaya attığınız bu ilk adımda gönülden tebrik eder, mutluluklar dilerim.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Geçmiş Olsun</h2>
          <p className="text-gray-700">Bu günler de geride kalacak, biz yine aynı masa etrafında toplanıp gülüp eğleneceğiz. Bir an önce iyileşmeni diliyorum kardeşim. Şifan bol olsun.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Cenaze</h2>
          <p className="text-gray-700">Acını gönülden paylaşıyor, Allahtan rahmet diliyorum.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Açılış/Tören</h2>
          <p className="text-gray-700">Kazancınızın bol olması dileğiyle...</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Aileye</h2>
          <p className="text-gray-700">Mutlu bir aileye sahip olmanın zenginliği dünyadaki hiçbir nimette yokmuş, bunu artık daha iyi biliyorum...</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Anneye</h2>
          <p className="text-gray-700">Kalbinden eksik etmediğin sevgin ve emeklerin için teşekkürler sevgili anneciğim.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Yeni İş & Terfi</h2>
          <p className="text-gray-700">Yeni işinde başarılar dilerim. Senin için hayırlı olur umarım.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Yıl Dönümü</h2>
          <p className="text-gray-700">Bu yıldönümünde mutluluğumuzun devamını dilerim.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">İçimden Geldi</h2>
          <p className="text-gray-700">İnsanın sevdiğini hatırlaması için bir sebebi olması gerekmez. İyi ki hayatımdasın!</p>
        </div>
      </div>
    </div>
  )
} 