export interface ISearch {
    id: string
    name: string
    scope: string[]
    description: string
}
export interface SearchState {
    data: ISearch[]
}