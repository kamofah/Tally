const formatGameBudget = (budget: number) => {
    if (budget < 0) {
        return `-$${-budget}`;
    }
    return `$${budget}`;
}

const formatGameLetterCount = (letterCount: number) => {
    return letterCount.toString();
}

const formatGameAttempts = (attempts: number) => {
    return `${attempts.toString()}/6`;
}

export { formatGameBudget, formatGameLetterCount, formatGameAttempts };