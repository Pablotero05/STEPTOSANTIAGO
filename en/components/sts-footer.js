class StsFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer id="global-footer" class="bg-[var(--dark-background-color)] text-white">

        <!-- Main Footer Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

            <!-- Columna 1: Logo & Descripción -->
            <div class="lg:col-span-1">
              <a href="/" class="inline-block mb-6">
                <img
                  src="${this.getAttribute('logo') || 'assets/stsLOGO.png'}"
                  alt="Step To Santiago - Agencia del Camino de Santiago"
                  class="h-48 w-auto object-contain">
              </a>
              <p class="text-white/70 text-sm mb-6 leading-relaxed">
                Agencia especializada en el Camino de Santiago desde Santiago de
                Compostela. Más de 10 años acompañando peregrinos en su viaje
                espiritual.
              </p>
              <!-- Redes sociales -->
              <div class="flex gap-4">
                <a href="#" aria-label="Instagram"
                  class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--accent-color)] transition-colors">
                  <i class="fa-brands fa-instagram" aria-hidden="true"></i>
                </a>
                <a href="#" aria-label="Facebook"
                  class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--accent-color)] transition-colors">
                  <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
                </a>
                <a href="#" aria-label="YouTube"
                  class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--accent-color)] transition-colors">
                  <i class="fa-brands fa-youtube" aria-hidden="true"></i>
                </a>
              </div>
            </div>

            <!-- Columna 2: Rutas -->
            <div>
              <h4 class="font-bold text-lg mb-4" style="font-family: var(--font-family-heading);">
                Rutas
              </h4>
              <ul class="space-y-3">
                <li><a href="/rutas/camino-frances"   class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">Camino Francés</a></li>
                <li><a href="/rutas/camino-portugues" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">Camino Portugués</a></li>
                <li><a href="/rutas/camino-del-norte" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">Camino del Norte</a></li>
                <li><a href="/rutas/camino-primitivo" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">Camino Primitivo</a></li>
                <li><a href="/rutas"                  class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">Ver todas las rutas</a></li>
              </ul>
            </div>

            <!-- Columna 3: Servicios -->
            <div>
              <h4 class="font-bold text-lg mb-4" style="font-family: var(--font-family-heading);">
                Servicios
              </h4>
              <ul class="space-y-3">
                <li><a href="/servicios" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">Camino Individual</a></li>
                <li><a href="/servicios" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">Camino en Grupo</a></li>
                <li><a href="/servicios" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">Camino Privado</a></li>
                <li><a href="/servicios" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">Camino en Bicicleta</a></li>
                <li><a href="/blog"      class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">Blog</a></li>
              </ul>
            </div>

            <!-- Columna 4: Contacto -->
            <div>
              <h4 class="font-bold text-lg mb-4" style="font-family: var(--font-family-heading);">
                Contacto
              </h4>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <i class="fa-solid fa-location-dot text-[var(--accent-color)] mt-1" aria-hidden="true"></i>
                  <span class="text-white/70 text-sm">Rúa do Vilar, 54<br>15705 Santiago de Compostela<br>Galicia, España</span>
                </li>
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-phone text-[var(--accent-color)]" aria-hidden="true"></i>
                  <a href="tel:+34666666666" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">+34 666 666 666</a>
                </li>
                <li class="flex items-center gap-3">
                  <i class="fa-brands fa-whatsapp text-[var(--accent-color)]" aria-hidden="true"></i>
                  <a href="https://wa.me/34666666666" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">+34 666 666 666</a>
                </li>
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-envelope text-[var(--accent-color)]" aria-hidden="true"></i>
                  <a href="mailto:info@stepbystep.es" class="text-white/70 hover:text-[var(--accent-color)] transition-colors text-sm">info@stepbystep.es</a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
              <p class="text-white/50 text-sm">
                © ${new Date().getFullYear()} Step To Santiago. Todos los derechos reservados.
              </p>
              <div class="flex flex-wrap gap-6 justify-center">
                <a href="/politica-de-privacidad"  class="text-white/50 hover:text-white text-sm transition-colors">Política de Privacidad</a>
                <a href="/aviso-legal"             class="text-white/50 hover:text-white text-sm transition-colors">Aviso Legal</a>
                <a href="/terminos-y-condiciones"  class="text-white/50 hover:text-white text-sm transition-colors">Términos y Condiciones</a>
                <a href="/preguntas-frecuentes"    class="text-white/50 hover:text-white text-sm transition-colors">FAQ</a>
              </div>
            </div>
          </div>
        </div>

      </footer>

      <!-- WhatsApp Floating Button -->
      <a href="https://wa.me/34666666666"
        class="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Contactar por WhatsApp">
        <i class="fa-brands fa-whatsapp text-2xl" aria-hidden="true"></i>
      </a>
    `;
  }
}

customElements.define('sts-footer', StsFooter);
