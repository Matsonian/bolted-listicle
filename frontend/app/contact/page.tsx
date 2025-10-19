'use client'

import React, { useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    // Load Wufoo script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://secure.wufoo.com/scripts/embed/form.js';
    script.async = true;
    
    script.onload = () => {
      try {
        // @ts-ignore - WufooForm is loaded by the external script
        if (typeof WufooForm !== 'undefined') {
          const z1s0iqi1it1udq = new WufooForm();
          z1s0iqi1it1udq.initialize({
            'userName': 'matsonian2',
            'formHash': 'z1s0iqi1it1udq',
            'autoResize': true,
            'height': '517',
            'async': true,
            'host': 'wufoo.com',
            'header': 'show',
            'ssl': true
          });
          z1s0iqi1it1udq.display();
        }
      } catch (e) {
        console.error('Wufoo form initialization error:', e);
      }
    };
    
    document.body.appendChild(script);
    
    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            We Always Like Hearing From You...
          </h1>
          
          {/* Wufoo Form Embed */}
          <div id="wufoo-z1s0iqi1it1udq"></div>
        </div>
      </div>
    </div>
  );
}
