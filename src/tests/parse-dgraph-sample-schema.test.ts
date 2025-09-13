import { describe, test } from "node:test";
import { schemaParser } from "../schema-parser.ts";
import assert from "assert";

const dgraphExportedSchema = `
"""
"""
directive @hasInverse(field: String!) on FIELD_DEFINITION

"""
"""
directive @auth(
  password: AuthRule
  query: AuthRule
  add: AuthRule
  update: AuthRule
  delete: AuthRule
) on OBJECT | INTERFACE

"""
"""
directive @remote on OBJECT | INTERFACE | UNION | INPUT_OBJECT | ENUM

"""
"""
directive @lambda on FIELD_DEFINITION

"""
"""
directive @cacheControl(maxAge: Int!) on QUERY

"""
"""
directive @id on FIELD_DEFINITION

"""
"""
directive @secret(field: String!, pred: String) on OBJECT | INTERFACE

"""
"""
directive @custom(http: CustomHTTP, dql: String) on FIELD_DEFINITION

"""
"""
directive @search(by: [DgraphIndex!]) on FIELD_DEFINITION

"""
"""
directive @dgraph(
  type: String
  pred: String
) on OBJECT | INTERFACE | FIELD_DEFINITION

"""
"""
directive @cascade(fields: [String]) on FIELD

"""
"""
directive @lambdaOnMutate(
  add: Boolean
  update: Boolean
  delete: Boolean
) on OBJECT | INTERFACE

"""
"""
directive @generate(
  query: GenerateQueryParams
  mutation: GenerateMutationParams
  subscription: Boolean
) on OBJECT | INTERFACE

"""
"""
directive @withSubscription on OBJECT | INTERFACE | FIELD_DEFINITION

"""
"""
directive @remoteResponse(name: String) on FIELD_DEFINITION

"""
"""
input AddUserInput {
  """
  """
  username: String!

  """
  """
  name: String

  """
  """
  tasks: [TaskRef]
}

"""
"""
input TaskPatch {
  """
  """
  title: String

  """
  """
  completed: Boolean

  """
  """
  user: UserRef
}

"""
"""
input UserRankPatch {
  """
  """
  user: UserRef

  """
  """
  rank: Float

  """
  """
  created_at: DateTime

  """
  """
  updated_at: DateTime
}

"""
"""
type Posts {
  """
  """
  PostID: ID

  """
  """
  title: String!

  """
  """
  content: String!
}

"""
"""
type DeleteUserPayload {
  """
  """
  user(filter: UserFilter, order: UserOrder, first: Int, offset: Int): [User]

  """
  """
  msg: String

  """
  """
  numUids: Int
}

"""
"""
type UserRankAggregateResult {
  """
  """
  count: Int

  """
  """
  rankMin: Float

  """
  """
  rankMax: Float

  """
  """
  rankSum: Float

  """
  """
  rankAvg: Float

  """
  """
  created_atMin: DateTime

  """
  """
  created_atMax: DateTime

  """
  """
  updated_atMin: DateTime

  """
  """
  updated_atMax: DateTime
}

"""
"""
input StringTermFilter {
  """
  """
  allofterms: String

  """
  """
  anyofterms: String
}

"""
"""
enum UserRankOrderable {
  """
  """
  rank

  """
  """
  created_at

  """
  """
  updated_at
}

"""
"""
type Mutation {
  """
  """
  newAuthor(name: String!): ID!

  """
  """
  addTask(input: [AddTaskInput!]!): AddTaskPayload

  """
  """
  updateTask(input: UpdateTaskInput!): UpdateTaskPayload

  """
  """
  deleteTask(filter: TaskFilter!): DeleteTaskPayload

  """
  """
  addUser(input: [AddUserInput!]!, upsert: Boolean): AddUserPayload

  """
  """
  updateUser(input: UpdateUserInput!): UpdateUserPayload

  """
  """
  deleteUser(filter: UserFilter!): DeleteUserPayload

  """
  """
  addUserRank(input: [AddUserRankInput!]!): AddUserRankPayload

  """
  """
  updateUserRank(input: UpdateUserRankInput!): UpdateUserRankPayload

  """
  """
  deleteUserRank(filter: UserRankFilter!): DeleteUserRankPayload

  """
  """
  addPosts(input: [AddPostsInput!]!): AddPostsPayload

  """
  """
  updatePosts(input: UpdatePostsInput!): UpdatePostsPayload

  """
  """
  deletePosts(filter: PostsFilter!): DeletePostsPayload

  """
  """
  addError(input: [AddErrorInput!]!): AddErrorPayload

  """
  """
  addAuthor(input: [AddAuthorInput!]!): AddAuthorPayload

  """
  """
  updateAuthor(input: UpdateAuthorInput!): UpdateAuthorPayload

  """
  """
  deleteAuthor(filter: AuthorFilter!): DeleteAuthorPayload
}

"""
"""
input IntersectsFilter {
  """
  """
  polygon: PolygonRef

  """
  """
  multiPolygon: MultiPolygonRef
}

"""
"""
type AddErrorPayload {
  """
  """
  error(
    filter: ErrorFilter
    order: ErrorOrder
    first: Int
    offset: Int
  ): [Error]

  """
  """
  numUids: Int
}

"""
"""
type DeleteAuthorPayload {
  """
  """
  author(
    filter: AuthorFilter
    order: AuthorOrder
    first: Int
    offset: Int
  ): [Author]

  """
  """
  msg: String

  """
  """
  numUids: Int
}

"""
"""
input PostsOrder {
  """
  """
  asc: PostsOrderable

  """
  """
  desc: PostsOrderable

  """
  """
  then: PostsOrder
}

"""
"""
type Error {
  """
  """
  ErrorID: ID!

  """
  """
  errorDetail: String

  """
  """
  errorDateTime: DateTime
}

"""
"""
input AuthRule {
  """
  """
  and: [AuthRule]

  """
  """
  or: [AuthRule]

  """
  """
  not: AuthRule

  """
  """
  rule: String
}

"""
"""
enum PostsOrderable {
  """
  """
  title

  """
  """
  content
}

"""
"""
enum UserHasFilter {
  """
  """
  username

  """
  """
  name

  """
  """
  tasks
}

"""
"""
type ErrorAggregateResult {
  """
  """
  count: Int

  """
  """
  errorDetailMin: String

  """
  """
  errorDetailMax: String

  """
  """
  errorDateTimeMin: DateTime

  """
  """
  errorDateTimeMax: DateTime
}

"""
"""
input AuthorRef {
  """
  """
  id: ID

  """
  """
  name: String

  """
  """
  dob: DateTime

  """
  """
  reputation: Float
}

"""
"""
input ErrorRef {
  """
  """
  ErrorID: ID

  """
  """
  errorDetail: String

  """
  """
  errorDateTime: DateTime
}

"""
"""
input TaskRef {
  """
  """
  id: ID

  """
  """
  title: String

  """
  """
  completed: Boolean

  """
  """
  user: UserRef
}

"""
"""
input NearFilter {
  """
  """
  distance: Float!

  """
  """
  coordinate: PointRef!
}

"""
"""
enum ErrorHasFilter {
  """
  """
  errorDetail

  """
  """
  errorDateTime
}

"""
"""
input AddPostsInput {
  """
  """
  title: String!

  """
  """
  content: String!
}

"""
"""
input AddErrorInput {
  """
  """
  errorDetail: String

  """
  """
  errorDateTime: DateTime
}

"""
"""
input UpdateUserRankInput {
  """
  """
  filter: UserRankFilter!

  """
  """
  set: UserRankPatch

  """
  """
  remove: UserRankPatch
}

"""
"""
enum HTTPMethod {
  """
  """
  GET

  """
  """
  POST

  """
  """
  PUT

  """
  """
  PATCH

  """
  """
  DELETE
}

"""
"""
type MultiPolygon {
  """
  """
  polygons: [Polygon!]!
}

"""
"""
input StringHashFilter {
  """
  """
  eq: String

  """
  """
  in: [String]
}

"""
"""
input UserRef {
  """
  """
  username: String

  """
  """
  name: String

  """
  """
  tasks: [TaskRef]
}

"""
"""
input PolygonRef {
  """
  """
  coordinates: [PointListRef!]!
}

"""
"""
input GenerateQueryParams {
  """
  """
  get: Boolean

  """
  """
  query: Boolean

  """
  """
  password: Boolean

  """
  """
  aggregate: Boolean
}

"""
"""
input StringExactFilter {
  """
  """
  eq: String

  """
  """
  in: [String]

  """
  """
  le: String

  """
  """
  lt: String

  """
  """
  ge: String

  """
  """
  gt: String

  """
  """
  between: StringRange
}

"""
"""
type AuthorAggregateResult {
  """
  """
  count: Int

  """
  """
  nameMin: String

  """
  """
  nameMax: String

  """
  """
  dobMin: DateTime

  """
  """
  dobMax: DateTime

  """
  """
  reputationMin: Float

  """
  """
  reputationMax: Float

  """
  """
  reputationSum: Float

  """
  """
  reputationAvg: Float
}

"""
"""
enum UserOrderable {
  """
  """
  username

  """
  """
  name
}

"""
"""
input AuthorFilter {
  """
  """
  id: [ID!]

  """
  """
  name: StringHashFilter_StringRegExpFilter

  """
  """
  has: [AuthorHasFilter]

  """
  """
  and: [AuthorFilter]

  """
  """
  or: [AuthorFilter]

  """
  """
  not: AuthorFilter
}

"""
"""
type AddUserPayload {
  """
  """
  user(filter: UserFilter, order: UserOrder, first: Int, offset: Int): [User]

  """
  """
  numUids: Int
}

"""
"""
type UpdateUserPayload {
  """
  """
  user(filter: UserFilter, order: UserOrder, first: Int, offset: Int): [User]

  """
  """
  numUids: Int
}

"""
"""
input UpdateAuthorInput {
  """
  """
  filter: AuthorFilter!

  """
  """
  set: AuthorPatch

  """
  """
  remove: AuthorPatch
}

"""
"""
type Author {
  """
  """
  id: ID!

  """
  """
  name: String!

  """
  """
  dob: DateTime

  """
  """
  reputation: Float
}

"""
"""
input DateTimeFilter {
  """
  """
  eq: DateTime

  """
  """
  in: [DateTime]

  """
  """
  le: DateTime

  """
  """
  lt: DateTime

  """
  """
  ge: DateTime

  """
  """
  gt: DateTime

  """
  """
  between: DateTimeRange
}

"""
"""
type AddAuthorPayload {
  """
  """
  author(
    filter: AuthorFilter
    order: AuthorOrder
    first: Int
    offset: Int
  ): [Author]

  """
  """
  numUids: Int
}

"""
"""
input Int64Range {
  """
  """
  min: Int64!

  """
  """
  max: Int64!
}

"""
"""
enum Mode {
  """
  """
  BATCH

  """
  """
  SINGLE
}

"""
"""
type AddPostsPayload {
  """
  """
  posts(
    filter: PostsFilter
    order: PostsOrder
    first: Int
    offset: Int
  ): [Posts]

  """
  """
  numUids: Int
}

"""
"""
input StringFullTextFilter {
  """
  """
  alloftext: String

  """
  """
  anyoftext: String
}

"""
"""
type TaskAggregateResult {
  """
  """
  count: Int

  """
  """
  titleMin: String

  """
  """
  titleMax: String
}

"""
"""
input UserRankRef {
  """
  """
  UserRankID: ID

  """
  """
  user: UserRef

  """
  """
  rank: Float

  """
  """
  created_at: DateTime

  """
  """
  updated_at: DateTime
}

"""
"""
type DeleteTaskPayload {
  """
  """
  task(filter: TaskFilter, order: TaskOrder, first: Int, offset: Int): [Task]

  """
  """
  msg: String

  """
  """
  numUids: Int
}

"""
"""
enum AuthorHasFilter {
  """
  """
  name

  """
  """
  dob

  """
  """
  reputation
}

"""
"""
type AddTaskPayload {
  """
  """
  task(filter: TaskFilter, order: TaskOrder, first: Int, offset: Int): [Task]

  """
  """
  numUids: Int
}

"""
"""
enum UserRankHasFilter {
  """
  """
  user

  """
  """
  rank

  """
  """
  created_at

  """
  """
  updated_at
}

"""
"""
input PostsRef {
  """
  """
  PostID: ID

  """
  """
  title: String

  """
  """
  content: String
}

"""
"""
enum TaskHasFilter {
  """
  """
  title

  """
  """
  completed

  """
  """
  user
}

"""
"""
input UpdateUserInput {
  """
  """
  filter: UserFilter!

  """
  """
  set: UserPatch

  """
  """
  remove: UserPatch
}

"""
"""
input UserRankOrder {
  """
  """
  asc: UserRankOrderable

  """
  """
  desc: UserRankOrderable

  """
  """
  then: UserRankOrder
}

"""
"""
enum TaskOrderable {
  """
  """
  title
}

"""
"""
input UpdatePostsInput {
  """
  """
  filter: PostsFilter!

  """
  """
  set: PostsPatch

  """
  """
  remove: PostsPatch
}

"""
"""
input UpdateTaskInput {
  """
  """
  filter: TaskFilter!

  """
  """
  set: TaskPatch

  """
  """
  remove: TaskPatch
}

"""
"""
type Polygon {
  """
  """
  coordinates: [PointList!]!
}

"""
"""
input PolygonGeoFilter {
  """
  """
  near: NearFilter

  """
  """
  within: WithinFilter

  """
  """
  contains: ContainsFilter

  """
  """
  intersects: IntersectsFilter
}

"""
"""
input FloatFilter {
  """
  """
  eq: Float

  """
  """
  in: [Float]

  """
  """
  le: Float

  """
  """
  lt: Float

  """
  """
  ge: Float

  """
  """
  gt: Float

  """
  """
  between: FloatRange
}

"""
"""
type UpdateTaskPayload {
  """
  """
  task(filter: TaskFilter, order: TaskOrder, first: Int, offset: Int): [Task]

  """
  """
  numUids: Int
}

"""
"""
type UpdateUserRankPayload {
  """
  """
  userRank(
    filter: UserRankFilter
    order: UserRankOrder
    first: Int
    offset: Int
  ): [UserRank]

  """
  """
  numUids: Int
}

"""
"""
enum AuthorOrderable {
  """
  """
  name

  """
  """
  dob

  """
  """
  reputation
}

"""
"""
input AddTaskInput {
  """
  """
  title: String!

  """
  """
  completed: Boolean!

  """
  """
  user: UserRef!
}

"""
"""
type Point {
  """
  """
  longitude: Float!

  """
  """
  latitude: Float!
}

"""
"""
input IntFilter {
  """
  """
  eq: Int

  """
  """
  in: [Int]

  """
  """
  le: Int

  """
  """
  lt: Int

  """
  """
  ge: Int

  """
  """
  gt: Int

  """
  """
  between: IntRange
}

"""
"""
input Int64Filter {
  """
  """
  eq: Int64

  """
  """
  in: [Int64]

  """
  """
  le: Int64

  """
  """
  lt: Int64

  """
  """
  ge: Int64

  """
  """
  gt: Int64

  """
  """
  between: Int64Range
}

"""
"""
input AddAuthorInput {
  """
  """
  name: String!

  """
  """
  dob: DateTime

  """
  """
  reputation: Float
}

"""
"""
type User {
  """
  """
  username: String!

  """
  """
  name: String

  """
  """
  tasks(filter: TaskFilter, order: TaskOrder, first: Int, offset: Int): [Task]

  """
  """
  tasksAggregate(filter: TaskFilter): TaskAggregateResult
}

"""
"""
input PointListRef {
  """
  """
  points: [PointRef!]!
}

"""
"""
input StringHashFilter_StringRegExpFilter {
  """
  """
  eq: String

  """
  """
  in: [String]

  """
  """
  regexp: String
}

"""
"""
input UserOrder {
  """
  """
  asc: UserOrderable

  """
  """
  desc: UserOrderable

  """
  """
  then: UserOrder
}

"""
"""
input WithinFilter {
  """
  """
  polygon: PolygonRef!
}

"""
"""
input ErrorOrder {
  """
  """
  asc: ErrorOrderable

  """
  """
  desc: ErrorOrderable

  """
  """
  then: ErrorOrder
}

"""
"""
type Subscription {
  """
  """
  getUserRank(UserRankID: ID!): UserRank

  """
  """
  queryUserRank(
    filter: UserRankFilter
    order: UserRankOrder
    first: Int
    offset: Int
  ): [UserRank]

  """
  """
  aggregateUserRank(filter: UserRankFilter): UserRankAggregateResult

  """
  """
  getError(ErrorID: ID!): Error

  """
  """
  queryError(
    filter: ErrorFilter
    order: ErrorOrder
    first: Int
    offset: Int
  ): [Error]

  """
  """
  aggregateError(filter: ErrorFilter): ErrorAggregateResult
}

"""
"""
input CustomHTTP {
  """
  """
  url: String!

  """
  """
  method: HTTPMethod!

  """
  """
  body: String

  """
  """
  graphql: String

  """
  """
  mode: Mode

  """
  """
  forwardHeaders: [String!]

  """
  """
  secretHeaders: [String!]

  """
  """
  introspectionHeaders: [String!]

  """
  """
  skipIntrospection: Boolean
}

"""
"""
type PointList {
  """
  """
  points: [Point!]!
}

"""
"""
type Query {
  """
  """
  getTask(id: ID!): Task

  """
  """
  queryTask(
    filter: TaskFilter
    order: TaskOrder
    first: Int
    offset: Int
  ): [Task]

  """
  """
  aggregateTask(filter: TaskFilter): TaskAggregateResult

  """
  """
  getUser(username: String!): User

  """
  """
  queryUser(
    filter: UserFilter
    order: UserOrder
    first: Int
    offset: Int
  ): [User]

  """
  """
  aggregateUser(filter: UserFilter): UserAggregateResult

  """
  """
  getUserRank(UserRankID: ID!): UserRank

  """
  """
  queryUserRank(
    filter: UserRankFilter
    order: UserRankOrder
    first: Int
    offset: Int
  ): [UserRank]

  """
  """
  aggregateUserRank(filter: UserRankFilter): UserRankAggregateResult

  """
  """
  getPosts(PostID: ID!): Posts

  """
  """
  queryPosts(
    filter: PostsFilter
    order: PostsOrder
    first: Int
    offset: Int
  ): [Posts]

  """
  """
  aggregatePosts(filter: PostsFilter): PostsAggregateResult

  """
  """
  getError(ErrorID: ID!): Error

  """
  """
  queryError(
    filter: ErrorFilter
    order: ErrorOrder
    first: Int
    offset: Int
  ): [Error]

  """
  """
  aggregateError(filter: ErrorFilter): ErrorAggregateResult

  """
  """
  getAuthor(id: ID!): Author

  """
  """
  queryAuthor(
    filter: AuthorFilter
    order: AuthorOrder
    first: Int
    offset: Int
  ): [Author]

  """
  """
  aggregateAuthor(filter: AuthorFilter): AuthorAggregateResult
}

"""
"""
input PostsFilter {
  """
  """
  PostID: [ID!]

  """
  """
  has: [PostsHasFilter]

  """
  """
  and: [PostsFilter]

  """
  """
  or: [PostsFilter]

  """
  """
  not: PostsFilter
}

"""
"""
input TaskFilter {
  """
  """
  id: [ID!]

  """
  """
  title: StringFullTextFilter

  """
  """
  completed: Boolean

  """
  """
  has: [TaskHasFilter]

  """
  """
  and: [TaskFilter]

  """
  """
  or: [TaskFilter]

  """
  """
  not: TaskFilter
}

"""
"""
input TaskOrder {
  """
  """
  asc: TaskOrderable

  """
  """
  desc: TaskOrderable

  """
  """
  then: TaskOrder
}

"""
"""
input FloatRange {
  """
  """
  min: Float!

  """
  """
  max: Float!
}

"""
"""
input DateTimeRange {
  """
  """
  min: DateTime!

  """
  """
  max: DateTime!
}

"""
"""
type AddUserRankPayload {
  """
  """
  userRank(
    filter: UserRankFilter
    order: UserRankOrder
    first: Int
    offset: Int
  ): [UserRank]

  """
  """
  numUids: Int
}

"""
"""
input UserFilter {
  """
  """
  username: StringHashFilter

  """
  """
  name: StringExactFilter

  """
  """
  has: [UserHasFilter]

  """
  """
  and: [UserFilter]

  """
  """
  or: [UserFilter]

  """
  """
  not: UserFilter
}

"""
"""
input UserRankFilter {
  """
  """
  UserRankID: [ID!]

  """
  """
  created_at: DateTimeFilter

  """
  """
  updated_at: DateTimeFilter

  """
  """
  has: [UserRankHasFilter]

  """
  """
  and: [UserRankFilter]

  """
  """
  or: [UserRankFilter]

  """
  """
  not: UserRankFilter
}

"""
"""
type UserRank {
  """
  """
  UserRankID: ID!

  """
  """
  user(filter: UserFilter): User!

  """
  """
  rank: Float!

  """
  """
  created_at: DateTime

  """
  """
  updated_at: DateTime
}

"""
The DateTime scalar type represents date and time as a string in RFC3339 format.
For example: "1985-04-12T23:20:50.52Z" represents 20 mins 50.52 secs after the 23rd hour of Apr 12th 1985 in UTC.
"""
scalar DateTime

"""
"""
input PointGeoFilter {
  """
  """
  near: NearFilter

  """
  """
  within: WithinFilter
}

"""
"""
type PostsAggregateResult {
  """
  """
  count: Int

  """
  """
  titleMin: String

  """
  """
  titleMax: String

  """
  """
  contentMin: String

  """
  """
  contentMax: String
}

"""
"""
enum PostsHasFilter {
  """
  """
  title

  """
  """
  content
}

"""
"""
input AuthorOrder {
  """
  """
  asc: AuthorOrderable

  """
  """
  desc: AuthorOrderable

  """
  """
  then: AuthorOrder
}

"""
"""
input ErrorFilter {
  """
  """
  ErrorID: [ID!]

  """
  """
  errorDateTime: DateTimeFilter

  """
  """
  has: [ErrorHasFilter]

  """
  """
  and: [ErrorFilter]

  """
  """
  or: [ErrorFilter]

  """
  """
  not: ErrorFilter
}

"""
"""
enum DgraphIndex {
  """
  """
  int

  """
  """
  int64

  """
  """
  float

  """
  """
  bool

  """
  """
  hash

  """
  """
  exact

  """
  """
  term

  """
  """
  fulltext

  """
  """
  trigram

  """
  """
  regexp

  """
  """
  year

  """
  """
  month

  """
  """
  day

  """
  """
  hour

  """
  """
  geo
}

"""
"""
input ContainsFilter {
  """
  """
  point: PointRef

  """
  """
  polygon: PolygonRef
}

"""
"""
type DeletePostsPayload {
  """
  """
  posts(
    filter: PostsFilter
    order: PostsOrder
    first: Int
    offset: Int
  ): [Posts]

  """
  """
  msg: String

  """
  """
  numUids: Int
}

"""
"""
type DeleteUserRankPayload {
  """
  """
  userRank(
    filter: UserRankFilter
    order: UserRankOrder
    first: Int
    offset: Int
  ): [UserRank]

  """
  """
  msg: String

  """
  """
  numUids: Int
}

"""
"""
type UpdatePostsPayload {
  """
  """
  posts(
    filter: PostsFilter
    order: PostsOrder
    first: Int
    offset: Int
  ): [Posts]

  """
  """
  numUids: Int
}

"""
"""
input AddUserRankInput {
  """
  """
  user: UserRef!

  """
  """
  rank: Float!

  """
  """
  created_at: DateTime

  """
  """
  updated_at: DateTime
}

"""
"""
input UserPatch {
  """
  """
  name: String

  """
  """
  tasks: [TaskRef]
}

"""
"""
input StringRange {
  """
  """
  min: String!

  """
  """
  max: String!
}

"""
"""
input GenerateMutationParams {
  """
  """
  add: Boolean

  """
  """
  update: Boolean

  """
  """
  delete: Boolean
}

"""
"""
input MultiPolygonRef {
  """
  """
  polygons: [PolygonRef!]!
}

"""
"""
input StringRegExpFilter {
  """
  """
  regexp: String
}

"""
The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
Int64 can represent values in range [-(2^63),(2^63 - 1)].
"""
scalar Int64

"""
"""
input IntRange {
  """
  """
  min: Int!

  """
  """
  max: Int!
}

"""
"""
type UserAggregateResult {
  """
  """
  count: Int

  """
  """
  usernameMin: String

  """
  """
  usernameMax: String

  """
  """
  nameMin: String

  """
  """
  nameMax: String
}

"""
"""
type UpdateAuthorPayload {
  """
  """
  author(
    filter: AuthorFilter
    order: AuthorOrder
    first: Int
    offset: Int
  ): [Author]

  """
  """
  numUids: Int
}

"""
"""
input AuthorPatch {
  """
  """
  name: String

  """
  """
  dob: DateTime

  """
  """
  reputation: Float
}

"""
"""
input PostsPatch {
  """
  """
  title: String

  """
  """
  content: String
}

"""
"""
type Task {
  """
  """
  id: ID!

  """
  """
  title: String!

  """
  """
  completed: Boolean!

  """
  """
  user(filter: UserFilter): User!
}

"""
"""
input PointRef {
  """
  """
  longitude: Float!

  """
  """
  latitude: Float!
}

"""
"""
enum ErrorOrderable {
  """
  """
  errorDetail

  """
  """
  errorDateTime
}
`

describe("Dgraph Sample Schema", async () => {
    const parsedSchema = await schemaParser(dgraphExportedSchema);
    test("Parse Dgraph Sample Schema", async () => {
        assert(parsedSchema!!);
    });

    test("getTask Query exists", async () => {
        const getTaskTool = parsedSchema.find(sh => sh.name=='getTask');
        assert.ok(getTaskTool);
        const result = await getTaskTool?.execution({ id: "task-123" }, { id: true });
        assert.ok(result);

        if (!result) throw new Error('')
        assert.equal(result.query, `query getTask($id: ID!) { getTask(id: $id) { id } }`)
    });
});