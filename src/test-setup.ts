/**
 * jsdom no implementa `matchMedia`, y tanto GSAP/ScrollTrigger como los
 * componentes que respetan `prefers-reduced-motion` lo consultan al inicializarse.
 * Sin este stub la suite falla al importar cualquier módulo que use animaciones.
 */
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
