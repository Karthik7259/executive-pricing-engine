import React, { useState } from "react";
import { ZoomIn, Download, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Header } from "@/components/Header";

type ImageItem = {
  title: string;
  category: string;
  description: string;
  src: string;
};

export default function Graphs() {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Images are in public folder, so use root-relative paths
  const images: ImageItem[] = [
    {
      title: "Churn Rate by Country",
      category: "Customer Analytics",
      description: "Average churn probability across countries",
      src: "/churn_rate_by_country.png",
    },
    {
      title: "Churn Rate by Customer Segment",
      category: "Customer Analytics",
      description: "Churn comparison across Enterprise, Mid-Market and SMB",
      src: "/churn_rate_by_customer_segment.png",
    },
    {
      title: "Churn Rate by Usage Level",
      category: "Usage Analytics",
      description: "Impact of usage intensity on churn risk",
      src: "/churn_rate_by_usage_level.png",
    },
  ];

  const categories = ["All", "Customer Analytics", "Usage Analytics"];

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const openImage = (img: ImageItem, index: number) => {
    setSelectedImage(img);
    setCurrentIndex(index);
  };

  const closeImage = () => setSelectedImage(null);

  const navigateImage = (dir: "next" | "prev") => {
    const len = filteredImages.length;
    const nextIndex =
      dir === "next"
        ? (currentIndex + 1) % len
        : (currentIndex - 1 + len) % len;
    
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const downloadImage = (src: string, title: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `${title.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // No fallback logic — require exact filenames in public/

  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive visualizations and insights from customer data analysis
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Debug helper removed as filenames are fixed */}

        {/* Image Grid */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {selectedCategory === "All" ? "All Visualizations" : selectedCategory}
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({filteredImages.length} chart{filteredImages.length !== 1 ? 's' : ''})
              </span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <ZoomIn size={16} />
              <span>Click on any chart to enlarge</span>
            </div>
          </div>

          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No charts found in the selected category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((img, index) => (
                <div
                  key={img.title}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div
                    className="cursor-pointer aspect-video overflow-hidden bg-gray-50 dark:bg-gray-900"
                    onClick={() => openImage(img, index)}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {img.title}
                      </h4>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(img.src, img.title);
                        }}
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
                        title="Download"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {img.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                        {img.category}
                      </span>
                      <button
                        onClick={() => openImage(img, index)}
                        className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        <ZoomIn size={16} />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-6xl bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
              {/* Close button */}
              <button
                onClick={closeImage}
                className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
              >
                <X size={24} />
              </button>
              
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {selectedImage.description}
                </p>
              </div>
              
              {/* Image */}
              <div className="relative p-8 bg-gray-50 dark:bg-gray-800 min-h-[400px] flex items-center justify-center">
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={filteredImages.length <= 1}
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="max-w-4xl w-full">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                </div>
                
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={filteredImages.length <= 1}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                    {selectedImage.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentIndex + 1} of {filteredImages.length}
                  </span>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => downloadImage(selectedImage.src, selectedImage.title)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Download size={18} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}