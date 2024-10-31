export default function hideImei(str: string): string {
  if (str.length <= 4) {
    return str;
  }
  const keepChar: string = str.slice(-4);
  const hiddenChar: string = 'x'.repeat(str.length - 4);

  return hiddenChar + keepChar;
}
