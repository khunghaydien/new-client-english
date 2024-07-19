import { gql } from "@apollo/client";
export const GET_CHAPTERS = gql`
  query GetChapters(
    $chapterFilterDto: ChapterFilterDto,
    $paginationDto: PaginationDto,
    $orderByDto: OrderByDto
  ) {
    getChapters(
      chapterFilterDto: $chapterFilterDto,
      paginationDto: $paginationDto,
      orderByDto: $orderByDto
    ) {
      id
      name
      viewed
      createdAt
      updatedAt
      status
      type
      level
    }
  }
`