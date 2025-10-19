import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            We Always Like Hearing From You...
          </h1>
          
          {/* Wufoo Form Embed */}
          <iframe 
            height="517" 
            title="Embedded Wufoo Form" 
            allowTransparency={true}
            frameBorder="0" 
            scrolling="no" 
            style={{width: '100%', border: 'none'}}
            sandbox="allow-popups-to-escape-sandbox allow-top-navigation allow-scripts allow-popups allow-forms allow-same-origin" 
            src="https://matsonian2.wufoo.com/embed/z1s0iqi1it1udq/"
          >
            <a href="https://matsonian2.wufoo.com/forms/z1s0iqi1it1udq/">Fill out my Wufoo form!</a>
          </iframe>
        </div>
      </div>
    </div>
  );
}
