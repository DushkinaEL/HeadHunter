import type{ MantineThemeOverride } from '@mantine/core';


export const mantineTheme: MantineThemeOverride = {
  colors: {
    primary: [
 '#E9EDFB', // 0 - самый светлый
      '#D2D9F7', // 1
      '#B9C3F2', // 2
      '#A0ADEE', // 3
      '#228BE6', //4 blue button add
      '#6B80E6', // 5
      '#526AE2', // 6
      '#4263EB', // 7 - основной (Primary)
      '#364FC7', // 8 - Dark Primary
      '#2F44AF'
    ],
    secondary: [
      '#FFFFFF', // 0 - white
      '#F6F6F7', // 1 - background
      '#0F0F101A', // 2 - ultraLight
      '#0F0F1033', // 3 - preLight
      '#0F0F104D', // 4 - lightGray
      '#0F0F1080', // 5 gray
      '#2A2A2A', // 6
      '#1F1F1F', // 7
      '#181818', // 8
      '#0F0F10'  // 9 - black
    ],
  
  },
  primaryColor: 'primary',
  fontFamily: '"Open Sans", Arial, sans-serif',
};