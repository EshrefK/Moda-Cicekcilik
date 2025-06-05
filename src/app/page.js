"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    {
      src: "/main-page-images/sevgiliye-ozel20.png",
      alt: "Sevgiliye Özel Çiçekler",
      title: "Sevgiliye Özel Tasarımlar",
      description: "Sevdikleriniz için özel tasarlanmış çiçekler"
    },
    {
      src: "/main-page-images/teraryum.jpg",
      alt: "Teraryum",
      title: "Teraryum Tasarımları",
      description: "Doğal ve şık teraryum tasarımları"
    },
    {
      src: "/main-page-images/kutuda-cicek.jpg",
      alt: "Kutuda Çiçek",
      title: "Kutuda Çiçek",
      description: "Özel kutularda sunulan çiçek tasarımları"
    },
    {
      src: "/main-page-images/dogum-gunu.jpg",
      alt: "Doğum Günü Çiçekleri",
      title: "Doğum Günü Çiçekleri",
      description: "Özel günlerinizi renklendiren çiçek tasarımları"
    },
    {
      src: "/main-page-images/tasarim-cicek.jpg",
      alt: "Tasarım Çiçekler",
      title: "Tasarım Çiçekler",
      description: "Modern ve yaratıcı çiçek tasarımları"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Slider */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          {images.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                zIndex: index === currentIndex ? 1 : 0
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center px-4 max-w-4xl">
                  <h2 className="text-4xl md:text-6xl text-white font-bold mb-4">
                    {image.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-white/90">
                    {image.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full z-10 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full z-10 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Popular Categories Section - Zigzag Layout */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Popüler Kategoriler</h2>
        <div className="flex flex-col gap-8">
          {/* Doğum Günü Çiçekleri - Left */}
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-6">
              <img
                src="/main-page-images/dogum-gunu-kare.jpg"
                alt="Doğum Günü Çiçekleri"
                className="w-full h-72 object-cover rounded self-start"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center items-start">
              <h3 className="text-xl font-semibold mb-2">Doğum Günü Çiçekleri</h3>
              <Link href="/products/category/dogum-gunu-cicekleri" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                Ürünleri İncele
              </Link>
            </div>
          </div>
          {/* Kutuda Çiçekler - Right */}
          <div className="flex flex-col md:flex-row-reverse items-center md:items-stretch">
            <div className="md:w-1/2 md:pl-6">
              <img
                src="/main-page-images/kutuda-cicek.jpg"
                alt="Kutuda Çiçekler"
                className="w-full h-72 object-cover rounded self-start"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center items-end md:items-end">
              <h3 className="text-xl font-semibold mb-2">Kutuda Çiçekler</h3>
              <Link href="/products/category/kutuda-cicek" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                Ürünleri İncele
              </Link>
            </div>
          </div>
          {/* Teraryumlar - Left */}
          <div className="flex flex-col md:flex-row items-center md:items-stretch">
            <div className="md:w-1/2 md:pr-6">
              <img
                src="/main-page-images/teraryum.jpg"
                alt="Teraryumlar"
                className="w-full h-72 object-cover rounded self-start"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center items-start">
              <h3 className="text-xl font-semibold mb-2">Teraryumlar</h3>
              <Link href="/products/category/teraryumlar" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                Ürünleri İncele
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Hediyelik Çiçek</h3>
            <p className="text-gray-600 leading-relaxed">
              Moda Çiçekçilik olarak, her özel anı unutulmaz kılmak için modern ve yaratıcı çiçek tasarımları sunuyoruz. Sevdiklerinize olan duygularınızı en güzel şekilde yansıtan özel tasarım buketlerimiz, kutuda çiçeklerimiz ve teraryumlarımız ile her zevke hitap eden seçenekler sunuyoruz. Profesyonel ekibimiz, her detayı özenle hazırlayarak sizlere en kaliteli hizmeti sunmayı hedefliyor.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Çelenk</h3>
            <p className="text-gray-600 leading-relaxed">
              Moda Çiçekçilik olarak, anlamlı anları ve özel günleri en güzel şekilde temsil eden çelenk tasarımlarımızla hizmetinizdeyiz. Modern çizgiler ve geleneksel dokunuşları bir araya getiren çelenklerimiz, her türlü etkinlik ve anma töreni için özenle hazırlanmaktadır. Uzman ekibimiz, isteklerinize göre özelleştirilmiş tasarımlar sunarak duygularınızı en zarif şekilde ifade etmenizi sağlar.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Gelin ve Sünnet Arabası</h3>
            <p className="text-gray-600 leading-relaxed">
              Moda Çiçekçilik olarak, hayatınızın en özel günlerini unutulmaz kılmak için gelin ve sünnet arabası süsleme hizmetlerimizle yanınızdayız. Modern tasarım anlayışımız ve yaratıcı çözümlerimizle, araç süslemelerinizi sanat eserine dönüştürüyoruz. Her detayı özenle planlayarak, hayalinizdeki görünümü gerçeğe dönüştürüyoruz.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4">Taze Çiçek Seçimi</h3>
            <p className="text-gray-600 leading-relaxed">
              Moda Çiçekçilik'te kalite ve tazelik en önemli önceliğimizdir. Her gün özenle seçilen taze çiçeklerimiz, uzman ekibimiz tarafından titizlikle kontrol edilir. Mevsimsel çiçekleri tercih ederek, doğal güzellikleri en iyi şekilde yansıtan tasarımlar oluşturuyoruz. Çiçeklerin ömrünü uzatmak için özel bakım teknikleri uygulayarak, müşterilerimize en kaliteli ürünleri sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Neden Bizi Tercih Etmelisiniz?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Taze Çiçekler",
              description: "Her gün taze gelen çiçeklerle hazırlanan özel tasarımlar",
              image: "/main-page-images/taze-cicekler.png"
            },
            {
              title: "Hızlı Teslimat",
              description: "Aynı gün teslimat seçeneği ile hızlı ve güvenli ulaştırma",
              image: "/main-page-images/hizli-teslimat.png"
            },
            {
              title: "Özel Tasarım",
              description: "İsteğinize göre özelleştirilmiş çiçek tasarımları",
              image: "/main-page-images/tasarim-cicek.jpg"
            }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="relative w-full h-52 mb-4 rounded-lg overflow-hidden bg-gray-50">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
