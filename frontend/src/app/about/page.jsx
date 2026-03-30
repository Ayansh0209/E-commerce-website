import React from 'react'
import Footer from '../components/Footer';
export default function About(){
  return(
  
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10" />
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-600 text-sm">Hero Image</span>
          </div>
        </div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            We Believe
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide">
            Fashion is Art.<br />
            Art is Life.<br />
            A Beautiful Circle.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-700 leading-relaxed text-lg">
              At <strong>E-commerce </strong>, we aren't the right choice to be easy on anything in a game. That's why we built our brand on the foundation of quality, style, and authenticity. We source only the finest fabrics and work with you—closer to the true cost of every garment—because fashion should be both beautiful and responsible. We aren't Faltu (meaningless), we're purposeful.
            </p>
          </div>
          <div className="bg-gray-100 h-80 flex items-center justify-center rounded-lg">
            <span className="text-gray-500 text-sm">Mission Image</span>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white h-96 flex items-center justify-center rounded-lg shadow-sm">
              <span className="text-gray-500 text-sm">Approach Image</span>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Ethical Approach.</h2>
              <p className="text-gray-700 leading-relaxed">
                We believe in transparency at every step. From sourcing sustainable materials to ensuring fair wages for our artisans, we're committed to creating fashion that doesn't compromise on ethics. Every piece tells a story of craftsmanship, care, and conscious choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Designed<br />
              to last.
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Fashion fades, but style is eternal. Our collections are designed with longevity in mind—timeless pieces that transcend seasonal trends. We focus on quality construction, attention to detail, and versatile designs that become wardrobe staples for years to come.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">Design 1</span>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">Design 2</span>
            </div>
            <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">Design 3</span>
            </div>
            <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">Design 4</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Radically Transparent.</h2>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
              We're open about our processes, pricing, and practices. You deserve to know where your clothes come from, who made them, and the true cost behind every stitch. That's our promise.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white h-48 mb-4 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-gray-500 text-sm">Quality Icon</span>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Finest fabrics sourced with care and attention to detail.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white h-48 mb-4 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-gray-500 text-sm">Ethics Icon</span>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Ethical Production</h3>
              <p className="text-gray-600 text-sm">Fair wages and safe working conditions for all.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white h-48 mb-4 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-gray-500 text-sm">Style Icon</span>
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900">Timeless Style</h3>
              <p className="text-gray-600 text-sm">Designs that transcend trends and seasons.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Behind the Scenes.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">BTS {item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Be part of a fashion movement that values quality over quantity, ethics over excess, and style over trends. Discover pieces that matter.
          </p>
          <button className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Collection
          </button>
        </div>
      </section>
      <Footer/>

    </div>
  );
}
  