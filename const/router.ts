import { INavSidebar } from "@/components/common/navigation-sidebar";

export const libraryRouter: INavSidebar[] = [
    {
        label: "Grammar",
        href: "/library/grammar",
        children: [
            {
                label: "A1 Elementary",
                href: "/library/grammar/elementary",
                children: [],
            },
            {
                label: "A2 Pre Intermediate",
                href: "/library/grammar/pre-intermediate",
                children: [],
            },
            {
                label: "B1 Intermediate",
                href: "/library/grammar/intermediate",
                children: [],
            },
            {
                label: "B1+ Upper Intermediate",
                href: "/library/grammar/upper-intermediate",
                children: [],
            },
            {
                label: "B2 Pre Advanced",
                href: "/library/grammar/pre-advanced",
                children: [],
            },
        ],
    },
    {
        label: "Vacabulary",
        href: "/library/vacabulary",
        children: [
            {
                label: "A1 Elementary",
                href: "/library/vacabulary/elementary",
                children: [],
            },
            {
                label: "A2 Pre Intermediate",
                href: "/library/vacabulary/pre-intermediate",
                children: [],
            },
            {
                label: "B1 Intermediate",
                href: "/library/vacabulary/intermediate",
                children: [],
            },
            {
                label: "B1+ Upper Intermediate",
                href: "/library/vacabulary/upper-intermediate",
                children: [],
            },
            {
                label: "B2 Pre Advanced",
                href: "/library/vacabulary/pre-advanced",
                children: [],
            },
        ],
    },
    {
        label: "Listening",
        href: "/library/listening",
        children: [
            {
                label: "A1 Elementary",
                href: "/library/listening/elementary",
                children: [],
            },
            {
                label: "A2 Pre Intermediate",
                href: "/library/listening/pre-intermediate",
                children: [],
            },
            {
                label: "B1 Intermediate",
                href: "/library/listening/intermediate",
                children: [],
            },
            {
                label: "B1+ Upper Intermediate",
                href: "/library/listening/upper-intermediate",
                children: [],
            },
            {
                label: "B2 Pre Advanced",
                href: "/library/listening/pre-advanced",
                children: [],
            },
        ],
    },
    {
        label: "Writing",
        href: "/library/writing",
        children: [
            {
                label: "A1 Elementary",
                href: "/library/writing/elementary",
                children: [],
            },
            {
                label: "A2 Pre Intermediate",
                href: "/library/writing/pre-intermediate",
                children: [],
            },
            {
                label: "B1 Intermediate",
                href: "/library/writing/intermediate",
                children: [],
            },
            {
                label: "B1+ Upper Intermediate",
                href: "/library/writing/upper-intermediate",
                children: [],
            },
            {
                label: "B2 Pre Advanced",
                href: "/library/writing/pre-advanced",
                children: [],
            },
        ],
    },
    {
        label: "Reading",
        href: "/library/reading",
        children: [
            {
                label: "A1 Elementary",
                href: "/library/reading/elementary",
                children: [],
            },
            {
                label: "A2 Pre Intermediate",
                href: "/library/reading/pre-intermediate",
                children: [],
            },
            {
                label: "B1 Intermediate",
                href: "/library/reading/intermediate",
                children: [],
            },
            {
                label: "B1+ Upper Intermediate",
                href: "/library/reading/upper-intermediate",
                children: [],
            },
            {
                label: "B2 Pre Advanced",
                href: "/library/reading/pre-advanced",
                children: [],
            },
        ],
    },
    {
        label: "Speaking",
        href: "/library/speaking",
        children: [
            {
                label: "A1 Elementary",
                href: "/library/speaking/elementary",
                children: [],
            },
            {
                label: "A2 Pre Intermediate",
                href: "/library/speaking/pre-intermediate",
                children: [],
            },
            {
                label: "B1 Intermediate",
                href: "/library/speaking/intermediate",
                children: [],
            },
            {
                label: "B1+ Upper Intermediate",
                href: "/library/speaking/upper-intermediate",
                children: [],
            },
            {
                label: "B2 Pre Advanced",
                href: "/library/speaking/pre-advanced",
                children: [],
            },
        ],
    },

    {
        label: "Exam",
        href: "/library/exam",
        children: [
            {
                label: "Toeic",
                href: "/library/exam/toeic",
                children: [
                ],
            },
            {
                label: "Ielts",
                href: "/library/exam/ielts",
                children: [
                ],
            }
        ],
    },
    {
        label: "Custom",
        href: "/library/custom/random",
        children: [
        ],
    }
];