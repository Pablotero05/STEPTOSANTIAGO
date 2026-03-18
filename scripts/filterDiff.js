(function () {

  const FILTER_STYLES = {
    'all':          { active: 'bg-[var(--primary-color)] text-white',  inactive: 'bg-gray-100 text-[var(--gray-text-color)] hover:bg-gray-200' },
    'facil':        { active: 'bg-green-500 text-white',               inactive: 'bg-gray-100 text-[var(--gray-text-color)] hover:bg-green-100 hover:text-green-700' },
    'moderado':     { active: 'bg-yellow-500 text-white',              inactive: 'bg-gray-100 text-[var(--gray-text-color)] hover:bg-yellow-100 hover:text-yellow-700' },
    'exigente':     { active: 'bg-orange-500 text-white',              inactive: 'bg-gray-100 text-[var(--gray-text-color)] hover:bg-orange-100 hover:text-orange-700' },
    'muy-exigente': { active: 'bg-red-500 text-white',                 inactive: 'bg-gray-100 text-[var(--gray-text-color)] hover:bg-red-100 hover:text-red-700' },
  };

  const DIFFICULTY_LABELS = {
    'all':          'rutas disponibles',
    'facil':        'rutas fáciles',
    'moderado':     'rutas moderadas',
    'exigente':     'rutas exigentes',
    'muy-exigente': 'rutas muy exigentes',
  };

  let activeFilter  = 'all';
  let isAnimating   = false;        // bloquea clicks mientras anima

  // ─── FUNCIÓN PRINCIPAL ───────────────────────────────────────────────
  function filterRoutes(difficulty) {
    if (isAnimating || difficulty === activeFilter) return;
    isAnimating  = true;
    activeFilter = difficulty;

    const cards = [...document.querySelectorAll('.route-card')];
    const toShow = cards.filter(c => difficulty === 'all' || c.dataset.difficulty === difficulty);
    const toHide = cards.filter(c => difficulty !== 'all' && c.dataset.difficulty !== difficulty);

    updateButtons(difficulty);

    // 1️⃣  FADE OUT de las cards que desaparecen
    toHide.forEach(card => {
      card.style.transition  = 'opacity 0.2s ease, transform 0.2s ease';
      card.style.opacity     = '0';
      card.style.transform   = 'scale(0.95)';
    });

    // 2️⃣  Después del fade out → ocultarlas y hacer fade in de las visibles
    setTimeout(() => {

      // Ocultar las que salieron (ya sin transición para evitar glitch)
      toHide.forEach(card => {
        card.style.transition = 'none';
        card.style.display    = 'none';
      });

      // Preparar las que van a entrar (invisibles pero en el DOM)
      toShow.forEach(card => {
        card.style.transition = 'none';
        card.style.display    = '';
        card.style.opacity    = '0';
        card.style.transform  = 'translateY(16px)';
      });

      // Forzar reflow para que el navegador "vea" el estado inicial
      document.getElementById('routes-grid')?.offsetHeight;

      // 3️⃣  FADE IN escalonado (stagger) de las cards visibles
      toShow.forEach((card, i) => {
        setTimeout(() => {
          card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          card.style.opacity    = '1';
          card.style.transform  = '';

          // Libera el bloqueo tras la última card
          if (i === toShow.length - 1) {
            setTimeout(() => { isAnimating = false; }, 350);
          }
        }, i * 60);   // 60ms entre cada card → efecto cascada
      });

      // Si no hay cards que mostrar → libera bloqueo de todas formas
      if (toShow.length === 0) {
        isAnimating = false;
      }

      updateCounter(toShow.length, difficulty);
      updateNoResults(toShow.length);

    }, 220);   // espera a que termine el fade out (0.2s + margen)
  }

  // ─── BOTONES ─────────────────────────────────────────────────────────
  function updateButtons(difficulty) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const f      = btn.dataset.filter;
      const styles = FILTER_STYLES[f] || FILTER_STYLES.all;
      const apply  = f === difficulty ? styles.active : styles.inactive;

      btn.className = `filter-btn px-5 py-2 rounded-full text-sm font-semibold transition-all ${apply}`;
    });
  }

  // ─── CONTADOR ────────────────────────────────────────────────────────
  function updateCounter(count, difficulty) {
    const counter = document.getElementById('routes-counter');
    if (counter) {
      counter.textContent = `${count} ${DIFFICULTY_LABELS[difficulty] || 'rutas'}`;
    }
  }

  // ─── MENSAJE SIN RESULTADOS ──────────────────────────────────────────
  function updateNoResults(count) {
    const el = document.getElementById('no-results');
    if (el) el.style.display = count === 0 ? 'block' : 'none';
  }

  // ─── INICIALIZACIÓN (espera a que routeCards inyecte el DOM) ─────────
  function init() {
    const grid = document.getElementById('routes-grid');
    if (!grid) return;

    // Contador de resultados
    if (!document.getElementById('routes-counter')) {
      const counter = document.createElement('p');
      counter.id        = 'routes-counter';
      counter.className = 'text-[var(--gray-text-color)] text-sm mb-6';
      grid.before(counter);
    }

    // Mensaje sin resultados
    if (!document.getElementById('no-results')) {
      const noResults = document.createElement('div');
      noResults.id        = 'no-results';
      noResults.style.display = 'none';
      noResults.className = 'col-span-full text-center py-16';
      noResults.innerHTML = `
        <i class="fa-solid fa-route text-5xl text-gray-300 mb-4 block"></i>
        <p class="text-[var(--gray-text-color)] text-lg font-medium mb-4">No hay rutas con esta dificultad</p>
        <button onclick="filterRoutes('all')"
          class="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--primary-button-hover-bg-color)] transition-all">
          Ver todas las rutas
        </button>
      `;
      grid.appendChild(noResults);
    }

    // Activa "Todas" al inicio (sin bloqueo porque no hay nada que animar)
    activeFilter = '';
    filterRoutes('all');

    // Filtro por URL: /rutas.html?dificultad=facil
    const urlFilter = new URLSearchParams(window.location.search).get('dificultad');
    if (urlFilter && FILTER_STYLES[urlFilter]) {
      setTimeout(() => filterRoutes(urlFilter), 400);
    }
  }

  // Escucha el evento que lanza routeCards.js cuando termina de pintar
  document.addEventListener('routesLoaded', init);

  // Expone globalmente para los onclick del HTML
  window.filterRoutes = filterRoutes;

})();
