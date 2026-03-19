(function () {

  // ===== TEMPLATE DE CADA CARD =====
  function createRouteCard(ruta) {
    const tagsHTML = ruta.tags
      .map(tag => `
        <span class="bg-[var(--primary-color)]/10 text-[var(--primary-color)] text-xs font-medium px-3 py-1 rounded-full">
          ${tag}
        </span>`)
      .join('');

    return `
      <div class="route-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1"
           data-difficulty="${ruta.dificultad}">

        <!-- Imagen + overlays -->
        <div class="relative overflow-hidden h-56">
          <img
            src="${ruta.imagen}"
            alt="${ruta.nombre}"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <!-- Badge superior -->
          <div class="absolute top-4 left-4">
            <span class="${ruta.badgeColor} text-xs font-bold px-3 py-1 rounded-full">
              ${ruta.badge}
            </span>
          </div>

          <!-- Dificultad (inferior izquierda) -->
          <div class="absolute bottom-4 left-4">
            <span class="${ruta.dificultadColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              ${ruta.dificultadLabel}
            </span>
          </div>

          <!-- Km y días (inferior derecha) -->
          <div class="absolute bottom-4 right-4 text-white text-right">
            <div class="text-2xl font-bold">${ruta.km}</div>
            <div class="text-xs opacity-80">${ruta.dias}</div>
          </div>
        </div>

        <!-- Contenido -->
        <div class="p-6">
          <h3 class="text-xl font-bold text-[var(--dark-text-color)] mb-2"
              style="font-family: var(--font-family-heading);">
            ${ruta.nombre}
          </h3>

          <p class="text-[var(--gray-text-color)] text-sm leading-relaxed mb-4">
            ${ruta.descripcion}
          </p>

          <!-- Inicio → Fin -->
          <div class="flex flex-wrap gap-3 mb-5 text-xs text-[var(--gray-text-color)]">
            <span class="flex items-center gap-1">
              <i class="fa-solid fa-map-pin text-[var(--primary-color)]"></i>
              ${ruta.inicio}
            </span>
            <span class="flex items-center gap-1">
              <i class="fa-solid fa-flag-checkered text-[var(--primary-color)]"></i>
              ${ruta.fin}
            </span>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-5">
            ${tagsHTML}
          </div>

          <!-- Precio + CTA -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span class="text-[var(--gray-text-color)] text-xs">Desde</span>
              <div class="text-[var(--primary-color)] font-bold text-lg">${ruta.precio}</div>
            </div>
            <a href="${ruta.slug}"
               class="px-5 py-2.5 bg-[var(--primary-color)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--primary-button-hover-bg-color)] transition-all duration-300 shadow-md">
              Ver detalles →
            </a>
          </div>
        </div>

      </div>
    `;
  }

  // ===== CARGA Y RENDERIZA EL GRID =====
  async function loadRoutes() {
    const grid = document.getElementById('routes-grid');
    if (!grid) return;

    // Estado de carga
    grid.innerHTML = `
      <div class="col-span-full flex justify-center items-center py-20">
        <div class="text-center">
          <i class="fa-solid fa-route text-4xl text-[var(--primary-color)] animate-pulse mb-4 block"></i>
          <p class="text-[var(--gray-text-color)]">Cargando rutas...</p>
        </div>
      </div>
    `;

    try {
      const response = await fetch('../data/rutas.json');

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const rutas = await response.json();

      // Renderiza todas las cards
      grid.innerHTML = rutas.map(createRouteCard).join('');

      // Notifica a filterRoutes.js que el contenido está listo
      document.dispatchEvent(new CustomEvent('routesLoaded', { detail: { total: rutas.length } }));

    } catch (error) {
      console.error('Error cargando rutas:', error);
      grid.innerHTML = `
        <div class="col-span-full text-center py-16">
          <i class="fa-solid fa-triangle-exclamation text-4xl text-red-400 mb-4 block"></i>
          <p class="text-[var(--gray-text-color)] text-lg font-medium">No se pudieron cargar las rutas</p>
          <button onclick="location.reload()"
            class="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg text-sm font-semibold hover:bg-[var(--primary-button-hover-bg-color)] transition-all">
            Reintentar
          </button>
        </div>
      `;
    }
  }

  document.addEventListener('DOMContentLoaded', loadRoutes);

})();
