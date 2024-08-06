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
      chapters{
        id
        name
        viewed
        createdAt
        updatedAt
        status
        type
        difficulty
      }  
      pagination{
        currentPage
        pageSize
        totalElements
        totalPages
      }
    }
  }
`

export const GET_EXERCISES = gql`
 query GetExercises(
    $chapterId: String!,
  ) {
    getExercises(chapterId:$chapterId){
      id,
    }
  }
`

export const GET_EXERCISE_BY_ID = gql`
 query GetExercise(
    $id: String!,
  ) {
    getExerciseById(id:$id){
      id,
      name,
      construction,
      type,
      questions{
        id,
        question,
        answers{
          id,
          label,
          value
        }
      }
    }
  }
`

export const GET_ANSWER_EXERCISE_BY_ID = gql`
 query GetAnswerExercise(
    $id: String!,
  ) {
    getExerciseById(id:$id){
      id,
      name,
      construction,
      type,
      questions{
        id,
        question,
        answers{
          id,
          label,
          value,
          isCorrect,
          description
        }
      }
    }
  }
`