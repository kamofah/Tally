const PUZZLE_EPOCH = new Date('2026-06-21');

export  const formatPuzzleDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
  }
  
export const formatPuzzleNumber = (): number => {
  const todayDate = new Date();
  const differenceInDays = todayDate.getTime() - PUZZLE_EPOCH.getTime();
  const puzzleNumber = Math.floor(differenceInDays / (1000 * 60 * 60 * 24));
  return puzzleNumber;
}