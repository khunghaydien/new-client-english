export interface Categories {
    ECHAPTER: string[];
    EDIFFICULTY: string;
    ECHAPTERSTATUS: string;
    EEXERCISE: string;
}

export const ECHAPTER = {
    GRAMMAR: "GRAMMAR",
    VOCABULARY: "VOCABULARY",
    LISTENING: "LISTENING",
    WRITING: "WRITING",
    READING: "READING",
    SPEAKING: "SPEAKING",
    CUSTOM: "CUSTOM",
    TOEIC: "TOEIC",
    IELTS: "IELTS",
}

export const EDIFFICULTY = {
    EASY: "EASY",
    MEDIUM: "MEDIUM",
    HARD: "HARD",
}

export const ECHAPTERSTATUS = {
    PUBLISHED: "PUBLISHED",
    DRAFT: "DRAFT",
    INCOMPLETED: "INCOMPLETED",
}

export const EEXERCISE = {
    MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
}

export const CATEGORIES: Categories = {
    ECHAPTER: [],
    EDIFFICULTY: "",
    ECHAPTERSTATUS: "",
    EEXERCISE: "",
};

export const DIFFICULTY_MAPPING: Record<string, string> = {
    "All items have difficulty is easy": "EASY",
    "All items have difficulty is medium": "MEDIUM",
    "All items have difficulty is hard": "HARD",
};