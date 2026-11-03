import { useState, useEffect } from 'react';

export function useTypewriter(
  words: string[],
  typingSpeed = 90,
  deletingSpeed = 40,
  pause = 1600
): string {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[index] || '';

    if (subIndex === currentWord.length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words, typingSpeed, deletingSpeed, pause]);

  if (!words || words.length === 0) return '';
  const currentWord = words[index] || '';
  return currentWord.substring(0, subIndex);
}
