import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a question, suggestion, or want to collaborate? We'd love to hear from you!
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Whether you're a content creator looking to feature your listicles, have feedback about our platform, 
                or need help with something, we're here to help. Fill out the form and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">hello@getlisticled.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Response Time</h3>
                  <p className="text-gray-600">We typically respond within 24-48 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Location</h3>
                  <p className="text-gray-600">Serving content creators worldwide</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800">How can I submit my listicle?</h4>
                  <p className="text-gray-600 text-sm mt-1">Use our contact form below or email us directly with your content.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Do you accept all types of listicles?</h4>
                  <p className="text-gray-600 text-sm mt-1">We curate high-quality content across all niches and topics.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">How long does review take?</h4>
                  <p className="text-gray-600 text-sm mt-1">Content review typically takes 3-5 business days.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            
            {/* Wufoo Form Embed */}
            <div id="wufoo-z1s0iqi1it1udq">
              Fill out my <a href="https://matsonian2.wufoo.com/forms/z1s0iqi1it1udq" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">online form</a>.
            </div>
            
            {/* Wufoo Script */}
            <script 
              type="text/javascript" 
              dangerouslySetInnerHTML={{
                __html: `
                  var z1s0iqi1it1udq;
                  (function(d, t) {
                    var s = d.createElement(t), options = {
                      'userName':'matsonian2',
                      'formHash':'z1s0iqi1it1udq',
                      'autoResize':true,
                      'height':'517',
                      'async':true,
                      'host':'wufoo.com',
                      'header':'show',
                      'ssl':true
                    };
                    s.src = ('https:' == d.location.protocol ?'https://':'http://') + 'secure.wufoo.com/scripts/embed/form.js';
                    s.onload = s.onreadystatechange = function() {
                      var rs = this.readyState;
                      if (rs) if (rs != 'complete') if (rs != 'loaded') return;
                      try {
                        z1s0iqi1it1udq = new WufooForm();
                        z1s0iqi1it1udq.initialize(options);
                        z1s0iqi1it1udq.display();
                      } catch (e) { }
                    };
                    var scr = d.getElementsByTagName(t)[0], par = scr.parentNode;
                    par.insertBefore(s, scr);
                  })(document, 'script');
                `
              }}
            />
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Listicle?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our community of content creators and share your amazing listicles with the world.
          </p>
          <a 
            href="mailto:hello@getlisticled.com" 
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center space-x-2"
          >
            <Mail className="w-5 h-5" />
            <span>Email Us Directly</span>
          </a>
        </div>
      </div>
    </div>
  );
}
