import { gql } from "@apollo/client";
export const GET_SEARCHS = gql`
  query GetSearchs(
    $searchFilterDto: SearchFilterDto,
    $paginationDto: PaginationDto
  ) {
    getSearchs(
      searchFilterDto: $searchFilterDto,
      paginationDto: $paginationDto,
    ) {
      id
      name
      scope
      description
    }
  }
`

