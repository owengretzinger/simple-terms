export function segmentText(pageText: string) {
  let textSegments = [];

  let counter = Math.floor(pageText.length / 30000) + 1;
  for (let i = 0; i < counter; i++) {
    textSegments.push(pageText.substring(30000 * i, 30000 * (i + 1)));
  }

  return textSegments;
}
