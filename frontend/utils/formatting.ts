//finsih the logic of returning the text on a space
export function shortenText(text: string, maxLength: number = 60): string {
  const splitText: string[] = text.split(" ");

  if (splitText.length <= maxLength) {
    return text;
  }

  //figure out the avagerage length of a word, figure out how many words on avagerage to reach my ideal max char length, and
  //slice on the word count

  return splitText.slice(0, maxLength).join(" ");
}
