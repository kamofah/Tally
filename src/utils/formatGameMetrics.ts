import { MAX_ATTEMPTS } from "../data/constants";

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
  return `${attempts}/${MAX_ATTEMPTS}`;
}

export { formatGameBudget, formatGameLetterCount, formatGameAttempts };