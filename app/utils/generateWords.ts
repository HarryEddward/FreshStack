// utils/generateWords.ts

export function generateRandomWords(count: number): string {
  const words = ['luz', 'árbol', 'código', 'mar', 'ventana', 'nube', 'pantalla', 'sistema'];
  const result = [];

  for (let i = 0; i < count; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    result.push(word);
  }

  return result.join(' ');
}
