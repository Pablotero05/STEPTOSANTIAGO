class StsHeader extends HTMLElement {
  connectedCallback() {
    // Detecta la ruta activa para marcarla en el nav
    const currentPath = window.location.pathname;

    const navLinks = [
      { href: '/es/pages/rutas.html',     label: 'Todas las Rutas' },
      { href: '/es/pages/servicios.html', label: 'Servicios' },
      { href: '/es/pages/nosotros.html',  label: 'Sobre Nosotros' },
      { href: '/es/pages/blog.html',      label: 'Blog' },
    ];

    const desktopLinks = navLinks.map(link => {
      const isActive = currentPath.startsWith(link.href);
      return `
        <a href="${link.href}"
          class="${isActive
            ? 'text-[var(--primary-color)] font-semibold border-b-2 border-[var(--primary-color)]'
            : 'text-[var(--dark-text-color)] font-semibold hover:text-[var(--primary-color)] transition-colors duration-300'
          }">
          ${link.label}
        </a>
      `;
    }).join('');

    const mobileLinks = navLinks.map(link => {
      const isActive = currentPath.startsWith(link.href);
      return `
        <a href="${link.href}"
          class="${isActive
            ? 'block text-[var(--primary-color)] font-semibold py-3 border-b border-gray-100'
            : 'block text-[var(--dark-text-color)] font-semibold py-3 border-b border-gray-100 hover:text-[var(--primary-color)] transition-colors'
          }">
          ${link.label}
        </a>
      `;
    }).join('');

    this.innerHTML = `
      <header id="global-header" class="bg-[var(--light-background-color)] sticky top-0 z-50 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-24">

            <!-- Logo -->
            <a href="/" class="flex items-center">
              <img
                src="${this.getAttribute('logo') || 'assets/ststrasp.png'}"
                alt="Step To Santiago - Agencia del Camino de Santiago"
                class="h-48 p-6 w-auto object-contain">
            </a>

            <!-- Desktop Navigation -->
            <nav class="hidden lg:flex items-center space-x-8">
              ${desktopLinks}
              <a href="/contacto"
                class="px-6 py-3 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--primary-button-hover-bg-color)] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Consigue Tu Presupuesto Gratis
              </a>
            </nav>

            <!-- Mobile Menu Button -->
            <button
              id="mobile-menu-btn"
              class="lg:hidden p-2 text-[var(--dark-text-color)] hover:text-[var(--primary-color)]"
              aria-label="Abrir menú">
              <i class="fa-solid fa-bars text-2xl" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div
          id="mobile-menu"
          class="max-h-0 overflow-hidden lg:hidden bg-white border-t border-[var(--light-border-color)] shadow-xl absolute w-full left-0 transition-all duration-500 ease-in-out">
          <div class="px-4 py-6 space-y-4">
            ${mobileLinks}
            <a href="/contacto"
              class="block text-center px-6 py-4 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--primary-button-hover-bg-color)] transition-all">
              Consigue Tu Presupuesto Gratis
            </a>
          </div>
        </div>
      </header>
    `;

    this._initMobileMenu();
  }

  _initMobileMenu() {
    const btn  = this.querySelector('#mobile-menu-btn');
    const menu = this.querySelector('#mobile-menu');
    const icon = btn?.querySelector('i');

    if (!btn || !menu) return;

    let isOpen = false;

    btn.addEventListener('click', () => {
      isOpen = !isOpen;

      if (isOpen) {
        menu.style.maxHeight = menu.scrollHeight + 'px';
        icon?.classList.replace('fa-bars', 'fa-xmark');
        btn.setAttribute('aria-label', 'Cerrar menú');
      } else {
        menu.style.maxHeight = '0';
        icon?.classList.replace('fa-xmark', 'fa-bars');
        btn.setAttribute('aria-label', 'Abrir menú');
      }
    });

    // Cierra el menú al hacer click en un enlace
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        isOpen = false;
        menu.style.maxHeight = '0';
        icon?.classList.replace('fa-xmark', 'fa-bars');
      });
    });

    // Cierra el menú al hacer click fuera
    document.addEventListener('click', (e) => {
      if (isOpen && !this.contains(e.target)) {
        isOpen = false;
        menu.style.maxHeight = '0';
        icon?.classList.replace('fa-xmark', 'fa-bars');
      }
    });
  }
}

customElements.define('sts-header', StsHeader);
