import { ChapterFilterDto, OrderByDto, PaginationDto } from "@/gql/graphql"
import { create } from "zustand"
type ChapterFilterState = {
    chapterFilterDto: ChapterFilterDto,
    paginationDto: PaginationDto,
    orderByDto: OrderByDto
}

type ChapterFilterAction = {
    setChapterFilterDto: (chapterFilterState: ChapterFilterDto) => void
    setPaginationDto: (paginationDto: PaginationDto) => void
    setOrderByDto: (orderByDto: OrderByDto) => void
    reset: () => void
}
export const useChapterStore = create<ChapterFilterState & ChapterFilterAction>()(
    (set) => ({
        chapterFilterDto: {} as ChapterFilterDto,
        paginationDto: { page: 1, pageSize: 10 } as PaginationDto,
        orderByDto: {} as OrderByDto,
        setChapterFilterDto: (chapterFilterDto) => set((state) => ({
            ...state,
            chapterFilterDto: {
                ...state.chapterFilterDto,
                ...chapterFilterDto,
            },
        })),
        setPaginationDto: (paginationDto) => set((state) => ({
            ...state,
            paginationDto: {
                ...state.paginationDto,
                ...paginationDto,
            },
        })),
        setOrderByDto: (orderByDto) => set((state) => ({
            ...state,
            orderByDto: {
                ...state.orderByDto,
                ...orderByDto,
            },
        })),
        reset: () => set({
            chapterFilterDto: {} as ChapterFilterDto,
            paginationDto: {
                page: 1,
                pageSize: 10
            } as PaginationDto,
            orderByDto: {} as OrderByDto,
        })
    })
)