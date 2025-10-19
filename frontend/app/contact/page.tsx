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
        // @ts-ignore
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
         <script type="text/javascript"> var z1s0iqi1it1udq; (function(d, t) { var s = d.createElement(t), options = { 'userName':'matsonian2', 'formHash':'z1s0iqi1it1udq', 'autoResize':true, 'height':'517', 'async':true, 'host':'wufoo.com', 'header':'show', 'ssl':true }; s.src = ('https:' == d.location.protocol ?'https://':'http://') + 'secure.wufoo.com/scripts/embed/form.js'; s.onload = s.onreadystatechange = function() { var rs = this.readyState; if (rs) if (rs != 'complete') if (rs != 'loaded') return; try { z1s0iqi1it1udq = new WufooForm(); z1s0iqi1it1udq.initialize(options); z1s0iqi1it1udq.display(); } catch (e) { } }; var scr = d.getElementsByTagName(t)[0], par = scr.parentNode; par.insertBefore(s, scr); })(document, 'script'); </script>
        </div>
      </div>
    </div>
  );
}
