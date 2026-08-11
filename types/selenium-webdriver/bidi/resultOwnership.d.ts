export const ResultOwnership: {
    readonly ROOT: "root";
    readonly NONE: "none";
};

export type ResultOwnership = (typeof ResultOwnership)[keyof typeof ResultOwnership];
