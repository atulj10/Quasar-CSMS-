import React, { useEffect } from 'react';

const Gallary = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.dataset.useServiceCore = true;
    script.defer = true;

    const div = document.createElement('div');
    div.classList.add('elfsight-app-2e57baf2-38d1-47db-a241-fbbbbe809a6c');
    div.dataset.elfsightAppLazy = true;

    document.body.appendChild(script);
    document.body.appendChild(div);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(div);
    };
  }, []);

  return null;
};

export default Gallary;
