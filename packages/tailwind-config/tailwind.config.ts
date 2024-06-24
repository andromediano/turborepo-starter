import type {Config} from 'tailwindcss';

// https://tailwindcss.com/docs/configuration
// https://nextjs.org/docs/app/building-your-application/optimizing/fonts
// https://nextjs.org/docs/app/api-reference/components/font
// https://fonts.google.com/variablefonts
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      // 변수(--roboto)는 styles/font.ts 에서 설정했다.
      // 실제 사용은 필요한 곳에서 `className="font-serif"`로 사용하면 된다.
      // 여기서 설정한 이름으로 VSCode에서 자동완성이 될 것이다.
      // `serif`라는 이름을 사용했다고 정의되어 있는 이름이라고 착각하지 마라. 커스텀 가능한 이름이다.
      // sans: ['var(--noto-sans-kr)'],
      serif: ['var(--roboto)'],
    },
  },
  plugins: [],
};

export default config;
