import { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    // Set ad options
    (window as any).atOptions = {
      'key': '083127bd8f2e0e659744a5003e21eb62',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };

    // Load the ad script
    const script = document.createElement('script');
    script.src = "//www.highperformanceformat.com/083127bd8f2e0e659744a5003e21eb62/invoke.js";
    script.type = "text/javascript";
    
    document.head.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center my-4">
      <div style={{ width: '728px', height: '90px', textAlign: 'center' }}>
        {/* Ad will be inserted here by the script */}
      </div>
    </div>
  );
};

export default AdBanner;