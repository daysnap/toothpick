function withOpacity(cssVariable) {
  return ({ opacityValue }) => {
    return `rgba(var(${cssVariable}), ${opacityValue})`
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 盒阴影
      boxShadow: {
        down: '0 4px 12px rgba(0, 0, 0, .08), 0 0 1px rgba(1, 0, 0, .1)',
        preview: '0 1px 2px rgba(0, 0, 0, .06)',
      },
      colors: {
        // 主题
        primary: withOpacity('--tp-primary-color'),
        'primary-hover': withOpacity('--tp-primary-hover-color'),
      },
    },
  },
  plugins: [],
}
