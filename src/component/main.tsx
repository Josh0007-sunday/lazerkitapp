import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Fingerprint, Shield, Zap, Code, ArrowRight, Check, Wallet, Globe, ChevronRight, Key, Database } from 'lucide-react';
import lazerkitLogo from '../assets/lazerkitlogo.png';
import FingerprintAnimation from './FingerprintAnimation';

const LazerkitLanding = () => {
  useEffect(() => {
    const handleScroll = () => window.scrollY;
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
        .orbitron { font-family: 'Orbitron', sans-serif; }
      `}</style>

      {/* Navigation */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={lazerkitLogo} alt="Lazerkit Logo" className="h-20 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-900 hover:text-indigo-600 transition-colors font-medium">Features</a>
            <a href="#sdk" className="text-gray-900 hover:text-indigo-600 transition-colors font-medium">SDK</a>
            <a href="#docs" className="text-gray-900 hover:text-indigo-600 transition-colors font-medium">Docs</a>
            <Link to="/demo" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Try Demo</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 mb-6 shadow-sm">
              <Zap className="w-4 h-4 text-gray-900" />
              <span className="text-sm font-semibold text-black">Driving Digital Growth</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-normal mb-6 orbitron text-gray-900 leading-tight">
              Smart Wallet
              <br />
              <span className="text-gray-900">
                Powered by Passkey
              </span>
            </h1>
            
            <p className="text-xl text-gray-900 mb-8 max-w-3xl mx-auto leading-relaxed">
              Building secure, scalable, and innovative passkey authentication for modern Web3 applications. Non-custodial wallets on Mantle EVM.
            </p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link 
                to="/demo"
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                Try Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2 shadow-lg">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Feature Icons */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="bg-gray-100 rounded-2xl p-4">
              <Code className="w-8 h-8 text-gray-900" />
            </div>
            <div className="bg-gray-100 rounded-2xl p-4">
              <Fingerprint className="w-8 h-8 text-gray-900" />
            </div>
            <div className="bg-gray-100 rounded-2xl p-4">
              <Database className="w-8 h-8 text-gray-900" />
            </div>
            <div className="bg-gray-100 rounded-2xl p-4">
              <Key className="w-8 h-8 text-gray-900" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 orbitron text-gray-900">
              Next-Gen Authentication
            </h2>
            <p className="text-gray-900 text-lg max-w-2xl mx-auto">
              Enterprise-grade passkey authentication built on Mantle's EVM infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Fingerprint className="w-7 h-7" />,
                title: 'Passkey Authentication',
                description: 'Biometric security meets Web3. No passwords, no seed phrases—just seamless access with your device.'
              },
              {
                icon: <Wallet className="w-7 h-7" />,
                title: 'Non-Custodial Wallets',
                description: 'Users maintain complete control. Wallets are created instantly with passkey authentication.'
              },
              {
                icon: <Zap className="w-7 h-7" />,
                title: 'Built on Mantle',
                description: 'Leveraging Mantle\'s EVM compatibility for fast, cost-effective transactions at scale.'
              },
              {
                icon: <Shield className="w-7 h-7" />,
                title: 'Enterprise Security',
                description: 'Military-grade encryption with WebAuthn standard. Your users\' assets stay protected.'
              },
              {
                icon: <Code className="w-7 h-7" />,
                title: 'Developer First',
                description: 'Clean SDK with comprehensive documentation. Integrate in hours, not weeks.'
              },
              {
                icon: <Globe className="w-7 h-7" />,
                title: 'Cross-Platform',
                description: 'Works seamlessly across web, mobile, and desktop. One SDK, every platform.'
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-5 text-gray-900">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 orbitron">{feature.title}</h3>
                <p className="text-gray-900 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDK Section */}
      <section id="sdk" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-normal mb-6 orbitron text-gray-900">
                Simple Integration,
                <br />
                Powerful Results
              </h2>
              <p className="text-gray-900 text-lg mb-8 leading-relaxed">
                Get up and running in minutes with our intuitive SDK. Clean API design means less code and faster deployment.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'TypeScript support out of the box',
                  'Comprehensive error handling',
                  'Real-time transaction monitoring',
                  'Automatic wallet recovery'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-gray-900" />
                    </div>
                    <span className="text-gray-900 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center gap-2">
                Read Documentation
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <FingerprintAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-indigo-800 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-normal mb-6 orbitron text-white">
            Ready to Build the Future?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of developers building the next generation of Web3 applications with Laser Lab
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={lazerkitLogo} alt="Lazerkit Logo" className="h-20 w-auto" />
              </div>
              <p className="text-gray-900 text-sm">
                Next-generation authentication for Web3
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Product</h4>
              <ul className="space-y-2 text-gray-900 text-sm">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">SDK</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Developers</h4>
              <ul className="space-y-2 text-gray-900 text-sm">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-900">Company</h4>
              <ul className="space-y-2 text-gray-900 text-sm">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center text-gray-900 text-sm">
            <p>© 2024 Laser Lab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LazerkitLanding;