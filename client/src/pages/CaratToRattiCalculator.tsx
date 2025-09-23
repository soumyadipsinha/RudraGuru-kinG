import { useState } from "react";
import { Calculator, Gem } from "lucide-react";

export default function CaratToRattiCalculator() {
  const [carat, setCarat] = useState("");
  const [ratti, setRatti] = useState("");
  const [gram, setGram] = useState("");
  const [milligram, setMilligram] = useState("");

  // Conversion functions
  const convertFromCarat = (value: number) => {
    setRatti((value * 1.0989).toFixed(4));
    setGram((value * 0.2).toFixed(4));
    setMilligram((value * 200).toFixed(0));
  };

  const convertFromRatti = (value: number) => {
    setCarat((value * 0.91).toFixed(4));
    setGram((value * 0.18).toFixed(4));
    setMilligram((value * 180).toFixed(0));
  };

  const convertFromGram = (value: number) => {
    setCarat((value * 5).toFixed(4));
    setRatti((value * 5.49).toFixed(4));
    setMilligram((value * 1000).toFixed(0));
  };

  const convertFromMilligram = (value: number) => {
    setCarat((value / 200).toFixed(4));
    setRatti((value / 180).toFixed(4));
    setGram((value / 1000).toFixed(4));
  };

  const handleCaratChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCarat(value);
    if (value && !isNaN(Number(value))) {
      convertFromCarat(Number(value));
    } else if (value === "") {
      setRatti("");
      setGram("");
      setMilligram("");
    }
  };

  const handleRattiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRatti(value);
    if (value && !isNaN(Number(value))) {
      convertFromRatti(Number(value));
    } else if (value === "") {
      setCarat("");
      setGram("");
      setMilligram("");
    }
  };

  const handleGramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGram(value);
    if (value && !isNaN(Number(value))) {
      convertFromGram(Number(value));
    } else if (value === "") {
      setCarat("");
      setRatti("");
      setMilligram("");
    }
  };

  const handleMilligramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMilligram(value);
    if (value && !isNaN(Number(value))) {
      convertFromMilligram(Number(value));
    } else if (value === "") {
      setCarat("");
      setRatti("");
      setGram("");
    }
  };

  const clearAll = () => {
    setCarat("");
    setRatti("");
    setGram("");
    setMilligram("");
  };

  return (
    <div className="min-h-screen bg-transparent pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-yellow-600" />
            <h1 className="text-4xl font-bold text-gray-900">Carat to Ratti Calculator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Convert between Carat, Ratti, Gram, and Milligram units for accurate gemstone weight measurements
          </p>
        </div>

        {/* Conversion Rates */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-deep mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rates</h2>
          <p className="text-gray-700">
            1 Carat = 1.0989 Ratti = 0.2 Gram = 200 Milligram | 1 Ratti = 0.91 Carat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Calculator */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-deep">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-yellow-600" />
              Weight Converter
            </h2>
            
            <div className="space-y-6">
              {/* Carat Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carat</label>
                <input
                  type="number"
                  value={carat}
                  onChange={handleCaratChange}
                  placeholder="Enter carat"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm"
                />
              </div>

              {/* Ratti Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ratti</label>
                <input
                  type="number"
                  value={ratti}
                  onChange={handleRattiChange}
                  placeholder="Enter ratti"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm"
                />
              </div>

              {/* Gram Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gram</label>
                <input
                  type="number"
                  value={gram}
                  onChange={handleGramChange}
                  placeholder="Enter gram"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm"
                />
              </div>

              {/* Milligram Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Milligram</label>
                <input
                  type="number"
                  value={milligram}
                  onChange={handleMilligramChange}
                  placeholder="Enter milligram"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent shadow-sm"
                />
              </div>

              {/* Clear Button */}
              <button
                onClick={clearAll}
                className="w-full py-3 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Right Column - Top Selling Gemstones */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-deep">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Gem className="w-6 h-6 text-yellow-600" />
              Our Top Selling Gemstone
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Red Coral Moonga", image: "/assets/redCoral.png" },
                { name: "Pearl Moti", image: "/assets/motiRing.jpg" },
                { name: "Ruby Manik", image: "/assets/ruby.png" },
                { name: "Emerald Panna", image: "/assets/emerald.webp" },
                { name: "Blue Sapphire Neelam", image: "/assets/sapphire-blue.png" },
                { name: "Yellow Sapphire Pukhraj", image: "/assets/sapphire-yellow.png" }
              ].map((gem, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden shadow-lg">
                    <img
                      src={gem.image}
                      alt={gem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{gem.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion Tables */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Ratti and Carat Converter", data: [["1 Carat", "1.09 Ratti"], ["1 Ratti", "0.91 Carat"]] },
            { title: "Carat to Gram Converter", data: [["1 Carat", "0.20 g"]] },
            { title: "Carat to Milligram Converter", data: [["1 Carat", "200 mg"]] },
            { title: "Ratti to Gram Converter", data: [["1 Ratti", "0.18 g"]] },
            { title: "Gram to Carat Converter", data: [["1 g", "5 Carat"]] },
            { title: "Gram to Ratti Converter", data: [["1 g", "5.49 Ratti"]] }
          ].map((table, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-deep">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{table.title}</h3>
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <tbody>
                    {table.data.map((row, rowIndex) => (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                          {row[0]}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {row[1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Article Content */}
        <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-deep">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Accurate Carat to Ratti Calculator: Convert Gemstone Weights Easily
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              When it comes to purchasing or selling gemstones, understanding the weight measurements is crucial. 
              Carat and Ratti are two different units of measurement used in the gem trade, and knowing how to 
              convert between the two can save buyers and sellers a great deal of confusion and potential loss. 
              This article will provide a thorough examination of both Carat and Ratti, the science behind gemstone 
              weights, the conversion process, the role of technology, and tips for buying and selling gemstones effectively.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Understanding Carat and Ratti: A Brief Overview
            </h3>
            <p>
              Carat is a standard unit of weight used primarily for gemstones and pearls, equal to 200 milligrams. 
              The term comes from the carob seeds that were historically used as balance scales for trading jewels. 
              On the other hand, Ratti is an older system of measurement traditionally used in the Indian subcontinent, 
              equal to approximately 180 milligrams. Though both units measure weight, they are derived from different 
              historical and cultural contexts.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              The History of Carat and Ratti
            </h3>
            <p>
              The carat has its origins in ancient trade practices, where gem traders used carob seeds as a reliable 
              weight reference. The use of seeds ensured that the weight would be consistent across different transactions. 
              In contrast, Ratti has been a part of Indian trading for centuries, often associated with Ayurveda and 
              traditional practices, and serves as a cultural staple in gemstone dealings in India and neighbouring countries. 
              The significance of Ratti extends beyond mere measurement; it is often linked to astrological beliefs where 
              the weight of gemstones can influence an individual's fate and fortune. This cultural attachment adds a layer 
              of complexity to the trade, as the value of a gemstone is not solely determined by its weight but also by 
              its perceived spiritual and astrological properties.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              The Importance of Accurate Conversion
            </h3>
            <p>
              Understanding the differences between carat and Ratti and knowing how to convert between them is essential 
              for several reasons. Firstly, an accurate weight is crucial for ensuring fair trade practices. If miscalculations 
              occur during conversions, buyers may overpay, while sellers may lose profit on their gemstones. Additionally, 
              many buyers and sellers may not be familiar with both systems, so clarity in communication can prevent 
              misunderstandings. The rise of global commerce has further emphasised the need for standardised measurements, 
              as international buyers often expect gemstones to be weighed in carats, while local sellers may prefer Ratti. 
              This discrepancy can lead to confusion, making it imperative for both parties to have a clear understanding 
              of the conversion process. Moreover, the growing popularity of online gemstone trading platforms has necessitated 
              the inclusion of conversion tools and charts, allowing buyers to make informed decisions regardless of their 
              familiarity with either measurement system.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              The Science Behind Gemstone Weights
            </h3>
            <p>
              Gemstone weights are influenced by several scientific factors that determine how they are measured and valued 
              in the market. Understanding these principles can enhance your knowledge of how gemstones are rated and priced.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Factors Influencing Gemstone Weight
            </h4>
            <p>
              The weight of a gemstone is influenced by its size, shape, and specific gravity. In general, larger stones 
              that are cut properly will weigh significantly more. However, the actual weight can also depend on the shape 
              of the stone. For instance, round stones are likely to weigh more than fancy-cut stones of the same diameter 
              due to differences in the amount of material removed during the cutting process.
            </p>
            <p>
              Specific gravity, the ratio of the density of a substance to the density of a reference substance (usually water), 
              also plays an essential role in gemstone weight. Different gemstones have varying specific gravities, which affects 
              their weight significantly. For example, a sapphire will weigh differently than a diamond of the same size due to 
              differences in density.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              The Role of Density in Gemstone Weight
            </h4>
            <p>
              Density provides a deeper understanding of how gemstone materials influence weight. Denser materials will weigh 
              more than less dense materials for the same volume. This is why, when comparing gemstones, two stones of equal 
              size can significantly differ in weight and price if their densities are different. Densely packed gemstones like 
              rubies or emeralds are typically more valuable compared to lighter stones like quartz though they may appear 
              similar in size.
            </p>
            <p>
              Moreover, the process of gemstone formation also contributes to their density and, consequently, their weight. 
              Gemstones are formed under varying geological conditions, which can lead to differences in their internal structures. 
              For example, the crystalline structure of a diamond is not only what makes it exceptionally hard but also contributes 
              to its high density, making it heavier than many other gemstones of similar dimensions. Understanding these geological 
              processes can provide insights into why certain gemstones are rarer and thus command higher prices in the market.
            </p>
            <p>
              Additionally, the treatment and enhancements applied to gemstones can also affect their weight. Some gemstones undergo 
              processes such as heat treatment or resin filling to improve clarity or color, which can add to their overall weight. 
              This is particularly common in stones like opals and some varieties of jade. Buyers should be aware of these enhancements 
              as they can influence both the perceived value and the actual weight of the gemstone, making it essential to have a 
              comprehensive understanding of these factors when purchasing or valuing gemstones.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              The Conversion Process: Carat to Ratti
            </h3>
            <p>
              Converting carats to Ratti can be quite straightforward if you know the correct formula and conversion rates. 
              Understanding how to navigate this conversion can ensure that you're trading gemstones with confidence and accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
