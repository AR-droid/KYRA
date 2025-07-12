import React, { useState } from 'react';

function App() {
  const [showStats, setShowStats] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-mono text-white bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black bg-opacity-90 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold tracking-wider">KYRA</div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="hover:text-gray-300 transition duration-300 uppercase tracking-wide text-sm">Features</a>
              <a href="#process" className="hover:text-gray-300 transition duration-300 uppercase tracking-wide text-sm">Process</a>
              <a href="#stats" className="hover:text-gray-300 transition duration-300 uppercase tracking-wide text-sm">Impact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-element-1 absolute w-64 h-64 border border-white opacity-10 rounded-full"></div>
          <div className="floating-element-2 absolute w-32 h-32 border border-white opacity-20 rounded-full"></div>
          <div className="floating-element-3 absolute w-48 h-48 border border-white opacity-15 rounded-full"></div>
          <div className="floating-element-4 absolute w-20 h-20 bg-white opacity-5 rounded-full"></div>
          <div className="floating-element-5 absolute w-12 h-12 bg-white opacity-10 rounded-full"></div>
          <div className="floating-element-6 absolute w-8 h-8 bg-white opacity-15 rounded-full"></div>
          
          {/* Geometric Shapes */}
          <div className="floating-shape-1 absolute w-24 h-24 border border-white opacity-20 rotate-45"></div>
          <div className="floating-shape-2 absolute w-16 h-16 border border-white opacity-15 rotate-12"></div>
          <div className="floating-shape-3 absolute w-32 h-32 border border-white opacity-10 rotate-45"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold mb-6 tracking-tighter">KYRA</h1>
            <div className="w-32 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed tracking-wide">
              Revolutionary clothing exchange platform. <br />
              Redefine your wardrobe. Reduce your footprint.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <button className="bg-white text-black px-12 py-4 font-semibold hover:bg-gray-200 transition duration-300 uppercase tracking-widest text-sm">
              Start Exchange
            </button>
            <button className="border border-white text-white px-12 py-4 font-semibold hover:bg-white hover:text-black transition duration-300 uppercase tracking-widest text-sm">
              Explore Platform
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </header>

      {/* Process Section */}
      <section id="process" className="py-32 bg-white text-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="process-float-1 absolute w-96 h-96 border border-gray-200 rounded-full opacity-30"></div>
          <div className="process-float-2 absolute w-64 h-64 border border-gray-300 rounded-full opacity-20"></div>
          <div className="process-float-3 absolute w-48 h-48 bg-gray-100 rounded-full opacity-40"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 tracking-tight">The Process</h2>
            <div className="w-16 h-1 bg-black mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center group">
              <div className="mb-8">
                <div className="w-24 h-24 bg-black text-white flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition duration-300 relative">
                  <span className="text-2xl font-bold">01</span>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-black rounded-full"></div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 uppercase tracking-wide">Submit</h3>
                <p className="text-lg leading-relaxed">
                  Photograph and catalog your unworn garments with detailed specifications and condition notes.
                </p>
              </div>
            </div>
            <div className="text-center group">
              <div className="mb-8">
                <div className="w-24 h-24 bg-black text-white flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition duration-300 relative">
                  <span className="text-2xl font-bold">02</span>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-black rounded-full"></div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 uppercase tracking-wide">Match</h3>
                <p className="text-lg leading-relaxed">
                  Our algorithm connects you with compatible items based on style preferences and sizing data.
                </p>
              </div>
            </div>
            <div className="text-center group">
              <div className="mb-8">
                <div className="w-24 h-24 bg-black text-white flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition duration-300 relative">
                  <span className="text-2xl font-bold">03</span>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-white border-2 border-black rounded-full"></div>
                </div>
                <h3 className="text-2xl font-semibold mb-4 uppercase tracking-wide">Exchange</h3>
                <p className="text-lg leading-relaxed">
                  Seamless logistics coordination ensures secure, efficient delivery of your selected items.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-black text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="feature-grid absolute inset-0 opacity-5"></div>
          <div className="feature-float-1 absolute w-32 h-32 border border-white opacity-10 rotate-45"></div>
          <div className="feature-float-2 absolute w-24 h-24 border border-white opacity-15 rotate-12"></div>
          <div className="feature-float-3 absolute w-16 h-16 bg-white opacity-5 rounded-full"></div>
          <div className="feature-float-4 absolute w-12 h-12 bg-white opacity-10 rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 tracking-tight">Platform Features</h2>
            <div className="w-16 h-1 bg-white mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="border border-gray-800 p-8 hover:border-gray-600 transition duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <h3 className="text-xl font-semibold mb-4 uppercase tracking-wide">Credit System</h3>
              <p className="text-gray-300 leading-relaxed">
                Earn exchange credits for contributed items. Build value through sustainable practices.
              </p>
            </div>
            <div className="border border-gray-800 p-8 hover:border-gray-600 transition duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <h3 className="text-xl font-semibold mb-4 uppercase tracking-wide">AI Matching</h3>
              <p className="text-gray-300 leading-relaxed">
                Advanced recommendation engine analyzes style patterns and personal preferences.
              </p>
            </div>
            <div className="border border-gray-800 p-8 hover:border-gray-600 transition duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <h3 className="text-xl font-semibold mb-4 uppercase tracking-wide">Inventory Management</h3>
              <p className="text-gray-300 leading-relaxed">
                Digital wardrobe tracking with comprehensive categorization and condition monitoring.
              </p>
            </div>
            <div className="border border-gray-800 p-8 hover:border-gray-600 transition duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <h3 className="text-xl font-semibold mb-4 uppercase tracking-wide">Quality Assurance</h3>
              <p className="text-gray-300 leading-relaxed">
                Rigorous verification process ensures authenticity and condition accuracy.
              </p>
            </div>
            <div className="border border-gray-800 p-8 hover:border-gray-600 transition duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <h3 className="text-xl font-semibold mb-4 uppercase tracking-wide">Global Network</h3>
              <p className="text-gray-300 leading-relaxed">
                Connect with fashion-conscious individuals worldwide through our exchange platform.
              </p>
            </div>
            <div className="border border-gray-800 p-8 hover:border-gray-600 transition duration-300 relative group">
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <h3 className="text-xl font-semibold mb-4 uppercase tracking-wide">Impact Tracking</h3>
              <p className="text-gray-300 leading-relaxed">
                Monitor your environmental contribution with detailed sustainability metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-20">
            <h2 className="text-5xl font-bold mb-4 tracking-tight">Platform Impact</h2>
            <div className="w-16 h-1 bg-black mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Measuring our collective contribution to sustainable fashion practices.
            </p>
          </div>
          <button
            onClick={() => setShowStats(!showStats)}
            className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition duration-300 uppercase tracking-widest text-sm mb-12"
          >
            {showStats ? 'Hide Metrics' : 'Show Metrics'}
          </button>
          {showStats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 animate-fade-in">
              <div className="text-center">
                <div className="text-6xl font-bold mb-4 tracking-tighter">15,247</div>
                <div className="text-xl uppercase tracking-wide text-gray-600">Items Exchanged</div>
                <div className="w-12 h-1 bg-black mx-auto mt-4"></div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold mb-4 tracking-tighter">8,420</div>
                <div className="text-xl uppercase tracking-wide text-gray-600">KG CO₂ Prevented</div>
                <div className="w-12 h-1 bg-black mx-auto mt-4"></div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold mb-4 tracking-tighter">3,891</div>
                <div className="text-xl uppercase tracking-wide text-gray-600">Active Members</div>
                <div className="w-12 h-1 bg-black mx-auto mt-4"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Platform Preview */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 tracking-tight">Platform Interface</h2>
            <div className="w-16 h-1 bg-white mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="border border-gray-800 hover:border-gray-600 transition duration-300 group">
              <div className="aspect-square bg-gray-900 flex items-center justify-center text-gray-500 group-hover:bg-gray-800 transition duration-300">
                <div className="text-center">
                  <div className="text-4xl mb-4">+</div>
                  <div className="uppercase tracking-wide text-sm">Item Upload</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 uppercase tracking-wide">Upload Interface</h3>
                <p className="text-gray-400">Streamlined submission process with automated categorization.</p>
              </div>
            </div>
            <div className="border border-gray-800 hover:border-gray-600 transition duration-300 group">
              <div className="aspect-square bg-gray-900 flex items-center justify-center text-gray-500 group-hover:bg-gray-800 transition duration-300">
                <div className="text-center">
                  <div className="text-4xl mb-4">⟷</div>
                  <div className="uppercase tracking-wide text-sm">Exchange Hub</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 uppercase tracking-wide">Exchange Center</h3>
                <p className="text-gray-400">Browse and initiate exchanges with intelligent matching.</p>
              </div>
            </div>
            <div className="border border-gray-800 hover:border-gray-600 transition duration-300 group">
              <div className="aspect-square bg-gray-900 flex items-center justify-center text-gray-500 group-hover:bg-gray-800 transition duration-300">
                <div className="text-center">
                  <div className="text-4xl mb-4">□</div>
                  <div className="uppercase tracking-wide text-sm">Wardrobe</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 uppercase tracking-wide">Digital Closet</h3>
                <p className="text-gray-400">Comprehensive inventory management and tracking system.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-white text-black text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-8 tracking-tight">Join the Exchange</h2>
          <div className="w-16 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Transform your approach to fashion. Connect with a community committed to sustainable style.
          </p>
          <button className="bg-black text-white px-16 py-5 font-semibold text-lg hover:bg-gray-800 transition duration-300 uppercase tracking-widest">
            Begin Exchange
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold tracking-wider mb-6 md:mb-0">KYRA</div>
            <div className="flex space-x-8 mb-6 md:mb-0">
              <a href="#about" className="hover:text-gray-300 transition duration-300 uppercase tracking-wide text-sm">About</a>
              <a href="#privacy" className="hover:text-gray-300 transition duration-300 uppercase tracking-wide text-sm">Privacy</a>
              <a href="#terms" className="hover:text-gray-300 transition duration-300 uppercase tracking-wide text-sm">Terms</a>
              <a href="#contact" className="hover:text-gray-300 transition duration-300 uppercase tracking-wide text-sm">Contact</a>
            </div>
            <button
              onClick={scrollToTop}
              className="border border-gray-600 text-gray-300 px-6 py-2 hover:border-white hover:text-white transition duration-300 uppercase tracking-wide text-sm"
            >
              Top
            </button>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p className="uppercase tracking-wide text-sm">© 2025 KYRA. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(270deg); }
        }
        
        @keyframes drift {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(10px) translateY(-5px); }
          50% { transform: translateX(-5px) translateY(-10px); }
          75% { transform: translateX(-10px) translateY(5px); }
        }
        
        .floating-element-1 {
          top: 10%;
          left: 10%;
          animation: float 8s ease-in-out infinite;
        }
        
        .floating-element-2 {
          top: 20%;
          right: 15%;
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .floating-element-3 {
          bottom: 30%;
          left: 20%;
          animation: float-fast 7s ease-in-out infinite;
        }
        
        .floating-element-4 {
          top: 60%;
          right: 25%;
          animation: drift 10s ease-in-out infinite;
        }
        
        .floating-element-5 {
          bottom: 20%;
          right: 10%;
          animation: float 9s ease-in-out infinite;
        }
        
        .floating-element-6 {
          top: 40%;
          left: 5%;
          animation: float-slow 5s ease-in-out infinite;
        }
        
        .floating-shape-1 {
          top: 15%;
          right: 30%;
          animation: float-fast 12s ease-in-out infinite;
        }
        
        .floating-shape-2 {
          bottom: 40%;
          left: 15%;
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .floating-shape-3 {
          top: 70%;
          right: 5%;
          animation: float 11s ease-in-out infinite;
        }
        

        .process-float-1 {
          top: -10%;
          right: -10%;
          animation: drift 15s ease-in-out infinite;
        }
        
        .process-float-2 {
          bottom: -20%;
          left: -15%;
          animation: float-slow 12s ease-in-out infinite;
        }
        
        .process-float-3 {
          top: 50%;
          right: 5%;
          animation: float 10s ease-in-out infinite;
        }
        
        .feature-float-1 {
          top: 15%;
          left: 5%;
          animation: float-slow 14s ease-in-out infinite;
        }
        
        .feature-float-2 {
          bottom: 20%;
          right: 10%;
          animation: float-fast 9s ease-in-out infinite;
        }
        
        .feature-float-3 {
          top: 60%;
          left: 20%;
          animation: drift 11s ease-in-out infinite;
        }
        
        .feature-float-4 {
          bottom: 40%;
          right: 25%;
          animation: float 7s ease-in-out infinite;
        }
        
        .feature-grid {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: drift 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;