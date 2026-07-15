import { isPlatform } from '@capacitor/core';

export function usePlatform() {
  return {
    isIOS: isPlatform('ios'),
    isAndroid: isPlatform('android'),
    isWeb: isPlatform('web'),
    isMobile: isPlatform('ios') || isPlatform('android'),
  };
}
