const PUZZLE_EPOCH = new Date('2026-06-21');

export function formatPuzzleDate(date: Date) {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
  }
  
  export function formatPuzzleNumber() {
    const TodaysDate = new Date();
    const differenceInDays = TodaysDate.getTime() - PUZZLE_EPOCH.getTime();
    const puzzleNumber = Math.floor(differenceInDays / (1000 * 60 * 60 * 24));
    return puzzleNumber;
  }