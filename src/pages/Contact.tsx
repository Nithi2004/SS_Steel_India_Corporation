import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-steelblue-900 hero-gradient py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Get in touch with our team for any questions about our products or services.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6 text-steelblue-900">Reach Out to Us</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-steelgray-900 mb-1">Address</h3>
                    <p className="text-steelgray-700">
                      756/6-B, Opp Anand Electronics, Krishnagiri Main Road, Hosur, Tamil Nadu - 635109
                    </p>
                    <p className="text-steelgray-700 mt-1">
                      (40 KM from Bengaluru)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-steelgray-900 mb-1">Phone</h3>
                    <p className="text-steelgray-700">+91 63820 85337</p>
                    <p className="text-steelgray-700">+91 87540 10925</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-steelgray-900 mb-1">Email</h3>
                    <a href="mailto:sales@sssteelindia.com" className="text-steelblue-600 hover:underline">
                      sales@sssteelindia.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-steelgray-900 mb-1">Business Hours</h3>
                    <p className="text-steelgray-700">Monday to Saturday</p>
                    <p className="text-steelgray-700">9:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-steelgray-900 mb-3">Website</h3>
                <a href="http://www.sssteelindia.com" target="_blank" rel="noopener noreferrer" className="text-steelblue-600 hover:underline">
                  www.sssteelindia.com
                </a>
              </div>

              <div className="mt-8">
                <Link to="/enquiry">
                  <Button className="flex items-center">
                    <span>Send us an Enquiry</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="lg:col-span-2">
              <div className="h-full rounded-lg overflow-hidden min-h-[400px]">
                <iframe
                  title="SS Steel India Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.6463386368297!2d77.78815127482132!3d12.734099190015122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167be52e0c11%3A0xa4b7b9bb46d31be7!2s756%2F6B%2C%20Opp%20Anand%20Electronics%2C%20Krishnagiri%20Main%20Rd%2C%20Hosur%2C%20Tamil%20Nadu%20635109!5e0!3m2!1sen!2sin!4v1684237690289!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-steelgray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-steelblue-900">Looking for Specific Products?</h2>
          <p className="text-steelgray-700 mb-8 max-w-2xl mx-auto">
            Browse our comprehensive product catalog or register as a customer to access pricing and ordering features.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products">
              <Button className="bg-steelblue-600 hover:bg-steelblue-700">
                Browse Products
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-steelblue-600 text-steelblue-600 hover:bg-steelblue-50">
                Register as Customer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
