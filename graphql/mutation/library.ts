import { gql } from "@apollo/client";
export const CREATE_CHAPTER = gql`
  mutation CreateChapter($chapterCreateDto: ChapterCreateDto!) {
    createChapter(chapterCreateDto: $chapterCreateDto) {
      name
      type
      difficulty
      description
    }
  }
`;