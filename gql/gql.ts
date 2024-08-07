/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        name\n        avatar\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation LogoutAllDevices {\n    logoutAllDevices\n  }\n": types.LogoutAllDevicesDocument,
    "\n  mutation Register(\n    $name: String!\n    $email: String!\n    $password: String!\n  ) {\n    register(\n      registerInput: {\n        name: $name\n        email: $email\n        password: $password\n      }\n    ) {\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n": types.RegisterDocument,
    "\nmutation deleteUser($id: String!) {\n    deleteUser(id: $id) {\n        name\n    }\n}\n": types.DeleteUserDocument,
    "\nmutation updateUser($id: String!, $avatar: String! ) {\n    updateUser(id: $id, avatar: $avatar) {\n        id,\n        avatar,\n        name, \n    }\n}\n": types.UpdateUserDocument,
    "\n  query GetChapters(\n    $chapterFilterDto: ChapterFilterDto,\n    $paginationDto: PaginationDto,\n    $orderByDto: OrderByDto\n  ) {\n    getChapters(\n      chapterFilterDto: $chapterFilterDto,\n      paginationDto: $paginationDto,\n      orderByDto: $orderByDto\n    ) {\n      chapters{\n        id\n        name\n        viewed\n        createdAt\n        updatedAt\n        status\n        type\n        difficulty\n      }  \n      pagination{\n        currentPage\n        pageSize\n        totalElements\n        totalPages\n      }\n    }\n  }\n": types.GetChaptersDocument,
    "\n query GetExercises(\n    $chapterId: String!,\n  ) {\n    getExercises(chapterId:$chapterId){\n      id,\n    }\n  }\n": types.GetExercisesDocument,
    "\n query GetExercise(\n    $id: String!,\n  ) {\n    getExerciseById(id:$id){\n      id,\n      name,\n      construction,\n      type,\n      questions{\n        id,\n        question,\n        answers{\n          id,\n          label,\n          value\n        }\n      }\n    }\n  }\n": types.GetExerciseDocument,
    "\n query GetAnswerExercise(\n    $id: String!,\n  ) {\n    getExerciseById(id:$id){\n      id,\n      name,\n      construction,\n      type,\n      questions{\n        id,\n        question,\n        answers{\n          id,\n          label,\n          value,\n          isCorrect,\n          description\n        }\n      }\n    }\n  }\n": types.GetAnswerExerciseDocument,
    "\n  query GetSearchs(\n    $searchFilterDto: SearchFilterDto,\n    $paginationDto: PaginationDto\n  ) {\n    getSearchs(\n      searchFilterDto: $searchFilterDto,\n      paginationDto: $paginationDto,\n    ) {\n      id\n      name\n      relativeId\n      scope\n      target\n      description\n    }\n  }\n": types.GetSearchsDocument,
    "\n  query GetProfile {\n    getProfile {\n      email\n      id\n      name\n      avatar\n    }\n  }\n": types.GetProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        name\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        name\n        avatar\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogoutAllDevices {\n    logoutAllDevices\n  }\n"): (typeof documents)["\n  mutation LogoutAllDevices {\n    logoutAllDevices\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register(\n    $name: String!\n    $email: String!\n    $password: String!\n  ) {\n    register(\n      registerInput: {\n        name: $name\n        email: $email\n        password: $password\n      }\n    ) {\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register(\n    $name: String!\n    $email: String!\n    $password: String!\n  ) {\n    register(\n      registerInput: {\n        name: $name\n        email: $email\n        password: $password\n      }\n    ) {\n      user {\n        id\n        name\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation deleteUser($id: String!) {\n    deleteUser(id: $id) {\n        name\n    }\n}\n"): (typeof documents)["\nmutation deleteUser($id: String!) {\n    deleteUser(id: $id) {\n        name\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation updateUser($id: String!, $avatar: String! ) {\n    updateUser(id: $id, avatar: $avatar) {\n        id,\n        avatar,\n        name, \n    }\n}\n"): (typeof documents)["\nmutation updateUser($id: String!, $avatar: String! ) {\n    updateUser(id: $id, avatar: $avatar) {\n        id,\n        avatar,\n        name, \n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChapters(\n    $chapterFilterDto: ChapterFilterDto,\n    $paginationDto: PaginationDto,\n    $orderByDto: OrderByDto\n  ) {\n    getChapters(\n      chapterFilterDto: $chapterFilterDto,\n      paginationDto: $paginationDto,\n      orderByDto: $orderByDto\n    ) {\n      chapters{\n        id\n        name\n        viewed\n        createdAt\n        updatedAt\n        status\n        type\n        difficulty\n      }  \n      pagination{\n        currentPage\n        pageSize\n        totalElements\n        totalPages\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetChapters(\n    $chapterFilterDto: ChapterFilterDto,\n    $paginationDto: PaginationDto,\n    $orderByDto: OrderByDto\n  ) {\n    getChapters(\n      chapterFilterDto: $chapterFilterDto,\n      paginationDto: $paginationDto,\n      orderByDto: $orderByDto\n    ) {\n      chapters{\n        id\n        name\n        viewed\n        createdAt\n        updatedAt\n        status\n        type\n        difficulty\n      }  \n      pagination{\n        currentPage\n        pageSize\n        totalElements\n        totalPages\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n query GetExercises(\n    $chapterId: String!,\n  ) {\n    getExercises(chapterId:$chapterId){\n      id,\n    }\n  }\n"): (typeof documents)["\n query GetExercises(\n    $chapterId: String!,\n  ) {\n    getExercises(chapterId:$chapterId){\n      id,\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n query GetExercise(\n    $id: String!,\n  ) {\n    getExerciseById(id:$id){\n      id,\n      name,\n      construction,\n      type,\n      questions{\n        id,\n        question,\n        answers{\n          id,\n          label,\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n query GetExercise(\n    $id: String!,\n  ) {\n    getExerciseById(id:$id){\n      id,\n      name,\n      construction,\n      type,\n      questions{\n        id,\n        question,\n        answers{\n          id,\n          label,\n          value\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n query GetAnswerExercise(\n    $id: String!,\n  ) {\n    getExerciseById(id:$id){\n      id,\n      name,\n      construction,\n      type,\n      questions{\n        id,\n        question,\n        answers{\n          id,\n          label,\n          value,\n          isCorrect,\n          description\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n query GetAnswerExercise(\n    $id: String!,\n  ) {\n    getExerciseById(id:$id){\n      id,\n      name,\n      construction,\n      type,\n      questions{\n        id,\n        question,\n        answers{\n          id,\n          label,\n          value,\n          isCorrect,\n          description\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSearchs(\n    $searchFilterDto: SearchFilterDto,\n    $paginationDto: PaginationDto\n  ) {\n    getSearchs(\n      searchFilterDto: $searchFilterDto,\n      paginationDto: $paginationDto,\n    ) {\n      id\n      name\n      relativeId\n      scope\n      target\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetSearchs(\n    $searchFilterDto: SearchFilterDto,\n    $paginationDto: PaginationDto\n  ) {\n    getSearchs(\n      searchFilterDto: $searchFilterDto,\n      paginationDto: $paginationDto,\n    ) {\n      id\n      name\n      relativeId\n      scope\n      target\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetProfile {\n    getProfile {\n      email\n      id\n      name\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query GetProfile {\n    getProfile {\n      email\n      id\n      name\n      avatar\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;