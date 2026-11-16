/**
 * Injects a `<style>` element into `document.head`.
 * The optional `marker` is stored in `data-rd` for later identification.
 */
export function addCSS (css: string, marker?: string): HTMLStyleElement | null {
  if (!css || typeof document === 'undefined') return null

  const style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.textContent = css
  document.head.appendChild(style)

  if (marker) {
    style.dataset.rd = marker
  }

  return style
}

export const addUiCSS = import.meta.env?.RD_UI_CSS
  ? import.meta.require?.(import.meta.env.RD_UI_CSS).addCSS as typeof addCSS
  : addCSS
