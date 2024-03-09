const WIDTHS: Record<number, string> = {
    1: "123px",
    2: "133px",
    3: "114px",
}
const SMALL_WIDTHS: Record<number, string> = {
    1: "109px",
    2: "117px",
    3: "101px",
}

const FILTER_TYPES = {
    LATEST_ANSWERS: 1,
    LATEST_QUESTIONS: 2,
    EXPLORE_DREPS: 3,
};

const FILTERS = [
    { type: FILTER_TYPES.LATEST_ANSWERS, label: "Latest answers" },
    { type: FILTER_TYPES.LATEST_QUESTIONS, label: "Latest questions" },
    { type: FILTER_TYPES.EXPLORE_DREPS, label: "Explore Dreps" },
];

export {
    FILTERS,
    FILTER_TYPES,
    SMALL_WIDTHS, 
    WIDTHS,
}