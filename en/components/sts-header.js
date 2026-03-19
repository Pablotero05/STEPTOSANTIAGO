class StsHeader extends HTMLElement {
  connectedCallback() {
    const currentPath = window.location.pathname;

    const navLinks = [
      { href: '/en/pages/rutas.html', label: 'All Routes' },
      { href: '/en/pages/servicios.html', label: 'Services' },
      { href: '/en/pages/nosotros.html', label: 'About Us' },
      { href: '/en/pages/blog.html', label: 'Blog' },
    ];

    const desktopLinks = navLinks.map(link => {
      const isActive = currentPath.startsWith(link.href);
      return `
        <a href="${link.href}" class="${isActive
          ? 'text-[var(--primary-color)] font-semibold border-b-2 border-[var(--primary-color)]'
          : 'text-[var(--dark-text-color)] font-semibold hover:text-[var(--primary-color)] transition-colors duration-300'
        }">${link.label}</a>
      `;
    }).join('');

    const mobileLinks = navLinks.map(link => {
      const isActive = currentPath.startsWith(link.href);
      return `
        <a href="${link.href}" class="${isActive
          ? 'block text-[var(--primary-color)] font-semibold py-3 border-b border-gray-100'
          : 'block text-[var(--dark-text-color)] font-semibold py-3 border-b border-gray-100 hover:text-[var(--primary-color)] transition-colors'
        }">${link.label}</a>
      `;
    }).join('');

    this.innerHTML = `
      <header id="global-header" class="bg-[var(--light-background-color)] sticky top-0 z-50 shadow-lg">
        <div class="max-w-7xl mx-auto pl-0 pr-4 sm:pl-0 sm:pr-6 lg:pl-2 lg:pr-8">
          <div class="flex justify-between items-center h-24">

            <a href="/" class="flex items-center">
              <img src="${this.getAttribute('logo') || 'assets/ststrasp.png'}"
                alt="Step To Santiago - Camino de Santiago Agency"
                class="h-48 p-6 w-auto object-contain">
            </a>

            <nav class="hidden lg:flex items-center space-x-8">
              ${desktopLinks}
              <a href="/contacto"
                class="px-6 py-3 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--primary-button-hover-bg-color)] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Get Your Free Quote
              </a>

              <!-- Language toggle -->
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" id="lang-toggle">
                <div class="group peer ring-0 bg-blue-500 rounded-full outline-none duration-300 after:duration-300 w-24 h-12 shadow-md
                  peer-checked:bg-rose-400 peer-focus:outline-none
                  after:content-[''] after:rounded-full after:absolute after:outline-none
                  after:h-10 after:w-10 after:top-1 after:right-1
                  after:bg-cover after:bg-center
                  after:bg-[url('../../assets/flags/en_flag.png')]
                  peer-checked:after:-translate-x-12
                  peer-checked:after:bg-[url('../../assets/flags/es_flag.png')]
                  peer-hover:after:scale-95">
                </div>
              </label>
            </nav>

            <button id="mobile-menu-btn" class="lg:hidden p-2 text-[var(--dark-text-color)] hover:text-[var(--primary-color)]" aria-label="Open menu">
              <i class="fa-solid fa-bars text-2xl" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div id="mobile-menu" class="max-h-0 overflow-hidden lg:hidden bg-white border-t border-[var(--light-border-color)] shadow-xl absolute w-full left-0 transition-all duration-500 ease-in-out">
          <div class="px-4 py-6 space-y-4">
            ${mobileLinks}
            <a href="/contacto" class="block text-center px-6 py-4 bg-[var(--primary-color)] text-white font-semibold rounded-lg hover:bg-[var(--primary-button-hover-bg-color)] transition-all">
              Get Your Free Quote
            </a>
          </div>
        </div>
      </header>
    `;

    this._initMobileMenu();
    this._initLangToggle();
  }

  _initLangToggle() {
  const toggle = this.querySelector('#lang-toggle');
  if (!toggle) return;

  const url = new URL(window.location.href);


  toggle.addEventListener('change', (e) => {
    setTimeout(() => {

      const currentUrl = new URL(window.location.href);
      const path = currentUrl.pathname;

      let newPath;

      if (path.startsWith("/es")) {
        newPath = path.replace(/^\/es/, "/en");
      } else if (path.startsWith("/en")) {
        newPath = path.replace(/^\/en/, "/es");
      } else {
        // Si no hay idioma en la URL
        newPath = (e.target.checked ? "/en" : "/es") + path;
      }

      // Mantener parámetros (?x=1)
      currentUrl.pathname = newPath;

      window.location.href = currentUrl.toString();

    }, 400); // animación
  });
}

  _initMobileMenu() {
    const btn = this.querySelector('#mobile-menu-btn');
    const menu = this.querySelector('#mobile-menu');
    const icon = btn?.querySelector('i');

    if (!btn || !menu) return;

    let isOpen = false;

    btn.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        menu.style.maxHeight = menu.scrollHeight + 'px';
        icon?.classList.replace('fa-bars', 'fa-xmark');
        btn.setAttribute('aria-label', 'Close menu');
      } else {
        menu.style.maxHeight = '0';
        icon?.classList.replace('fa-xmark', 'fa-bars');
        btn.setAttribute('aria-label', 'Open menu');
      }
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        isOpen = false;
        menu.style.maxHeight = '0';
        icon?.classList.replace('fa-xmark', 'fa-bars');
      });
    });

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