export const ParseColor = {
  /* Decode a CSS color
   */
  parseColor(color) {
    let m = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (m) {
      return [Number.parseInt(m[1], 10), Number.parseInt(m[2], 10), Number.parseInt(m[3], 10), 255];
    }

    m = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*((0.)?\d+)\s*\)$/i);
    if (m) {
      return [Number.parseInt(m[1], 10), Number.parseInt(m[2], 10), Number.parseInt(m[3], 10), Number.parseInt(m[4], 10)];
    }
  },

  getStylePropertyFromElement(selector, property) {
    const el = document.querySelector(selector);
    const style = window.getComputedStyle(el);
    return style.getPropertyValue(property);
  },

  getColorArrayFromElement(selector, property) {
    return ParseColor.parseColor(ParseColor.getStylePropertyFromElement(selector, property));
  },

  getColorValueFromElement(selector, property) {
    const rgb = ParseColor.getColorArrayFromElement(selector, property);
    return (rgb[0] << 16) + (rgb[1] << 8) + rgb[2];
  },

  getColorFloatArrayFromElement(selector, property) {
    return ParseColor.getColorArrayFromElement(selector, property).map((x) => x / 255);
  },

  rgbToHsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l };
  },

  formatHexColor(r, g, b) {
    let rs = r.toString(16),
      gs = g.toString(16),
      bs = b.toString(16);

    if (rs.length === 1) rs = `0${rs}`;
    if (gs.length === 1) gs = `0${gs}`;
    if (bs.length === 1) bs = `0${bs}`;

    return `#${rs}${gs}${bs}`;
  },

  parseHexColor(h) {
    let r = 0,
      g = 0,
      b = 0;

    // 3 digits
    if (h.length === 4) {
      r = Number.parseInt(h[1] + h[1], 16);
      g = Number.parseInt(h[2] + h[2], 16);
      b = Number.parseInt(h[3] + h[3], 16);

      // 6 digits
    } else if (h.length === 7) {
      r = Number.parseInt(h[1] + h[2], 16);
      g = Number.parseInt(h[3] + h[4], 16);
      b = Number.parseInt(h[5] + h[6], 16);
    }

    return { r, g, b };
  },
};
