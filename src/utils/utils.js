export const IMAGES = {
    background: 'https://i.ytimg.com/vi/N45Uj70f2Vg/maxresdefault.jpg',
    
    pearl: 'https://i.pinimg.com/736x/17/17/f6/1717f6e2c0e0c54dde5666689e66d919.jpg',
    pearlGem: 'pearlGem.png',

    amethyst: 'https://images.kinorium.com/movie/cast/713871/w150_1316211.jpg?1622653066',
    amethystGem: 'amethystGem.png',

    garnet: 'https://i.pinimg.com/236x/df/77/0f/df770ffb5866a4773afcd2f05d6fcd60.jpg',
    garnetGem: 'garnetGem.png',

    steven: 'https://i.pinimg.com/736x/07/28/ce/0728cea9729e6318c3b209334a1f3dce.jpg',
    stevenGem: 'stevenGem.png',

    defaultGem: 'stevenGem.png',
    
    logo: 'https://i.pinimg.com/736x/07/1e/1d/071e1d434f1cd51d34fba940f34c30dd.jpg',
}

export const defaultCards = [
    {
        value: "amethyst",
        selected: false,
        image: IMAGES.amethyst,
        gem: IMAGES.amethystGem,
        flipped: false,
    },
    {
        value: "garnet",
        selected: false,
        image: IMAGES.garnet,
        gem: IMAGES.garnetGem,
        flipped: false,
    },
    {
        value: "pearl",
        selected: false,
        image: IMAGES.pearl,
        gem: IMAGES.pearlGem,
        flipped: false,
    },
    {
        value: "steven",
        selected: false,
        image: IMAGES.steven,
        gem: IMAGES.stevenGem,
        flipped: false,
    },
]

export const resetCardSelection = (cards) => 
    [...(cards.map(card => ({ ...card, selected: false })))];


export const flipAllCards = (cards, flipped) =>
    [...(cards.map(card => ({ ...card, flipped })))];


export function updateCardSelection(cards, selectedValue, currentScore) {
    // debugger
    const isAlreadySelected = cards.find(c => c.value === selectedValue)?.selected;

    const updatedCards = cards.map(c => {
        if (isAlreadySelected) {
            return { ...c, selected: false };
        } else if (c.value === selectedValue) {
            return { ...c, selected: true };
        }
        return c;
    });

    const newScore = isAlreadySelected ? 0 : currentScore + 1;
    const wasCorrect = !isAlreadySelected;

    return {
        updatedCards,
        newScore,
        wasCorrect,
    };
}