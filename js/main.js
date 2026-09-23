/**
 * Dsiji — main.js
 * Scroll-spy, smooth scroll, hamburger toggle.
 */
document.addEventListener('DOMContentLoaded', function () {

  /* ──── Elements ──── */
  var sidebar   = document.getElementById('sidebar');
  var toggle    = document.getElementById('menuToggle');
  var overlay   = document.getElementById('menuOverlay');
  var navLinks  = sidebar.querySelectorAll('.sidebar__link[data-section]');
  var sections  = [];

  // Build sections array from nav links
  navLinks.forEach(function (link) {
    var id = link.getAttribute('data-section');
    var el = document.getElementById(id);
    if (el) sections.push({ id: id, el: el, link: link });
  });

  /* ──── Hamburger ──── */
  function openMenu() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Tutup menu');
  }

  function closeMenu() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Buka menu');
  }

  toggle.addEventListener('click', function () {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  /* ──── Smooth scroll with offset ──── */
  function scrollToAnchor(id) {
    var target = document.getElementById(id);
    if (!target) return;
    var offset = window.innerWidth <= 1024 ? 72 : 24;
    var top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
    closeMenu();
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      scrollToAnchor(link.getAttribute('data-section'));
    });
  });

  // Also handle external anchor links (hero CTA buttons, footer links, etc.)
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      var id = href.replace('#', '');
      if (id && document.getElementById(id)) {
        e.preventDefault();
        scrollToAnchor(id);
      }
    });
  });

  /* ──── Scroll-spy ──── */
  function updateActiveLink() {
    var scrollY = window.scrollY;
    var viewH   = window.innerHeight;
    var current = null;

    sections.forEach(function (item) {
      var rect = item.el.getBoundingClientRect();
      var top = rect.top + scrollY;
      var bottom = top + rect.height;

      // Consider a section "active" when its top is at or above the offset
      // and its bottom is below the offset
      var offset = 100;
      if (scrollY >= top - offset && scrollY < bottom - offset) {
        current = item.id;
      }
    });

    // If scrolled past last section, keep that one active
    if (!current && sections.length) {
      var last = sections[sections.length - 1];
      var lastBottom = last.el.getBoundingClientRect().top + window.scrollY + last.el.offsetHeight;
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10) {
        current = last.id;
      }
    }

    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('data-section') === current);
    });
  }

  // Throttled scroll handler
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check
  updateActiveLink();

  /* ──── Portfolio (data/portfolio.json) ──── */
  var grid = document.getElementById('portfolioGrid');
  if (grid) {
    fetch('data/portfolio.json')
      .then(function (r) { return r.json(); })
      .then(function (items) {
        grid.innerHTML = items.map(function (p) {
          var note = p.tenantNote
            ? '<p class="card__tenant-note">' + p.tenantNote + '</p>'
            : '';
          return (
            '<article class="card">' +
              '<div class="card__frame">' +
                '<div class="card__frame-bar"><span></span><span></span><span></span></div>' +
                '<img class="card__frame-img" src="' + p.image + '" alt="' + p.alt + '" loading="lazy" width="1200" height="750" />' +
              '</div>' +
              '<div class="card__body">' +
                '<h3 class="card__title">' + p.title + '</h3>' +
                '<p class="card__desc">' + p.description + '</p>' +
                '<span class="card__tag">' + p.tag + '</span>' +
                note +
                '<a href="' + p.url + '" target="_blank" rel="noopener" class="btn btn--small btn--primary">Lihat Proyek</a>' +
              '</div>' +
            '</article>'
          );
        }).join('');
      })
      .catch(function () { /* data gagal dimuat, grid kosong */ });
  }
});
