export default function Iletisim() {
  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <h1 className="text-3xl font-bold mb-8 text-center">İletişim</h1>
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Adres</h2>
            <p className="text-gray-600">
              Cumhuriyet Mah. Atatürk Bulv. No: 323<br />
              Atakum - SAMSUN
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Telefon</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Sabit Telefon:</span><br />
                0362 438 14 84
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Cep Telefon:</span><br />
                0541 612 04 32
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Email</h2>
            <a 
              href="mailto:info@samsunmodacicekcilik.com"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              info@samsunmodacicekcilik.com
            </a>
          </div>
        </div>

        <div className="h-[450px] w-full rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.7191140317154!2d36.2692980112552!3d41.33672087118678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40887d3387a40ea3%3A0x199e8073cbf8e11!2zTW9kYSDDh2nDp2Vrw6dpbGlr!5e0!3m2!1str!2str!4v1748975991051!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
} 