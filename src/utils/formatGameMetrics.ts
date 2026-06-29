const formatGameBudget = (budget: number): string => {
  if (budget < 0) {
    return `-$${Math.abs(budget)}`;
  }
  return `$${budget}`;
}

const formatGameLetterCount = (letterCount: number): string => {
  return letterCount.toString();
}

const formatGameAttempts = (attempts: number): string => {
  return `${attempts}/6`;
}

export { formatGameBudget, formatGameLetterCount, formatGameAttempts };