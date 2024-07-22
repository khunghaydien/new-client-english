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
    "\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        fullname\n      }\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation LogoutUser {\n    logout\n  }\n": types.LogoutUserDocument,
    "\n  mutation RegisterUser(\n    $fullname: String!\n    $email: String!\n    $password: String!\n  ) {\n    register(\n      registerInput: {\n        fullname: $fullname\n        email: $email\n        password: $password\n      }\n    ) {\n      user {\n        id\n        fullname\n        email\n      }\n    }\n  }\n": types.RegisterUserDocument,
    "\nmutation deleteUser($id: String!) {\n    deleteUser(id: $id) {\n        fullname\n    }\n}\n": types.DeleteUserDocument,
    "\n  query GetChapters(\n    $chapterFilterDto: ChapterFilterDto,\n    $paginationDto: PaginationDto,\n    $orderByDto: OrderByDto\n  ) {\n    getChapters(\n      chapterFilterDto: $chapterFilterDto,\n      paginationDto: $paginationDto,\n      orderByDto: $orderByDto\n    ) {\n      id\n      name\n      viewed\n      createdAt\n      updatedAt\n      status\n      type\n      difficulty\n    }\n  }\n": types.GetChaptersDocument,
    "\n query GetExercises(\n    $chapterId: String!,\n  ) {\n    getExercises(chapterId:$chapterId){\n      id,\n    }\n  }\n": types.GetExercisesDocument,
    "\n query GetExercise(\n    $id: String!,\n  ) {\n    getExerciseById(id:$id){\n      id,\n      name,\n      construction,\n      type,\n      questions{\n        question,\n        answers{\n          id,\n          label,\n          value\n        }\n      }\n    }\n  }\n": types.GetExerciseDocument,
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
export function graphql(source: "\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        fullname\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      user {\n        email\n        id\n        fullname\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogoutUser {\n    logout\n  }\n"): (typeof documents)["\n  mutation LogoutUser {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterUser(\n    $fullname: String!\n    $email: String!\n    $password: String!\n  ) {\n    register(\n      registerInput: {\n        fullname: $fullname\n        email: $email\n        password: $password\n      }\n    ) {\n      user {\n        id\n        fullname\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser(\n    $fullname: String!\n    $email: String!\n    $password: String!\n  ) {\n    register(\n      registerInput: {\n        fullname: $fullname\n        email: $email\n        password: $password\n      }\n    ) {\n      user {\n        id\n        fullname\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation deleteUser($id: String!) {\n    deleteUser(id: $id) {\n        fullname\n    }\n}\n"): (typeof documents)["\nmutation deleteUser($id: String!) {\n    deleteUser(id: $id) {\n        fullname\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetChapters(\n    $chapterFilterDto: ChapterFilterDto,\n    $paginationDto: PaginationDto,\n    $orderByDto: OrderByDto\n  ) {\n    getChapters(\n      chapterFilterDto: $chapterFilterDto,\n      paginationDto: $paginationDto,\n      orderByDto: $orderByDto\n    ) {\n      id\n      name\n      viewed\n      createdAt\n      updatedAt\n      status\n      type\n      difficulty\n    }\n  }\n"): (typeof documents)["\n  query GetChapters(\n    $chapterFilterDto: ChapterFilterDto,\n    $paginationDto: PaginationDto,\n    $orderByDto: OrderByDto\n  ) {\n    getChapters(\n      chapterFilterDto: $chapterFilterDto,\n      paginationDto: $paginationDto,\n      orderByDto: $orderByDto\n    ) {\n      id\n      name\n      viewed\n      createdAt\n      updatedAt\n      status\n      type\n      difficulty\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n query GetExercises(\n    $chapterId: String!,\n  ) {\n    getExercises(chapterId:$chapterId){\n      id,\n    }\n  }\n"): (typeof documents)["\n query GetExercises(\n    $chapterId: String!,\n  ) {\n    getExercises(chapterId:$chapterId){\n      id,\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n query GetExercise(\n    $id: String!,\n  ) {\n    getExerciseById(id:$id){\n      id,\n      name,\n      construction,\n      type,\n      questions{\n        question,\n        answers{\n          id,\n          label,\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n query GetExercise(\n    $id: String!,\n  ) {\n    getExerciseById(id:$id){\n      id,\n      name,\n      construction,\n      type,\n      questions{\n        question,\n        answers{\n          id,\n          label,\n          value\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;