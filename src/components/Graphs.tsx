import React, { useState } from "react";
import { ZoomIn, Download, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";

export default function Graphs() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Build URLs using Vite's base path so assets work when deployed under a subpath
  const base = (import.meta as any).env?.BASE_URL || "/";

  const images = [
    { filename: "Churn by customer segment.png", title: "Churn by Customer Segment", category: "Customer Analytics", description: "Churn rate distribution across different customer segments" },
    { filename: "support_load.png", title: "Support Load Analysis", category: "Support Analytics", description: "Customer support ticket volume and resolution times" },
    { filename: "usage_level.png", title: "Usage Level Analysis", category: "Usage Analytics", description: "Product usage frequency and engagement patterns" },
    { filename: "feature_importance.png", title: "Feature Importance", category: "Model Analytics", description: "Key predictors of customer churn from ML model" },
  ].map((it) => ({ ...it, src: base + encodeURI(it.filename) }));

  const categories = ["All", "Customer Analytics", "Usage Analytics", "Support Analytics", "Model Analytics"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openImage = (img, index) => {
    setSelectedImage(img);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredImages.length 
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const downloadImage = (src, title) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${title.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Interactive visualizations and insights from customer data analysis</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Filter by Category</h3>
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

      {/* Image Grid */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {selectedCategory === "All" ? "All Visualizations" : selectedCategory}
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
              ({filteredImages.length} charts)
            </span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <ZoomIn size={16} />
            <span>Click on any chart to enlarge</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((img, index) => (
            <div 
              key={img.title} 
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div 
                className="cursor-pointer aspect-video overflow-hidden bg-gray-50 dark:bg-gray-900"
                onClick={() => openImage(img, index)}
              >
                <img 
                  src={img.src} 
                  alt={img.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{img.title}</h4>
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
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{img.description}</p>
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
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-6xl w-full mx-4">
            <button
              onClick={closeImage}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              Close ×
            </button>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedImage.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedImage.description}</p>
              </div>
              
              <div className="relative p-8 bg-gray-50 dark:bg-gray-800 min-h-[60vh] flex items-center justify-center">
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
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
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                    {selectedImage.category}
                  </span>
                  <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
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
        </div>
      )}

      {/* Insights Section */}
      <section className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>High-value segments</strong> show 30% lower churn rates compared to small business customers
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Tenure length</strong> is the strongest predictor of customer retention
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-purple-500"></div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Support load</strong> increases significantly in the month before churn
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-amber-500"></div>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Usage patterns</strong> are key indicators of potential churn risk
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}