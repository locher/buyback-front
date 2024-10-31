import { filename } from 'pathe/utils';
import { computed } from '#build/imports';

/**
 * Composable to dynamicaly load images as Vite doesn't support "require" https://github.com/nuxt/nuxt/issues/14766
 * @param fileName
 * @returns
 */
function useImages(fileName: string): string | undefined {
  const images = computed(() => import.meta.glob('~/assets/**/images/**/*.(png|jpeg|jpg)', { eager: true }));

  for (const path in images.value) {
    if (Object.hasOwn(images.value, path)) {
      // unknown type is required here to change the final type as typescript thinks that images.value[path] is a function, it is not.
      const image: unknown = images.value[path];
      const imagePath = (image as { default: string }).default;
      if (filename(imagePath) === filename(fileName)) {
        return imagePath;
      }
    }
  }
  return undefined;
}

export { useImages };
