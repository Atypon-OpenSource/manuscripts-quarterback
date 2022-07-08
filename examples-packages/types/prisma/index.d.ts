
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  id: string
  email: string
  firstname: string
  lastname: string
  password: string
  role: UserRole
}

/**
 * Model PmDoc
 * 
 */
export type PmDoc = {
  id: string
  name: string
  doc: Prisma.JsonValue
  status: DocStatus
  createdAt: Date
  updatedAt: Date
  user_id: string
}

/**
 * Model PmDocSnapshot
 * 
 */
export type PmDocSnapshot = {
  id: string
  name: string
  snapshot: Prisma.JsonValue
  createdAt: Date
  doc_id: string
}

/**
 * Model Comment
 * 
 */
export type Comment = {
  id: string
  body: string
  createdAt: Date
  target_id: string
  user_id: string
  doc_id: string
  snapshot_id: string | null
}

/**
 * Model Review
 * 
 */
export type Review = {
  id: string
  name: string
  status: ReviewStatus
  createdAt: Date
  user_id: string
  changes: string[]
  doc_id: string
  before_snapshot_id: string
  after_snapshot_id: string | null
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const UserRole: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const DocStatus: {
  EDITABLE: 'EDITABLE',
  WAITING_REVIEW: 'WAITING_REVIEW',
  IN_REVIEW: 'IN_REVIEW',
  READ_ONLY: 'READ_ONLY'
};

export type DocStatus = (typeof DocStatus)[keyof typeof DocStatus]


export const ReviewStatus: {
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.pmDoc`: Exposes CRUD operations for the **PmDoc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PmDocs
    * const pmDocs = await prisma.pmDoc.findMany()
    * ```
    */
  get pmDoc(): Prisma.PmDocDelegate<GlobalReject>;

  /**
   * `prisma.pmDocSnapshot`: Exposes CRUD operations for the **PmDocSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PmDocSnapshots
    * const pmDocSnapshots = await prisma.pmDocSnapshot.findMany()
    * ```
    */
  get pmDocSnapshot(): Prisma.PmDocSnapshotDelegate<GlobalReject>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<GlobalReject>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Prisma Client JS version: 4.0.0
   * Query Engine version: da41d2bb3406da22087b849f0e911199ba4fbf11
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    PmDoc: 'PmDoc',
    PmDocSnapshot: 'PmDocSnapshot',
    Comment: 'Comment',
    Review: 'Review'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    docs: number
    reviews: number
    comments: number
  }

  export type UserCountOutputTypeSelect = {
    docs?: boolean
    reviews?: boolean
    comments?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type PmDocCountOutputType
   */


  export type PmDocCountOutputType = {
    snapshots: number
    reviews: number
    comments: number
  }

  export type PmDocCountOutputTypeSelect = {
    snapshots?: boolean
    reviews?: boolean
    comments?: boolean
  }

  export type PmDocCountOutputTypeGetPayload<
    S extends boolean | null | undefined | PmDocCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? PmDocCountOutputType
    : S extends undefined
    ? never
    : S extends PmDocCountOutputTypeArgs
    ?'include' extends U
    ? PmDocCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof PmDocCountOutputType ? PmDocCountOutputType[P] : never
  } 
    : PmDocCountOutputType
  : PmDocCountOutputType




  // Custom InputTypes

  /**
   * PmDocCountOutputType without action
   */
  export type PmDocCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the PmDocCountOutputType
     * 
    **/
    select?: PmDocCountOutputTypeSelect | null
  }



  /**
   * Count Type PmDocSnapshotCountOutputType
   */


  export type PmDocSnapshotCountOutputType = {
    comments: number
  }

  export type PmDocSnapshotCountOutputTypeSelect = {
    comments?: boolean
  }

  export type PmDocSnapshotCountOutputTypeGetPayload<
    S extends boolean | null | undefined | PmDocSnapshotCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? PmDocSnapshotCountOutputType
    : S extends undefined
    ? never
    : S extends PmDocSnapshotCountOutputTypeArgs
    ?'include' extends U
    ? PmDocSnapshotCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof PmDocSnapshotCountOutputType ? PmDocSnapshotCountOutputType[P] : never
  } 
    : PmDocSnapshotCountOutputType
  : PmDocSnapshotCountOutputType




  // Custom InputTypes

  /**
   * PmDocSnapshotCountOutputType without action
   */
  export type PmDocSnapshotCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the PmDocSnapshotCountOutputType
     * 
    **/
    select?: PmDocSnapshotCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    firstname: string | null
    lastname: string | null
    password: string | null
    role: UserRole | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    firstname: string | null
    lastname: string | null
    password: string | null
    role: UserRole | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    firstname: number
    lastname: number
    password: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    firstname?: true
    lastname?: true
    password?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    firstname?: true
    lastname?: true
    password?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    firstname?: true
    lastname?: true
    password?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    email: string
    firstname: string
    lastname: string
    password: string
    role: UserRole
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    email?: boolean
    firstname?: boolean
    lastname?: boolean
    password?: boolean
    role?: boolean
    docs?: boolean | PmDocFindManyArgs
    reviews?: boolean | ReviewFindManyArgs
    comments?: boolean | CommentFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    docs?: boolean | PmDocFindManyArgs
    reviews?: boolean | ReviewFindManyArgs
    comments?: boolean | CommentFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'docs' ? Array < PmDocGetPayload<S['include'][P]>>  :
        P extends 'reviews' ? Array < ReviewGetPayload<S['include'][P]>>  :
        P extends 'comments' ? Array < CommentGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'docs' ? Array < PmDocGetPayload<S['select'][P]>>  :
        P extends 'reviews' ? Array < ReviewGetPayload<S['select'][P]>>  :
        P extends 'comments' ? Array < CommentGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    docs<T extends PmDocFindManyArgs = {}>(args?: Subset<T, PmDocFindManyArgs>): CheckSelect<T, PrismaPromise<Array<PmDoc>>, PrismaPromise<Array<PmDocGetPayload<T>>>>;

    reviews<T extends ReviewFindManyArgs = {}>(args?: Subset<T, ReviewFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Review>>, PrismaPromise<Array<ReviewGetPayload<T>>>>;

    comments<T extends CommentFindManyArgs = {}>(args?: Subset<T, CommentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Comment>>, PrismaPromise<Array<CommentGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model PmDoc
   */


  export type AggregatePmDoc = {
    _count: PmDocCountAggregateOutputType | null
    _min: PmDocMinAggregateOutputType | null
    _max: PmDocMaxAggregateOutputType | null
  }

  export type PmDocMinAggregateOutputType = {
    id: string | null
    name: string | null
    status: DocStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    user_id: string | null
  }

  export type PmDocMaxAggregateOutputType = {
    id: string | null
    name: string | null
    status: DocStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    user_id: string | null
  }

  export type PmDocCountAggregateOutputType = {
    id: number
    name: number
    doc: number
    status: number
    createdAt: number
    updatedAt: number
    user_id: number
    _all: number
  }


  export type PmDocMinAggregateInputType = {
    id?: true
    name?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    user_id?: true
  }

  export type PmDocMaxAggregateInputType = {
    id?: true
    name?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    user_id?: true
  }

  export type PmDocCountAggregateInputType = {
    id?: true
    name?: true
    doc?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    user_id?: true
    _all?: true
  }

  export type PmDocAggregateArgs = {
    /**
     * Filter which PmDoc to aggregate.
     * 
    **/
    where?: PmDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PmDocs to fetch.
     * 
    **/
    orderBy?: Enumerable<PmDocOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PmDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PmDocs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PmDocs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PmDocs
    **/
    _count?: true | PmDocCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PmDocMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PmDocMaxAggregateInputType
  }

  export type GetPmDocAggregateType<T extends PmDocAggregateArgs> = {
        [P in keyof T & keyof AggregatePmDoc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePmDoc[P]>
      : GetScalarType<T[P], AggregatePmDoc[P]>
  }




  export type PmDocGroupByArgs = {
    where?: PmDocWhereInput
    orderBy?: Enumerable<PmDocOrderByWithAggregationInput>
    by: Array<PmDocScalarFieldEnum>
    having?: PmDocScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PmDocCountAggregateInputType | true
    _min?: PmDocMinAggregateInputType
    _max?: PmDocMaxAggregateInputType
  }


  export type PmDocGroupByOutputType = {
    id: string
    name: string
    doc: JsonValue
    status: DocStatus
    createdAt: Date
    updatedAt: Date
    user_id: string
    _count: PmDocCountAggregateOutputType | null
    _min: PmDocMinAggregateOutputType | null
    _max: PmDocMaxAggregateOutputType | null
  }

  type GetPmDocGroupByPayload<T extends PmDocGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PmDocGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PmDocGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PmDocGroupByOutputType[P]>
            : GetScalarType<T[P], PmDocGroupByOutputType[P]>
        }
      >
    >


  export type PmDocSelect = {
    id?: boolean
    name?: boolean
    doc?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserArgs
    user_id?: boolean
    snapshots?: boolean | PmDocSnapshotFindManyArgs
    reviews?: boolean | ReviewFindManyArgs
    comments?: boolean | CommentFindManyArgs
    _count?: boolean | PmDocCountOutputTypeArgs
  }

  export type PmDocInclude = {
    user?: boolean | UserArgs
    snapshots?: boolean | PmDocSnapshotFindManyArgs
    reviews?: boolean | ReviewFindManyArgs
    comments?: boolean | CommentFindManyArgs
    _count?: boolean | PmDocCountOutputTypeArgs
  }

  export type PmDocGetPayload<
    S extends boolean | null | undefined | PmDocArgs,
    U = keyof S
      > = S extends true
        ? PmDoc
    : S extends undefined
    ? never
    : S extends PmDocArgs | PmDocFindManyArgs
    ?'include' extends U
    ? PmDoc  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :
        P extends 'snapshots' ? Array < PmDocSnapshotGetPayload<S['include'][P]>>  :
        P extends 'reviews' ? Array < ReviewGetPayload<S['include'][P]>>  :
        P extends 'comments' ? Array < CommentGetPayload<S['include'][P]>>  :
        P extends '_count' ? PmDocCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :
        P extends 'snapshots' ? Array < PmDocSnapshotGetPayload<S['select'][P]>>  :
        P extends 'reviews' ? Array < ReviewGetPayload<S['select'][P]>>  :
        P extends 'comments' ? Array < CommentGetPayload<S['select'][P]>>  :
        P extends '_count' ? PmDocCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof PmDoc ? PmDoc[P] : never
  } 
    : PmDoc
  : PmDoc


  type PmDocCountArgs = Merge<
    Omit<PmDocFindManyArgs, 'select' | 'include'> & {
      select?: PmDocCountAggregateInputType | true
    }
  >

  export interface PmDocDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one PmDoc that matches the filter.
     * @param {PmDocFindUniqueArgs} args - Arguments to find a PmDoc
     * @example
     * // Get one PmDoc
     * const pmDoc = await prisma.pmDoc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PmDocFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PmDocFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PmDoc'> extends True ? CheckSelect<T, Prisma__PmDocClient<PmDoc>, Prisma__PmDocClient<PmDocGetPayload<T>>> : CheckSelect<T, Prisma__PmDocClient<PmDoc | null >, Prisma__PmDocClient<PmDocGetPayload<T> | null >>

    /**
     * Find the first PmDoc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocFindFirstArgs} args - Arguments to find a PmDoc
     * @example
     * // Get one PmDoc
     * const pmDoc = await prisma.pmDoc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PmDocFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PmDocFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PmDoc'> extends True ? CheckSelect<T, Prisma__PmDocClient<PmDoc>, Prisma__PmDocClient<PmDocGetPayload<T>>> : CheckSelect<T, Prisma__PmDocClient<PmDoc | null >, Prisma__PmDocClient<PmDocGetPayload<T> | null >>

    /**
     * Find zero or more PmDocs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PmDocs
     * const pmDocs = await prisma.pmDoc.findMany()
     * 
     * // Get first 10 PmDocs
     * const pmDocs = await prisma.pmDoc.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pmDocWithIdOnly = await prisma.pmDoc.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PmDocFindManyArgs>(
      args?: SelectSubset<T, PmDocFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<PmDoc>>, PrismaPromise<Array<PmDocGetPayload<T>>>>

    /**
     * Create a PmDoc.
     * @param {PmDocCreateArgs} args - Arguments to create a PmDoc.
     * @example
     * // Create one PmDoc
     * const PmDoc = await prisma.pmDoc.create({
     *   data: {
     *     // ... data to create a PmDoc
     *   }
     * })
     * 
    **/
    create<T extends PmDocCreateArgs>(
      args: SelectSubset<T, PmDocCreateArgs>
    ): CheckSelect<T, Prisma__PmDocClient<PmDoc>, Prisma__PmDocClient<PmDocGetPayload<T>>>

    /**
     * Create many PmDocs.
     *     @param {PmDocCreateManyArgs} args - Arguments to create many PmDocs.
     *     @example
     *     // Create many PmDocs
     *     const pmDoc = await prisma.pmDoc.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PmDocCreateManyArgs>(
      args?: SelectSubset<T, PmDocCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a PmDoc.
     * @param {PmDocDeleteArgs} args - Arguments to delete one PmDoc.
     * @example
     * // Delete one PmDoc
     * const PmDoc = await prisma.pmDoc.delete({
     *   where: {
     *     // ... filter to delete one PmDoc
     *   }
     * })
     * 
    **/
    delete<T extends PmDocDeleteArgs>(
      args: SelectSubset<T, PmDocDeleteArgs>
    ): CheckSelect<T, Prisma__PmDocClient<PmDoc>, Prisma__PmDocClient<PmDocGetPayload<T>>>

    /**
     * Update one PmDoc.
     * @param {PmDocUpdateArgs} args - Arguments to update one PmDoc.
     * @example
     * // Update one PmDoc
     * const pmDoc = await prisma.pmDoc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PmDocUpdateArgs>(
      args: SelectSubset<T, PmDocUpdateArgs>
    ): CheckSelect<T, Prisma__PmDocClient<PmDoc>, Prisma__PmDocClient<PmDocGetPayload<T>>>

    /**
     * Delete zero or more PmDocs.
     * @param {PmDocDeleteManyArgs} args - Arguments to filter PmDocs to delete.
     * @example
     * // Delete a few PmDocs
     * const { count } = await prisma.pmDoc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PmDocDeleteManyArgs>(
      args?: SelectSubset<T, PmDocDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PmDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PmDocs
     * const pmDoc = await prisma.pmDoc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PmDocUpdateManyArgs>(
      args: SelectSubset<T, PmDocUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PmDoc.
     * @param {PmDocUpsertArgs} args - Arguments to update or create a PmDoc.
     * @example
     * // Update or create a PmDoc
     * const pmDoc = await prisma.pmDoc.upsert({
     *   create: {
     *     // ... data to create a PmDoc
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PmDoc we want to update
     *   }
     * })
    **/
    upsert<T extends PmDocUpsertArgs>(
      args: SelectSubset<T, PmDocUpsertArgs>
    ): CheckSelect<T, Prisma__PmDocClient<PmDoc>, Prisma__PmDocClient<PmDocGetPayload<T>>>

    /**
     * Find one PmDoc that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {PmDocFindUniqueOrThrowArgs} args - Arguments to find a PmDoc
     * @example
     * // Get one PmDoc
     * const pmDoc = await prisma.pmDoc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PmDocFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PmDocFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__PmDocClient<PmDoc>, Prisma__PmDocClient<PmDocGetPayload<T>>>

    /**
     * Find the first PmDoc that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocFindFirstOrThrowArgs} args - Arguments to find a PmDoc
     * @example
     * // Get one PmDoc
     * const pmDoc = await prisma.pmDoc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PmDocFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PmDocFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__PmDocClient<PmDoc>, Prisma__PmDocClient<PmDocGetPayload<T>>>

    /**
     * Count the number of PmDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocCountArgs} args - Arguments to filter PmDocs to count.
     * @example
     * // Count the number of PmDocs
     * const count = await prisma.pmDoc.count({
     *   where: {
     *     // ... the filter for the PmDocs we want to count
     *   }
     * })
    **/
    count<T extends PmDocCountArgs>(
      args?: Subset<T, PmDocCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PmDocCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PmDoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PmDocAggregateArgs>(args: Subset<T, PmDocAggregateArgs>): PrismaPromise<GetPmDocAggregateType<T>>

    /**
     * Group by PmDoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PmDocGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PmDocGroupByArgs['orderBy'] }
        : { orderBy?: PmDocGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PmDocGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPmDocGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for PmDoc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PmDocClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    snapshots<T extends PmDocSnapshotFindManyArgs = {}>(args?: Subset<T, PmDocSnapshotFindManyArgs>): CheckSelect<T, PrismaPromise<Array<PmDocSnapshot>>, PrismaPromise<Array<PmDocSnapshotGetPayload<T>>>>;

    reviews<T extends ReviewFindManyArgs = {}>(args?: Subset<T, ReviewFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Review>>, PrismaPromise<Array<ReviewGetPayload<T>>>>;

    comments<T extends CommentFindManyArgs = {}>(args?: Subset<T, CommentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Comment>>, PrismaPromise<Array<CommentGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * PmDoc base type for findUnique actions
   */
  export type PmDocFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the PmDoc
     * 
    **/
    select?: PmDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocInclude | null
    /**
     * Filter, which PmDoc to fetch.
     * 
    **/
    where: PmDocWhereUniqueInput
  }

  /**
   * PmDoc: findUnique
   */
  export interface PmDocFindUniqueArgs extends PmDocFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PmDoc base type for findFirst actions
   */
  export type PmDocFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the PmDoc
     * 
    **/
    select?: PmDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocInclude | null
    /**
     * Filter, which PmDoc to fetch.
     * 
    **/
    where?: PmDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PmDocs to fetch.
     * 
    **/
    orderBy?: Enumerable<PmDocOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PmDocs.
     * 
    **/
    cursor?: PmDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PmDocs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PmDocs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PmDocs.
     * 
    **/
    distinct?: Enumerable<PmDocScalarFieldEnum>
  }

  /**
   * PmDoc: findFirst
   */
  export interface PmDocFindFirstArgs extends PmDocFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PmDoc findMany
   */
  export type PmDocFindManyArgs = {
    /**
     * Select specific fields to fetch from the PmDoc
     * 
    **/
    select?: PmDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocInclude | null
    /**
     * Filter, which PmDocs to fetch.
     * 
    **/
    where?: PmDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PmDocs to fetch.
     * 
    **/
    orderBy?: Enumerable<PmDocOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PmDocs.
     * 
    **/
    cursor?: PmDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PmDocs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PmDocs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PmDocScalarFieldEnum>
  }


  /**
   * PmDoc create
   */
  export type PmDocCreateArgs = {
    /**
     * Select specific fields to fetch from the PmDoc
     * 
    **/
    select?: PmDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocInclude | null
    /**
     * The data needed to create a PmDoc.
     * 
    **/
    data: XOR<PmDocCreateInput, PmDocUncheckedCreateInput>
  }


  /**
   * PmDoc createMany
   */
  export type PmDocCreateManyArgs = {
    /**
     * The data used to create many PmDocs.
     * 
    **/
    data: Enumerable<PmDocCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * PmDoc update
   */
  export type PmDocUpdateArgs = {
    /**
     * Select specific fields to fetch from the PmDoc
     * 
    **/
    select?: PmDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocInclude | null
    /**
     * The data needed to update a PmDoc.
     * 
    **/
    data: XOR<PmDocUpdateInput, PmDocUncheckedUpdateInput>
    /**
     * Choose, which PmDoc to update.
     * 
    **/
    where: PmDocWhereUniqueInput
  }


  /**
   * PmDoc updateMany
   */
  export type PmDocUpdateManyArgs = {
    /**
     * The data used to update PmDocs.
     * 
    **/
    data: XOR<PmDocUpdateManyMutationInput, PmDocUncheckedUpdateManyInput>
    /**
     * Filter which PmDocs to update
     * 
    **/
    where?: PmDocWhereInput
  }


  /**
   * PmDoc upsert
   */
  export type PmDocUpsertArgs = {
    /**
     * Select specific fields to fetch from the PmDoc
     * 
    **/
    select?: PmDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocInclude | null
    /**
     * The filter to search for the PmDoc to update in case it exists.
     * 
    **/
    where: PmDocWhereUniqueInput
    /**
     * In case the PmDoc found by the `where` argument doesn't exist, create a new PmDoc with this data.
     * 
    **/
    create: XOR<PmDocCreateInput, PmDocUncheckedCreateInput>
    /**
     * In case the PmDoc was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PmDocUpdateInput, PmDocUncheckedUpdateInput>
  }


  /**
   * PmDoc delete
   */
  export type PmDocDeleteArgs = {
    /**
     * Select specific fields to fetch from the PmDoc
     * 
    **/
    select?: PmDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocInclude | null
    /**
     * Filter which PmDoc to delete.
     * 
    **/
    where: PmDocWhereUniqueInput
  }


  /**
   * PmDoc deleteMany
   */
  export type PmDocDeleteManyArgs = {
    /**
     * Filter which PmDocs to delete
     * 
    **/
    where?: PmDocWhereInput
  }


  /**
   * PmDoc: findUniqueOrThrow
   */
  export type PmDocFindUniqueOrThrowArgs = PmDocFindUniqueArgsBase
      

  /**
   * PmDoc: findFirstOrThrow
   */
  export type PmDocFindFirstOrThrowArgs = PmDocFindFirstArgsBase
      

  /**
   * PmDoc without action
   */
  export type PmDocArgs = {
    /**
     * Select specific fields to fetch from the PmDoc
     * 
    **/
    select?: PmDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocInclude | null
  }



  /**
   * Model PmDocSnapshot
   */


  export type AggregatePmDocSnapshot = {
    _count: PmDocSnapshotCountAggregateOutputType | null
    _min: PmDocSnapshotMinAggregateOutputType | null
    _max: PmDocSnapshotMaxAggregateOutputType | null
  }

  export type PmDocSnapshotMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    doc_id: string | null
  }

  export type PmDocSnapshotMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    doc_id: string | null
  }

  export type PmDocSnapshotCountAggregateOutputType = {
    id: number
    name: number
    snapshot: number
    createdAt: number
    doc_id: number
    _all: number
  }


  export type PmDocSnapshotMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    doc_id?: true
  }

  export type PmDocSnapshotMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    doc_id?: true
  }

  export type PmDocSnapshotCountAggregateInputType = {
    id?: true
    name?: true
    snapshot?: true
    createdAt?: true
    doc_id?: true
    _all?: true
  }

  export type PmDocSnapshotAggregateArgs = {
    /**
     * Filter which PmDocSnapshot to aggregate.
     * 
    **/
    where?: PmDocSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PmDocSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<PmDocSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PmDocSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PmDocSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PmDocSnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PmDocSnapshots
    **/
    _count?: true | PmDocSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PmDocSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PmDocSnapshotMaxAggregateInputType
  }

  export type GetPmDocSnapshotAggregateType<T extends PmDocSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregatePmDocSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePmDocSnapshot[P]>
      : GetScalarType<T[P], AggregatePmDocSnapshot[P]>
  }




  export type PmDocSnapshotGroupByArgs = {
    where?: PmDocSnapshotWhereInput
    orderBy?: Enumerable<PmDocSnapshotOrderByWithAggregationInput>
    by: Array<PmDocSnapshotScalarFieldEnum>
    having?: PmDocSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PmDocSnapshotCountAggregateInputType | true
    _min?: PmDocSnapshotMinAggregateInputType
    _max?: PmDocSnapshotMaxAggregateInputType
  }


  export type PmDocSnapshotGroupByOutputType = {
    id: string
    name: string
    snapshot: JsonValue
    createdAt: Date
    doc_id: string
    _count: PmDocSnapshotCountAggregateOutputType | null
    _min: PmDocSnapshotMinAggregateOutputType | null
    _max: PmDocSnapshotMaxAggregateOutputType | null
  }

  type GetPmDocSnapshotGroupByPayload<T extends PmDocSnapshotGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PmDocSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PmDocSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PmDocSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], PmDocSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type PmDocSnapshotSelect = {
    id?: boolean
    name?: boolean
    snapshot?: boolean
    createdAt?: boolean
    doc?: boolean | PmDocArgs
    doc_id?: boolean
    before_snap_review?: boolean | ReviewArgs
    after_snap_review?: boolean | ReviewArgs
    comments?: boolean | CommentFindManyArgs
    _count?: boolean | PmDocSnapshotCountOutputTypeArgs
  }

  export type PmDocSnapshotInclude = {
    doc?: boolean | PmDocArgs
    before_snap_review?: boolean | ReviewArgs
    after_snap_review?: boolean | ReviewArgs
    comments?: boolean | CommentFindManyArgs
    _count?: boolean | PmDocSnapshotCountOutputTypeArgs
  }

  export type PmDocSnapshotGetPayload<
    S extends boolean | null | undefined | PmDocSnapshotArgs,
    U = keyof S
      > = S extends true
        ? PmDocSnapshot
    : S extends undefined
    ? never
    : S extends PmDocSnapshotArgs | PmDocSnapshotFindManyArgs
    ?'include' extends U
    ? PmDocSnapshot  & {
    [P in TrueKeys<S['include']>]:
        P extends 'doc' ? PmDocGetPayload<S['include'][P]> :
        P extends 'before_snap_review' ? ReviewGetPayload<S['include'][P]> | null :
        P extends 'after_snap_review' ? ReviewGetPayload<S['include'][P]> | null :
        P extends 'comments' ? Array < CommentGetPayload<S['include'][P]>>  :
        P extends '_count' ? PmDocSnapshotCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'doc' ? PmDocGetPayload<S['select'][P]> :
        P extends 'before_snap_review' ? ReviewGetPayload<S['select'][P]> | null :
        P extends 'after_snap_review' ? ReviewGetPayload<S['select'][P]> | null :
        P extends 'comments' ? Array < CommentGetPayload<S['select'][P]>>  :
        P extends '_count' ? PmDocSnapshotCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof PmDocSnapshot ? PmDocSnapshot[P] : never
  } 
    : PmDocSnapshot
  : PmDocSnapshot


  type PmDocSnapshotCountArgs = Merge<
    Omit<PmDocSnapshotFindManyArgs, 'select' | 'include'> & {
      select?: PmDocSnapshotCountAggregateInputType | true
    }
  >

  export interface PmDocSnapshotDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one PmDocSnapshot that matches the filter.
     * @param {PmDocSnapshotFindUniqueArgs} args - Arguments to find a PmDocSnapshot
     * @example
     * // Get one PmDocSnapshot
     * const pmDocSnapshot = await prisma.pmDocSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PmDocSnapshotFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PmDocSnapshotFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PmDocSnapshot'> extends True ? CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot>, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T>>> : CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot | null >, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T> | null >>

    /**
     * Find the first PmDocSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocSnapshotFindFirstArgs} args - Arguments to find a PmDocSnapshot
     * @example
     * // Get one PmDocSnapshot
     * const pmDocSnapshot = await prisma.pmDocSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PmDocSnapshotFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PmDocSnapshotFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PmDocSnapshot'> extends True ? CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot>, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T>>> : CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot | null >, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T> | null >>

    /**
     * Find zero or more PmDocSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocSnapshotFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PmDocSnapshots
     * const pmDocSnapshots = await prisma.pmDocSnapshot.findMany()
     * 
     * // Get first 10 PmDocSnapshots
     * const pmDocSnapshots = await prisma.pmDocSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pmDocSnapshotWithIdOnly = await prisma.pmDocSnapshot.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PmDocSnapshotFindManyArgs>(
      args?: SelectSubset<T, PmDocSnapshotFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<PmDocSnapshot>>, PrismaPromise<Array<PmDocSnapshotGetPayload<T>>>>

    /**
     * Create a PmDocSnapshot.
     * @param {PmDocSnapshotCreateArgs} args - Arguments to create a PmDocSnapshot.
     * @example
     * // Create one PmDocSnapshot
     * const PmDocSnapshot = await prisma.pmDocSnapshot.create({
     *   data: {
     *     // ... data to create a PmDocSnapshot
     *   }
     * })
     * 
    **/
    create<T extends PmDocSnapshotCreateArgs>(
      args: SelectSubset<T, PmDocSnapshotCreateArgs>
    ): CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot>, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T>>>

    /**
     * Create many PmDocSnapshots.
     *     @param {PmDocSnapshotCreateManyArgs} args - Arguments to create many PmDocSnapshots.
     *     @example
     *     // Create many PmDocSnapshots
     *     const pmDocSnapshot = await prisma.pmDocSnapshot.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PmDocSnapshotCreateManyArgs>(
      args?: SelectSubset<T, PmDocSnapshotCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a PmDocSnapshot.
     * @param {PmDocSnapshotDeleteArgs} args - Arguments to delete one PmDocSnapshot.
     * @example
     * // Delete one PmDocSnapshot
     * const PmDocSnapshot = await prisma.pmDocSnapshot.delete({
     *   where: {
     *     // ... filter to delete one PmDocSnapshot
     *   }
     * })
     * 
    **/
    delete<T extends PmDocSnapshotDeleteArgs>(
      args: SelectSubset<T, PmDocSnapshotDeleteArgs>
    ): CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot>, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T>>>

    /**
     * Update one PmDocSnapshot.
     * @param {PmDocSnapshotUpdateArgs} args - Arguments to update one PmDocSnapshot.
     * @example
     * // Update one PmDocSnapshot
     * const pmDocSnapshot = await prisma.pmDocSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PmDocSnapshotUpdateArgs>(
      args: SelectSubset<T, PmDocSnapshotUpdateArgs>
    ): CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot>, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T>>>

    /**
     * Delete zero or more PmDocSnapshots.
     * @param {PmDocSnapshotDeleteManyArgs} args - Arguments to filter PmDocSnapshots to delete.
     * @example
     * // Delete a few PmDocSnapshots
     * const { count } = await prisma.pmDocSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PmDocSnapshotDeleteManyArgs>(
      args?: SelectSubset<T, PmDocSnapshotDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PmDocSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PmDocSnapshots
     * const pmDocSnapshot = await prisma.pmDocSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PmDocSnapshotUpdateManyArgs>(
      args: SelectSubset<T, PmDocSnapshotUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PmDocSnapshot.
     * @param {PmDocSnapshotUpsertArgs} args - Arguments to update or create a PmDocSnapshot.
     * @example
     * // Update or create a PmDocSnapshot
     * const pmDocSnapshot = await prisma.pmDocSnapshot.upsert({
     *   create: {
     *     // ... data to create a PmDocSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PmDocSnapshot we want to update
     *   }
     * })
    **/
    upsert<T extends PmDocSnapshotUpsertArgs>(
      args: SelectSubset<T, PmDocSnapshotUpsertArgs>
    ): CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot>, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T>>>

    /**
     * Find one PmDocSnapshot that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {PmDocSnapshotFindUniqueOrThrowArgs} args - Arguments to find a PmDocSnapshot
     * @example
     * // Get one PmDocSnapshot
     * const pmDocSnapshot = await prisma.pmDocSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PmDocSnapshotFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PmDocSnapshotFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot>, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T>>>

    /**
     * Find the first PmDocSnapshot that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocSnapshotFindFirstOrThrowArgs} args - Arguments to find a PmDocSnapshot
     * @example
     * // Get one PmDocSnapshot
     * const pmDocSnapshot = await prisma.pmDocSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PmDocSnapshotFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PmDocSnapshotFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot>, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T>>>

    /**
     * Count the number of PmDocSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocSnapshotCountArgs} args - Arguments to filter PmDocSnapshots to count.
     * @example
     * // Count the number of PmDocSnapshots
     * const count = await prisma.pmDocSnapshot.count({
     *   where: {
     *     // ... the filter for the PmDocSnapshots we want to count
     *   }
     * })
    **/
    count<T extends PmDocSnapshotCountArgs>(
      args?: Subset<T, PmDocSnapshotCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PmDocSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PmDocSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PmDocSnapshotAggregateArgs>(args: Subset<T, PmDocSnapshotAggregateArgs>): PrismaPromise<GetPmDocSnapshotAggregateType<T>>

    /**
     * Group by PmDocSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PmDocSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PmDocSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PmDocSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: PmDocSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PmDocSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPmDocSnapshotGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for PmDocSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PmDocSnapshotClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    doc<T extends PmDocArgs = {}>(args?: Subset<T, PmDocArgs>): CheckSelect<T, Prisma__PmDocClient<PmDoc | null >, Prisma__PmDocClient<PmDocGetPayload<T> | null >>;

    before_snap_review<T extends ReviewArgs = {}>(args?: Subset<T, ReviewArgs>): CheckSelect<T, Prisma__ReviewClient<Review | null >, Prisma__ReviewClient<ReviewGetPayload<T> | null >>;

    after_snap_review<T extends ReviewArgs = {}>(args?: Subset<T, ReviewArgs>): CheckSelect<T, Prisma__ReviewClient<Review | null >, Prisma__ReviewClient<ReviewGetPayload<T> | null >>;

    comments<T extends CommentFindManyArgs = {}>(args?: Subset<T, CommentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Comment>>, PrismaPromise<Array<CommentGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * PmDocSnapshot base type for findUnique actions
   */
  export type PmDocSnapshotFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the PmDocSnapshot
     * 
    **/
    select?: PmDocSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocSnapshotInclude | null
    /**
     * Filter, which PmDocSnapshot to fetch.
     * 
    **/
    where: PmDocSnapshotWhereUniqueInput
  }

  /**
   * PmDocSnapshot: findUnique
   */
  export interface PmDocSnapshotFindUniqueArgs extends PmDocSnapshotFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PmDocSnapshot base type for findFirst actions
   */
  export type PmDocSnapshotFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the PmDocSnapshot
     * 
    **/
    select?: PmDocSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocSnapshotInclude | null
    /**
     * Filter, which PmDocSnapshot to fetch.
     * 
    **/
    where?: PmDocSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PmDocSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<PmDocSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PmDocSnapshots.
     * 
    **/
    cursor?: PmDocSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PmDocSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PmDocSnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PmDocSnapshots.
     * 
    **/
    distinct?: Enumerable<PmDocSnapshotScalarFieldEnum>
  }

  /**
   * PmDocSnapshot: findFirst
   */
  export interface PmDocSnapshotFindFirstArgs extends PmDocSnapshotFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PmDocSnapshot findMany
   */
  export type PmDocSnapshotFindManyArgs = {
    /**
     * Select specific fields to fetch from the PmDocSnapshot
     * 
    **/
    select?: PmDocSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocSnapshotInclude | null
    /**
     * Filter, which PmDocSnapshots to fetch.
     * 
    **/
    where?: PmDocSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PmDocSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<PmDocSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PmDocSnapshots.
     * 
    **/
    cursor?: PmDocSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PmDocSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PmDocSnapshots.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PmDocSnapshotScalarFieldEnum>
  }


  /**
   * PmDocSnapshot create
   */
  export type PmDocSnapshotCreateArgs = {
    /**
     * Select specific fields to fetch from the PmDocSnapshot
     * 
    **/
    select?: PmDocSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocSnapshotInclude | null
    /**
     * The data needed to create a PmDocSnapshot.
     * 
    **/
    data: XOR<PmDocSnapshotCreateInput, PmDocSnapshotUncheckedCreateInput>
  }


  /**
   * PmDocSnapshot createMany
   */
  export type PmDocSnapshotCreateManyArgs = {
    /**
     * The data used to create many PmDocSnapshots.
     * 
    **/
    data: Enumerable<PmDocSnapshotCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * PmDocSnapshot update
   */
  export type PmDocSnapshotUpdateArgs = {
    /**
     * Select specific fields to fetch from the PmDocSnapshot
     * 
    **/
    select?: PmDocSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocSnapshotInclude | null
    /**
     * The data needed to update a PmDocSnapshot.
     * 
    **/
    data: XOR<PmDocSnapshotUpdateInput, PmDocSnapshotUncheckedUpdateInput>
    /**
     * Choose, which PmDocSnapshot to update.
     * 
    **/
    where: PmDocSnapshotWhereUniqueInput
  }


  /**
   * PmDocSnapshot updateMany
   */
  export type PmDocSnapshotUpdateManyArgs = {
    /**
     * The data used to update PmDocSnapshots.
     * 
    **/
    data: XOR<PmDocSnapshotUpdateManyMutationInput, PmDocSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which PmDocSnapshots to update
     * 
    **/
    where?: PmDocSnapshotWhereInput
  }


  /**
   * PmDocSnapshot upsert
   */
  export type PmDocSnapshotUpsertArgs = {
    /**
     * Select specific fields to fetch from the PmDocSnapshot
     * 
    **/
    select?: PmDocSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocSnapshotInclude | null
    /**
     * The filter to search for the PmDocSnapshot to update in case it exists.
     * 
    **/
    where: PmDocSnapshotWhereUniqueInput
    /**
     * In case the PmDocSnapshot found by the `where` argument doesn't exist, create a new PmDocSnapshot with this data.
     * 
    **/
    create: XOR<PmDocSnapshotCreateInput, PmDocSnapshotUncheckedCreateInput>
    /**
     * In case the PmDocSnapshot was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PmDocSnapshotUpdateInput, PmDocSnapshotUncheckedUpdateInput>
  }


  /**
   * PmDocSnapshot delete
   */
  export type PmDocSnapshotDeleteArgs = {
    /**
     * Select specific fields to fetch from the PmDocSnapshot
     * 
    **/
    select?: PmDocSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocSnapshotInclude | null
    /**
     * Filter which PmDocSnapshot to delete.
     * 
    **/
    where: PmDocSnapshotWhereUniqueInput
  }


  /**
   * PmDocSnapshot deleteMany
   */
  export type PmDocSnapshotDeleteManyArgs = {
    /**
     * Filter which PmDocSnapshots to delete
     * 
    **/
    where?: PmDocSnapshotWhereInput
  }


  /**
   * PmDocSnapshot: findUniqueOrThrow
   */
  export type PmDocSnapshotFindUniqueOrThrowArgs = PmDocSnapshotFindUniqueArgsBase
      

  /**
   * PmDocSnapshot: findFirstOrThrow
   */
  export type PmDocSnapshotFindFirstOrThrowArgs = PmDocSnapshotFindFirstArgsBase
      

  /**
   * PmDocSnapshot without action
   */
  export type PmDocSnapshotArgs = {
    /**
     * Select specific fields to fetch from the PmDocSnapshot
     * 
    **/
    select?: PmDocSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PmDocSnapshotInclude | null
  }



  /**
   * Model Comment
   */


  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    body: string | null
    createdAt: Date | null
    target_id: string | null
    user_id: string | null
    doc_id: string | null
    snapshot_id: string | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    body: string | null
    createdAt: Date | null
    target_id: string | null
    user_id: string | null
    doc_id: string | null
    snapshot_id: string | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    body: number
    createdAt: number
    target_id: number
    user_id: number
    doc_id: number
    snapshot_id: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    body?: true
    createdAt?: true
    target_id?: true
    user_id?: true
    doc_id?: true
    snapshot_id?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    body?: true
    createdAt?: true
    target_id?: true
    user_id?: true
    doc_id?: true
    snapshot_id?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    body?: true
    createdAt?: true
    target_id?: true
    user_id?: true
    doc_id?: true
    snapshot_id?: true
    _all?: true
  }

  export type CommentAggregateArgs = {
    /**
     * Filter which Comment to aggregate.
     * 
    **/
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     * 
    **/
    orderBy?: Enumerable<CommentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs = {
    where?: CommentWhereInput
    orderBy?: Enumerable<CommentOrderByWithAggregationInput>
    by: Array<CommentScalarFieldEnum>
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }


  export type CommentGroupByOutputType = {
    id: string
    body: string
    createdAt: Date
    target_id: string
    user_id: string
    doc_id: string
    snapshot_id: string | null
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = PrismaPromise<
    Array<
      PickArray<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect = {
    id?: boolean
    body?: boolean
    createdAt?: boolean
    target_id?: boolean
    user?: boolean | UserArgs
    user_id?: boolean
    doc?: boolean | PmDocArgs
    doc_id?: boolean
    snapshot?: boolean | PmDocSnapshotArgs
    snapshot_id?: boolean
  }

  export type CommentInclude = {
    user?: boolean | UserArgs
    doc?: boolean | PmDocArgs
    snapshot?: boolean | PmDocSnapshotArgs
  }

  export type CommentGetPayload<
    S extends boolean | null | undefined | CommentArgs,
    U = keyof S
      > = S extends true
        ? Comment
    : S extends undefined
    ? never
    : S extends CommentArgs | CommentFindManyArgs
    ?'include' extends U
    ? Comment  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :
        P extends 'doc' ? PmDocGetPayload<S['include'][P]> :
        P extends 'snapshot' ? PmDocSnapshotGetPayload<S['include'][P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :
        P extends 'doc' ? PmDocGetPayload<S['select'][P]> :
        P extends 'snapshot' ? PmDocSnapshotGetPayload<S['select'][P]> | null :  P extends keyof Comment ? Comment[P] : never
  } 
    : Comment
  : Comment


  type CommentCountArgs = Merge<
    Omit<CommentFindManyArgs, 'select' | 'include'> & {
      select?: CommentCountAggregateInputType | true
    }
  >

  export interface CommentDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CommentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CommentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Comment'> extends True ? CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>> : CheckSelect<T, Prisma__CommentClient<Comment | null >, Prisma__CommentClient<CommentGetPayload<T> | null >>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CommentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CommentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Comment'> extends True ? CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>> : CheckSelect<T, Prisma__CommentClient<Comment | null >, Prisma__CommentClient<CommentGetPayload<T> | null >>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CommentFindManyArgs>(
      args?: SelectSubset<T, CommentFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Comment>>, PrismaPromise<Array<CommentGetPayload<T>>>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
    **/
    create<T extends CommentCreateArgs>(
      args: SelectSubset<T, CommentCreateArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Create many Comments.
     *     @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     *     @example
     *     // Create many Comments
     *     const comment = await prisma.comment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CommentCreateManyArgs>(
      args?: SelectSubset<T, CommentCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
    **/
    delete<T extends CommentDeleteArgs>(
      args: SelectSubset<T, CommentDeleteArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CommentUpdateArgs>(
      args: SelectSubset<T, CommentUpdateArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CommentDeleteManyArgs>(
      args?: SelectSubset<T, CommentDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CommentUpdateManyArgs>(
      args: SelectSubset<T, CommentUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
    **/
    upsert<T extends CommentUpsertArgs>(
      args: SelectSubset<T, CommentUpsertArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Find one Comment that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, CommentFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Find the first Comment that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CommentFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__CommentClient<Comment>, Prisma__CommentClient<CommentGetPayload<T>>>

    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CommentClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    doc<T extends PmDocArgs = {}>(args?: Subset<T, PmDocArgs>): CheckSelect<T, Prisma__PmDocClient<PmDoc | null >, Prisma__PmDocClient<PmDocGetPayload<T> | null >>;

    snapshot<T extends PmDocSnapshotArgs = {}>(args?: Subset<T, PmDocSnapshotArgs>): CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot | null >, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Comment base type for findUnique actions
   */
  export type CommentFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * Filter, which Comment to fetch.
     * 
    **/
    where: CommentWhereUniqueInput
  }

  /**
   * Comment: findUnique
   */
  export interface CommentFindUniqueArgs extends CommentFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Comment base type for findFirst actions
   */
  export type CommentFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * Filter, which Comment to fetch.
     * 
    **/
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     * 
    **/
    orderBy?: Enumerable<CommentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     * 
    **/
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     * 
    **/
    distinct?: Enumerable<CommentScalarFieldEnum>
  }

  /**
   * Comment: findFirst
   */
  export interface CommentFindFirstArgs extends CommentFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * Filter, which Comments to fetch.
     * 
    **/
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     * 
    **/
    orderBy?: Enumerable<CommentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     * 
    **/
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     * 
    **/
    skip?: number
    distinct?: Enumerable<CommentScalarFieldEnum>
  }


  /**
   * Comment create
   */
  export type CommentCreateArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * The data needed to create a Comment.
     * 
    **/
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }


  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs = {
    /**
     * The data used to create many Comments.
     * 
    **/
    data: Enumerable<CommentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Comment update
   */
  export type CommentUpdateArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * The data needed to update a Comment.
     * 
    **/
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     * 
    **/
    where: CommentWhereUniqueInput
  }


  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs = {
    /**
     * The data used to update Comments.
     * 
    **/
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     * 
    **/
    where?: CommentWhereInput
  }


  /**
   * Comment upsert
   */
  export type CommentUpsertArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * The filter to search for the Comment to update in case it exists.
     * 
    **/
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     * 
    **/
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }


  /**
   * Comment delete
   */
  export type CommentDeleteArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
    /**
     * Filter which Comment to delete.
     * 
    **/
    where: CommentWhereUniqueInput
  }


  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs = {
    /**
     * Filter which Comments to delete
     * 
    **/
    where?: CommentWhereInput
  }


  /**
   * Comment: findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs = CommentFindUniqueArgsBase
      

  /**
   * Comment: findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs = CommentFindFirstArgsBase
      

  /**
   * Comment without action
   */
  export type CommentArgs = {
    /**
     * Select specific fields to fetch from the Comment
     * 
    **/
    select?: CommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: CommentInclude | null
  }



  /**
   * Model Review
   */


  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    name: string | null
    status: ReviewStatus | null
    createdAt: Date | null
    user_id: string | null
    doc_id: string | null
    before_snapshot_id: string | null
    after_snapshot_id: string | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    name: string | null
    status: ReviewStatus | null
    createdAt: Date | null
    user_id: string | null
    doc_id: string | null
    before_snapshot_id: string | null
    after_snapshot_id: string | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    name: number
    status: number
    createdAt: number
    user_id: number
    changes: number
    doc_id: number
    before_snapshot_id: number
    after_snapshot_id: number
    _all: number
  }


  export type ReviewMinAggregateInputType = {
    id?: true
    name?: true
    status?: true
    createdAt?: true
    user_id?: true
    doc_id?: true
    before_snapshot_id?: true
    after_snapshot_id?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    name?: true
    status?: true
    createdAt?: true
    user_id?: true
    doc_id?: true
    before_snapshot_id?: true
    after_snapshot_id?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    name?: true
    status?: true
    createdAt?: true
    user_id?: true
    changes?: true
    doc_id?: true
    before_snapshot_id?: true
    after_snapshot_id?: true
    _all?: true
  }

  export type ReviewAggregateArgs = {
    /**
     * Filter which Review to aggregate.
     * 
    **/
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs = {
    where?: ReviewWhereInput
    orderBy?: Enumerable<ReviewOrderByWithAggregationInput>
    by: Array<ReviewScalarFieldEnum>
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }


  export type ReviewGroupByOutputType = {
    id: string
    name: string
    status: ReviewStatus
    createdAt: Date
    user_id: string
    changes: string[]
    doc_id: string
    before_snapshot_id: string
    after_snapshot_id: string | null
    _count: ReviewCountAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect = {
    id?: boolean
    name?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserArgs
    user_id?: boolean
    changes?: boolean
    doc?: boolean | PmDocArgs
    doc_id?: boolean
    before_snapshot?: boolean | PmDocSnapshotArgs
    before_snapshot_id?: boolean
    after_snapshot?: boolean | PmDocSnapshotArgs
    after_snapshot_id?: boolean
  }

  export type ReviewInclude = {
    user?: boolean | UserArgs
    doc?: boolean | PmDocArgs
    before_snapshot?: boolean | PmDocSnapshotArgs
    after_snapshot?: boolean | PmDocSnapshotArgs
  }

  export type ReviewGetPayload<
    S extends boolean | null | undefined | ReviewArgs,
    U = keyof S
      > = S extends true
        ? Review
    : S extends undefined
    ? never
    : S extends ReviewArgs | ReviewFindManyArgs
    ?'include' extends U
    ? Review  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :
        P extends 'doc' ? PmDocGetPayload<S['include'][P]> :
        P extends 'before_snapshot' ? PmDocSnapshotGetPayload<S['include'][P]> :
        P extends 'after_snapshot' ? PmDocSnapshotGetPayload<S['include'][P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :
        P extends 'doc' ? PmDocGetPayload<S['select'][P]> :
        P extends 'before_snapshot' ? PmDocSnapshotGetPayload<S['select'][P]> :
        P extends 'after_snapshot' ? PmDocSnapshotGetPayload<S['select'][P]> | null :  P extends keyof Review ? Review[P] : never
  } 
    : Review
  : Review


  type ReviewCountArgs = Merge<
    Omit<ReviewFindManyArgs, 'select' | 'include'> & {
      select?: ReviewCountAggregateInputType | true
    }
  >

  export interface ReviewDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReviewFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ReviewFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Review'> extends True ? CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>> : CheckSelect<T, Prisma__ReviewClient<Review | null >, Prisma__ReviewClient<ReviewGetPayload<T> | null >>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReviewFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ReviewFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Review'> extends True ? CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>> : CheckSelect<T, Prisma__ReviewClient<Review | null >, Prisma__ReviewClient<ReviewGetPayload<T> | null >>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReviewFindManyArgs>(
      args?: SelectSubset<T, ReviewFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Review>>, PrismaPromise<Array<ReviewGetPayload<T>>>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
    **/
    create<T extends ReviewCreateArgs>(
      args: SelectSubset<T, ReviewCreateArgs>
    ): CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>>

    /**
     * Create many Reviews.
     *     @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     *     @example
     *     // Create many Reviews
     *     const review = await prisma.review.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReviewCreateManyArgs>(
      args?: SelectSubset<T, ReviewCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
    **/
    delete<T extends ReviewDeleteArgs>(
      args: SelectSubset<T, ReviewDeleteArgs>
    ): CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReviewUpdateArgs>(
      args: SelectSubset<T, ReviewUpdateArgs>
    ): CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReviewDeleteManyArgs>(
      args?: SelectSubset<T, ReviewDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReviewUpdateManyArgs>(
      args: SelectSubset<T, ReviewUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
    **/
    upsert<T extends ReviewUpsertArgs>(
      args: SelectSubset<T, ReviewUpsertArgs>
    ): CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>>

    /**
     * Find one Review that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ReviewFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>>

    /**
     * Find the first Review that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ReviewFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ReviewClient<Review>, Prisma__ReviewClient<ReviewGetPayload<T>>>

    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ReviewClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    doc<T extends PmDocArgs = {}>(args?: Subset<T, PmDocArgs>): CheckSelect<T, Prisma__PmDocClient<PmDoc | null >, Prisma__PmDocClient<PmDocGetPayload<T> | null >>;

    before_snapshot<T extends PmDocSnapshotArgs = {}>(args?: Subset<T, PmDocSnapshotArgs>): CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot | null >, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T> | null >>;

    after_snapshot<T extends PmDocSnapshotArgs = {}>(args?: Subset<T, PmDocSnapshotArgs>): CheckSelect<T, Prisma__PmDocSnapshotClient<PmDocSnapshot | null >, Prisma__PmDocSnapshotClient<PmDocSnapshotGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Review base type for findUnique actions
   */
  export type ReviewFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * Filter, which Review to fetch.
     * 
    **/
    where: ReviewWhereUniqueInput
  }

  /**
   * Review: findUnique
   */
  export interface ReviewFindUniqueArgs extends ReviewFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Review base type for findFirst actions
   */
  export type ReviewFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * Filter, which Review to fetch.
     * 
    **/
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     * 
    **/
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     * 
    **/
    distinct?: Enumerable<ReviewScalarFieldEnum>
  }

  /**
   * Review: findFirst
   */
  export interface ReviewFindFirstArgs extends ReviewFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * Filter, which Reviews to fetch.
     * 
    **/
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     * 
    **/
    orderBy?: Enumerable<ReviewOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     * 
    **/
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ReviewScalarFieldEnum>
  }


  /**
   * Review create
   */
  export type ReviewCreateArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * The data needed to create a Review.
     * 
    **/
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }


  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs = {
    /**
     * The data used to create many Reviews.
     * 
    **/
    data: Enumerable<ReviewCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Review update
   */
  export type ReviewUpdateArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * The data needed to update a Review.
     * 
    **/
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     * 
    **/
    where: ReviewWhereUniqueInput
  }


  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs = {
    /**
     * The data used to update Reviews.
     * 
    **/
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     * 
    **/
    where?: ReviewWhereInput
  }


  /**
   * Review upsert
   */
  export type ReviewUpsertArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * The filter to search for the Review to update in case it exists.
     * 
    **/
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     * 
    **/
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }


  /**
   * Review delete
   */
  export type ReviewDeleteArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
    /**
     * Filter which Review to delete.
     * 
    **/
    where: ReviewWhereUniqueInput
  }


  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs = {
    /**
     * Filter which Reviews to delete
     * 
    **/
    where?: ReviewWhereInput
  }


  /**
   * Review: findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs = ReviewFindUniqueArgsBase
      

  /**
   * Review: findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs = ReviewFindFirstArgsBase
      

  /**
   * Review without action
   */
  export type ReviewArgs = {
    /**
     * Select specific fields to fetch from the Review
     * 
    **/
    select?: ReviewSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReviewInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    firstname: 'firstname',
    lastname: 'lastname',
    password: 'password',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PmDocScalarFieldEnum: {
    id: 'id',
    name: 'name',
    doc: 'doc',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    user_id: 'user_id'
  };

  export type PmDocScalarFieldEnum = (typeof PmDocScalarFieldEnum)[keyof typeof PmDocScalarFieldEnum]


  export const PmDocSnapshotScalarFieldEnum: {
    id: 'id',
    name: 'name',
    snapshot: 'snapshot',
    createdAt: 'createdAt',
    doc_id: 'doc_id'
  };

  export type PmDocSnapshotScalarFieldEnum = (typeof PmDocSnapshotScalarFieldEnum)[keyof typeof PmDocSnapshotScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    body: 'body',
    createdAt: 'createdAt',
    target_id: 'target_id',
    user_id: 'user_id',
    doc_id: 'doc_id',
    snapshot_id: 'snapshot_id'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    name: 'name',
    status: 'status',
    createdAt: 'createdAt',
    user_id: 'user_id',
    changes: 'changes',
    doc_id: 'doc_id',
    before_snapshot_id: 'before_snapshot_id',
    after_snapshot_id: 'after_snapshot_id'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    firstname?: StringFilter | string
    lastname?: StringFilter | string
    password?: StringFilter | string
    role?: EnumUserRoleFilter | UserRole
    docs?: PmDocListRelationFilter
    reviews?: ReviewListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    password?: SortOrder
    role?: SortOrder
    docs?: PmDocOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    password?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    firstname?: StringWithAggregatesFilter | string
    lastname?: StringWithAggregatesFilter | string
    password?: StringWithAggregatesFilter | string
    role?: EnumUserRoleWithAggregatesFilter | UserRole
  }

  export type PmDocWhereInput = {
    AND?: Enumerable<PmDocWhereInput>
    OR?: Enumerable<PmDocWhereInput>
    NOT?: Enumerable<PmDocWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    doc?: JsonFilter
    status?: EnumDocStatusFilter | DocStatus
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    user_id?: StringFilter | string
    snapshots?: PmDocSnapshotListRelationFilter
    reviews?: ReviewListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type PmDocOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    doc?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    user_id?: SortOrder
    snapshots?: PmDocSnapshotOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type PmDocWhereUniqueInput = {
    id?: string
  }

  export type PmDocOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    doc?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user_id?: SortOrder
    _count?: PmDocCountOrderByAggregateInput
    _max?: PmDocMaxOrderByAggregateInput
    _min?: PmDocMinOrderByAggregateInput
  }

  export type PmDocScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PmDocScalarWhereWithAggregatesInput>
    OR?: Enumerable<PmDocScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PmDocScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    doc?: JsonWithAggregatesFilter
    status?: EnumDocStatusWithAggregatesFilter | DocStatus
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    user_id?: StringWithAggregatesFilter | string
  }

  export type PmDocSnapshotWhereInput = {
    AND?: Enumerable<PmDocSnapshotWhereInput>
    OR?: Enumerable<PmDocSnapshotWhereInput>
    NOT?: Enumerable<PmDocSnapshotWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    snapshot?: JsonFilter
    createdAt?: DateTimeFilter | Date | string
    doc?: XOR<PmDocRelationFilter, PmDocWhereInput>
    doc_id?: StringFilter | string
    before_snap_review?: XOR<ReviewRelationFilter, ReviewWhereInput> | null
    after_snap_review?: XOR<ReviewRelationFilter, ReviewWhereInput> | null
    comments?: CommentListRelationFilter
  }

  export type PmDocSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
    doc?: PmDocOrderByWithRelationInput
    doc_id?: SortOrder
    before_snap_review?: ReviewOrderByWithRelationInput
    after_snap_review?: ReviewOrderByWithRelationInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type PmDocSnapshotWhereUniqueInput = {
    id?: string
  }

  export type PmDocSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
    doc_id?: SortOrder
    _count?: PmDocSnapshotCountOrderByAggregateInput
    _max?: PmDocSnapshotMaxOrderByAggregateInput
    _min?: PmDocSnapshotMinOrderByAggregateInput
  }

  export type PmDocSnapshotScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PmDocSnapshotScalarWhereWithAggregatesInput>
    OR?: Enumerable<PmDocSnapshotScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PmDocSnapshotScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    snapshot?: JsonWithAggregatesFilter
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    doc_id?: StringWithAggregatesFilter | string
  }

  export type CommentWhereInput = {
    AND?: Enumerable<CommentWhereInput>
    OR?: Enumerable<CommentWhereInput>
    NOT?: Enumerable<CommentWhereInput>
    id?: StringFilter | string
    body?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    target_id?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    user_id?: StringFilter | string
    doc?: XOR<PmDocRelationFilter, PmDocWhereInput>
    doc_id?: StringFilter | string
    snapshot?: XOR<PmDocSnapshotRelationFilter, PmDocSnapshotWhereInput> | null
    snapshot_id?: StringNullableFilter | string | null
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    target_id?: SortOrder
    user?: UserOrderByWithRelationInput
    user_id?: SortOrder
    doc?: PmDocOrderByWithRelationInput
    doc_id?: SortOrder
    snapshot?: PmDocSnapshotOrderByWithRelationInput
    snapshot_id?: SortOrder
  }

  export type CommentWhereUniqueInput = {
    id?: string
  }

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    target_id?: SortOrder
    user_id?: SortOrder
    doc_id?: SortOrder
    snapshot_id?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CommentScalarWhereWithAggregatesInput>
    OR?: Enumerable<CommentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CommentScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    body?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    target_id?: StringWithAggregatesFilter | string
    user_id?: StringWithAggregatesFilter | string
    doc_id?: StringWithAggregatesFilter | string
    snapshot_id?: StringNullableWithAggregatesFilter | string | null
  }

  export type ReviewWhereInput = {
    AND?: Enumerable<ReviewWhereInput>
    OR?: Enumerable<ReviewWhereInput>
    NOT?: Enumerable<ReviewWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    status?: EnumReviewStatusFilter | ReviewStatus
    createdAt?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    user_id?: StringFilter | string
    changes?: StringNullableListFilter
    doc?: XOR<PmDocRelationFilter, PmDocWhereInput>
    doc_id?: StringFilter | string
    before_snapshot?: XOR<PmDocSnapshotRelationFilter, PmDocSnapshotWhereInput>
    before_snapshot_id?: StringFilter | string
    after_snapshot?: XOR<PmDocSnapshotRelationFilter, PmDocSnapshotWhereInput> | null
    after_snapshot_id?: StringNullableFilter | string | null
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    user_id?: SortOrder
    changes?: SortOrder
    doc?: PmDocOrderByWithRelationInput
    doc_id?: SortOrder
    before_snapshot?: PmDocSnapshotOrderByWithRelationInput
    before_snapshot_id?: SortOrder
    after_snapshot?: PmDocSnapshotOrderByWithRelationInput
    after_snapshot_id?: SortOrder
  }

  export type ReviewWhereUniqueInput = {
    id?: string
    before_snapshot_id?: string
    after_snapshot_id?: string
  }

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user_id?: SortOrder
    changes?: SortOrder
    doc_id?: SortOrder
    before_snapshot_id?: SortOrder
    after_snapshot_id?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ReviewScalarWhereWithAggregatesInput>
    OR?: Enumerable<ReviewScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ReviewScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    status?: EnumReviewStatusWithAggregatesFilter | ReviewStatus
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    user_id?: StringWithAggregatesFilter | string
    changes?: StringNullableListFilter
    doc_id?: StringWithAggregatesFilter | string
    before_snapshot_id?: StringWithAggregatesFilter | string
    after_snapshot_id?: StringNullableWithAggregatesFilter | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    firstname: string
    lastname: string
    password: string
    role?: UserRole
    docs?: PmDocCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    firstname: string
    lastname: string
    password: string
    role?: UserRole
    docs?: PmDocUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    docs?: PmDocUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    docs?: PmDocUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    firstname: string
    lastname: string
    password: string
    role?: UserRole
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
  }

  export type PmDocCreateInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDocsInput
    snapshots?: PmDocSnapshotCreateNestedManyWithoutDocInput
    reviews?: ReviewCreateNestedManyWithoutDocInput
    comments?: CommentCreateNestedManyWithoutDocInput
  }

  export type PmDocUncheckedCreateInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user_id: string
    snapshots?: PmDocSnapshotUncheckedCreateNestedManyWithoutDocInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutDocInput
    comments?: CommentUncheckedCreateNestedManyWithoutDocInput
  }

  export type PmDocUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDocsNestedInput
    snapshots?: PmDocSnapshotUpdateManyWithoutDocNestedInput
    reviews?: ReviewUpdateManyWithoutDocNestedInput
    comments?: CommentUpdateManyWithoutDocNestedInput
  }

  export type PmDocUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    snapshots?: PmDocSnapshotUncheckedUpdateManyWithoutDocNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutDocNestedInput
    comments?: CommentUncheckedUpdateManyWithoutDocNestedInput
  }

  export type PmDocCreateManyInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user_id: string
  }

  export type PmDocUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PmDocUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type PmDocSnapshotCreateInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc: PmDocCreateNestedOneWithoutSnapshotsInput
    before_snap_review?: ReviewCreateNestedOneWithoutBefore_snapshotInput
    after_snap_review?: ReviewCreateNestedOneWithoutAfter_snapshotInput
    comments?: CommentCreateNestedManyWithoutSnapshotInput
  }

  export type PmDocSnapshotUncheckedCreateInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc_id: string
    before_snap_review?: ReviewUncheckedCreateNestedOneWithoutBefore_snapshotInput
    after_snap_review?: ReviewUncheckedCreateNestedOneWithoutAfter_snapshotInput
    comments?: CommentUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type PmDocSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc?: PmDocUpdateOneRequiredWithoutSnapshotsNestedInput
    before_snap_review?: ReviewUpdateOneWithoutBefore_snapshotNestedInput
    after_snap_review?: ReviewUpdateOneWithoutAfter_snapshotNestedInput
    comments?: CommentUpdateManyWithoutSnapshotNestedInput
  }

  export type PmDocSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc_id?: StringFieldUpdateOperationsInput | string
    before_snap_review?: ReviewUncheckedUpdateOneWithoutBefore_snapshotNestedInput
    after_snap_review?: ReviewUncheckedUpdateOneWithoutAfter_snapshotNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type PmDocSnapshotCreateManyInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc_id: string
  }

  export type PmDocSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PmDocSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc_id?: StringFieldUpdateOperationsInput | string
  }

  export type CommentCreateInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user: UserCreateNestedOneWithoutCommentsInput
    doc: PmDocCreateNestedOneWithoutCommentsInput
    snapshot?: PmDocSnapshotCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_id: string
    doc_id: string
    snapshot_id?: string | null
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    doc?: PmDocUpdateOneRequiredWithoutCommentsNestedInput
    snapshot?: PmDocSnapshotUpdateOneWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    doc_id?: StringFieldUpdateOperationsInput | string
    snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentCreateManyInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_id: string
    doc_id: string
    snapshot_id?: string | null
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    doc_id?: StringFieldUpdateOperationsInput | string
    snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewCreateInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReviewsInput
    changes?: ReviewCreatechangesInput | Enumerable<string>
    doc: PmDocCreateNestedOneWithoutReviewsInput
    before_snapshot: PmDocSnapshotCreateNestedOneWithoutBefore_snap_reviewInput
    after_snapshot?: PmDocSnapshotCreateNestedOneWithoutAfter_snap_reviewInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    user_id: string
    changes?: ReviewCreatechangesInput | Enumerable<string>
    doc_id: string
    before_snapshot_id: string
    after_snapshot_id?: string | null
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    doc?: PmDocUpdateOneRequiredWithoutReviewsNestedInput
    before_snapshot?: PmDocSnapshotUpdateOneRequiredWithoutBefore_snap_reviewNestedInput
    after_snapshot?: PmDocSnapshotUpdateOneWithoutAfter_snap_reviewNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    doc_id?: StringFieldUpdateOperationsInput | string
    before_snapshot_id?: StringFieldUpdateOperationsInput | string
    after_snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewCreateManyInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    user_id: string
    changes?: ReviewCreatechangesInput | Enumerable<string>
    doc_id: string
    before_snapshot_id: string
    after_snapshot_id?: string | null
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changes?: ReviewUpdatechangesInput | Enumerable<string>
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    doc_id?: StringFieldUpdateOperationsInput | string
    before_snapshot_id?: StringFieldUpdateOperationsInput | string
    after_snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type EnumUserRoleFilter = {
    equals?: UserRole
    in?: Enumerable<UserRole>
    notIn?: Enumerable<UserRole>
    not?: NestedEnumUserRoleFilter | UserRole
  }

  export type PmDocListRelationFilter = {
    every?: PmDocWhereInput
    some?: PmDocWhereInput
    none?: PmDocWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type PmDocOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type EnumUserRoleWithAggregatesFilter = {
    equals?: UserRole
    in?: Enumerable<UserRole>
    notIn?: Enumerable<UserRole>
    not?: NestedEnumUserRoleWithAggregatesFilter | UserRole
    _count?: NestedIntFilter
    _min?: NestedEnumUserRoleFilter
    _max?: NestedEnumUserRoleFilter
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type EnumDocStatusFilter = {
    equals?: DocStatus
    in?: Enumerable<DocStatus>
    notIn?: Enumerable<DocStatus>
    not?: NestedEnumDocStatusFilter | DocStatus
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PmDocSnapshotListRelationFilter = {
    every?: PmDocSnapshotWhereInput
    some?: PmDocSnapshotWhereInput
    none?: PmDocSnapshotWhereInput
  }

  export type PmDocSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PmDocCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    doc?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user_id?: SortOrder
  }

  export type PmDocMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user_id?: SortOrder
  }

  export type PmDocMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user_id?: SortOrder
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }

  export type EnumDocStatusWithAggregatesFilter = {
    equals?: DocStatus
    in?: Enumerable<DocStatus>
    notIn?: Enumerable<DocStatus>
    not?: NestedEnumDocStatusWithAggregatesFilter | DocStatus
    _count?: NestedIntFilter
    _min?: NestedEnumDocStatusFilter
    _max?: NestedEnumDocStatusFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type PmDocRelationFilter = {
    is?: PmDocWhereInput
    isNot?: PmDocWhereInput
  }

  export type ReviewRelationFilter = {
    is?: ReviewWhereInput | null
    isNot?: ReviewWhereInput | null
  }

  export type PmDocSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
    doc_id?: SortOrder
  }

  export type PmDocSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    doc_id?: SortOrder
  }

  export type PmDocSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    doc_id?: SortOrder
  }

  export type PmDocSnapshotRelationFilter = {
    is?: PmDocSnapshotWhereInput | null
    isNot?: PmDocSnapshotWhereInput | null
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    target_id?: SortOrder
    user_id?: SortOrder
    doc_id?: SortOrder
    snapshot_id?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    target_id?: SortOrder
    user_id?: SortOrder
    doc_id?: SortOrder
    snapshot_id?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    target_id?: SortOrder
    user_id?: SortOrder
    doc_id?: SortOrder
    snapshot_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type EnumReviewStatusFilter = {
    equals?: ReviewStatus
    in?: Enumerable<ReviewStatus>
    notIn?: Enumerable<ReviewStatus>
    not?: NestedEnumReviewStatusFilter | ReviewStatus
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user_id?: SortOrder
    changes?: SortOrder
    doc_id?: SortOrder
    before_snapshot_id?: SortOrder
    after_snapshot_id?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user_id?: SortOrder
    doc_id?: SortOrder
    before_snapshot_id?: SortOrder
    after_snapshot_id?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user_id?: SortOrder
    doc_id?: SortOrder
    before_snapshot_id?: SortOrder
    after_snapshot_id?: SortOrder
  }

  export type EnumReviewStatusWithAggregatesFilter = {
    equals?: ReviewStatus
    in?: Enumerable<ReviewStatus>
    notIn?: Enumerable<ReviewStatus>
    not?: NestedEnumReviewStatusWithAggregatesFilter | ReviewStatus
    _count?: NestedIntFilter
    _min?: NestedEnumReviewStatusFilter
    _max?: NestedEnumReviewStatusFilter
  }

  export type PmDocCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PmDocCreateWithoutUserInput>, Enumerable<PmDocUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PmDocCreateOrConnectWithoutUserInput>
    createMany?: PmDocCreateManyUserInputEnvelope
    connect?: Enumerable<PmDocWhereUniqueInput>
  }

  export type ReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutUserInput>, Enumerable<ReviewUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutUserInput>
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type CommentCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CommentCreateWithoutUserInput>, Enumerable<CommentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutUserInput>
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type PmDocUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PmDocCreateWithoutUserInput>, Enumerable<PmDocUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PmDocCreateOrConnectWithoutUserInput>
    createMany?: PmDocCreateManyUserInputEnvelope
    connect?: Enumerable<PmDocWhereUniqueInput>
  }

  export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutUserInput>, Enumerable<ReviewUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutUserInput>
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type CommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<CommentCreateWithoutUserInput>, Enumerable<CommentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutUserInput>
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: UserRole
  }

  export type PmDocUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PmDocCreateWithoutUserInput>, Enumerable<PmDocUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PmDocCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PmDocUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PmDocCreateManyUserInputEnvelope
    set?: Enumerable<PmDocWhereUniqueInput>
    disconnect?: Enumerable<PmDocWhereUniqueInput>
    delete?: Enumerable<PmDocWhereUniqueInput>
    connect?: Enumerable<PmDocWhereUniqueInput>
    update?: Enumerable<PmDocUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PmDocUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PmDocScalarWhereInput>
  }

  export type ReviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutUserInput>, Enumerable<ReviewUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type CommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<CommentCreateWithoutUserInput>, Enumerable<CommentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CommentCreateManyUserInputEnvelope
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    connect?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type PmDocUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PmDocCreateWithoutUserInput>, Enumerable<PmDocUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PmDocCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PmDocUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PmDocCreateManyUserInputEnvelope
    set?: Enumerable<PmDocWhereUniqueInput>
    disconnect?: Enumerable<PmDocWhereUniqueInput>
    delete?: Enumerable<PmDocWhereUniqueInput>
    connect?: Enumerable<PmDocWhereUniqueInput>
    update?: Enumerable<PmDocUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PmDocUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PmDocScalarWhereInput>
  }

  export type ReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutUserInput>, Enumerable<ReviewUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type CommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<CommentCreateWithoutUserInput>, Enumerable<CommentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutUserInput>
    createMany?: CommentCreateManyUserInputEnvelope
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    connect?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutDocsInput = {
    create?: XOR<UserCreateWithoutDocsInput, UserUncheckedCreateWithoutDocsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocsInput
    connect?: UserWhereUniqueInput
  }

  export type PmDocSnapshotCreateNestedManyWithoutDocInput = {
    create?: XOR<Enumerable<PmDocSnapshotCreateWithoutDocInput>, Enumerable<PmDocSnapshotUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<PmDocSnapshotCreateOrConnectWithoutDocInput>
    createMany?: PmDocSnapshotCreateManyDocInputEnvelope
    connect?: Enumerable<PmDocSnapshotWhereUniqueInput>
  }

  export type ReviewCreateNestedManyWithoutDocInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutDocInput>, Enumerable<ReviewUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutDocInput>
    createMany?: ReviewCreateManyDocInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type CommentCreateNestedManyWithoutDocInput = {
    create?: XOR<Enumerable<CommentCreateWithoutDocInput>, Enumerable<CommentUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutDocInput>
    createMany?: CommentCreateManyDocInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type PmDocSnapshotUncheckedCreateNestedManyWithoutDocInput = {
    create?: XOR<Enumerable<PmDocSnapshotCreateWithoutDocInput>, Enumerable<PmDocSnapshotUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<PmDocSnapshotCreateOrConnectWithoutDocInput>
    createMany?: PmDocSnapshotCreateManyDocInputEnvelope
    connect?: Enumerable<PmDocSnapshotWhereUniqueInput>
  }

  export type ReviewUncheckedCreateNestedManyWithoutDocInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutDocInput>, Enumerable<ReviewUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutDocInput>
    createMany?: ReviewCreateManyDocInputEnvelope
    connect?: Enumerable<ReviewWhereUniqueInput>
  }

  export type CommentUncheckedCreateNestedManyWithoutDocInput = {
    create?: XOR<Enumerable<CommentCreateWithoutDocInput>, Enumerable<CommentUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutDocInput>
    createMany?: CommentCreateManyDocInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type EnumDocStatusFieldUpdateOperationsInput = {
    set?: DocStatus
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutDocsNestedInput = {
    create?: XOR<UserCreateWithoutDocsInput, UserUncheckedCreateWithoutDocsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocsInput
    upsert?: UserUpsertWithoutDocsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutDocsInput, UserUncheckedUpdateWithoutDocsInput>
  }

  export type PmDocSnapshotUpdateManyWithoutDocNestedInput = {
    create?: XOR<Enumerable<PmDocSnapshotCreateWithoutDocInput>, Enumerable<PmDocSnapshotUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<PmDocSnapshotCreateOrConnectWithoutDocInput>
    upsert?: Enumerable<PmDocSnapshotUpsertWithWhereUniqueWithoutDocInput>
    createMany?: PmDocSnapshotCreateManyDocInputEnvelope
    set?: Enumerable<PmDocSnapshotWhereUniqueInput>
    disconnect?: Enumerable<PmDocSnapshotWhereUniqueInput>
    delete?: Enumerable<PmDocSnapshotWhereUniqueInput>
    connect?: Enumerable<PmDocSnapshotWhereUniqueInput>
    update?: Enumerable<PmDocSnapshotUpdateWithWhereUniqueWithoutDocInput>
    updateMany?: Enumerable<PmDocSnapshotUpdateManyWithWhereWithoutDocInput>
    deleteMany?: Enumerable<PmDocSnapshotScalarWhereInput>
  }

  export type ReviewUpdateManyWithoutDocNestedInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutDocInput>, Enumerable<ReviewUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutDocInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutDocInput>
    createMany?: ReviewCreateManyDocInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutDocInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutDocInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type CommentUpdateManyWithoutDocNestedInput = {
    create?: XOR<Enumerable<CommentCreateWithoutDocInput>, Enumerable<CommentUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutDocInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutDocInput>
    createMany?: CommentCreateManyDocInputEnvelope
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    connect?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutDocInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutDocInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type PmDocSnapshotUncheckedUpdateManyWithoutDocNestedInput = {
    create?: XOR<Enumerable<PmDocSnapshotCreateWithoutDocInput>, Enumerable<PmDocSnapshotUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<PmDocSnapshotCreateOrConnectWithoutDocInput>
    upsert?: Enumerable<PmDocSnapshotUpsertWithWhereUniqueWithoutDocInput>
    createMany?: PmDocSnapshotCreateManyDocInputEnvelope
    set?: Enumerable<PmDocSnapshotWhereUniqueInput>
    disconnect?: Enumerable<PmDocSnapshotWhereUniqueInput>
    delete?: Enumerable<PmDocSnapshotWhereUniqueInput>
    connect?: Enumerable<PmDocSnapshotWhereUniqueInput>
    update?: Enumerable<PmDocSnapshotUpdateWithWhereUniqueWithoutDocInput>
    updateMany?: Enumerable<PmDocSnapshotUpdateManyWithWhereWithoutDocInput>
    deleteMany?: Enumerable<PmDocSnapshotScalarWhereInput>
  }

  export type ReviewUncheckedUpdateManyWithoutDocNestedInput = {
    create?: XOR<Enumerable<ReviewCreateWithoutDocInput>, Enumerable<ReviewUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ReviewCreateOrConnectWithoutDocInput>
    upsert?: Enumerable<ReviewUpsertWithWhereUniqueWithoutDocInput>
    createMany?: ReviewCreateManyDocInputEnvelope
    set?: Enumerable<ReviewWhereUniqueInput>
    disconnect?: Enumerable<ReviewWhereUniqueInput>
    delete?: Enumerable<ReviewWhereUniqueInput>
    connect?: Enumerable<ReviewWhereUniqueInput>
    update?: Enumerable<ReviewUpdateWithWhereUniqueWithoutDocInput>
    updateMany?: Enumerable<ReviewUpdateManyWithWhereWithoutDocInput>
    deleteMany?: Enumerable<ReviewScalarWhereInput>
  }

  export type CommentUncheckedUpdateManyWithoutDocNestedInput = {
    create?: XOR<Enumerable<CommentCreateWithoutDocInput>, Enumerable<CommentUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutDocInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutDocInput>
    createMany?: CommentCreateManyDocInputEnvelope
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    connect?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutDocInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutDocInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type PmDocCreateNestedOneWithoutSnapshotsInput = {
    create?: XOR<PmDocCreateWithoutSnapshotsInput, PmDocUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: PmDocCreateOrConnectWithoutSnapshotsInput
    connect?: PmDocWhereUniqueInput
  }

  export type ReviewCreateNestedOneWithoutBefore_snapshotInput = {
    create?: XOR<ReviewCreateWithoutBefore_snapshotInput, ReviewUncheckedCreateWithoutBefore_snapshotInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBefore_snapshotInput
    connect?: ReviewWhereUniqueInput
  }

  export type ReviewCreateNestedOneWithoutAfter_snapshotInput = {
    create?: XOR<ReviewCreateWithoutAfter_snapshotInput, ReviewUncheckedCreateWithoutAfter_snapshotInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutAfter_snapshotInput
    connect?: ReviewWhereUniqueInput
  }

  export type CommentCreateNestedManyWithoutSnapshotInput = {
    create?: XOR<Enumerable<CommentCreateWithoutSnapshotInput>, Enumerable<CommentUncheckedCreateWithoutSnapshotInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutSnapshotInput>
    createMany?: CommentCreateManySnapshotInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type ReviewUncheckedCreateNestedOneWithoutBefore_snapshotInput = {
    create?: XOR<ReviewCreateWithoutBefore_snapshotInput, ReviewUncheckedCreateWithoutBefore_snapshotInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBefore_snapshotInput
    connect?: ReviewWhereUniqueInput
  }

  export type ReviewUncheckedCreateNestedOneWithoutAfter_snapshotInput = {
    create?: XOR<ReviewCreateWithoutAfter_snapshotInput, ReviewUncheckedCreateWithoutAfter_snapshotInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutAfter_snapshotInput
    connect?: ReviewWhereUniqueInput
  }

  export type CommentUncheckedCreateNestedManyWithoutSnapshotInput = {
    create?: XOR<Enumerable<CommentCreateWithoutSnapshotInput>, Enumerable<CommentUncheckedCreateWithoutSnapshotInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutSnapshotInput>
    createMany?: CommentCreateManySnapshotInputEnvelope
    connect?: Enumerable<CommentWhereUniqueInput>
  }

  export type PmDocUpdateOneRequiredWithoutSnapshotsNestedInput = {
    create?: XOR<PmDocCreateWithoutSnapshotsInput, PmDocUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: PmDocCreateOrConnectWithoutSnapshotsInput
    upsert?: PmDocUpsertWithoutSnapshotsInput
    connect?: PmDocWhereUniqueInput
    update?: XOR<PmDocUpdateWithoutSnapshotsInput, PmDocUncheckedUpdateWithoutSnapshotsInput>
  }

  export type ReviewUpdateOneWithoutBefore_snapshotNestedInput = {
    create?: XOR<ReviewCreateWithoutBefore_snapshotInput, ReviewUncheckedCreateWithoutBefore_snapshotInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBefore_snapshotInput
    upsert?: ReviewUpsertWithoutBefore_snapshotInput
    disconnect?: boolean
    delete?: boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<ReviewUpdateWithoutBefore_snapshotInput, ReviewUncheckedUpdateWithoutBefore_snapshotInput>
  }

  export type ReviewUpdateOneWithoutAfter_snapshotNestedInput = {
    create?: XOR<ReviewCreateWithoutAfter_snapshotInput, ReviewUncheckedCreateWithoutAfter_snapshotInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutAfter_snapshotInput
    upsert?: ReviewUpsertWithoutAfter_snapshotInput
    disconnect?: boolean
    delete?: boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<ReviewUpdateWithoutAfter_snapshotInput, ReviewUncheckedUpdateWithoutAfter_snapshotInput>
  }

  export type CommentUpdateManyWithoutSnapshotNestedInput = {
    create?: XOR<Enumerable<CommentCreateWithoutSnapshotInput>, Enumerable<CommentUncheckedCreateWithoutSnapshotInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutSnapshotInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutSnapshotInput>
    createMany?: CommentCreateManySnapshotInputEnvelope
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    connect?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutSnapshotInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutSnapshotInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type ReviewUncheckedUpdateOneWithoutBefore_snapshotNestedInput = {
    create?: XOR<ReviewCreateWithoutBefore_snapshotInput, ReviewUncheckedCreateWithoutBefore_snapshotInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutBefore_snapshotInput
    upsert?: ReviewUpsertWithoutBefore_snapshotInput
    disconnect?: boolean
    delete?: boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<ReviewUpdateWithoutBefore_snapshotInput, ReviewUncheckedUpdateWithoutBefore_snapshotInput>
  }

  export type ReviewUncheckedUpdateOneWithoutAfter_snapshotNestedInput = {
    create?: XOR<ReviewCreateWithoutAfter_snapshotInput, ReviewUncheckedCreateWithoutAfter_snapshotInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutAfter_snapshotInput
    upsert?: ReviewUpsertWithoutAfter_snapshotInput
    disconnect?: boolean
    delete?: boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<ReviewUpdateWithoutAfter_snapshotInput, ReviewUncheckedUpdateWithoutAfter_snapshotInput>
  }

  export type CommentUncheckedUpdateManyWithoutSnapshotNestedInput = {
    create?: XOR<Enumerable<CommentCreateWithoutSnapshotInput>, Enumerable<CommentUncheckedCreateWithoutSnapshotInput>>
    connectOrCreate?: Enumerable<CommentCreateOrConnectWithoutSnapshotInput>
    upsert?: Enumerable<CommentUpsertWithWhereUniqueWithoutSnapshotInput>
    createMany?: CommentCreateManySnapshotInputEnvelope
    set?: Enumerable<CommentWhereUniqueInput>
    disconnect?: Enumerable<CommentWhereUniqueInput>
    delete?: Enumerable<CommentWhereUniqueInput>
    connect?: Enumerable<CommentWhereUniqueInput>
    update?: Enumerable<CommentUpdateWithWhereUniqueWithoutSnapshotInput>
    updateMany?: Enumerable<CommentUpdateManyWithWhereWithoutSnapshotInput>
    deleteMany?: Enumerable<CommentScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type PmDocCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PmDocCreateWithoutCommentsInput, PmDocUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PmDocCreateOrConnectWithoutCommentsInput
    connect?: PmDocWhereUniqueInput
  }

  export type PmDocSnapshotCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PmDocSnapshotCreateWithoutCommentsInput, PmDocSnapshotUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PmDocSnapshotCreateOrConnectWithoutCommentsInput
    connect?: PmDocSnapshotWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type PmDocUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<PmDocCreateWithoutCommentsInput, PmDocUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PmDocCreateOrConnectWithoutCommentsInput
    upsert?: PmDocUpsertWithoutCommentsInput
    connect?: PmDocWhereUniqueInput
    update?: XOR<PmDocUpdateWithoutCommentsInput, PmDocUncheckedUpdateWithoutCommentsInput>
  }

  export type PmDocSnapshotUpdateOneWithoutCommentsNestedInput = {
    create?: XOR<PmDocSnapshotCreateWithoutCommentsInput, PmDocSnapshotUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PmDocSnapshotCreateOrConnectWithoutCommentsInput
    upsert?: PmDocSnapshotUpsertWithoutCommentsInput
    disconnect?: boolean
    delete?: boolean
    connect?: PmDocSnapshotWhereUniqueInput
    update?: XOR<PmDocSnapshotUpdateWithoutCommentsInput, PmDocSnapshotUncheckedUpdateWithoutCommentsInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type ReviewCreatechangesInput = {
    set: Enumerable<string>
  }

  export type PmDocCreateNestedOneWithoutReviewsInput = {
    create?: XOR<PmDocCreateWithoutReviewsInput, PmDocUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: PmDocCreateOrConnectWithoutReviewsInput
    connect?: PmDocWhereUniqueInput
  }

  export type PmDocSnapshotCreateNestedOneWithoutBefore_snap_reviewInput = {
    create?: XOR<PmDocSnapshotCreateWithoutBefore_snap_reviewInput, PmDocSnapshotUncheckedCreateWithoutBefore_snap_reviewInput>
    connectOrCreate?: PmDocSnapshotCreateOrConnectWithoutBefore_snap_reviewInput
    connect?: PmDocSnapshotWhereUniqueInput
  }

  export type PmDocSnapshotCreateNestedOneWithoutAfter_snap_reviewInput = {
    create?: XOR<PmDocSnapshotCreateWithoutAfter_snap_reviewInput, PmDocSnapshotUncheckedCreateWithoutAfter_snap_reviewInput>
    connectOrCreate?: PmDocSnapshotCreateOrConnectWithoutAfter_snap_reviewInput
    connect?: PmDocSnapshotWhereUniqueInput
  }

  export type EnumReviewStatusFieldUpdateOperationsInput = {
    set?: ReviewStatus
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type ReviewUpdatechangesInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type PmDocUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<PmDocCreateWithoutReviewsInput, PmDocUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: PmDocCreateOrConnectWithoutReviewsInput
    upsert?: PmDocUpsertWithoutReviewsInput
    connect?: PmDocWhereUniqueInput
    update?: XOR<PmDocUpdateWithoutReviewsInput, PmDocUncheckedUpdateWithoutReviewsInput>
  }

  export type PmDocSnapshotUpdateOneRequiredWithoutBefore_snap_reviewNestedInput = {
    create?: XOR<PmDocSnapshotCreateWithoutBefore_snap_reviewInput, PmDocSnapshotUncheckedCreateWithoutBefore_snap_reviewInput>
    connectOrCreate?: PmDocSnapshotCreateOrConnectWithoutBefore_snap_reviewInput
    upsert?: PmDocSnapshotUpsertWithoutBefore_snap_reviewInput
    connect?: PmDocSnapshotWhereUniqueInput
    update?: XOR<PmDocSnapshotUpdateWithoutBefore_snap_reviewInput, PmDocSnapshotUncheckedUpdateWithoutBefore_snap_reviewInput>
  }

  export type PmDocSnapshotUpdateOneWithoutAfter_snap_reviewNestedInput = {
    create?: XOR<PmDocSnapshotCreateWithoutAfter_snap_reviewInput, PmDocSnapshotUncheckedCreateWithoutAfter_snap_reviewInput>
    connectOrCreate?: PmDocSnapshotCreateOrConnectWithoutAfter_snap_reviewInput
    upsert?: PmDocSnapshotUpsertWithoutAfter_snap_reviewInput
    disconnect?: boolean
    delete?: boolean
    connect?: PmDocSnapshotWhereUniqueInput
    update?: XOR<PmDocSnapshotUpdateWithoutAfter_snap_reviewInput, PmDocSnapshotUncheckedUpdateWithoutAfter_snap_reviewInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedEnumUserRoleFilter = {
    equals?: UserRole
    in?: Enumerable<UserRole>
    notIn?: Enumerable<UserRole>
    not?: NestedEnumUserRoleFilter | UserRole
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter = {
    equals?: UserRole
    in?: Enumerable<UserRole>
    notIn?: Enumerable<UserRole>
    not?: NestedEnumUserRoleWithAggregatesFilter | UserRole
    _count?: NestedIntFilter
    _min?: NestedEnumUserRoleFilter
    _max?: NestedEnumUserRoleFilter
  }

  export type NestedEnumDocStatusFilter = {
    equals?: DocStatus
    in?: Enumerable<DocStatus>
    notIn?: Enumerable<DocStatus>
    not?: NestedEnumDocStatusFilter | DocStatus
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type NestedEnumDocStatusWithAggregatesFilter = {
    equals?: DocStatus
    in?: Enumerable<DocStatus>
    notIn?: Enumerable<DocStatus>
    not?: NestedEnumDocStatusWithAggregatesFilter | DocStatus
    _count?: NestedIntFilter
    _min?: NestedEnumDocStatusFilter
    _max?: NestedEnumDocStatusFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedEnumReviewStatusFilter = {
    equals?: ReviewStatus
    in?: Enumerable<ReviewStatus>
    notIn?: Enumerable<ReviewStatus>
    not?: NestedEnumReviewStatusFilter | ReviewStatus
  }

  export type NestedEnumReviewStatusWithAggregatesFilter = {
    equals?: ReviewStatus
    in?: Enumerable<ReviewStatus>
    notIn?: Enumerable<ReviewStatus>
    not?: NestedEnumReviewStatusWithAggregatesFilter | ReviewStatus
    _count?: NestedIntFilter
    _min?: NestedEnumReviewStatusFilter
    _max?: NestedEnumReviewStatusFilter
  }

  export type PmDocCreateWithoutUserInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    snapshots?: PmDocSnapshotCreateNestedManyWithoutDocInput
    reviews?: ReviewCreateNestedManyWithoutDocInput
    comments?: CommentCreateNestedManyWithoutDocInput
  }

  export type PmDocUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    snapshots?: PmDocSnapshotUncheckedCreateNestedManyWithoutDocInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutDocInput
    comments?: CommentUncheckedCreateNestedManyWithoutDocInput
  }

  export type PmDocCreateOrConnectWithoutUserInput = {
    where: PmDocWhereUniqueInput
    create: XOR<PmDocCreateWithoutUserInput, PmDocUncheckedCreateWithoutUserInput>
  }

  export type PmDocCreateManyUserInputEnvelope = {
    data: Enumerable<PmDocCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutUserInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    changes?: ReviewCreatechangesInput | Enumerable<string>
    doc: PmDocCreateNestedOneWithoutReviewsInput
    before_snapshot: PmDocSnapshotCreateNestedOneWithoutBefore_snap_reviewInput
    after_snapshot?: PmDocSnapshotCreateNestedOneWithoutAfter_snap_reviewInput
  }

  export type ReviewUncheckedCreateWithoutUserInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    changes?: ReviewCreatechangesInput | Enumerable<string>
    doc_id: string
    before_snapshot_id: string
    after_snapshot_id?: string | null
  }

  export type ReviewCreateOrConnectWithoutUserInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewCreateManyUserInputEnvelope = {
    data: Enumerable<ReviewCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutUserInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    doc: PmDocCreateNestedOneWithoutCommentsInput
    snapshot?: PmDocSnapshotCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutUserInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    doc_id: string
    snapshot_id?: string | null
  }

  export type CommentCreateOrConnectWithoutUserInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentCreateManyUserInputEnvelope = {
    data: Enumerable<CommentCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type PmDocUpsertWithWhereUniqueWithoutUserInput = {
    where: PmDocWhereUniqueInput
    update: XOR<PmDocUpdateWithoutUserInput, PmDocUncheckedUpdateWithoutUserInput>
    create: XOR<PmDocCreateWithoutUserInput, PmDocUncheckedCreateWithoutUserInput>
  }

  export type PmDocUpdateWithWhereUniqueWithoutUserInput = {
    where: PmDocWhereUniqueInput
    data: XOR<PmDocUpdateWithoutUserInput, PmDocUncheckedUpdateWithoutUserInput>
  }

  export type PmDocUpdateManyWithWhereWithoutUserInput = {
    where: PmDocScalarWhereInput
    data: XOR<PmDocUpdateManyMutationInput, PmDocUncheckedUpdateManyWithoutDocsInput>
  }

  export type PmDocScalarWhereInput = {
    AND?: Enumerable<PmDocScalarWhereInput>
    OR?: Enumerable<PmDocScalarWhereInput>
    NOT?: Enumerable<PmDocScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    doc?: JsonFilter
    status?: EnumDocStatusFilter | DocStatus
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    user_id?: StringFilter | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutReviewsInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: Enumerable<ReviewScalarWhereInput>
    OR?: Enumerable<ReviewScalarWhereInput>
    NOT?: Enumerable<ReviewScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    status?: EnumReviewStatusFilter | ReviewStatus
    createdAt?: DateTimeFilter | Date | string
    user_id?: StringFilter | string
    changes?: StringNullableListFilter
    doc_id?: StringFilter | string
    before_snapshot_id?: StringFilter | string
    after_snapshot_id?: StringNullableFilter | string | null
  }

  export type CommentUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
  }

  export type CommentUpdateManyWithWhereWithoutUserInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutCommentsInput>
  }

  export type CommentScalarWhereInput = {
    AND?: Enumerable<CommentScalarWhereInput>
    OR?: Enumerable<CommentScalarWhereInput>
    NOT?: Enumerable<CommentScalarWhereInput>
    id?: StringFilter | string
    body?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    target_id?: StringFilter | string
    user_id?: StringFilter | string
    doc_id?: StringFilter | string
    snapshot_id?: StringNullableFilter | string | null
  }

  export type UserCreateWithoutDocsInput = {
    id?: string
    email: string
    firstname: string
    lastname: string
    password: string
    role?: UserRole
    reviews?: ReviewCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDocsInput = {
    id?: string
    email: string
    firstname: string
    lastname: string
    password: string
    role?: UserRole
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDocsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocsInput, UserUncheckedCreateWithoutDocsInput>
  }

  export type PmDocSnapshotCreateWithoutDocInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    before_snap_review?: ReviewCreateNestedOneWithoutBefore_snapshotInput
    after_snap_review?: ReviewCreateNestedOneWithoutAfter_snapshotInput
    comments?: CommentCreateNestedManyWithoutSnapshotInput
  }

  export type PmDocSnapshotUncheckedCreateWithoutDocInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    before_snap_review?: ReviewUncheckedCreateNestedOneWithoutBefore_snapshotInput
    after_snap_review?: ReviewUncheckedCreateNestedOneWithoutAfter_snapshotInput
    comments?: CommentUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type PmDocSnapshotCreateOrConnectWithoutDocInput = {
    where: PmDocSnapshotWhereUniqueInput
    create: XOR<PmDocSnapshotCreateWithoutDocInput, PmDocSnapshotUncheckedCreateWithoutDocInput>
  }

  export type PmDocSnapshotCreateManyDocInputEnvelope = {
    data: Enumerable<PmDocSnapshotCreateManyDocInput>
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutDocInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReviewsInput
    changes?: ReviewCreatechangesInput | Enumerable<string>
    before_snapshot: PmDocSnapshotCreateNestedOneWithoutBefore_snap_reviewInput
    after_snapshot?: PmDocSnapshotCreateNestedOneWithoutAfter_snap_reviewInput
  }

  export type ReviewUncheckedCreateWithoutDocInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    user_id: string
    changes?: ReviewCreatechangesInput | Enumerable<string>
    before_snapshot_id: string
    after_snapshot_id?: string | null
  }

  export type ReviewCreateOrConnectWithoutDocInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutDocInput, ReviewUncheckedCreateWithoutDocInput>
  }

  export type ReviewCreateManyDocInputEnvelope = {
    data: Enumerable<ReviewCreateManyDocInput>
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutDocInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user: UserCreateNestedOneWithoutCommentsInput
    snapshot?: PmDocSnapshotCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutDocInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_id: string
    snapshot_id?: string | null
  }

  export type CommentCreateOrConnectWithoutDocInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutDocInput, CommentUncheckedCreateWithoutDocInput>
  }

  export type CommentCreateManyDocInputEnvelope = {
    data: Enumerable<CommentCreateManyDocInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDocsInput = {
    update: XOR<UserUpdateWithoutDocsInput, UserUncheckedUpdateWithoutDocsInput>
    create: XOR<UserCreateWithoutDocsInput, UserUncheckedCreateWithoutDocsInput>
  }

  export type UserUpdateWithoutDocsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDocsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PmDocSnapshotUpsertWithWhereUniqueWithoutDocInput = {
    where: PmDocSnapshotWhereUniqueInput
    update: XOR<PmDocSnapshotUpdateWithoutDocInput, PmDocSnapshotUncheckedUpdateWithoutDocInput>
    create: XOR<PmDocSnapshotCreateWithoutDocInput, PmDocSnapshotUncheckedCreateWithoutDocInput>
  }

  export type PmDocSnapshotUpdateWithWhereUniqueWithoutDocInput = {
    where: PmDocSnapshotWhereUniqueInput
    data: XOR<PmDocSnapshotUpdateWithoutDocInput, PmDocSnapshotUncheckedUpdateWithoutDocInput>
  }

  export type PmDocSnapshotUpdateManyWithWhereWithoutDocInput = {
    where: PmDocSnapshotScalarWhereInput
    data: XOR<PmDocSnapshotUpdateManyMutationInput, PmDocSnapshotUncheckedUpdateManyWithoutSnapshotsInput>
  }

  export type PmDocSnapshotScalarWhereInput = {
    AND?: Enumerable<PmDocSnapshotScalarWhereInput>
    OR?: Enumerable<PmDocSnapshotScalarWhereInput>
    NOT?: Enumerable<PmDocSnapshotScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    snapshot?: JsonFilter
    createdAt?: DateTimeFilter | Date | string
    doc_id?: StringFilter | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutDocInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutDocInput, ReviewUncheckedUpdateWithoutDocInput>
    create: XOR<ReviewCreateWithoutDocInput, ReviewUncheckedCreateWithoutDocInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutDocInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutDocInput, ReviewUncheckedUpdateWithoutDocInput>
  }

  export type ReviewUpdateManyWithWhereWithoutDocInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutReviewsInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutDocInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutDocInput, CommentUncheckedUpdateWithoutDocInput>
    create: XOR<CommentCreateWithoutDocInput, CommentUncheckedCreateWithoutDocInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutDocInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutDocInput, CommentUncheckedUpdateWithoutDocInput>
  }

  export type CommentUpdateManyWithWhereWithoutDocInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutCommentsInput>
  }

  export type PmDocCreateWithoutSnapshotsInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDocsInput
    reviews?: ReviewCreateNestedManyWithoutDocInput
    comments?: CommentCreateNestedManyWithoutDocInput
  }

  export type PmDocUncheckedCreateWithoutSnapshotsInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user_id: string
    reviews?: ReviewUncheckedCreateNestedManyWithoutDocInput
    comments?: CommentUncheckedCreateNestedManyWithoutDocInput
  }

  export type PmDocCreateOrConnectWithoutSnapshotsInput = {
    where: PmDocWhereUniqueInput
    create: XOR<PmDocCreateWithoutSnapshotsInput, PmDocUncheckedCreateWithoutSnapshotsInput>
  }

  export type ReviewCreateWithoutBefore_snapshotInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReviewsInput
    changes?: ReviewCreatechangesInput | Enumerable<string>
    doc: PmDocCreateNestedOneWithoutReviewsInput
    after_snapshot?: PmDocSnapshotCreateNestedOneWithoutAfter_snap_reviewInput
  }

  export type ReviewUncheckedCreateWithoutBefore_snapshotInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    user_id: string
    changes?: ReviewCreatechangesInput | Enumerable<string>
    doc_id: string
    after_snapshot_id?: string | null
  }

  export type ReviewCreateOrConnectWithoutBefore_snapshotInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutBefore_snapshotInput, ReviewUncheckedCreateWithoutBefore_snapshotInput>
  }

  export type ReviewCreateWithoutAfter_snapshotInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReviewsInput
    changes?: ReviewCreatechangesInput | Enumerable<string>
    doc: PmDocCreateNestedOneWithoutReviewsInput
    before_snapshot: PmDocSnapshotCreateNestedOneWithoutBefore_snap_reviewInput
  }

  export type ReviewUncheckedCreateWithoutAfter_snapshotInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    user_id: string
    changes?: ReviewCreatechangesInput | Enumerable<string>
    doc_id: string
    before_snapshot_id: string
  }

  export type ReviewCreateOrConnectWithoutAfter_snapshotInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutAfter_snapshotInput, ReviewUncheckedCreateWithoutAfter_snapshotInput>
  }

  export type CommentCreateWithoutSnapshotInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user: UserCreateNestedOneWithoutCommentsInput
    doc: PmDocCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutSnapshotInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_id: string
    doc_id: string
  }

  export type CommentCreateOrConnectWithoutSnapshotInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutSnapshotInput, CommentUncheckedCreateWithoutSnapshotInput>
  }

  export type CommentCreateManySnapshotInputEnvelope = {
    data: Enumerable<CommentCreateManySnapshotInput>
    skipDuplicates?: boolean
  }

  export type PmDocUpsertWithoutSnapshotsInput = {
    update: XOR<PmDocUpdateWithoutSnapshotsInput, PmDocUncheckedUpdateWithoutSnapshotsInput>
    create: XOR<PmDocCreateWithoutSnapshotsInput, PmDocUncheckedCreateWithoutSnapshotsInput>
  }

  export type PmDocUpdateWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDocsNestedInput
    reviews?: ReviewUpdateManyWithoutDocNestedInput
    comments?: CommentUpdateManyWithoutDocNestedInput
  }

  export type PmDocUncheckedUpdateWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    reviews?: ReviewUncheckedUpdateManyWithoutDocNestedInput
    comments?: CommentUncheckedUpdateManyWithoutDocNestedInput
  }

  export type ReviewUpsertWithoutBefore_snapshotInput = {
    update: XOR<ReviewUpdateWithoutBefore_snapshotInput, ReviewUncheckedUpdateWithoutBefore_snapshotInput>
    create: XOR<ReviewCreateWithoutBefore_snapshotInput, ReviewUncheckedCreateWithoutBefore_snapshotInput>
  }

  export type ReviewUpdateWithoutBefore_snapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    doc?: PmDocUpdateOneRequiredWithoutReviewsNestedInput
    after_snapshot?: PmDocSnapshotUpdateOneWithoutAfter_snap_reviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutBefore_snapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    doc_id?: StringFieldUpdateOperationsInput | string
    after_snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUpsertWithoutAfter_snapshotInput = {
    update: XOR<ReviewUpdateWithoutAfter_snapshotInput, ReviewUncheckedUpdateWithoutAfter_snapshotInput>
    create: XOR<ReviewCreateWithoutAfter_snapshotInput, ReviewUncheckedCreateWithoutAfter_snapshotInput>
  }

  export type ReviewUpdateWithoutAfter_snapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    doc?: PmDocUpdateOneRequiredWithoutReviewsNestedInput
    before_snapshot?: PmDocSnapshotUpdateOneRequiredWithoutBefore_snap_reviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutAfter_snapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    doc_id?: StringFieldUpdateOperationsInput | string
    before_snapshot_id?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUpsertWithWhereUniqueWithoutSnapshotInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutSnapshotInput, CommentUncheckedUpdateWithoutSnapshotInput>
    create: XOR<CommentCreateWithoutSnapshotInput, CommentUncheckedCreateWithoutSnapshotInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutSnapshotInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutSnapshotInput, CommentUncheckedUpdateWithoutSnapshotInput>
  }

  export type CommentUpdateManyWithWhereWithoutSnapshotInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutCommentsInput>
  }

  export type UserCreateWithoutCommentsInput = {
    id?: string
    email: string
    firstname: string
    lastname: string
    password: string
    role?: UserRole
    docs?: PmDocCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string
    email: string
    firstname: string
    lastname: string
    password: string
    role?: UserRole
    docs?: PmDocUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type PmDocCreateWithoutCommentsInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDocsInput
    snapshots?: PmDocSnapshotCreateNestedManyWithoutDocInput
    reviews?: ReviewCreateNestedManyWithoutDocInput
  }

  export type PmDocUncheckedCreateWithoutCommentsInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user_id: string
    snapshots?: PmDocSnapshotUncheckedCreateNestedManyWithoutDocInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutDocInput
  }

  export type PmDocCreateOrConnectWithoutCommentsInput = {
    where: PmDocWhereUniqueInput
    create: XOR<PmDocCreateWithoutCommentsInput, PmDocUncheckedCreateWithoutCommentsInput>
  }

  export type PmDocSnapshotCreateWithoutCommentsInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc: PmDocCreateNestedOneWithoutSnapshotsInput
    before_snap_review?: ReviewCreateNestedOneWithoutBefore_snapshotInput
    after_snap_review?: ReviewCreateNestedOneWithoutAfter_snapshotInput
  }

  export type PmDocSnapshotUncheckedCreateWithoutCommentsInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc_id: string
    before_snap_review?: ReviewUncheckedCreateNestedOneWithoutBefore_snapshotInput
    after_snap_review?: ReviewUncheckedCreateNestedOneWithoutAfter_snapshotInput
  }

  export type PmDocSnapshotCreateOrConnectWithoutCommentsInput = {
    where: PmDocSnapshotWhereUniqueInput
    create: XOR<PmDocSnapshotCreateWithoutCommentsInput, PmDocSnapshotUncheckedCreateWithoutCommentsInput>
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    docs?: PmDocUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    docs?: PmDocUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PmDocUpsertWithoutCommentsInput = {
    update: XOR<PmDocUpdateWithoutCommentsInput, PmDocUncheckedUpdateWithoutCommentsInput>
    create: XOR<PmDocCreateWithoutCommentsInput, PmDocUncheckedCreateWithoutCommentsInput>
  }

  export type PmDocUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDocsNestedInput
    snapshots?: PmDocSnapshotUpdateManyWithoutDocNestedInput
    reviews?: ReviewUpdateManyWithoutDocNestedInput
  }

  export type PmDocUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    snapshots?: PmDocSnapshotUncheckedUpdateManyWithoutDocNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutDocNestedInput
  }

  export type PmDocSnapshotUpsertWithoutCommentsInput = {
    update: XOR<PmDocSnapshotUpdateWithoutCommentsInput, PmDocSnapshotUncheckedUpdateWithoutCommentsInput>
    create: XOR<PmDocSnapshotCreateWithoutCommentsInput, PmDocSnapshotUncheckedCreateWithoutCommentsInput>
  }

  export type PmDocSnapshotUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc?: PmDocUpdateOneRequiredWithoutSnapshotsNestedInput
    before_snap_review?: ReviewUpdateOneWithoutBefore_snapshotNestedInput
    after_snap_review?: ReviewUpdateOneWithoutAfter_snapshotNestedInput
  }

  export type PmDocSnapshotUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc_id?: StringFieldUpdateOperationsInput | string
    before_snap_review?: ReviewUncheckedUpdateOneWithoutBefore_snapshotNestedInput
    after_snap_review?: ReviewUncheckedUpdateOneWithoutAfter_snapshotNestedInput
  }

  export type UserCreateWithoutReviewsInput = {
    id?: string
    email: string
    firstname: string
    lastname: string
    password: string
    role?: UserRole
    docs?: PmDocCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string
    email: string
    firstname: string
    lastname: string
    password: string
    role?: UserRole
    docs?: PmDocUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type PmDocCreateWithoutReviewsInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDocsInput
    snapshots?: PmDocSnapshotCreateNestedManyWithoutDocInput
    comments?: CommentCreateNestedManyWithoutDocInput
  }

  export type PmDocUncheckedCreateWithoutReviewsInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user_id: string
    snapshots?: PmDocSnapshotUncheckedCreateNestedManyWithoutDocInput
    comments?: CommentUncheckedCreateNestedManyWithoutDocInput
  }

  export type PmDocCreateOrConnectWithoutReviewsInput = {
    where: PmDocWhereUniqueInput
    create: XOR<PmDocCreateWithoutReviewsInput, PmDocUncheckedCreateWithoutReviewsInput>
  }

  export type PmDocSnapshotCreateWithoutBefore_snap_reviewInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc: PmDocCreateNestedOneWithoutSnapshotsInput
    after_snap_review?: ReviewCreateNestedOneWithoutAfter_snapshotInput
    comments?: CommentCreateNestedManyWithoutSnapshotInput
  }

  export type PmDocSnapshotUncheckedCreateWithoutBefore_snap_reviewInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc_id: string
    after_snap_review?: ReviewUncheckedCreateNestedOneWithoutAfter_snapshotInput
    comments?: CommentUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type PmDocSnapshotCreateOrConnectWithoutBefore_snap_reviewInput = {
    where: PmDocSnapshotWhereUniqueInput
    create: XOR<PmDocSnapshotCreateWithoutBefore_snap_reviewInput, PmDocSnapshotUncheckedCreateWithoutBefore_snap_reviewInput>
  }

  export type PmDocSnapshotCreateWithoutAfter_snap_reviewInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc: PmDocCreateNestedOneWithoutSnapshotsInput
    before_snap_review?: ReviewCreateNestedOneWithoutBefore_snapshotInput
    comments?: CommentCreateNestedManyWithoutSnapshotInput
  }

  export type PmDocSnapshotUncheckedCreateWithoutAfter_snap_reviewInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc_id: string
    before_snap_review?: ReviewUncheckedCreateNestedOneWithoutBefore_snapshotInput
    comments?: CommentUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type PmDocSnapshotCreateOrConnectWithoutAfter_snap_reviewInput = {
    where: PmDocSnapshotWhereUniqueInput
    create: XOR<PmDocSnapshotCreateWithoutAfter_snap_reviewInput, PmDocSnapshotUncheckedCreateWithoutAfter_snap_reviewInput>
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    docs?: PmDocUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | UserRole
    docs?: PmDocUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PmDocUpsertWithoutReviewsInput = {
    update: XOR<PmDocUpdateWithoutReviewsInput, PmDocUncheckedUpdateWithoutReviewsInput>
    create: XOR<PmDocCreateWithoutReviewsInput, PmDocUncheckedCreateWithoutReviewsInput>
  }

  export type PmDocUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDocsNestedInput
    snapshots?: PmDocSnapshotUpdateManyWithoutDocNestedInput
    comments?: CommentUpdateManyWithoutDocNestedInput
  }

  export type PmDocUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    snapshots?: PmDocSnapshotUncheckedUpdateManyWithoutDocNestedInput
    comments?: CommentUncheckedUpdateManyWithoutDocNestedInput
  }

  export type PmDocSnapshotUpsertWithoutBefore_snap_reviewInput = {
    update: XOR<PmDocSnapshotUpdateWithoutBefore_snap_reviewInput, PmDocSnapshotUncheckedUpdateWithoutBefore_snap_reviewInput>
    create: XOR<PmDocSnapshotCreateWithoutBefore_snap_reviewInput, PmDocSnapshotUncheckedCreateWithoutBefore_snap_reviewInput>
  }

  export type PmDocSnapshotUpdateWithoutBefore_snap_reviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc?: PmDocUpdateOneRequiredWithoutSnapshotsNestedInput
    after_snap_review?: ReviewUpdateOneWithoutAfter_snapshotNestedInput
    comments?: CommentUpdateManyWithoutSnapshotNestedInput
  }

  export type PmDocSnapshotUncheckedUpdateWithoutBefore_snap_reviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc_id?: StringFieldUpdateOperationsInput | string
    after_snap_review?: ReviewUncheckedUpdateOneWithoutAfter_snapshotNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type PmDocSnapshotUpsertWithoutAfter_snap_reviewInput = {
    update: XOR<PmDocSnapshotUpdateWithoutAfter_snap_reviewInput, PmDocSnapshotUncheckedUpdateWithoutAfter_snap_reviewInput>
    create: XOR<PmDocSnapshotCreateWithoutAfter_snap_reviewInput, PmDocSnapshotUncheckedCreateWithoutAfter_snap_reviewInput>
  }

  export type PmDocSnapshotUpdateWithoutAfter_snap_reviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc?: PmDocUpdateOneRequiredWithoutSnapshotsNestedInput
    before_snap_review?: ReviewUpdateOneWithoutBefore_snapshotNestedInput
    comments?: CommentUpdateManyWithoutSnapshotNestedInput
  }

  export type PmDocSnapshotUncheckedUpdateWithoutAfter_snap_reviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc_id?: StringFieldUpdateOperationsInput | string
    before_snap_review?: ReviewUncheckedUpdateOneWithoutBefore_snapshotNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type PmDocCreateManyUserInput = {
    id?: string
    name: string
    doc: JsonNullValueInput | InputJsonValue
    status?: DocStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyUserInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    changes?: ReviewCreatechangesInput | Enumerable<string>
    doc_id: string
    before_snapshot_id: string
    after_snapshot_id?: string | null
  }

  export type CommentCreateManyUserInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    doc_id: string
    snapshot_id?: string | null
  }

  export type PmDocUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    snapshots?: PmDocSnapshotUpdateManyWithoutDocNestedInput
    reviews?: ReviewUpdateManyWithoutDocNestedInput
    comments?: CommentUpdateManyWithoutDocNestedInput
  }

  export type PmDocUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    snapshots?: PmDocSnapshotUncheckedUpdateManyWithoutDocNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutDocNestedInput
    comments?: CommentUncheckedUpdateManyWithoutDocNestedInput
  }

  export type PmDocUncheckedUpdateManyWithoutDocsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    status?: EnumDocStatusFieldUpdateOperationsInput | DocStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    doc?: PmDocUpdateOneRequiredWithoutReviewsNestedInput
    before_snapshot?: PmDocSnapshotUpdateOneRequiredWithoutBefore_snap_reviewNestedInput
    after_snapshot?: PmDocSnapshotUpdateOneWithoutAfter_snap_reviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    doc_id?: StringFieldUpdateOperationsInput | string
    before_snapshot_id?: StringFieldUpdateOperationsInput | string
    after_snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUncheckedUpdateManyWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    doc_id?: StringFieldUpdateOperationsInput | string
    before_snapshot_id?: StringFieldUpdateOperationsInput | string
    after_snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    doc?: PmDocUpdateOneRequiredWithoutCommentsNestedInput
    snapshot?: PmDocSnapshotUpdateOneWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    doc_id?: StringFieldUpdateOperationsInput | string
    snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentUncheckedUpdateManyWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    doc_id?: StringFieldUpdateOperationsInput | string
    snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PmDocSnapshotCreateManyDocInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ReviewCreateManyDocInput = {
    id?: string
    name?: string
    status?: ReviewStatus
    createdAt?: Date | string
    user_id: string
    changes?: ReviewCreatechangesInput | Enumerable<string>
    before_snapshot_id: string
    after_snapshot_id?: string | null
  }

  export type CommentCreateManyDocInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_id: string
    snapshot_id?: string | null
  }

  export type PmDocSnapshotUpdateWithoutDocInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    before_snap_review?: ReviewUpdateOneWithoutBefore_snapshotNestedInput
    after_snap_review?: ReviewUpdateOneWithoutAfter_snapshotNestedInput
    comments?: CommentUpdateManyWithoutSnapshotNestedInput
  }

  export type PmDocSnapshotUncheckedUpdateWithoutDocInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    before_snap_review?: ReviewUncheckedUpdateOneWithoutBefore_snapshotNestedInput
    after_snap_review?: ReviewUncheckedUpdateOneWithoutAfter_snapshotNestedInput
    comments?: CommentUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type PmDocSnapshotUncheckedUpdateManyWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutDocInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    before_snapshot?: PmDocSnapshotUpdateOneRequiredWithoutBefore_snap_reviewNestedInput
    after_snapshot?: PmDocSnapshotUpdateOneWithoutAfter_snap_reviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutDocInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumReviewStatusFieldUpdateOperationsInput | ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user_id?: StringFieldUpdateOperationsInput | string
    changes?: ReviewUpdatechangesInput | Enumerable<string>
    before_snapshot_id?: StringFieldUpdateOperationsInput | string
    after_snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentUpdateWithoutDocInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    snapshot?: PmDocSnapshotUpdateOneWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutDocInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CommentCreateManySnapshotInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_id: string
    doc_id: string
  }

  export type CommentUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    doc?: PmDocUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    doc_id?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}