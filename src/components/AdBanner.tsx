import { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//pl27075612.profitableratecpm.com/9d41cc88256997c4c5386904819dfacc/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    const container = document.getElementById("container-9d41cc88256997c4c5386904819dfacc");
    if (container && !container.querySelector('script')) {
      container.appendChild(script);
    }
  }, []);

  return <div id="container-9d41cc88256997c4c5386904819dfacc" className="my-4" />;
};

export default AdBanner;