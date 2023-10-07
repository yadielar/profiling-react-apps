export function getFruitEmoji(fruit: string | undefined) {
  if (!fruit) return '';
  const emoji = {
    apple: '🍎',
    banana: '🍌',
    strawberry: '🍓',
    grapes: '🍇',
    pineapple: '🍍',
  }[fruit];
  return emoji ? emoji : '';
}
