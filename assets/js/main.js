(() => {
  const WA_NUMBER = '8801311851315';

  // WhatsApp links with a pre-filled message
  document.querySelectorAll('[data-wa]').forEach((a) => {
    a.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(a.dataset.wa)}`;
  });

  // Header shadow + hide action bar near the footer
  const header = document.querySelector('.site-header');
  const bar = document.querySelector('.action-bar');
  const footer = document.querySelector('.site-footer');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => bar.classList.toggle('hide', e.isIntersecting))
      .observe(footer);
  }

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন');
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Gallery lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const items = [...document.querySelectorAll('.g-item')];
  let current = 0;

  const show = (i) => {
    current = (i + items.length) % items.length;
    const img = items[current].querySelector('img');
    lbImg.src = items[current].dataset.full;
    lbImg.alt = img.alt;
    lbCap.textContent = `${img.alt} · ${current + 1}/${items.length}`;
  };

  if (typeof lb.showModal === 'function') {
    items.forEach((btn, i) => btn.addEventListener('click', () => {
      show(i);
      lb.showModal();
    }));

    lb.addEventListener('click', (e) => {
      const action = e.target.dataset.lb;
      if (action === 'close' || e.target === lb) lb.close();
      else if (action === 'prev') show(current - 1);
      else if (action === 'next') show(current + 1);
    });

    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });

    let startX = null;
    lb.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });
  } else {
    // Old browsers: open the image directly
    items.forEach((btn) => btn.addEventListener('click', () => window.open(btn.dataset.full, '_blank')));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
