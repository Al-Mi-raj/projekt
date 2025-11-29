(() => {
    document.documentElement.classList.add('loading');
  
    const isMobileMQ = () => {
      try {
        return window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
      } catch (e) {
        return false;
      }
    };
  
    const uaFallback = () => {
      if (typeof navigator === 'undefined') return false;
      return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
  
    const chooseMobile = () => isMobileMQ() || uaFallback();
  
    const sheetHref = chooseMobile() ? 'style-mobile.css' : 'style-desktop.css';
  
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = sheetHref;
  
    link.onload = () => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('loading');
      });
    };
  
    link.onerror = () => {
      console.error('Failed to load stylesheet', sheetHref);
      document.documentElement.classList.remove('loading');
    };
  
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
  
    let lastWasMobile = chooseMobile();
    window.addEventListener('resize', () => {
      const nowMobile = isMobileMQ();
      if (nowMobile !== lastWasMobile) {
        lastWasMobile = nowMobile;
        link.href = nowMobile ? 'style-mobile.css' : 'style-desktop.css';
        document.documentElement.classList.add('loading');
      }
    });
  
  })();
  