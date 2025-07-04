import { useEffect } from 'react';

interface SidebarAdProps {
  side: 'left' | 'right';
}

const SidebarAd = ({ side }: SidebarAdProps) => {
  useEffect(() => {
    const uniqueId = Math.random().toString(36).substr(2, 9);
    (window as any)[`atOptions_${side}_${uniqueId}`] = {
      'key': '083127bd8f2e0e659744a5003e21eb62',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };

    const script = document.createElement('script');
    script.src = "//www.highperformanceformat.com/083127bd8f2e0e659744a5003e21eb62/invoke.js";
    script.type = "text/javascript";
    script.id = `${side}-sidebar-ad-${uniqueId}`;
    
    if (!document.getElementById(script.id)) {
      document.head.appendChild(script);
    }
  }, [side]);

  return (
    <div className={`fixed top-1/2 -translate-y-1/2 z-10 ${side === 'left' ? 'left-2' : 'right-2'} hidden xl:block`}>
      <div className="transform rotate-90 origin-center">
        <div style={{ width: '728px', height: '90px', textAlign: 'center' }}>
          {/* Sidebar ad will be inserted here */}
        </div>
      </div>
    </div>
  );
};

export default SidebarAd;