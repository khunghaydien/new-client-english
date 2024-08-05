/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type Answer = {
  __typename?: 'Answer';
  id: Scalars['String']['output'];
  isCorrect: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  question?: Maybe<Question>;
  questionId: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int']['output'];
};

export type Chapter = {
  __typename?: 'Chapter';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  difficulty: Scalars['String']['output'];
  exercises?: Maybe<Array<Exercise>>;
  explanations?: Maybe<Array<Explanation>>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  viewed: Scalars['Float']['output'];
};

export type ChapterCreateDto = {
  description: Scalars['String']['input'];
  difficulty: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type ChapterFilterDto = {
  difficulty?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ChapterUpdateDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Chapters = {
  __typename?: 'Chapters';
  chapters: Array<Chapter>;
  pagination: Pagination;
};

export type CreateAnswerDto = {
  isCorrect?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['String']['input'];
};

export type CreateExerciseDto = {
  construction: Scalars['String']['input'];
  name: Scalars['String']['input'];
  questions: Array<CreateQuestionDto>;
  type: Scalars['String']['input'];
};

export type CreateQuestionDto = {
  answers: Array<CreateAnswerDto>;
  question: Scalars['String']['input'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type Exercise = {
  __typename?: 'Exercise';
  chapter?: Maybe<Chapter>;
  chapterId: Scalars['String']['output'];
  construction: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  questions?: Maybe<Array<Question>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Explanation = {
  __typename?: 'Explanation';
  chapter: Chapter;
  chapterId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Login = {
  __typename?: 'Login';
  error?: Maybe<ErrorType>;
  user?: Maybe<User>;
};

export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChapter?: Maybe<BatchPayload>;
  createExercise?: Maybe<Exercise>;
  deleteChapter?: Maybe<Chapter>;
  deleteUser: User;
  login: Login;
  logout: Scalars['String']['output'];
  logoutAllDevices: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  register: Register;
  updateChapter?: Maybe<Chapter>;
  updateUser: User;
};


export type MutationCreateChapterArgs = {
  chapterCreateDto: Array<ChapterCreateDto>;
};


export type MutationCreateExerciseArgs = {
  chapterId: Scalars['String']['input'];
  createExerciseDto: CreateExerciseDto;
};


export type MutationDeleteChapterArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginDto;
};


export type MutationRegisterArgs = {
  registerInput: RegisterDto;
};


export type MutationUpdateChapterArgs = {
  chapterUpdateDto: ChapterUpdateDto;
  id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type OrderByDto = {
  field?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  currentPage: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  totalElements: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type PaginationDto = {
  page?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getChapters?: Maybe<Chapters>;
  getExerciseById?: Maybe<Exercise>;
  getExercises?: Maybe<Array<Exercise>>;
  getSearchs?: Maybe<Array<Search>>;
  getUsers: Array<User>;
  hello: Scalars['String']['output'];
};


export type QueryGetChaptersArgs = {
  chapterFilterDto?: InputMaybe<ChapterFilterDto>;
  orderByDto?: InputMaybe<OrderByDto>;
  paginationDto?: InputMaybe<PaginationDto>;
};


export type QueryGetExerciseByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetExercisesArgs = {
  chapterId: Scalars['String']['input'];
};


export type QueryGetSearchsArgs = {
  paginationDto?: InputMaybe<PaginationDto>;
  searchFilterDto?: InputMaybe<SearchFilterDto>;
};

export type Question = {
  __typename?: 'Question';
  answers?: Maybe<Array<Answer>>;
  createdAt: Scalars['DateTime']['output'];
  exercise?: Maybe<Exercise>;
  exerciseId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  question: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Register = {
  __typename?: 'Register';
  error?: Maybe<ErrorType>;
  user?: Maybe<User>;
};

export type RegisterDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Search = {
  __typename?: 'Search';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  relativeId?: Maybe<Scalars['String']['output']>;
  scope: Scalars['JSONObject']['output'];
  target: Scalars['String']['output'];
};

export type SearchFilterDto = {
  name?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  target?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Login', user?: { __typename?: 'User', email: string, id: string, name: string, avatar?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type LogoutAllDevicesMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutAllDevicesMutation = { __typename?: 'Mutation', logoutAllDevices: string };

export type RegisterMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Register', user?: { __typename?: 'User', id: string, name: string, email: string } | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', name: string } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  avatar: Scalars['String']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, avatar?: string | null, name: string } };

export type GetChaptersQueryVariables = Exact<{
  chapterFilterDto?: InputMaybe<ChapterFilterDto>;
  paginationDto?: InputMaybe<PaginationDto>;
  orderByDto?: InputMaybe<OrderByDto>;
}>;


export type GetChaptersQuery = { __typename?: 'Query', getChapters?: { __typename?: 'Chapters', chapters: Array<{ __typename?: 'Chapter', id: string, name: string, viewed: number, createdAt: any, updatedAt: any, status: string, type: string, difficulty: string }>, pagination: { __typename?: 'Pagination', currentPage: number, pageSize: number, totalElements: number, totalPages: number } } | null };

export type GetExercisesQueryVariables = Exact<{
  chapterId: Scalars['String']['input'];
}>;


export type GetExercisesQuery = { __typename?: 'Query', getExercises?: Array<{ __typename?: 'Exercise', id: string }> | null };

export type GetExerciseQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetExerciseQuery = { __typename?: 'Query', getExerciseById?: { __typename?: 'Exercise', id: string, name: string, construction: string, type: string, questions?: Array<{ __typename?: 'Question', id: string, question: string, answers?: Array<{ __typename?: 'Answer', id: string, label: string, value: string }> | null }> | null } | null };

export type GetSearchsQueryVariables = Exact<{
  searchFilterDto?: InputMaybe<SearchFilterDto>;
  paginationDto?: InputMaybe<PaginationDto>;
}>;


export type GetSearchsQuery = { __typename?: 'Query', getSearchs?: Array<{ __typename?: 'Search', id: string, name: string, relativeId?: string | null, scope: any, target: string, description?: string | null }> | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const LogoutAllDevicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutAllDevices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logoutAllDevices"}}]}}]} as unknown as DocumentNode<LogoutAllDevicesMutation, LogoutAllDevicesMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"avatar"},"value":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetChaptersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChapters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chapterFilterDto"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ChapterFilterDto"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationDto"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationDto"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderByDto"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChapters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chapterFilterDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chapterFilterDto"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationDto"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderByDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderByDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"viewed"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalElements"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<GetChaptersQuery, GetChaptersQueryVariables>;
export const GetExercisesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExercises"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExercises"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chapterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetExercisesQuery, GetExercisesQueryVariables>;
export const GetExerciseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetExercise"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExerciseById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"construction"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetExerciseQuery, GetExerciseQueryVariables>;
export const GetSearchsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSearchs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchFilterDto"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchFilterDto"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationDto"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSearchs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchFilterDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchFilterDto"}}},{"kind":"Argument","name":{"kind":"Name","value":"paginationDto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationDto"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"relativeId"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}},{"kind":"Field","name":{"kind":"Name","value":"target"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetSearchsQuery, GetSearchsQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type Answer = {
  __typename?: 'Answer';
  id: Scalars['String']['output'];
  isCorrect: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  question?: Maybe<Question>;
  questionId: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int']['output'];
};

export type Chapter = {
  __typename?: 'Chapter';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  difficulty: Scalars['String']['output'];
  exercises?: Maybe<Array<Exercise>>;
  explanations?: Maybe<Array<Explanation>>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  viewed: Scalars['Float']['output'];
};

export type ChapterCreateDto = {
  description: Scalars['String']['input'];
  difficulty: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type ChapterFilterDto = {
  difficulty?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ChapterUpdateDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  difficulty?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Chapters = {
  __typename?: 'Chapters';
  chapters: Array<Chapter>;
  pagination: Pagination;
};

export type CreateAnswerDto = {
  isCorrect?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['String']['input'];
};

export type CreateExerciseDto = {
  construction: Scalars['String']['input'];
  name: Scalars['String']['input'];
  questions: Array<CreateQuestionDto>;
  type: Scalars['String']['input'];
};

export type CreateQuestionDto = {
  answers: Array<CreateAnswerDto>;
  question: Scalars['String']['input'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type Exercise = {
  __typename?: 'Exercise';
  chapter?: Maybe<Chapter>;
  chapterId: Scalars['String']['output'];
  construction: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  questions?: Maybe<Array<Question>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Explanation = {
  __typename?: 'Explanation';
  chapter: Chapter;
  chapterId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Login = {
  __typename?: 'Login';
  error?: Maybe<ErrorType>;
  user?: Maybe<User>;
};

export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChapter?: Maybe<BatchPayload>;
  createExercise?: Maybe<Exercise>;
  deleteChapter?: Maybe<Chapter>;
  deleteUser: User;
  login: Login;
  logout: Scalars['String']['output'];
  logoutAllDevices: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  register: Register;
  updateChapter?: Maybe<Chapter>;
  updateUser: User;
};


export type MutationCreateChapterArgs = {
  chapterCreateDto: Array<ChapterCreateDto>;
};


export type MutationCreateExerciseArgs = {
  chapterId: Scalars['String']['input'];
  createExerciseDto: CreateExerciseDto;
};


export type MutationDeleteChapterArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginDto;
};


export type MutationRegisterArgs = {
  registerInput: RegisterDto;
};


export type MutationUpdateChapterArgs = {
  chapterUpdateDto: ChapterUpdateDto;
  id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type OrderByDto = {
  field?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
};

export type Pagination = {
  __typename?: 'Pagination';
  currentPage: Scalars['Float']['output'];
  pageSize: Scalars['Float']['output'];
  totalElements: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type PaginationDto = {
  page?: InputMaybe<Scalars['Float']['input']>;
  pageSize?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getChapters?: Maybe<Chapters>;
  getExerciseById?: Maybe<Exercise>;
  getExercises?: Maybe<Array<Exercise>>;
  getSearchs?: Maybe<Array<Search>>;
  getUsers: Array<User>;
  hello: Scalars['String']['output'];
};


export type QueryGetChaptersArgs = {
  chapterFilterDto?: InputMaybe<ChapterFilterDto>;
  orderByDto?: InputMaybe<OrderByDto>;
  paginationDto?: InputMaybe<PaginationDto>;
};


export type QueryGetExerciseByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetExercisesArgs = {
  chapterId: Scalars['String']['input'];
};


export type QueryGetSearchsArgs = {
  paginationDto?: InputMaybe<PaginationDto>;
  searchFilterDto?: InputMaybe<SearchFilterDto>;
};

export type Question = {
  __typename?: 'Question';
  answers?: Maybe<Array<Answer>>;
  createdAt: Scalars['DateTime']['output'];
  exercise?: Maybe<Exercise>;
  exerciseId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  question: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Register = {
  __typename?: 'Register';
  error?: Maybe<ErrorType>;
  user?: Maybe<User>;
};

export type RegisterDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Search = {
  __typename?: 'Search';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  relativeId?: Maybe<Scalars['String']['output']>;
  scope: Scalars['JSONObject']['output'];
  target: Scalars['String']['output'];
};

export type SearchFilterDto = {
  name?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  target?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Login', user?: { __typename?: 'User', email: string, id: string, name: string, avatar?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type LogoutAllDevicesMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutAllDevicesMutation = { __typename?: 'Mutation', logoutAllDevices: string };

export type RegisterMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Register', user?: { __typename?: 'User', id: string, name: string, email: string } | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', name: string } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String']['input'];
  avatar: Scalars['String']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, avatar?: string | null, name: string } };

export type GetChaptersQueryVariables = Exact<{
  chapterFilterDto?: InputMaybe<ChapterFilterDto>;
  paginationDto?: InputMaybe<PaginationDto>;
  orderByDto?: InputMaybe<OrderByDto>;
}>;


export type GetChaptersQuery = { __typename?: 'Query', getChapters?: { __typename?: 'Chapters', chapters: Array<{ __typename?: 'Chapter', id: string, name: string, viewed: number, createdAt: any, updatedAt: any, status: string, type: string, difficulty: string }>, pagination: { __typename?: 'Pagination', currentPage: number, pageSize: number, totalElements: number, totalPages: number } } | null };

export type GetExercisesQueryVariables = Exact<{
  chapterId: Scalars['String']['input'];
}>;


export type GetExercisesQuery = { __typename?: 'Query', getExercises?: Array<{ __typename?: 'Exercise', id: string }> | null };

export type GetExerciseQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetExerciseQuery = { __typename?: 'Query', getExerciseById?: { __typename?: 'Exercise', id: string, name: string, construction: string, type: string, questions?: Array<{ __typename?: 'Question', id: string, question: string, answers?: Array<{ __typename?: 'Answer', id: string, label: string, value: string }> | null }> | null } | null };

export type GetSearchsQueryVariables = Exact<{
  searchFilterDto?: InputMaybe<SearchFilterDto>;
  paginationDto?: InputMaybe<PaginationDto>;
}>;


export type GetSearchsQuery = { __typename?: 'Query', getSearchs?: Array<{ __typename?: 'Search', id: string, name: string, relativeId?: string | null, scope: any, target: string, description?: string | null }> | null };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(loginInput: {email: $email, password: $password}) {
    user {
      email
      id
      name
      avatar
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const LogoutAllDevicesDocument = gql`
    mutation LogoutAllDevices {
  logoutAllDevices
}
    `;
export type LogoutAllDevicesMutationFn = Apollo.MutationFunction<LogoutAllDevicesMutation, LogoutAllDevicesMutationVariables>;

/**
 * __useLogoutAllDevicesMutation__
 *
 * To run a mutation, you first call `useLogoutAllDevicesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutAllDevicesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutAllDevicesMutation, { data, loading, error }] = useLogoutAllDevicesMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutAllDevicesMutation(baseOptions?: Apollo.MutationHookOptions<LogoutAllDevicesMutation, LogoutAllDevicesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutAllDevicesMutation, LogoutAllDevicesMutationVariables>(LogoutAllDevicesDocument, options);
      }
export type LogoutAllDevicesMutationHookResult = ReturnType<typeof useLogoutAllDevicesMutation>;
export type LogoutAllDevicesMutationResult = Apollo.MutationResult<LogoutAllDevicesMutation>;
export type LogoutAllDevicesMutationOptions = Apollo.BaseMutationOptions<LogoutAllDevicesMutation, LogoutAllDevicesMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
  register(registerInput: {name: $name, email: $email, password: $password}) {
    user {
      id
      name
      email
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: String!) {
  deleteUser(id: $id) {
    name
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($id: String!, $avatar: String!) {
  updateUser(id: $id, avatar: $avatar) {
    id
    avatar
    name
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      avatar: // value for 'avatar'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetChaptersDocument = gql`
    query GetChapters($chapterFilterDto: ChapterFilterDto, $paginationDto: PaginationDto, $orderByDto: OrderByDto) {
  getChapters(
    chapterFilterDto: $chapterFilterDto
    paginationDto: $paginationDto
    orderByDto: $orderByDto
  ) {
    chapters {
      id
      name
      viewed
      createdAt
      updatedAt
      status
      type
      difficulty
    }
    pagination {
      currentPage
      pageSize
      totalElements
      totalPages
    }
  }
}
    `;

/**
 * __useGetChaptersQuery__
 *
 * To run a query within a React component, call `useGetChaptersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChaptersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChaptersQuery({
 *   variables: {
 *      chapterFilterDto: // value for 'chapterFilterDto'
 *      paginationDto: // value for 'paginationDto'
 *      orderByDto: // value for 'orderByDto'
 *   },
 * });
 */
export function useGetChaptersQuery(baseOptions?: Apollo.QueryHookOptions<GetChaptersQuery, GetChaptersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChaptersQuery, GetChaptersQueryVariables>(GetChaptersDocument, options);
      }
export function useGetChaptersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChaptersQuery, GetChaptersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChaptersQuery, GetChaptersQueryVariables>(GetChaptersDocument, options);
        }
export function useGetChaptersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetChaptersQuery, GetChaptersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChaptersQuery, GetChaptersQueryVariables>(GetChaptersDocument, options);
        }
export type GetChaptersQueryHookResult = ReturnType<typeof useGetChaptersQuery>;
export type GetChaptersLazyQueryHookResult = ReturnType<typeof useGetChaptersLazyQuery>;
export type GetChaptersSuspenseQueryHookResult = ReturnType<typeof useGetChaptersSuspenseQuery>;
export type GetChaptersQueryResult = Apollo.QueryResult<GetChaptersQuery, GetChaptersQueryVariables>;
export const GetExercisesDocument = gql`
    query GetExercises($chapterId: String!) {
  getExercises(chapterId: $chapterId) {
    id
  }
}
    `;

/**
 * __useGetExercisesQuery__
 *
 * To run a query within a React component, call `useGetExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExercisesQuery({
 *   variables: {
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useGetExercisesQuery(baseOptions: Apollo.QueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables> & ({ variables: GetExercisesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
      }
export function useGetExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
        }
export function useGetExercisesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, options);
        }
export type GetExercisesQueryHookResult = ReturnType<typeof useGetExercisesQuery>;
export type GetExercisesLazyQueryHookResult = ReturnType<typeof useGetExercisesLazyQuery>;
export type GetExercisesSuspenseQueryHookResult = ReturnType<typeof useGetExercisesSuspenseQuery>;
export type GetExercisesQueryResult = Apollo.QueryResult<GetExercisesQuery, GetExercisesQueryVariables>;
export const GetExerciseDocument = gql`
    query GetExercise($id: String!) {
  getExerciseById(id: $id) {
    id
    name
    construction
    type
    questions {
      id
      question
      answers {
        id
        label
        value
      }
    }
  }
}
    `;

/**
 * __useGetExerciseQuery__
 *
 * To run a query within a React component, call `useGetExerciseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetExerciseQuery(baseOptions: Apollo.QueryHookOptions<GetExerciseQuery, GetExerciseQueryVariables> & ({ variables: GetExerciseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExerciseQuery, GetExerciseQueryVariables>(GetExerciseDocument, options);
      }
export function useGetExerciseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExerciseQuery, GetExerciseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExerciseQuery, GetExerciseQueryVariables>(GetExerciseDocument, options);
        }
export function useGetExerciseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetExerciseQuery, GetExerciseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetExerciseQuery, GetExerciseQueryVariables>(GetExerciseDocument, options);
        }
export type GetExerciseQueryHookResult = ReturnType<typeof useGetExerciseQuery>;
export type GetExerciseLazyQueryHookResult = ReturnType<typeof useGetExerciseLazyQuery>;
export type GetExerciseSuspenseQueryHookResult = ReturnType<typeof useGetExerciseSuspenseQuery>;
export type GetExerciseQueryResult = Apollo.QueryResult<GetExerciseQuery, GetExerciseQueryVariables>;
export const GetSearchsDocument = gql`
    query GetSearchs($searchFilterDto: SearchFilterDto, $paginationDto: PaginationDto) {
  getSearchs(searchFilterDto: $searchFilterDto, paginationDto: $paginationDto) {
    id
    name
    relativeId
    scope
    target
    description
  }
}
    `;

/**
 * __useGetSearchsQuery__
 *
 * To run a query within a React component, call `useGetSearchsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchsQuery({
 *   variables: {
 *      searchFilterDto: // value for 'searchFilterDto'
 *      paginationDto: // value for 'paginationDto'
 *   },
 * });
 */
export function useGetSearchsQuery(baseOptions?: Apollo.QueryHookOptions<GetSearchsQuery, GetSearchsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSearchsQuery, GetSearchsQueryVariables>(GetSearchsDocument, options);
      }
export function useGetSearchsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSearchsQuery, GetSearchsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSearchsQuery, GetSearchsQueryVariables>(GetSearchsDocument, options);
        }
export function useGetSearchsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSearchsQuery, GetSearchsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSearchsQuery, GetSearchsQueryVariables>(GetSearchsDocument, options);
        }
export type GetSearchsQueryHookResult = ReturnType<typeof useGetSearchsQuery>;
export type GetSearchsLazyQueryHookResult = ReturnType<typeof useGetSearchsLazyQuery>;
export type GetSearchsSuspenseQueryHookResult = ReturnType<typeof useGetSearchsSuspenseQuery>;
export type GetSearchsQueryResult = Apollo.QueryResult<GetSearchsQuery, GetSearchsQueryVariables>;