import { useEffect, useState } from "react";

interface PoojaItem {
  id: string;
  title: string;
  description: string;
  date: string;
  price: string;
  image: string;
}

const STORAGE_KEY = "poojas";

export default function Poojas() {
  const [poojas, setPoojas] = useState<PoojaItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        setPoojas(JSON.parse(data));
      } catch {
        setPoojas([]);
      }
    }
  }, []);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800">My Poojas</h1>
        <p className="mt-2 text-brown-800">Recently added poojas by admin.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poojas.map((p) => (
            <div key={p.id} className="rounded-2xl p-4 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300">
              <div className="relative mb-4">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-xl" />
                ) : (
                  <div className="w-full h-40 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
                )}
                {p.price && <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">{p.price}</div>}
              </div>
              <h3 className="font-semibold text-brown-900 mb-1">{p.title}</h3>
              {p.date && <p className="text-sm text-gray-600">{p.date}</p>}
              {p.description && <p className="mt-2 text-sm text-brown-800 line-clamp-3">{p.description}</p>}
            </div>
          ))}

          {poojas.length === 0 && (
            <p className="text-gray-700">No poojas available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}


