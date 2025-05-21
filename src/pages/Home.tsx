import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Phone, Mail, Factory, HardHat, Shield, Truck, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  // Sample product categories data
  const categories = [
    {
      title: "Structural Materials",
      icon: <HardHat className="w-10 h-10 text-white" />,
      items: ["Angles", "Channels", "Flats", "I Beams", "TMT Bars"],
      bgColor: "from-blue-800 to-blue-600"
    },
    {
      title: "Steel Pipes",
      icon: <Factory className="w-10 h-10 text-white" />,
      items: ["MS Round Pipes", "MS Square Pipes", "MS Rectangle Pipes"],
      bgColor: "from-blue-700 to-blue-500"
    },
    {
      title: "Sheets & Plates",
      icon: <Shield className="w-10 h-10 text-white" />,
      items: ["HR Sheets/Plates", "CR Sheets", "GI Sheets", "Roofing Sheets", "Chequered Sheets"],
      bgColor: "from-blue-600 to-blue-400"
    },
    {
      title: "Delivery Services",
      icon: <Truck className="w-10 h-10 text-white" />,
      items: ["Local Delivery", "Statewide Transport", "National Logistics"],
      bgColor: "from-blue-500 to-blue-300"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section - Modernized with better overlay and visual hierarchy */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-blue-900/70 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581093450021-4a7360e9a7d0')] bg-cover bg-center bg-fixed"></div>
        <div className="relative z-20 py-28 md:py-36 lg:py-44">
          <div className="container mx-auto px-4 md:px-8 text-left md:text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                Premium <span className="text-red-500">Iron & Steel</span> Solutions for Every Project
              </h1>
              <p className="text-xl md:text-2xl mb-10 leading-relaxed text-gray-200 max-w-3xl md:mx-auto">
                Delivering high-quality steel products with unmatched reliability across Tamil Nadu since 2015.
              </p>
              <div className="flex flex-col sm:flex-row justify-start md:justify-center gap-5">
                <Link to="/products">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-red-600/30 transition-all duration-300">
                    Explore Products
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Integration */}
      <script src="//code.tidio.co/wmooyh0kxmtveotkjbkhnqixj8ujwg7z.js" async></script>

      {/* Stats Bar - Enhanced with better visual elements */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530973428-5bf2db2e4d71')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            <div className="p-6 rounded-lg backdrop-blur-sm bg-white/5 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="text-4xl font-bold mb-2 text-white">15+</div>
              <div className="text-gray-300 font-medium">Years Experience</div>
            </div>
            <div className="p-6 rounded-lg backdrop-blur-sm bg-white/5 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="text-4xl font-bold mb-2 text-white">500+</div>
              <div className="text-gray-300 font-medium">Products</div>
            </div>
            <div className="p-6 rounded-lg backdrop-blur-sm bg-white/5 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="text-4xl font-bold mb-2 text-white">2000+</div>
              <div className="text-gray-300 font-medium">Clients</div>
            </div>
            <div className="p-6 rounded-lg backdrop-blur-sm bg-white/5 transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="text-4xl font-bold mb-2 text-white">24/7</div>
              <div className="text-gray-300 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Improved layout and visual appeal */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 lg:h-[32rem]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789')] bg-cover bg-center transform transition duration-700 hover:scale-110"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">Established 2015</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="max-w-xl">
                <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-blue-900">Leading Steel Supplier in Tamil Nadu</h2>
                <div className="w-16 h-1 bg-red-500 mb-6"></div>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  SS STEEL INDIA CORPORATION has been at the forefront of steel distribution, combining 
                  traditional values with modern efficiency. Our team of industry veterans brings unparalleled 
                  expertise to every transaction.
                </p>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start bg-gray-50 p-5 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md hover:bg-blue-50">
                    <div className="bg-blue-100 p-3 rounded-full mr-5">
                      <HardHat className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 text-xl mb-2">Quality Assurance</h3>
                      <p className="text-gray-600">Every product undergoes rigorous testing to ensure it meets industry standards</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-gray-50 p-5 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md hover:bg-blue-50">
                    <div className="bg-blue-100 p-3 rounded-full mr-5">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 text-xl mb-2">Reliable Logistics</h3>
                      <p className="text-gray-600">We guarantee on-time delivery with our comprehensive transport network</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-gray-50 p-5 rounded-lg shadow-sm transform transition-all duration-300 hover:shadow-md hover:bg-blue-50">
                    <div className="bg-blue-100 p-3 rounded-full mr-5">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 text-xl mb-2">Industry Compliance</h3>
                      <p className="text-gray-600">All products meet or exceed safety standards and industry regulations</p>
                    </div>
                  </div>
                </div>
                <Link to="/about">
                  <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-white font-medium group">
                    Our Story <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section - Elevated design with better cards */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Our Product Range</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive steel solutions for construction, manufacturing, and industrial applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
                <div className={`h-48 bg-gradient-to-r ${category.bgColor} flex flex-col items-center justify-center text-white relative`}>
                  <div className="bg-white/10 p-4 rounded-full backdrop-blur-sm mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-center">{category.title}</h3>
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <ul className="mb-6 text-gray-700 space-y-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={`/products/${category.title.toLowerCase().replace(/ /g, '-')}`}>
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg py-3 group">
                      <span className="flex items-center justify-center">
                        View Details <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - More engaging with better design */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595079676601-f1adf5be5dee')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
            <p className="text-xl mb-10 leading-relaxed">
              Our steel experts are ready to help you select the perfect materials for your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-xl hover:shadow-red-600/30 transition-all duration-300">
                  Request Consultation
                </Button>
              </Link>
              <a href="tel:+916382085337">
                <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300">
                  <Phone className="mr-2 h-5 w-5" /> Call: +91 63820 85337
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section - Improved with better layout and form design */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-1/2 bg-gray-50 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-2 text-blue-900">Contact Information</h2>
                <div className="w-16 h-1 bg-red-500 mb-8"></div>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg shadow-sm mr-6">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 text-lg mb-2">Our Location</h3>
                      <p className="text-gray-700 leading-relaxed">
                        756/6-B, Opp Anand Electronics, Krishnagiri Main Road, Hosur, Tamil Nadu - 635109
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg shadow-sm mr-6">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 text-lg mb-2">Phone</h3>
                      <p className="text-gray-700 mb-1">+91 63820 85337</p>
                      <p className="text-gray-700">+91 87540 10925</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg shadow-sm mr-6">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 text-lg mb-2">Email</h3>
                      <a href="mailto:sales@sssteelindia.com" className="text-blue-600 hover:underline">
                        sales@sssteelindia.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg shadow-sm mr-6">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 text-lg mb-2">Business Hours</h3>
                      <p className="text-gray-700 mb-1">Monday - Saturday: 9:00 AM – 7:00 PM</p>
                      <p className="text-gray-700">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                  <h2 className="text-3xl font-bold mb-2 text-blue-900">Send Us a Message</h2>
                  <div className="w-16 h-1 bg-red-500 mb-8"></div>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Full Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Your Message</label>
                      <textarea 
                        id="message" 
                        rows={5} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-lg text-white text-lg font-medium shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;