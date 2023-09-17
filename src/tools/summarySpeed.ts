const readingSpeed = 250;
// wpm

function countWords(text: string): number {
  // Split the text into words by spaces
  const words = text.split(/\s+/);

  // Filter out any empty strings (caused by multiple spaces)
  const nonEmptyWords = words.filter((word) => word.trim() !== "");

  // Return the count of non-empty words
  return nonEmptyWords.length;
}

/***
 * First parameter time1 is the longer time (e.g. the time taken to read the pageText)
 */
export function timeDifferenceStringFromText(
  text1: string,
  text2: string
): string {
  // return "5 minutes";
  const time1 = countWords(text1) / readingSpeed;
  console.log(countWords(text1));
  console.log(time1);
  const time2 = countWords(text2) / readingSpeed;
  console.log("");
  console.log(countWords(text2));
  console.log(time2);
  const timeDiff = time1 - time2;
  const minutes = Math.floor(timeDiff);
  return `${minutes} minutes`;
}
