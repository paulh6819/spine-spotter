export function shortenText(text: string, maxLength: number = 60): string {
  const splitText: string[] = text.split(" ");

  if (splitText.length <= maxLength) {
    return text;
  }

  return splitText.slice(0, maxLength).join(" ");
}
