
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
 * Model ManuscriptDoc
 * 
 */
export type ManuscriptDoc = {
  manuscript_model_id: string
  user_model_id: string
  project_model_id: string
  doc: Prisma.JsonValue
  createdAt: Date
  updatedAt: Date
}

/**
 * Model ManuscriptDocHistory
 * 
 */
export type ManuscriptDocHistory = {
  doc_id: string
  version: number
  client_id: string | null
  steps: Prisma.JsonValue[]
}

/**
 * Model ManuscriptSnapshot
 * 
 */
export type ManuscriptSnapshot = {
  id: string
  name: string
  snapshot: Prisma.JsonValue
  createdAt: Date
  doc_id: string
}

/**
 * Model ManuscriptComment
 * 
 */
export type ManuscriptComment = {
  id: string
  body: string
  createdAt: Date
  target_id: string
  user_model_id: string
  doc_id: string
  snapshot_id: string | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ManuscriptDocs
 * const manuscriptDocs = await prisma.manuscriptDoc.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
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
   * // Fetch zero or more ManuscriptDocs
   * const manuscriptDocs = await prisma.manuscriptDoc.findMany()
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
   * `prisma.manuscriptDoc`: Exposes CRUD operations for the **ManuscriptDoc** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ManuscriptDocs
    * const manuscriptDocs = await prisma.manuscriptDoc.findMany()
    * ```
    */
  get manuscriptDoc(): Prisma.ManuscriptDocDelegate<GlobalReject>;

  /**
   * `prisma.manuscriptDocHistory`: Exposes CRUD operations for the **ManuscriptDocHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ManuscriptDocHistories
    * const manuscriptDocHistories = await prisma.manuscriptDocHistory.findMany()
    * ```
    */
  get manuscriptDocHistory(): Prisma.ManuscriptDocHistoryDelegate<GlobalReject>;

  /**
   * `prisma.manuscriptSnapshot`: Exposes CRUD operations for the **ManuscriptSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ManuscriptSnapshots
    * const manuscriptSnapshots = await prisma.manuscriptSnapshot.findMany()
    * ```
    */
  get manuscriptSnapshot(): Prisma.ManuscriptSnapshotDelegate<GlobalReject>;

  /**
   * `prisma.manuscriptComment`: Exposes CRUD operations for the **ManuscriptComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ManuscriptComments
    * const manuscriptComments = await prisma.manuscriptComment.findMany()
    * ```
    */
  get manuscriptComment(): Prisma.ManuscriptCommentDelegate<GlobalReject>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 4.3.1
   * Query Engine version: c875e43600dfe042452e0b868f7a48b817b9640b
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
  : T extends Uint8Array
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


  export import FieldRef = runtime.FieldRef

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

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
    ManuscriptDoc: 'ManuscriptDoc',
    ManuscriptDocHistory: 'ManuscriptDocHistory',
    ManuscriptSnapshot: 'ManuscriptSnapshot',
    ManuscriptComment: 'ManuscriptComment'
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
     * Overwrites the datasource url from your schema.prisma file
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
   * Count Type ManuscriptDocCountOutputType
   */


  export type ManuscriptDocCountOutputType = {
    snapshots: number
    comments: number
  }

  export type ManuscriptDocCountOutputTypeSelect = {
    snapshots?: boolean
    comments?: boolean
  }

  export type ManuscriptDocCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ManuscriptDocCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ManuscriptDocCountOutputType
    : S extends undefined
    ? never
    : S extends ManuscriptDocCountOutputTypeArgs
    ?'include' extends U
    ? ManuscriptDocCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ManuscriptDocCountOutputType ? ManuscriptDocCountOutputType[P] : never
  } 
    : ManuscriptDocCountOutputType
  : ManuscriptDocCountOutputType




  // Custom InputTypes

  /**
   * ManuscriptDocCountOutputType without action
   */
  export type ManuscriptDocCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDocCountOutputType
     * 
    **/
    select?: ManuscriptDocCountOutputTypeSelect | null
  }



  /**
   * Count Type ManuscriptSnapshotCountOutputType
   */


  export type ManuscriptSnapshotCountOutputType = {
    comments: number
  }

  export type ManuscriptSnapshotCountOutputTypeSelect = {
    comments?: boolean
  }

  export type ManuscriptSnapshotCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ManuscriptSnapshotCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ManuscriptSnapshotCountOutputType
    : S extends undefined
    ? never
    : S extends ManuscriptSnapshotCountOutputTypeArgs
    ?'include' extends U
    ? ManuscriptSnapshotCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ManuscriptSnapshotCountOutputType ? ManuscriptSnapshotCountOutputType[P] : never
  } 
    : ManuscriptSnapshotCountOutputType
  : ManuscriptSnapshotCountOutputType




  // Custom InputTypes

  /**
   * ManuscriptSnapshotCountOutputType without action
   */
  export type ManuscriptSnapshotCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptSnapshotCountOutputType
     * 
    **/
    select?: ManuscriptSnapshotCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model ManuscriptDoc
   */


  export type AggregateManuscriptDoc = {
    _count: ManuscriptDocCountAggregateOutputType | null
    _min: ManuscriptDocMinAggregateOutputType | null
    _max: ManuscriptDocMaxAggregateOutputType | null
  }

  export type ManuscriptDocMinAggregateOutputType = {
    manuscript_model_id: string | null
    user_model_id: string | null
    project_model_id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ManuscriptDocMaxAggregateOutputType = {
    manuscript_model_id: string | null
    user_model_id: string | null
    project_model_id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ManuscriptDocCountAggregateOutputType = {
    manuscript_model_id: number
    user_model_id: number
    project_model_id: number
    doc: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ManuscriptDocMinAggregateInputType = {
    manuscript_model_id?: true
    user_model_id?: true
    project_model_id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ManuscriptDocMaxAggregateInputType = {
    manuscript_model_id?: true
    user_model_id?: true
    project_model_id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ManuscriptDocCountAggregateInputType = {
    manuscript_model_id?: true
    user_model_id?: true
    project_model_id?: true
    doc?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ManuscriptDocAggregateArgs = {
    /**
     * Filter which ManuscriptDoc to aggregate.
     * 
    **/
    where?: ManuscriptDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptDocs to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptDocOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ManuscriptDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptDocs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptDocs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ManuscriptDocs
    **/
    _count?: true | ManuscriptDocCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ManuscriptDocMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ManuscriptDocMaxAggregateInputType
  }

  export type GetManuscriptDocAggregateType<T extends ManuscriptDocAggregateArgs> = {
        [P in keyof T & keyof AggregateManuscriptDoc]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManuscriptDoc[P]>
      : GetScalarType<T[P], AggregateManuscriptDoc[P]>
  }




  export type ManuscriptDocGroupByArgs = {
    where?: ManuscriptDocWhereInput
    orderBy?: Enumerable<ManuscriptDocOrderByWithAggregationInput>
    by: Array<ManuscriptDocScalarFieldEnum>
    having?: ManuscriptDocScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ManuscriptDocCountAggregateInputType | true
    _min?: ManuscriptDocMinAggregateInputType
    _max?: ManuscriptDocMaxAggregateInputType
  }


  export type ManuscriptDocGroupByOutputType = {
    manuscript_model_id: string
    user_model_id: string
    project_model_id: string
    doc: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: ManuscriptDocCountAggregateOutputType | null
    _min: ManuscriptDocMinAggregateOutputType | null
    _max: ManuscriptDocMaxAggregateOutputType | null
  }

  type GetManuscriptDocGroupByPayload<T extends ManuscriptDocGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ManuscriptDocGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ManuscriptDocGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ManuscriptDocGroupByOutputType[P]>
            : GetScalarType<T[P], ManuscriptDocGroupByOutputType[P]>
        }
      >
    >


  export type ManuscriptDocSelect = {
    manuscript_model_id?: boolean
    user_model_id?: boolean
    project_model_id?: boolean
    doc?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    snapshots?: boolean | ManuscriptSnapshotFindManyArgs
    comments?: boolean | ManuscriptCommentFindManyArgs
    _count?: boolean | ManuscriptDocCountOutputTypeArgs
  }

  export type ManuscriptDocInclude = {
    snapshots?: boolean | ManuscriptSnapshotFindManyArgs
    comments?: boolean | ManuscriptCommentFindManyArgs
    _count?: boolean | ManuscriptDocCountOutputTypeArgs
  }

  export type ManuscriptDocGetPayload<
    S extends boolean | null | undefined | ManuscriptDocArgs,
    U = keyof S
      > = S extends true
        ? ManuscriptDoc
    : S extends undefined
    ? never
    : S extends ManuscriptDocArgs | ManuscriptDocFindManyArgs
    ?'include' extends U
    ? ManuscriptDoc  & {
    [P in TrueKeys<S['include']>]:
        P extends 'snapshots' ? Array < ManuscriptSnapshotGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'comments' ? Array < ManuscriptCommentGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? ManuscriptDocCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'snapshots' ? Array < ManuscriptSnapshotGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'comments' ? Array < ManuscriptCommentGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? ManuscriptDocCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof ManuscriptDoc ? ManuscriptDoc[P] : never
  } 
    : ManuscriptDoc
  : ManuscriptDoc


  type ManuscriptDocCountArgs = Merge<
    Omit<ManuscriptDocFindManyArgs, 'select' | 'include'> & {
      select?: ManuscriptDocCountAggregateInputType | true
    }
  >

  export interface ManuscriptDocDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one ManuscriptDoc that matches the filter.
     * @param {ManuscriptDocFindUniqueArgs} args - Arguments to find a ManuscriptDoc
     * @example
     * // Get one ManuscriptDoc
     * const manuscriptDoc = await prisma.manuscriptDoc.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ManuscriptDocFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ManuscriptDocFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ManuscriptDoc'> extends True ? CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc>, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T>>> : CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc | null >, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T> | null >>

    /**
     * Find the first ManuscriptDoc that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocFindFirstArgs} args - Arguments to find a ManuscriptDoc
     * @example
     * // Get one ManuscriptDoc
     * const manuscriptDoc = await prisma.manuscriptDoc.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ManuscriptDocFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ManuscriptDocFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ManuscriptDoc'> extends True ? CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc>, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T>>> : CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc | null >, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T> | null >>

    /**
     * Find zero or more ManuscriptDocs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ManuscriptDocs
     * const manuscriptDocs = await prisma.manuscriptDoc.findMany()
     * 
     * // Get first 10 ManuscriptDocs
     * const manuscriptDocs = await prisma.manuscriptDoc.findMany({ take: 10 })
     * 
     * // Only select the `manuscript_model_id`
     * const manuscriptDocWithManuscript_model_idOnly = await prisma.manuscriptDoc.findMany({ select: { manuscript_model_id: true } })
     * 
    **/
    findMany<T extends ManuscriptDocFindManyArgs>(
      args?: SelectSubset<T, ManuscriptDocFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ManuscriptDoc>>, PrismaPromise<Array<ManuscriptDocGetPayload<T>>>>

    /**
     * Create a ManuscriptDoc.
     * @param {ManuscriptDocCreateArgs} args - Arguments to create a ManuscriptDoc.
     * @example
     * // Create one ManuscriptDoc
     * const ManuscriptDoc = await prisma.manuscriptDoc.create({
     *   data: {
     *     // ... data to create a ManuscriptDoc
     *   }
     * })
     * 
    **/
    create<T extends ManuscriptDocCreateArgs>(
      args: SelectSubset<T, ManuscriptDocCreateArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc>, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T>>>

    /**
     * Create many ManuscriptDocs.
     *     @param {ManuscriptDocCreateManyArgs} args - Arguments to create many ManuscriptDocs.
     *     @example
     *     // Create many ManuscriptDocs
     *     const manuscriptDoc = await prisma.manuscriptDoc.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ManuscriptDocCreateManyArgs>(
      args?: SelectSubset<T, ManuscriptDocCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ManuscriptDoc.
     * @param {ManuscriptDocDeleteArgs} args - Arguments to delete one ManuscriptDoc.
     * @example
     * // Delete one ManuscriptDoc
     * const ManuscriptDoc = await prisma.manuscriptDoc.delete({
     *   where: {
     *     // ... filter to delete one ManuscriptDoc
     *   }
     * })
     * 
    **/
    delete<T extends ManuscriptDocDeleteArgs>(
      args: SelectSubset<T, ManuscriptDocDeleteArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc>, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T>>>

    /**
     * Update one ManuscriptDoc.
     * @param {ManuscriptDocUpdateArgs} args - Arguments to update one ManuscriptDoc.
     * @example
     * // Update one ManuscriptDoc
     * const manuscriptDoc = await prisma.manuscriptDoc.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ManuscriptDocUpdateArgs>(
      args: SelectSubset<T, ManuscriptDocUpdateArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc>, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T>>>

    /**
     * Delete zero or more ManuscriptDocs.
     * @param {ManuscriptDocDeleteManyArgs} args - Arguments to filter ManuscriptDocs to delete.
     * @example
     * // Delete a few ManuscriptDocs
     * const { count } = await prisma.manuscriptDoc.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ManuscriptDocDeleteManyArgs>(
      args?: SelectSubset<T, ManuscriptDocDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ManuscriptDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ManuscriptDocs
     * const manuscriptDoc = await prisma.manuscriptDoc.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ManuscriptDocUpdateManyArgs>(
      args: SelectSubset<T, ManuscriptDocUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ManuscriptDoc.
     * @param {ManuscriptDocUpsertArgs} args - Arguments to update or create a ManuscriptDoc.
     * @example
     * // Update or create a ManuscriptDoc
     * const manuscriptDoc = await prisma.manuscriptDoc.upsert({
     *   create: {
     *     // ... data to create a ManuscriptDoc
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ManuscriptDoc we want to update
     *   }
     * })
    **/
    upsert<T extends ManuscriptDocUpsertArgs>(
      args: SelectSubset<T, ManuscriptDocUpsertArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc>, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T>>>

    /**
     * Find one ManuscriptDoc that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ManuscriptDocFindUniqueOrThrowArgs} args - Arguments to find a ManuscriptDoc
     * @example
     * // Get one ManuscriptDoc
     * const manuscriptDoc = await prisma.manuscriptDoc.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ManuscriptDocFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ManuscriptDocFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc>, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T>>>

    /**
     * Find the first ManuscriptDoc that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocFindFirstOrThrowArgs} args - Arguments to find a ManuscriptDoc
     * @example
     * // Get one ManuscriptDoc
     * const manuscriptDoc = await prisma.manuscriptDoc.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ManuscriptDocFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ManuscriptDocFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc>, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T>>>

    /**
     * Count the number of ManuscriptDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocCountArgs} args - Arguments to filter ManuscriptDocs to count.
     * @example
     * // Count the number of ManuscriptDocs
     * const count = await prisma.manuscriptDoc.count({
     *   where: {
     *     // ... the filter for the ManuscriptDocs we want to count
     *   }
     * })
    **/
    count<T extends ManuscriptDocCountArgs>(
      args?: Subset<T, ManuscriptDocCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManuscriptDocCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ManuscriptDoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ManuscriptDocAggregateArgs>(args: Subset<T, ManuscriptDocAggregateArgs>): PrismaPromise<GetManuscriptDocAggregateType<T>>

    /**
     * Group by ManuscriptDoc.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocGroupByArgs} args - Group by arguments.
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
      T extends ManuscriptDocGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManuscriptDocGroupByArgs['orderBy'] }
        : { orderBy?: ManuscriptDocGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ManuscriptDocGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManuscriptDocGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ManuscriptDoc.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ManuscriptDocClient<T> implements PrismaPromise<T> {
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

    snapshots<T extends ManuscriptSnapshotFindManyArgs = {}>(args?: Subset<T, ManuscriptSnapshotFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ManuscriptSnapshot>>, PrismaPromise<Array<ManuscriptSnapshotGetPayload<T>>>>;

    comments<T extends ManuscriptCommentFindManyArgs = {}>(args?: Subset<T, ManuscriptCommentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ManuscriptComment>>, PrismaPromise<Array<ManuscriptCommentGetPayload<T>>>>;

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
   * ManuscriptDoc base type for findUnique actions
   */
  export type ManuscriptDocFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ManuscriptDoc
     * 
    **/
    select?: ManuscriptDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptDocInclude | null
    /**
     * Filter, which ManuscriptDoc to fetch.
     * 
    **/
    where: ManuscriptDocWhereUniqueInput
  }

  /**
   * ManuscriptDoc: findUnique
   */
  export interface ManuscriptDocFindUniqueArgs extends ManuscriptDocFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ManuscriptDoc base type for findFirst actions
   */
  export type ManuscriptDocFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ManuscriptDoc
     * 
    **/
    select?: ManuscriptDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptDocInclude | null
    /**
     * Filter, which ManuscriptDoc to fetch.
     * 
    **/
    where?: ManuscriptDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptDocs to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptDocOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ManuscriptDocs.
     * 
    **/
    cursor?: ManuscriptDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptDocs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptDocs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ManuscriptDocs.
     * 
    **/
    distinct?: Enumerable<ManuscriptDocScalarFieldEnum>
  }

  /**
   * ManuscriptDoc: findFirst
   */
  export interface ManuscriptDocFindFirstArgs extends ManuscriptDocFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ManuscriptDoc findMany
   */
  export type ManuscriptDocFindManyArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDoc
     * 
    **/
    select?: ManuscriptDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptDocInclude | null
    /**
     * Filter, which ManuscriptDocs to fetch.
     * 
    **/
    where?: ManuscriptDocWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptDocs to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptDocOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ManuscriptDocs.
     * 
    **/
    cursor?: ManuscriptDocWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptDocs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptDocs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ManuscriptDocScalarFieldEnum>
  }


  /**
   * ManuscriptDoc create
   */
  export type ManuscriptDocCreateArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDoc
     * 
    **/
    select?: ManuscriptDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptDocInclude | null
    /**
     * The data needed to create a ManuscriptDoc.
     * 
    **/
    data: XOR<ManuscriptDocCreateInput, ManuscriptDocUncheckedCreateInput>
  }


  /**
   * ManuscriptDoc createMany
   */
  export type ManuscriptDocCreateManyArgs = {
    /**
     * The data used to create many ManuscriptDocs.
     * 
    **/
    data: Enumerable<ManuscriptDocCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ManuscriptDoc update
   */
  export type ManuscriptDocUpdateArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDoc
     * 
    **/
    select?: ManuscriptDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptDocInclude | null
    /**
     * The data needed to update a ManuscriptDoc.
     * 
    **/
    data: XOR<ManuscriptDocUpdateInput, ManuscriptDocUncheckedUpdateInput>
    /**
     * Choose, which ManuscriptDoc to update.
     * 
    **/
    where: ManuscriptDocWhereUniqueInput
  }


  /**
   * ManuscriptDoc updateMany
   */
  export type ManuscriptDocUpdateManyArgs = {
    /**
     * The data used to update ManuscriptDocs.
     * 
    **/
    data: XOR<ManuscriptDocUpdateManyMutationInput, ManuscriptDocUncheckedUpdateManyInput>
    /**
     * Filter which ManuscriptDocs to update
     * 
    **/
    where?: ManuscriptDocWhereInput
  }


  /**
   * ManuscriptDoc upsert
   */
  export type ManuscriptDocUpsertArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDoc
     * 
    **/
    select?: ManuscriptDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptDocInclude | null
    /**
     * The filter to search for the ManuscriptDoc to update in case it exists.
     * 
    **/
    where: ManuscriptDocWhereUniqueInput
    /**
     * In case the ManuscriptDoc found by the `where` argument doesn't exist, create a new ManuscriptDoc with this data.
     * 
    **/
    create: XOR<ManuscriptDocCreateInput, ManuscriptDocUncheckedCreateInput>
    /**
     * In case the ManuscriptDoc was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ManuscriptDocUpdateInput, ManuscriptDocUncheckedUpdateInput>
  }


  /**
   * ManuscriptDoc delete
   */
  export type ManuscriptDocDeleteArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDoc
     * 
    **/
    select?: ManuscriptDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptDocInclude | null
    /**
     * Filter which ManuscriptDoc to delete.
     * 
    **/
    where: ManuscriptDocWhereUniqueInput
  }


  /**
   * ManuscriptDoc deleteMany
   */
  export type ManuscriptDocDeleteManyArgs = {
    /**
     * Filter which ManuscriptDocs to delete
     * 
    **/
    where?: ManuscriptDocWhereInput
  }


  /**
   * ManuscriptDoc: findUniqueOrThrow
   */
  export type ManuscriptDocFindUniqueOrThrowArgs = ManuscriptDocFindUniqueArgsBase
      

  /**
   * ManuscriptDoc: findFirstOrThrow
   */
  export type ManuscriptDocFindFirstOrThrowArgs = ManuscriptDocFindFirstArgsBase
      

  /**
   * ManuscriptDoc without action
   */
  export type ManuscriptDocArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDoc
     * 
    **/
    select?: ManuscriptDocSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptDocInclude | null
  }



  /**
   * Model ManuscriptDocHistory
   */


  export type AggregateManuscriptDocHistory = {
    _count: ManuscriptDocHistoryCountAggregateOutputType | null
    _avg: ManuscriptDocHistoryAvgAggregateOutputType | null
    _sum: ManuscriptDocHistorySumAggregateOutputType | null
    _min: ManuscriptDocHistoryMinAggregateOutputType | null
    _max: ManuscriptDocHistoryMaxAggregateOutputType | null
  }

  export type ManuscriptDocHistoryAvgAggregateOutputType = {
    version: number | null
  }

  export type ManuscriptDocHistorySumAggregateOutputType = {
    version: number | null
  }

  export type ManuscriptDocHistoryMinAggregateOutputType = {
    doc_id: string | null
    version: number | null
    client_id: string | null
  }

  export type ManuscriptDocHistoryMaxAggregateOutputType = {
    doc_id: string | null
    version: number | null
    client_id: string | null
  }

  export type ManuscriptDocHistoryCountAggregateOutputType = {
    doc_id: number
    version: number
    client_id: number
    steps: number
    _all: number
  }


  export type ManuscriptDocHistoryAvgAggregateInputType = {
    version?: true
  }

  export type ManuscriptDocHistorySumAggregateInputType = {
    version?: true
  }

  export type ManuscriptDocHistoryMinAggregateInputType = {
    doc_id?: true
    version?: true
    client_id?: true
  }

  export type ManuscriptDocHistoryMaxAggregateInputType = {
    doc_id?: true
    version?: true
    client_id?: true
  }

  export type ManuscriptDocHistoryCountAggregateInputType = {
    doc_id?: true
    version?: true
    client_id?: true
    steps?: true
    _all?: true
  }

  export type ManuscriptDocHistoryAggregateArgs = {
    /**
     * Filter which ManuscriptDocHistory to aggregate.
     * 
    **/
    where?: ManuscriptDocHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptDocHistories to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptDocHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ManuscriptDocHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptDocHistories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptDocHistories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ManuscriptDocHistories
    **/
    _count?: true | ManuscriptDocHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ManuscriptDocHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ManuscriptDocHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ManuscriptDocHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ManuscriptDocHistoryMaxAggregateInputType
  }

  export type GetManuscriptDocHistoryAggregateType<T extends ManuscriptDocHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateManuscriptDocHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManuscriptDocHistory[P]>
      : GetScalarType<T[P], AggregateManuscriptDocHistory[P]>
  }




  export type ManuscriptDocHistoryGroupByArgs = {
    where?: ManuscriptDocHistoryWhereInput
    orderBy?: Enumerable<ManuscriptDocHistoryOrderByWithAggregationInput>
    by: Array<ManuscriptDocHistoryScalarFieldEnum>
    having?: ManuscriptDocHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ManuscriptDocHistoryCountAggregateInputType | true
    _avg?: ManuscriptDocHistoryAvgAggregateInputType
    _sum?: ManuscriptDocHistorySumAggregateInputType
    _min?: ManuscriptDocHistoryMinAggregateInputType
    _max?: ManuscriptDocHistoryMaxAggregateInputType
  }


  export type ManuscriptDocHistoryGroupByOutputType = {
    doc_id: string
    version: number
    client_id: string | null
    steps: JsonValue[]
    _count: ManuscriptDocHistoryCountAggregateOutputType | null
    _avg: ManuscriptDocHistoryAvgAggregateOutputType | null
    _sum: ManuscriptDocHistorySumAggregateOutputType | null
    _min: ManuscriptDocHistoryMinAggregateOutputType | null
    _max: ManuscriptDocHistoryMaxAggregateOutputType | null
  }

  type GetManuscriptDocHistoryGroupByPayload<T extends ManuscriptDocHistoryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ManuscriptDocHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ManuscriptDocHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ManuscriptDocHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], ManuscriptDocHistoryGroupByOutputType[P]>
        }
      >
    >


  export type ManuscriptDocHistorySelect = {
    doc_id?: boolean
    version?: boolean
    client_id?: boolean
    steps?: boolean
  }

  export type ManuscriptDocHistoryGetPayload<
    S extends boolean | null | undefined | ManuscriptDocHistoryArgs,
    U = keyof S
      > = S extends true
        ? ManuscriptDocHistory
    : S extends undefined
    ? never
    : S extends ManuscriptDocHistoryArgs | ManuscriptDocHistoryFindManyArgs
    ?'include' extends U
    ? ManuscriptDocHistory 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ManuscriptDocHistory ? ManuscriptDocHistory[P] : never
  } 
    : ManuscriptDocHistory
  : ManuscriptDocHistory


  type ManuscriptDocHistoryCountArgs = Merge<
    Omit<ManuscriptDocHistoryFindManyArgs, 'select' | 'include'> & {
      select?: ManuscriptDocHistoryCountAggregateInputType | true
    }
  >

  export interface ManuscriptDocHistoryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one ManuscriptDocHistory that matches the filter.
     * @param {ManuscriptDocHistoryFindUniqueArgs} args - Arguments to find a ManuscriptDocHistory
     * @example
     * // Get one ManuscriptDocHistory
     * const manuscriptDocHistory = await prisma.manuscriptDocHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ManuscriptDocHistoryFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ManuscriptDocHistoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ManuscriptDocHistory'> extends True ? CheckSelect<T, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistory>, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistoryGetPayload<T>>> : CheckSelect<T, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistory | null >, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistoryGetPayload<T> | null >>

    /**
     * Find the first ManuscriptDocHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocHistoryFindFirstArgs} args - Arguments to find a ManuscriptDocHistory
     * @example
     * // Get one ManuscriptDocHistory
     * const manuscriptDocHistory = await prisma.manuscriptDocHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ManuscriptDocHistoryFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ManuscriptDocHistoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ManuscriptDocHistory'> extends True ? CheckSelect<T, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistory>, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistoryGetPayload<T>>> : CheckSelect<T, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistory | null >, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistoryGetPayload<T> | null >>

    /**
     * Find zero or more ManuscriptDocHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocHistoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ManuscriptDocHistories
     * const manuscriptDocHistories = await prisma.manuscriptDocHistory.findMany()
     * 
     * // Get first 10 ManuscriptDocHistories
     * const manuscriptDocHistories = await prisma.manuscriptDocHistory.findMany({ take: 10 })
     * 
     * // Only select the `doc_id`
     * const manuscriptDocHistoryWithDoc_idOnly = await prisma.manuscriptDocHistory.findMany({ select: { doc_id: true } })
     * 
    **/
    findMany<T extends ManuscriptDocHistoryFindManyArgs>(
      args?: SelectSubset<T, ManuscriptDocHistoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ManuscriptDocHistory>>, PrismaPromise<Array<ManuscriptDocHistoryGetPayload<T>>>>

    /**
     * Create a ManuscriptDocHistory.
     * @param {ManuscriptDocHistoryCreateArgs} args - Arguments to create a ManuscriptDocHistory.
     * @example
     * // Create one ManuscriptDocHistory
     * const ManuscriptDocHistory = await prisma.manuscriptDocHistory.create({
     *   data: {
     *     // ... data to create a ManuscriptDocHistory
     *   }
     * })
     * 
    **/
    create<T extends ManuscriptDocHistoryCreateArgs>(
      args: SelectSubset<T, ManuscriptDocHistoryCreateArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistory>, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistoryGetPayload<T>>>

    /**
     * Create many ManuscriptDocHistories.
     *     @param {ManuscriptDocHistoryCreateManyArgs} args - Arguments to create many ManuscriptDocHistories.
     *     @example
     *     // Create many ManuscriptDocHistories
     *     const manuscriptDocHistory = await prisma.manuscriptDocHistory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ManuscriptDocHistoryCreateManyArgs>(
      args?: SelectSubset<T, ManuscriptDocHistoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ManuscriptDocHistory.
     * @param {ManuscriptDocHistoryDeleteArgs} args - Arguments to delete one ManuscriptDocHistory.
     * @example
     * // Delete one ManuscriptDocHistory
     * const ManuscriptDocHistory = await prisma.manuscriptDocHistory.delete({
     *   where: {
     *     // ... filter to delete one ManuscriptDocHistory
     *   }
     * })
     * 
    **/
    delete<T extends ManuscriptDocHistoryDeleteArgs>(
      args: SelectSubset<T, ManuscriptDocHistoryDeleteArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistory>, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistoryGetPayload<T>>>

    /**
     * Update one ManuscriptDocHistory.
     * @param {ManuscriptDocHistoryUpdateArgs} args - Arguments to update one ManuscriptDocHistory.
     * @example
     * // Update one ManuscriptDocHistory
     * const manuscriptDocHistory = await prisma.manuscriptDocHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ManuscriptDocHistoryUpdateArgs>(
      args: SelectSubset<T, ManuscriptDocHistoryUpdateArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistory>, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistoryGetPayload<T>>>

    /**
     * Delete zero or more ManuscriptDocHistories.
     * @param {ManuscriptDocHistoryDeleteManyArgs} args - Arguments to filter ManuscriptDocHistories to delete.
     * @example
     * // Delete a few ManuscriptDocHistories
     * const { count } = await prisma.manuscriptDocHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ManuscriptDocHistoryDeleteManyArgs>(
      args?: SelectSubset<T, ManuscriptDocHistoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ManuscriptDocHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ManuscriptDocHistories
     * const manuscriptDocHistory = await prisma.manuscriptDocHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ManuscriptDocHistoryUpdateManyArgs>(
      args: SelectSubset<T, ManuscriptDocHistoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ManuscriptDocHistory.
     * @param {ManuscriptDocHistoryUpsertArgs} args - Arguments to update or create a ManuscriptDocHistory.
     * @example
     * // Update or create a ManuscriptDocHistory
     * const manuscriptDocHistory = await prisma.manuscriptDocHistory.upsert({
     *   create: {
     *     // ... data to create a ManuscriptDocHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ManuscriptDocHistory we want to update
     *   }
     * })
    **/
    upsert<T extends ManuscriptDocHistoryUpsertArgs>(
      args: SelectSubset<T, ManuscriptDocHistoryUpsertArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistory>, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistoryGetPayload<T>>>

    /**
     * Find one ManuscriptDocHistory that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ManuscriptDocHistoryFindUniqueOrThrowArgs} args - Arguments to find a ManuscriptDocHistory
     * @example
     * // Get one ManuscriptDocHistory
     * const manuscriptDocHistory = await prisma.manuscriptDocHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ManuscriptDocHistoryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ManuscriptDocHistoryFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistory>, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistoryGetPayload<T>>>

    /**
     * Find the first ManuscriptDocHistory that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocHistoryFindFirstOrThrowArgs} args - Arguments to find a ManuscriptDocHistory
     * @example
     * // Get one ManuscriptDocHistory
     * const manuscriptDocHistory = await prisma.manuscriptDocHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ManuscriptDocHistoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ManuscriptDocHistoryFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistory>, Prisma__ManuscriptDocHistoryClient<ManuscriptDocHistoryGetPayload<T>>>

    /**
     * Count the number of ManuscriptDocHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocHistoryCountArgs} args - Arguments to filter ManuscriptDocHistories to count.
     * @example
     * // Count the number of ManuscriptDocHistories
     * const count = await prisma.manuscriptDocHistory.count({
     *   where: {
     *     // ... the filter for the ManuscriptDocHistories we want to count
     *   }
     * })
    **/
    count<T extends ManuscriptDocHistoryCountArgs>(
      args?: Subset<T, ManuscriptDocHistoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManuscriptDocHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ManuscriptDocHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ManuscriptDocHistoryAggregateArgs>(args: Subset<T, ManuscriptDocHistoryAggregateArgs>): PrismaPromise<GetManuscriptDocHistoryAggregateType<T>>

    /**
     * Group by ManuscriptDocHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptDocHistoryGroupByArgs} args - Group by arguments.
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
      T extends ManuscriptDocHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManuscriptDocHistoryGroupByArgs['orderBy'] }
        : { orderBy?: ManuscriptDocHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ManuscriptDocHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManuscriptDocHistoryGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ManuscriptDocHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ManuscriptDocHistoryClient<T> implements PrismaPromise<T> {
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
   * ManuscriptDocHistory base type for findUnique actions
   */
  export type ManuscriptDocHistoryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ManuscriptDocHistory
     * 
    **/
    select?: ManuscriptDocHistorySelect | null
    /**
     * Filter, which ManuscriptDocHistory to fetch.
     * 
    **/
    where: ManuscriptDocHistoryWhereUniqueInput
  }

  /**
   * ManuscriptDocHistory: findUnique
   */
  export interface ManuscriptDocHistoryFindUniqueArgs extends ManuscriptDocHistoryFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ManuscriptDocHistory base type for findFirst actions
   */
  export type ManuscriptDocHistoryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ManuscriptDocHistory
     * 
    **/
    select?: ManuscriptDocHistorySelect | null
    /**
     * Filter, which ManuscriptDocHistory to fetch.
     * 
    **/
    where?: ManuscriptDocHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptDocHistories to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptDocHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ManuscriptDocHistories.
     * 
    **/
    cursor?: ManuscriptDocHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptDocHistories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptDocHistories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ManuscriptDocHistories.
     * 
    **/
    distinct?: Enumerable<ManuscriptDocHistoryScalarFieldEnum>
  }

  /**
   * ManuscriptDocHistory: findFirst
   */
  export interface ManuscriptDocHistoryFindFirstArgs extends ManuscriptDocHistoryFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ManuscriptDocHistory findMany
   */
  export type ManuscriptDocHistoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDocHistory
     * 
    **/
    select?: ManuscriptDocHistorySelect | null
    /**
     * Filter, which ManuscriptDocHistories to fetch.
     * 
    **/
    where?: ManuscriptDocHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptDocHistories to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptDocHistoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ManuscriptDocHistories.
     * 
    **/
    cursor?: ManuscriptDocHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptDocHistories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptDocHistories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ManuscriptDocHistoryScalarFieldEnum>
  }


  /**
   * ManuscriptDocHistory create
   */
  export type ManuscriptDocHistoryCreateArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDocHistory
     * 
    **/
    select?: ManuscriptDocHistorySelect | null
    /**
     * The data needed to create a ManuscriptDocHistory.
     * 
    **/
    data: XOR<ManuscriptDocHistoryCreateInput, ManuscriptDocHistoryUncheckedCreateInput>
  }


  /**
   * ManuscriptDocHistory createMany
   */
  export type ManuscriptDocHistoryCreateManyArgs = {
    /**
     * The data used to create many ManuscriptDocHistories.
     * 
    **/
    data: Enumerable<ManuscriptDocHistoryCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ManuscriptDocHistory update
   */
  export type ManuscriptDocHistoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDocHistory
     * 
    **/
    select?: ManuscriptDocHistorySelect | null
    /**
     * The data needed to update a ManuscriptDocHistory.
     * 
    **/
    data: XOR<ManuscriptDocHistoryUpdateInput, ManuscriptDocHistoryUncheckedUpdateInput>
    /**
     * Choose, which ManuscriptDocHistory to update.
     * 
    **/
    where: ManuscriptDocHistoryWhereUniqueInput
  }


  /**
   * ManuscriptDocHistory updateMany
   */
  export type ManuscriptDocHistoryUpdateManyArgs = {
    /**
     * The data used to update ManuscriptDocHistories.
     * 
    **/
    data: XOR<ManuscriptDocHistoryUpdateManyMutationInput, ManuscriptDocHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ManuscriptDocHistories to update
     * 
    **/
    where?: ManuscriptDocHistoryWhereInput
  }


  /**
   * ManuscriptDocHistory upsert
   */
  export type ManuscriptDocHistoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDocHistory
     * 
    **/
    select?: ManuscriptDocHistorySelect | null
    /**
     * The filter to search for the ManuscriptDocHistory to update in case it exists.
     * 
    **/
    where: ManuscriptDocHistoryWhereUniqueInput
    /**
     * In case the ManuscriptDocHistory found by the `where` argument doesn't exist, create a new ManuscriptDocHistory with this data.
     * 
    **/
    create: XOR<ManuscriptDocHistoryCreateInput, ManuscriptDocHistoryUncheckedCreateInput>
    /**
     * In case the ManuscriptDocHistory was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ManuscriptDocHistoryUpdateInput, ManuscriptDocHistoryUncheckedUpdateInput>
  }


  /**
   * ManuscriptDocHistory delete
   */
  export type ManuscriptDocHistoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDocHistory
     * 
    **/
    select?: ManuscriptDocHistorySelect | null
    /**
     * Filter which ManuscriptDocHistory to delete.
     * 
    **/
    where: ManuscriptDocHistoryWhereUniqueInput
  }


  /**
   * ManuscriptDocHistory deleteMany
   */
  export type ManuscriptDocHistoryDeleteManyArgs = {
    /**
     * Filter which ManuscriptDocHistories to delete
     * 
    **/
    where?: ManuscriptDocHistoryWhereInput
  }


  /**
   * ManuscriptDocHistory: findUniqueOrThrow
   */
  export type ManuscriptDocHistoryFindUniqueOrThrowArgs = ManuscriptDocHistoryFindUniqueArgsBase
      

  /**
   * ManuscriptDocHistory: findFirstOrThrow
   */
  export type ManuscriptDocHistoryFindFirstOrThrowArgs = ManuscriptDocHistoryFindFirstArgsBase
      

  /**
   * ManuscriptDocHistory without action
   */
  export type ManuscriptDocHistoryArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptDocHistory
     * 
    **/
    select?: ManuscriptDocHistorySelect | null
  }



  /**
   * Model ManuscriptSnapshot
   */


  export type AggregateManuscriptSnapshot = {
    _count: ManuscriptSnapshotCountAggregateOutputType | null
    _min: ManuscriptSnapshotMinAggregateOutputType | null
    _max: ManuscriptSnapshotMaxAggregateOutputType | null
  }

  export type ManuscriptSnapshotMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    doc_id: string | null
  }

  export type ManuscriptSnapshotMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    doc_id: string | null
  }

  export type ManuscriptSnapshotCountAggregateOutputType = {
    id: number
    name: number
    snapshot: number
    createdAt: number
    doc_id: number
    _all: number
  }


  export type ManuscriptSnapshotMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    doc_id?: true
  }

  export type ManuscriptSnapshotMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    doc_id?: true
  }

  export type ManuscriptSnapshotCountAggregateInputType = {
    id?: true
    name?: true
    snapshot?: true
    createdAt?: true
    doc_id?: true
    _all?: true
  }

  export type ManuscriptSnapshotAggregateArgs = {
    /**
     * Filter which ManuscriptSnapshot to aggregate.
     * 
    **/
    where?: ManuscriptSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ManuscriptSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptSnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ManuscriptSnapshots
    **/
    _count?: true | ManuscriptSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ManuscriptSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ManuscriptSnapshotMaxAggregateInputType
  }

  export type GetManuscriptSnapshotAggregateType<T extends ManuscriptSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateManuscriptSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManuscriptSnapshot[P]>
      : GetScalarType<T[P], AggregateManuscriptSnapshot[P]>
  }




  export type ManuscriptSnapshotGroupByArgs = {
    where?: ManuscriptSnapshotWhereInput
    orderBy?: Enumerable<ManuscriptSnapshotOrderByWithAggregationInput>
    by: Array<ManuscriptSnapshotScalarFieldEnum>
    having?: ManuscriptSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ManuscriptSnapshotCountAggregateInputType | true
    _min?: ManuscriptSnapshotMinAggregateInputType
    _max?: ManuscriptSnapshotMaxAggregateInputType
  }


  export type ManuscriptSnapshotGroupByOutputType = {
    id: string
    name: string
    snapshot: JsonValue
    createdAt: Date
    doc_id: string
    _count: ManuscriptSnapshotCountAggregateOutputType | null
    _min: ManuscriptSnapshotMinAggregateOutputType | null
    _max: ManuscriptSnapshotMaxAggregateOutputType | null
  }

  type GetManuscriptSnapshotGroupByPayload<T extends ManuscriptSnapshotGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ManuscriptSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ManuscriptSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ManuscriptSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], ManuscriptSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type ManuscriptSnapshotSelect = {
    id?: boolean
    name?: boolean
    snapshot?: boolean
    createdAt?: boolean
    doc?: boolean | ManuscriptDocArgs
    doc_id?: boolean
    comments?: boolean | ManuscriptCommentFindManyArgs
    _count?: boolean | ManuscriptSnapshotCountOutputTypeArgs
  }

  export type ManuscriptSnapshotInclude = {
    doc?: boolean | ManuscriptDocArgs
    comments?: boolean | ManuscriptCommentFindManyArgs
    _count?: boolean | ManuscriptSnapshotCountOutputTypeArgs
  }

  export type ManuscriptSnapshotGetPayload<
    S extends boolean | null | undefined | ManuscriptSnapshotArgs,
    U = keyof S
      > = S extends true
        ? ManuscriptSnapshot
    : S extends undefined
    ? never
    : S extends ManuscriptSnapshotArgs | ManuscriptSnapshotFindManyArgs
    ?'include' extends U
    ? ManuscriptSnapshot  & {
    [P in TrueKeys<S['include']>]:
        P extends 'doc' ? ManuscriptDocGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'comments' ? Array < ManuscriptCommentGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends '_count' ? ManuscriptSnapshotCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'doc' ? ManuscriptDocGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'comments' ? Array < ManuscriptCommentGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends '_count' ? ManuscriptSnapshotCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof ManuscriptSnapshot ? ManuscriptSnapshot[P] : never
  } 
    : ManuscriptSnapshot
  : ManuscriptSnapshot


  type ManuscriptSnapshotCountArgs = Merge<
    Omit<ManuscriptSnapshotFindManyArgs, 'select' | 'include'> & {
      select?: ManuscriptSnapshotCountAggregateInputType | true
    }
  >

  export interface ManuscriptSnapshotDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one ManuscriptSnapshot that matches the filter.
     * @param {ManuscriptSnapshotFindUniqueArgs} args - Arguments to find a ManuscriptSnapshot
     * @example
     * // Get one ManuscriptSnapshot
     * const manuscriptSnapshot = await prisma.manuscriptSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ManuscriptSnapshotFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ManuscriptSnapshotFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ManuscriptSnapshot'> extends True ? CheckSelect<T, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshot>, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshotGetPayload<T>>> : CheckSelect<T, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshot | null >, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshotGetPayload<T> | null >>

    /**
     * Find the first ManuscriptSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptSnapshotFindFirstArgs} args - Arguments to find a ManuscriptSnapshot
     * @example
     * // Get one ManuscriptSnapshot
     * const manuscriptSnapshot = await prisma.manuscriptSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ManuscriptSnapshotFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ManuscriptSnapshotFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ManuscriptSnapshot'> extends True ? CheckSelect<T, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshot>, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshotGetPayload<T>>> : CheckSelect<T, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshot | null >, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshotGetPayload<T> | null >>

    /**
     * Find zero or more ManuscriptSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptSnapshotFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ManuscriptSnapshots
     * const manuscriptSnapshots = await prisma.manuscriptSnapshot.findMany()
     * 
     * // Get first 10 ManuscriptSnapshots
     * const manuscriptSnapshots = await prisma.manuscriptSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const manuscriptSnapshotWithIdOnly = await prisma.manuscriptSnapshot.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ManuscriptSnapshotFindManyArgs>(
      args?: SelectSubset<T, ManuscriptSnapshotFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ManuscriptSnapshot>>, PrismaPromise<Array<ManuscriptSnapshotGetPayload<T>>>>

    /**
     * Create a ManuscriptSnapshot.
     * @param {ManuscriptSnapshotCreateArgs} args - Arguments to create a ManuscriptSnapshot.
     * @example
     * // Create one ManuscriptSnapshot
     * const ManuscriptSnapshot = await prisma.manuscriptSnapshot.create({
     *   data: {
     *     // ... data to create a ManuscriptSnapshot
     *   }
     * })
     * 
    **/
    create<T extends ManuscriptSnapshotCreateArgs>(
      args: SelectSubset<T, ManuscriptSnapshotCreateArgs>
    ): CheckSelect<T, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshot>, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshotGetPayload<T>>>

    /**
     * Create many ManuscriptSnapshots.
     *     @param {ManuscriptSnapshotCreateManyArgs} args - Arguments to create many ManuscriptSnapshots.
     *     @example
     *     // Create many ManuscriptSnapshots
     *     const manuscriptSnapshot = await prisma.manuscriptSnapshot.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ManuscriptSnapshotCreateManyArgs>(
      args?: SelectSubset<T, ManuscriptSnapshotCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ManuscriptSnapshot.
     * @param {ManuscriptSnapshotDeleteArgs} args - Arguments to delete one ManuscriptSnapshot.
     * @example
     * // Delete one ManuscriptSnapshot
     * const ManuscriptSnapshot = await prisma.manuscriptSnapshot.delete({
     *   where: {
     *     // ... filter to delete one ManuscriptSnapshot
     *   }
     * })
     * 
    **/
    delete<T extends ManuscriptSnapshotDeleteArgs>(
      args: SelectSubset<T, ManuscriptSnapshotDeleteArgs>
    ): CheckSelect<T, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshot>, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshotGetPayload<T>>>

    /**
     * Update one ManuscriptSnapshot.
     * @param {ManuscriptSnapshotUpdateArgs} args - Arguments to update one ManuscriptSnapshot.
     * @example
     * // Update one ManuscriptSnapshot
     * const manuscriptSnapshot = await prisma.manuscriptSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ManuscriptSnapshotUpdateArgs>(
      args: SelectSubset<T, ManuscriptSnapshotUpdateArgs>
    ): CheckSelect<T, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshot>, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshotGetPayload<T>>>

    /**
     * Delete zero or more ManuscriptSnapshots.
     * @param {ManuscriptSnapshotDeleteManyArgs} args - Arguments to filter ManuscriptSnapshots to delete.
     * @example
     * // Delete a few ManuscriptSnapshots
     * const { count } = await prisma.manuscriptSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ManuscriptSnapshotDeleteManyArgs>(
      args?: SelectSubset<T, ManuscriptSnapshotDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ManuscriptSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ManuscriptSnapshots
     * const manuscriptSnapshot = await prisma.manuscriptSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ManuscriptSnapshotUpdateManyArgs>(
      args: SelectSubset<T, ManuscriptSnapshotUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ManuscriptSnapshot.
     * @param {ManuscriptSnapshotUpsertArgs} args - Arguments to update or create a ManuscriptSnapshot.
     * @example
     * // Update or create a ManuscriptSnapshot
     * const manuscriptSnapshot = await prisma.manuscriptSnapshot.upsert({
     *   create: {
     *     // ... data to create a ManuscriptSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ManuscriptSnapshot we want to update
     *   }
     * })
    **/
    upsert<T extends ManuscriptSnapshotUpsertArgs>(
      args: SelectSubset<T, ManuscriptSnapshotUpsertArgs>
    ): CheckSelect<T, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshot>, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshotGetPayload<T>>>

    /**
     * Find one ManuscriptSnapshot that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ManuscriptSnapshotFindUniqueOrThrowArgs} args - Arguments to find a ManuscriptSnapshot
     * @example
     * // Get one ManuscriptSnapshot
     * const manuscriptSnapshot = await prisma.manuscriptSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ManuscriptSnapshotFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ManuscriptSnapshotFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshot>, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshotGetPayload<T>>>

    /**
     * Find the first ManuscriptSnapshot that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptSnapshotFindFirstOrThrowArgs} args - Arguments to find a ManuscriptSnapshot
     * @example
     * // Get one ManuscriptSnapshot
     * const manuscriptSnapshot = await prisma.manuscriptSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ManuscriptSnapshotFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ManuscriptSnapshotFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshot>, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshotGetPayload<T>>>

    /**
     * Count the number of ManuscriptSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptSnapshotCountArgs} args - Arguments to filter ManuscriptSnapshots to count.
     * @example
     * // Count the number of ManuscriptSnapshots
     * const count = await prisma.manuscriptSnapshot.count({
     *   where: {
     *     // ... the filter for the ManuscriptSnapshots we want to count
     *   }
     * })
    **/
    count<T extends ManuscriptSnapshotCountArgs>(
      args?: Subset<T, ManuscriptSnapshotCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManuscriptSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ManuscriptSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ManuscriptSnapshotAggregateArgs>(args: Subset<T, ManuscriptSnapshotAggregateArgs>): PrismaPromise<GetManuscriptSnapshotAggregateType<T>>

    /**
     * Group by ManuscriptSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptSnapshotGroupByArgs} args - Group by arguments.
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
      T extends ManuscriptSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManuscriptSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: ManuscriptSnapshotGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ManuscriptSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManuscriptSnapshotGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ManuscriptSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ManuscriptSnapshotClient<T> implements PrismaPromise<T> {
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

    doc<T extends ManuscriptDocArgs = {}>(args?: Subset<T, ManuscriptDocArgs>): CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc | null >, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T> | null >>;

    comments<T extends ManuscriptCommentFindManyArgs = {}>(args?: Subset<T, ManuscriptCommentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ManuscriptComment>>, PrismaPromise<Array<ManuscriptCommentGetPayload<T>>>>;

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
   * ManuscriptSnapshot base type for findUnique actions
   */
  export type ManuscriptSnapshotFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ManuscriptSnapshot
     * 
    **/
    select?: ManuscriptSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptSnapshotInclude | null
    /**
     * Filter, which ManuscriptSnapshot to fetch.
     * 
    **/
    where: ManuscriptSnapshotWhereUniqueInput
  }

  /**
   * ManuscriptSnapshot: findUnique
   */
  export interface ManuscriptSnapshotFindUniqueArgs extends ManuscriptSnapshotFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ManuscriptSnapshot base type for findFirst actions
   */
  export type ManuscriptSnapshotFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ManuscriptSnapshot
     * 
    **/
    select?: ManuscriptSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptSnapshotInclude | null
    /**
     * Filter, which ManuscriptSnapshot to fetch.
     * 
    **/
    where?: ManuscriptSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ManuscriptSnapshots.
     * 
    **/
    cursor?: ManuscriptSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptSnapshots.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ManuscriptSnapshots.
     * 
    **/
    distinct?: Enumerable<ManuscriptSnapshotScalarFieldEnum>
  }

  /**
   * ManuscriptSnapshot: findFirst
   */
  export interface ManuscriptSnapshotFindFirstArgs extends ManuscriptSnapshotFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ManuscriptSnapshot findMany
   */
  export type ManuscriptSnapshotFindManyArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptSnapshot
     * 
    **/
    select?: ManuscriptSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptSnapshotInclude | null
    /**
     * Filter, which ManuscriptSnapshots to fetch.
     * 
    **/
    where?: ManuscriptSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptSnapshots to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptSnapshotOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ManuscriptSnapshots.
     * 
    **/
    cursor?: ManuscriptSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptSnapshots from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptSnapshots.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ManuscriptSnapshotScalarFieldEnum>
  }


  /**
   * ManuscriptSnapshot create
   */
  export type ManuscriptSnapshotCreateArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptSnapshot
     * 
    **/
    select?: ManuscriptSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptSnapshotInclude | null
    /**
     * The data needed to create a ManuscriptSnapshot.
     * 
    **/
    data: XOR<ManuscriptSnapshotCreateInput, ManuscriptSnapshotUncheckedCreateInput>
  }


  /**
   * ManuscriptSnapshot createMany
   */
  export type ManuscriptSnapshotCreateManyArgs = {
    /**
     * The data used to create many ManuscriptSnapshots.
     * 
    **/
    data: Enumerable<ManuscriptSnapshotCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ManuscriptSnapshot update
   */
  export type ManuscriptSnapshotUpdateArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptSnapshot
     * 
    **/
    select?: ManuscriptSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptSnapshotInclude | null
    /**
     * The data needed to update a ManuscriptSnapshot.
     * 
    **/
    data: XOR<ManuscriptSnapshotUpdateInput, ManuscriptSnapshotUncheckedUpdateInput>
    /**
     * Choose, which ManuscriptSnapshot to update.
     * 
    **/
    where: ManuscriptSnapshotWhereUniqueInput
  }


  /**
   * ManuscriptSnapshot updateMany
   */
  export type ManuscriptSnapshotUpdateManyArgs = {
    /**
     * The data used to update ManuscriptSnapshots.
     * 
    **/
    data: XOR<ManuscriptSnapshotUpdateManyMutationInput, ManuscriptSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which ManuscriptSnapshots to update
     * 
    **/
    where?: ManuscriptSnapshotWhereInput
  }


  /**
   * ManuscriptSnapshot upsert
   */
  export type ManuscriptSnapshotUpsertArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptSnapshot
     * 
    **/
    select?: ManuscriptSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptSnapshotInclude | null
    /**
     * The filter to search for the ManuscriptSnapshot to update in case it exists.
     * 
    **/
    where: ManuscriptSnapshotWhereUniqueInput
    /**
     * In case the ManuscriptSnapshot found by the `where` argument doesn't exist, create a new ManuscriptSnapshot with this data.
     * 
    **/
    create: XOR<ManuscriptSnapshotCreateInput, ManuscriptSnapshotUncheckedCreateInput>
    /**
     * In case the ManuscriptSnapshot was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ManuscriptSnapshotUpdateInput, ManuscriptSnapshotUncheckedUpdateInput>
  }


  /**
   * ManuscriptSnapshot delete
   */
  export type ManuscriptSnapshotDeleteArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptSnapshot
     * 
    **/
    select?: ManuscriptSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptSnapshotInclude | null
    /**
     * Filter which ManuscriptSnapshot to delete.
     * 
    **/
    where: ManuscriptSnapshotWhereUniqueInput
  }


  /**
   * ManuscriptSnapshot deleteMany
   */
  export type ManuscriptSnapshotDeleteManyArgs = {
    /**
     * Filter which ManuscriptSnapshots to delete
     * 
    **/
    where?: ManuscriptSnapshotWhereInput
  }


  /**
   * ManuscriptSnapshot: findUniqueOrThrow
   */
  export type ManuscriptSnapshotFindUniqueOrThrowArgs = ManuscriptSnapshotFindUniqueArgsBase
      

  /**
   * ManuscriptSnapshot: findFirstOrThrow
   */
  export type ManuscriptSnapshotFindFirstOrThrowArgs = ManuscriptSnapshotFindFirstArgsBase
      

  /**
   * ManuscriptSnapshot without action
   */
  export type ManuscriptSnapshotArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptSnapshot
     * 
    **/
    select?: ManuscriptSnapshotSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptSnapshotInclude | null
  }



  /**
   * Model ManuscriptComment
   */


  export type AggregateManuscriptComment = {
    _count: ManuscriptCommentCountAggregateOutputType | null
    _min: ManuscriptCommentMinAggregateOutputType | null
    _max: ManuscriptCommentMaxAggregateOutputType | null
  }

  export type ManuscriptCommentMinAggregateOutputType = {
    id: string | null
    body: string | null
    createdAt: Date | null
    target_id: string | null
    user_model_id: string | null
    doc_id: string | null
    snapshot_id: string | null
  }

  export type ManuscriptCommentMaxAggregateOutputType = {
    id: string | null
    body: string | null
    createdAt: Date | null
    target_id: string | null
    user_model_id: string | null
    doc_id: string | null
    snapshot_id: string | null
  }

  export type ManuscriptCommentCountAggregateOutputType = {
    id: number
    body: number
    createdAt: number
    target_id: number
    user_model_id: number
    doc_id: number
    snapshot_id: number
    _all: number
  }


  export type ManuscriptCommentMinAggregateInputType = {
    id?: true
    body?: true
    createdAt?: true
    target_id?: true
    user_model_id?: true
    doc_id?: true
    snapshot_id?: true
  }

  export type ManuscriptCommentMaxAggregateInputType = {
    id?: true
    body?: true
    createdAt?: true
    target_id?: true
    user_model_id?: true
    doc_id?: true
    snapshot_id?: true
  }

  export type ManuscriptCommentCountAggregateInputType = {
    id?: true
    body?: true
    createdAt?: true
    target_id?: true
    user_model_id?: true
    doc_id?: true
    snapshot_id?: true
    _all?: true
  }

  export type ManuscriptCommentAggregateArgs = {
    /**
     * Filter which ManuscriptComment to aggregate.
     * 
    **/
    where?: ManuscriptCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptComments to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptCommentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ManuscriptCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptComments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptComments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ManuscriptComments
    **/
    _count?: true | ManuscriptCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ManuscriptCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ManuscriptCommentMaxAggregateInputType
  }

  export type GetManuscriptCommentAggregateType<T extends ManuscriptCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateManuscriptComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManuscriptComment[P]>
      : GetScalarType<T[P], AggregateManuscriptComment[P]>
  }




  export type ManuscriptCommentGroupByArgs = {
    where?: ManuscriptCommentWhereInput
    orderBy?: Enumerable<ManuscriptCommentOrderByWithAggregationInput>
    by: Array<ManuscriptCommentScalarFieldEnum>
    having?: ManuscriptCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ManuscriptCommentCountAggregateInputType | true
    _min?: ManuscriptCommentMinAggregateInputType
    _max?: ManuscriptCommentMaxAggregateInputType
  }


  export type ManuscriptCommentGroupByOutputType = {
    id: string
    body: string
    createdAt: Date
    target_id: string
    user_model_id: string
    doc_id: string
    snapshot_id: string | null
    _count: ManuscriptCommentCountAggregateOutputType | null
    _min: ManuscriptCommentMinAggregateOutputType | null
    _max: ManuscriptCommentMaxAggregateOutputType | null
  }

  type GetManuscriptCommentGroupByPayload<T extends ManuscriptCommentGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ManuscriptCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ManuscriptCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ManuscriptCommentGroupByOutputType[P]>
            : GetScalarType<T[P], ManuscriptCommentGroupByOutputType[P]>
        }
      >
    >


  export type ManuscriptCommentSelect = {
    id?: boolean
    body?: boolean
    createdAt?: boolean
    target_id?: boolean
    user_model_id?: boolean
    doc?: boolean | ManuscriptDocArgs
    doc_id?: boolean
    snapshot?: boolean | ManuscriptSnapshotArgs
    snapshot_id?: boolean
  }

  export type ManuscriptCommentInclude = {
    doc?: boolean | ManuscriptDocArgs
    snapshot?: boolean | ManuscriptSnapshotArgs
  }

  export type ManuscriptCommentGetPayload<
    S extends boolean | null | undefined | ManuscriptCommentArgs,
    U = keyof S
      > = S extends true
        ? ManuscriptComment
    : S extends undefined
    ? never
    : S extends ManuscriptCommentArgs | ManuscriptCommentFindManyArgs
    ?'include' extends U
    ? ManuscriptComment  & {
    [P in TrueKeys<S['include']>]:
        P extends 'doc' ? ManuscriptDocGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'snapshot' ? ManuscriptSnapshotGetPayload<Exclude<S['include'], undefined | null>[P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'doc' ? ManuscriptDocGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'snapshot' ? ManuscriptSnapshotGetPayload<Exclude<S['select'], undefined | null>[P]> | null :  P extends keyof ManuscriptComment ? ManuscriptComment[P] : never
  } 
    : ManuscriptComment
  : ManuscriptComment


  type ManuscriptCommentCountArgs = Merge<
    Omit<ManuscriptCommentFindManyArgs, 'select' | 'include'> & {
      select?: ManuscriptCommentCountAggregateInputType | true
    }
  >

  export interface ManuscriptCommentDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one ManuscriptComment that matches the filter.
     * @param {ManuscriptCommentFindUniqueArgs} args - Arguments to find a ManuscriptComment
     * @example
     * // Get one ManuscriptComment
     * const manuscriptComment = await prisma.manuscriptComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ManuscriptCommentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ManuscriptCommentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ManuscriptComment'> extends True ? CheckSelect<T, Prisma__ManuscriptCommentClient<ManuscriptComment>, Prisma__ManuscriptCommentClient<ManuscriptCommentGetPayload<T>>> : CheckSelect<T, Prisma__ManuscriptCommentClient<ManuscriptComment | null >, Prisma__ManuscriptCommentClient<ManuscriptCommentGetPayload<T> | null >>

    /**
     * Find the first ManuscriptComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptCommentFindFirstArgs} args - Arguments to find a ManuscriptComment
     * @example
     * // Get one ManuscriptComment
     * const manuscriptComment = await prisma.manuscriptComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ManuscriptCommentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ManuscriptCommentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ManuscriptComment'> extends True ? CheckSelect<T, Prisma__ManuscriptCommentClient<ManuscriptComment>, Prisma__ManuscriptCommentClient<ManuscriptCommentGetPayload<T>>> : CheckSelect<T, Prisma__ManuscriptCommentClient<ManuscriptComment | null >, Prisma__ManuscriptCommentClient<ManuscriptCommentGetPayload<T> | null >>

    /**
     * Find zero or more ManuscriptComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptCommentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ManuscriptComments
     * const manuscriptComments = await prisma.manuscriptComment.findMany()
     * 
     * // Get first 10 ManuscriptComments
     * const manuscriptComments = await prisma.manuscriptComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const manuscriptCommentWithIdOnly = await prisma.manuscriptComment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ManuscriptCommentFindManyArgs>(
      args?: SelectSubset<T, ManuscriptCommentFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ManuscriptComment>>, PrismaPromise<Array<ManuscriptCommentGetPayload<T>>>>

    /**
     * Create a ManuscriptComment.
     * @param {ManuscriptCommentCreateArgs} args - Arguments to create a ManuscriptComment.
     * @example
     * // Create one ManuscriptComment
     * const ManuscriptComment = await prisma.manuscriptComment.create({
     *   data: {
     *     // ... data to create a ManuscriptComment
     *   }
     * })
     * 
    **/
    create<T extends ManuscriptCommentCreateArgs>(
      args: SelectSubset<T, ManuscriptCommentCreateArgs>
    ): CheckSelect<T, Prisma__ManuscriptCommentClient<ManuscriptComment>, Prisma__ManuscriptCommentClient<ManuscriptCommentGetPayload<T>>>

    /**
     * Create many ManuscriptComments.
     *     @param {ManuscriptCommentCreateManyArgs} args - Arguments to create many ManuscriptComments.
     *     @example
     *     // Create many ManuscriptComments
     *     const manuscriptComment = await prisma.manuscriptComment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ManuscriptCommentCreateManyArgs>(
      args?: SelectSubset<T, ManuscriptCommentCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ManuscriptComment.
     * @param {ManuscriptCommentDeleteArgs} args - Arguments to delete one ManuscriptComment.
     * @example
     * // Delete one ManuscriptComment
     * const ManuscriptComment = await prisma.manuscriptComment.delete({
     *   where: {
     *     // ... filter to delete one ManuscriptComment
     *   }
     * })
     * 
    **/
    delete<T extends ManuscriptCommentDeleteArgs>(
      args: SelectSubset<T, ManuscriptCommentDeleteArgs>
    ): CheckSelect<T, Prisma__ManuscriptCommentClient<ManuscriptComment>, Prisma__ManuscriptCommentClient<ManuscriptCommentGetPayload<T>>>

    /**
     * Update one ManuscriptComment.
     * @param {ManuscriptCommentUpdateArgs} args - Arguments to update one ManuscriptComment.
     * @example
     * // Update one ManuscriptComment
     * const manuscriptComment = await prisma.manuscriptComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ManuscriptCommentUpdateArgs>(
      args: SelectSubset<T, ManuscriptCommentUpdateArgs>
    ): CheckSelect<T, Prisma__ManuscriptCommentClient<ManuscriptComment>, Prisma__ManuscriptCommentClient<ManuscriptCommentGetPayload<T>>>

    /**
     * Delete zero or more ManuscriptComments.
     * @param {ManuscriptCommentDeleteManyArgs} args - Arguments to filter ManuscriptComments to delete.
     * @example
     * // Delete a few ManuscriptComments
     * const { count } = await prisma.manuscriptComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ManuscriptCommentDeleteManyArgs>(
      args?: SelectSubset<T, ManuscriptCommentDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ManuscriptComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ManuscriptComments
     * const manuscriptComment = await prisma.manuscriptComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ManuscriptCommentUpdateManyArgs>(
      args: SelectSubset<T, ManuscriptCommentUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ManuscriptComment.
     * @param {ManuscriptCommentUpsertArgs} args - Arguments to update or create a ManuscriptComment.
     * @example
     * // Update or create a ManuscriptComment
     * const manuscriptComment = await prisma.manuscriptComment.upsert({
     *   create: {
     *     // ... data to create a ManuscriptComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ManuscriptComment we want to update
     *   }
     * })
    **/
    upsert<T extends ManuscriptCommentUpsertArgs>(
      args: SelectSubset<T, ManuscriptCommentUpsertArgs>
    ): CheckSelect<T, Prisma__ManuscriptCommentClient<ManuscriptComment>, Prisma__ManuscriptCommentClient<ManuscriptCommentGetPayload<T>>>

    /**
     * Find one ManuscriptComment that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ManuscriptCommentFindUniqueOrThrowArgs} args - Arguments to find a ManuscriptComment
     * @example
     * // Get one ManuscriptComment
     * const manuscriptComment = await prisma.manuscriptComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ManuscriptCommentFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ManuscriptCommentFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ManuscriptCommentClient<ManuscriptComment>, Prisma__ManuscriptCommentClient<ManuscriptCommentGetPayload<T>>>

    /**
     * Find the first ManuscriptComment that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptCommentFindFirstOrThrowArgs} args - Arguments to find a ManuscriptComment
     * @example
     * // Get one ManuscriptComment
     * const manuscriptComment = await prisma.manuscriptComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ManuscriptCommentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ManuscriptCommentFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ManuscriptCommentClient<ManuscriptComment>, Prisma__ManuscriptCommentClient<ManuscriptCommentGetPayload<T>>>

    /**
     * Count the number of ManuscriptComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptCommentCountArgs} args - Arguments to filter ManuscriptComments to count.
     * @example
     * // Count the number of ManuscriptComments
     * const count = await prisma.manuscriptComment.count({
     *   where: {
     *     // ... the filter for the ManuscriptComments we want to count
     *   }
     * })
    **/
    count<T extends ManuscriptCommentCountArgs>(
      args?: Subset<T, ManuscriptCommentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManuscriptCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ManuscriptComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ManuscriptCommentAggregateArgs>(args: Subset<T, ManuscriptCommentAggregateArgs>): PrismaPromise<GetManuscriptCommentAggregateType<T>>

    /**
     * Group by ManuscriptComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManuscriptCommentGroupByArgs} args - Group by arguments.
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
      T extends ManuscriptCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManuscriptCommentGroupByArgs['orderBy'] }
        : { orderBy?: ManuscriptCommentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ManuscriptCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManuscriptCommentGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ManuscriptComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ManuscriptCommentClient<T> implements PrismaPromise<T> {
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

    doc<T extends ManuscriptDocArgs = {}>(args?: Subset<T, ManuscriptDocArgs>): CheckSelect<T, Prisma__ManuscriptDocClient<ManuscriptDoc | null >, Prisma__ManuscriptDocClient<ManuscriptDocGetPayload<T> | null >>;

    snapshot<T extends ManuscriptSnapshotArgs = {}>(args?: Subset<T, ManuscriptSnapshotArgs>): CheckSelect<T, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshot | null >, Prisma__ManuscriptSnapshotClient<ManuscriptSnapshotGetPayload<T> | null >>;

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
   * ManuscriptComment base type for findUnique actions
   */
  export type ManuscriptCommentFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ManuscriptComment
     * 
    **/
    select?: ManuscriptCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptCommentInclude | null
    /**
     * Filter, which ManuscriptComment to fetch.
     * 
    **/
    where: ManuscriptCommentWhereUniqueInput
  }

  /**
   * ManuscriptComment: findUnique
   */
  export interface ManuscriptCommentFindUniqueArgs extends ManuscriptCommentFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ManuscriptComment base type for findFirst actions
   */
  export type ManuscriptCommentFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ManuscriptComment
     * 
    **/
    select?: ManuscriptCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptCommentInclude | null
    /**
     * Filter, which ManuscriptComment to fetch.
     * 
    **/
    where?: ManuscriptCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptComments to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptCommentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ManuscriptComments.
     * 
    **/
    cursor?: ManuscriptCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptComments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptComments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ManuscriptComments.
     * 
    **/
    distinct?: Enumerable<ManuscriptCommentScalarFieldEnum>
  }

  /**
   * ManuscriptComment: findFirst
   */
  export interface ManuscriptCommentFindFirstArgs extends ManuscriptCommentFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ManuscriptComment findMany
   */
  export type ManuscriptCommentFindManyArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptComment
     * 
    **/
    select?: ManuscriptCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptCommentInclude | null
    /**
     * Filter, which ManuscriptComments to fetch.
     * 
    **/
    where?: ManuscriptCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ManuscriptComments to fetch.
     * 
    **/
    orderBy?: Enumerable<ManuscriptCommentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ManuscriptComments.
     * 
    **/
    cursor?: ManuscriptCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ManuscriptComments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ManuscriptComments.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ManuscriptCommentScalarFieldEnum>
  }


  /**
   * ManuscriptComment create
   */
  export type ManuscriptCommentCreateArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptComment
     * 
    **/
    select?: ManuscriptCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptCommentInclude | null
    /**
     * The data needed to create a ManuscriptComment.
     * 
    **/
    data: XOR<ManuscriptCommentCreateInput, ManuscriptCommentUncheckedCreateInput>
  }


  /**
   * ManuscriptComment createMany
   */
  export type ManuscriptCommentCreateManyArgs = {
    /**
     * The data used to create many ManuscriptComments.
     * 
    **/
    data: Enumerable<ManuscriptCommentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ManuscriptComment update
   */
  export type ManuscriptCommentUpdateArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptComment
     * 
    **/
    select?: ManuscriptCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptCommentInclude | null
    /**
     * The data needed to update a ManuscriptComment.
     * 
    **/
    data: XOR<ManuscriptCommentUpdateInput, ManuscriptCommentUncheckedUpdateInput>
    /**
     * Choose, which ManuscriptComment to update.
     * 
    **/
    where: ManuscriptCommentWhereUniqueInput
  }


  /**
   * ManuscriptComment updateMany
   */
  export type ManuscriptCommentUpdateManyArgs = {
    /**
     * The data used to update ManuscriptComments.
     * 
    **/
    data: XOR<ManuscriptCommentUpdateManyMutationInput, ManuscriptCommentUncheckedUpdateManyInput>
    /**
     * Filter which ManuscriptComments to update
     * 
    **/
    where?: ManuscriptCommentWhereInput
  }


  /**
   * ManuscriptComment upsert
   */
  export type ManuscriptCommentUpsertArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptComment
     * 
    **/
    select?: ManuscriptCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptCommentInclude | null
    /**
     * The filter to search for the ManuscriptComment to update in case it exists.
     * 
    **/
    where: ManuscriptCommentWhereUniqueInput
    /**
     * In case the ManuscriptComment found by the `where` argument doesn't exist, create a new ManuscriptComment with this data.
     * 
    **/
    create: XOR<ManuscriptCommentCreateInput, ManuscriptCommentUncheckedCreateInput>
    /**
     * In case the ManuscriptComment was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ManuscriptCommentUpdateInput, ManuscriptCommentUncheckedUpdateInput>
  }


  /**
   * ManuscriptComment delete
   */
  export type ManuscriptCommentDeleteArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptComment
     * 
    **/
    select?: ManuscriptCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptCommentInclude | null
    /**
     * Filter which ManuscriptComment to delete.
     * 
    **/
    where: ManuscriptCommentWhereUniqueInput
  }


  /**
   * ManuscriptComment deleteMany
   */
  export type ManuscriptCommentDeleteManyArgs = {
    /**
     * Filter which ManuscriptComments to delete
     * 
    **/
    where?: ManuscriptCommentWhereInput
  }


  /**
   * ManuscriptComment: findUniqueOrThrow
   */
  export type ManuscriptCommentFindUniqueOrThrowArgs = ManuscriptCommentFindUniqueArgsBase
      

  /**
   * ManuscriptComment: findFirstOrThrow
   */
  export type ManuscriptCommentFindFirstOrThrowArgs = ManuscriptCommentFindFirstArgsBase
      

  /**
   * ManuscriptComment without action
   */
  export type ManuscriptCommentArgs = {
    /**
     * Select specific fields to fetch from the ManuscriptComment
     * 
    **/
    select?: ManuscriptCommentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ManuscriptCommentInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const ManuscriptCommentScalarFieldEnum: {
    id: 'id',
    body: 'body',
    createdAt: 'createdAt',
    target_id: 'target_id',
    user_model_id: 'user_model_id',
    doc_id: 'doc_id',
    snapshot_id: 'snapshot_id'
  };

  export type ManuscriptCommentScalarFieldEnum = (typeof ManuscriptCommentScalarFieldEnum)[keyof typeof ManuscriptCommentScalarFieldEnum]


  export const ManuscriptDocHistoryScalarFieldEnum: {
    doc_id: 'doc_id',
    version: 'version',
    client_id: 'client_id',
    steps: 'steps'
  };

  export type ManuscriptDocHistoryScalarFieldEnum = (typeof ManuscriptDocHistoryScalarFieldEnum)[keyof typeof ManuscriptDocHistoryScalarFieldEnum]


  export const ManuscriptDocScalarFieldEnum: {
    manuscript_model_id: 'manuscript_model_id',
    user_model_id: 'user_model_id',
    project_model_id: 'project_model_id',
    doc: 'doc',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ManuscriptDocScalarFieldEnum = (typeof ManuscriptDocScalarFieldEnum)[keyof typeof ManuscriptDocScalarFieldEnum]


  export const ManuscriptSnapshotScalarFieldEnum: {
    id: 'id',
    name: 'name',
    snapshot: 'snapshot',
    createdAt: 'createdAt',
    doc_id: 'doc_id'
  };

  export type ManuscriptSnapshotScalarFieldEnum = (typeof ManuscriptSnapshotScalarFieldEnum)[keyof typeof ManuscriptSnapshotScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  /**
   * Deep Input Types
   */


  export type ManuscriptDocWhereInput = {
    AND?: Enumerable<ManuscriptDocWhereInput>
    OR?: Enumerable<ManuscriptDocWhereInput>
    NOT?: Enumerable<ManuscriptDocWhereInput>
    manuscript_model_id?: StringFilter | string
    user_model_id?: StringFilter | string
    project_model_id?: StringFilter | string
    doc?: JsonFilter
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    snapshots?: ManuscriptSnapshotListRelationFilter
    comments?: ManuscriptCommentListRelationFilter
  }

  export type ManuscriptDocOrderByWithRelationInput = {
    manuscript_model_id?: SortOrder
    user_model_id?: SortOrder
    project_model_id?: SortOrder
    doc?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    snapshots?: ManuscriptSnapshotOrderByRelationAggregateInput
    comments?: ManuscriptCommentOrderByRelationAggregateInput
  }

  export type ManuscriptDocWhereUniqueInput = {
    manuscript_model_id?: string
  }

  export type ManuscriptDocOrderByWithAggregationInput = {
    manuscript_model_id?: SortOrder
    user_model_id?: SortOrder
    project_model_id?: SortOrder
    doc?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ManuscriptDocCountOrderByAggregateInput
    _max?: ManuscriptDocMaxOrderByAggregateInput
    _min?: ManuscriptDocMinOrderByAggregateInput
  }

  export type ManuscriptDocScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ManuscriptDocScalarWhereWithAggregatesInput>
    OR?: Enumerable<ManuscriptDocScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ManuscriptDocScalarWhereWithAggregatesInput>
    manuscript_model_id?: StringWithAggregatesFilter | string
    user_model_id?: StringWithAggregatesFilter | string
    project_model_id?: StringWithAggregatesFilter | string
    doc?: JsonWithAggregatesFilter
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ManuscriptDocHistoryWhereInput = {
    AND?: Enumerable<ManuscriptDocHistoryWhereInput>
    OR?: Enumerable<ManuscriptDocHistoryWhereInput>
    NOT?: Enumerable<ManuscriptDocHistoryWhereInput>
    doc_id?: StringFilter | string
    version?: IntFilter | number
    client_id?: StringNullableFilter | string | null
    steps?: JsonNullableListFilter
  }

  export type ManuscriptDocHistoryOrderByWithRelationInput = {
    doc_id?: SortOrder
    version?: SortOrder
    client_id?: SortOrder
    steps?: SortOrder
  }

  export type ManuscriptDocHistoryWhereUniqueInput = {
    doc_id_version?: ManuscriptDocHistoryDoc_idVersionCompoundUniqueInput
  }

  export type ManuscriptDocHistoryOrderByWithAggregationInput = {
    doc_id?: SortOrder
    version?: SortOrder
    client_id?: SortOrder
    steps?: SortOrder
    _count?: ManuscriptDocHistoryCountOrderByAggregateInput
    _avg?: ManuscriptDocHistoryAvgOrderByAggregateInput
    _max?: ManuscriptDocHistoryMaxOrderByAggregateInput
    _min?: ManuscriptDocHistoryMinOrderByAggregateInput
    _sum?: ManuscriptDocHistorySumOrderByAggregateInput
  }

  export type ManuscriptDocHistoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ManuscriptDocHistoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<ManuscriptDocHistoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ManuscriptDocHistoryScalarWhereWithAggregatesInput>
    doc_id?: StringWithAggregatesFilter | string
    version?: IntWithAggregatesFilter | number
    client_id?: StringNullableWithAggregatesFilter | string | null
    steps?: JsonNullableListFilter
  }

  export type ManuscriptSnapshotWhereInput = {
    AND?: Enumerable<ManuscriptSnapshotWhereInput>
    OR?: Enumerable<ManuscriptSnapshotWhereInput>
    NOT?: Enumerable<ManuscriptSnapshotWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    snapshot?: JsonFilter
    createdAt?: DateTimeFilter | Date | string
    doc?: XOR<ManuscriptDocRelationFilter, ManuscriptDocWhereInput>
    doc_id?: StringFilter | string
    comments?: ManuscriptCommentListRelationFilter
  }

  export type ManuscriptSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
    doc?: ManuscriptDocOrderByWithRelationInput
    doc_id?: SortOrder
    comments?: ManuscriptCommentOrderByRelationAggregateInput
  }

  export type ManuscriptSnapshotWhereUniqueInput = {
    id?: string
  }

  export type ManuscriptSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
    doc_id?: SortOrder
    _count?: ManuscriptSnapshotCountOrderByAggregateInput
    _max?: ManuscriptSnapshotMaxOrderByAggregateInput
    _min?: ManuscriptSnapshotMinOrderByAggregateInput
  }

  export type ManuscriptSnapshotScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ManuscriptSnapshotScalarWhereWithAggregatesInput>
    OR?: Enumerable<ManuscriptSnapshotScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ManuscriptSnapshotScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    snapshot?: JsonWithAggregatesFilter
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    doc_id?: StringWithAggregatesFilter | string
  }

  export type ManuscriptCommentWhereInput = {
    AND?: Enumerable<ManuscriptCommentWhereInput>
    OR?: Enumerable<ManuscriptCommentWhereInput>
    NOT?: Enumerable<ManuscriptCommentWhereInput>
    id?: StringFilter | string
    body?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    target_id?: StringFilter | string
    user_model_id?: StringFilter | string
    doc?: XOR<ManuscriptDocRelationFilter, ManuscriptDocWhereInput>
    doc_id?: StringFilter | string
    snapshot?: XOR<ManuscriptSnapshotRelationFilter, ManuscriptSnapshotWhereInput> | null
    snapshot_id?: StringNullableFilter | string | null
  }

  export type ManuscriptCommentOrderByWithRelationInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    target_id?: SortOrder
    user_model_id?: SortOrder
    doc?: ManuscriptDocOrderByWithRelationInput
    doc_id?: SortOrder
    snapshot?: ManuscriptSnapshotOrderByWithRelationInput
    snapshot_id?: SortOrder
  }

  export type ManuscriptCommentWhereUniqueInput = {
    id?: string
  }

  export type ManuscriptCommentOrderByWithAggregationInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    target_id?: SortOrder
    user_model_id?: SortOrder
    doc_id?: SortOrder
    snapshot_id?: SortOrder
    _count?: ManuscriptCommentCountOrderByAggregateInput
    _max?: ManuscriptCommentMaxOrderByAggregateInput
    _min?: ManuscriptCommentMinOrderByAggregateInput
  }

  export type ManuscriptCommentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ManuscriptCommentScalarWhereWithAggregatesInput>
    OR?: Enumerable<ManuscriptCommentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ManuscriptCommentScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    body?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    target_id?: StringWithAggregatesFilter | string
    user_model_id?: StringWithAggregatesFilter | string
    doc_id?: StringWithAggregatesFilter | string
    snapshot_id?: StringNullableWithAggregatesFilter | string | null
  }

  export type ManuscriptDocCreateInput = {
    manuscript_model_id?: string
    user_model_id: string
    project_model_id: string
    doc: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    snapshots?: ManuscriptSnapshotCreateNestedManyWithoutDocInput
    comments?: ManuscriptCommentCreateNestedManyWithoutDocInput
  }

  export type ManuscriptDocUncheckedCreateInput = {
    manuscript_model_id?: string
    user_model_id: string
    project_model_id: string
    doc: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    snapshots?: ManuscriptSnapshotUncheckedCreateNestedManyWithoutDocInput
    comments?: ManuscriptCommentUncheckedCreateNestedManyWithoutDocInput
  }

  export type ManuscriptDocUpdateInput = {
    manuscript_model_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    project_model_id?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    snapshots?: ManuscriptSnapshotUpdateManyWithoutDocNestedInput
    comments?: ManuscriptCommentUpdateManyWithoutDocNestedInput
  }

  export type ManuscriptDocUncheckedUpdateInput = {
    manuscript_model_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    project_model_id?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    snapshots?: ManuscriptSnapshotUncheckedUpdateManyWithoutDocNestedInput
    comments?: ManuscriptCommentUncheckedUpdateManyWithoutDocNestedInput
  }

  export type ManuscriptDocCreateManyInput = {
    manuscript_model_id?: string
    user_model_id: string
    project_model_id: string
    doc: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ManuscriptDocUpdateManyMutationInput = {
    manuscript_model_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    project_model_id?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManuscriptDocUncheckedUpdateManyInput = {
    manuscript_model_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    project_model_id?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManuscriptDocHistoryCreateInput = {
    doc_id: string
    version: number
    client_id?: string | null
    steps?: ManuscriptDocHistoryCreatestepsInput | Enumerable<InputJsonValue>
  }

  export type ManuscriptDocHistoryUncheckedCreateInput = {
    doc_id: string
    version: number
    client_id?: string | null
    steps?: ManuscriptDocHistoryCreatestepsInput | Enumerable<InputJsonValue>
  }

  export type ManuscriptDocHistoryUpdateInput = {
    doc_id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    steps?: ManuscriptDocHistoryUpdatestepsInput | Enumerable<InputJsonValue>
  }

  export type ManuscriptDocHistoryUncheckedUpdateInput = {
    doc_id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    steps?: ManuscriptDocHistoryUpdatestepsInput | Enumerable<InputJsonValue>
  }

  export type ManuscriptDocHistoryCreateManyInput = {
    doc_id: string
    version: number
    client_id?: string | null
    steps?: ManuscriptDocHistoryCreatestepsInput | Enumerable<InputJsonValue>
  }

  export type ManuscriptDocHistoryUpdateManyMutationInput = {
    doc_id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    steps?: ManuscriptDocHistoryUpdatestepsInput | Enumerable<InputJsonValue>
  }

  export type ManuscriptDocHistoryUncheckedUpdateManyInput = {
    doc_id?: StringFieldUpdateOperationsInput | string
    version?: IntFieldUpdateOperationsInput | number
    client_id?: NullableStringFieldUpdateOperationsInput | string | null
    steps?: ManuscriptDocHistoryUpdatestepsInput | Enumerable<InputJsonValue>
  }

  export type ManuscriptSnapshotCreateInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc: ManuscriptDocCreateNestedOneWithoutSnapshotsInput
    comments?: ManuscriptCommentCreateNestedManyWithoutSnapshotInput
  }

  export type ManuscriptSnapshotUncheckedCreateInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc_id: string
    comments?: ManuscriptCommentUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type ManuscriptSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc?: ManuscriptDocUpdateOneRequiredWithoutSnapshotsNestedInput
    comments?: ManuscriptCommentUpdateManyWithoutSnapshotNestedInput
  }

  export type ManuscriptSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc_id?: StringFieldUpdateOperationsInput | string
    comments?: ManuscriptCommentUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type ManuscriptSnapshotCreateManyInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc_id: string
  }

  export type ManuscriptSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManuscriptSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc_id?: StringFieldUpdateOperationsInput | string
  }

  export type ManuscriptCommentCreateInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_model_id: string
    doc: ManuscriptDocCreateNestedOneWithoutCommentsInput
    snapshot?: ManuscriptSnapshotCreateNestedOneWithoutCommentsInput
  }

  export type ManuscriptCommentUncheckedCreateInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_model_id: string
    doc_id: string
    snapshot_id?: string | null
  }

  export type ManuscriptCommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    doc?: ManuscriptDocUpdateOneRequiredWithoutCommentsNestedInput
    snapshot?: ManuscriptSnapshotUpdateOneWithoutCommentsNestedInput
  }

  export type ManuscriptCommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    doc_id?: StringFieldUpdateOperationsInput | string
    snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ManuscriptCommentCreateManyInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_model_id: string
    doc_id: string
    snapshot_id?: string | null
  }

  export type ManuscriptCommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
  }

  export type ManuscriptCommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    doc_id?: StringFieldUpdateOperationsInput | string
    snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
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
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
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
    not?: InputJsonValue | JsonNullValueFilter
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

  export type ManuscriptSnapshotListRelationFilter = {
    every?: ManuscriptSnapshotWhereInput
    some?: ManuscriptSnapshotWhereInput
    none?: ManuscriptSnapshotWhereInput
  }

  export type ManuscriptCommentListRelationFilter = {
    every?: ManuscriptCommentWhereInput
    some?: ManuscriptCommentWhereInput
    none?: ManuscriptCommentWhereInput
  }

  export type ManuscriptSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ManuscriptCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ManuscriptDocCountOrderByAggregateInput = {
    manuscript_model_id?: SortOrder
    user_model_id?: SortOrder
    project_model_id?: SortOrder
    doc?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ManuscriptDocMaxOrderByAggregateInput = {
    manuscript_model_id?: SortOrder
    user_model_id?: SortOrder
    project_model_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ManuscriptDocMinOrderByAggregateInput = {
    manuscript_model_id?: SortOrder
    user_model_id?: SortOrder
    project_model_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
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
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
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

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
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
  export type JsonNullableListFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableListFilterBase>, Exclude<keyof Required<JsonNullableListFilterBase>, 'path'>>,
        Required<JsonNullableListFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableListFilterBase>, 'path'>>

  export type JsonNullableListFilterBase = {
    equals?: Enumerable<InputJsonValue> | null
    has?: InputJsonValue | null
    hasEvery?: Enumerable<InputJsonValue>
    hasSome?: Enumerable<InputJsonValue>
    isEmpty?: boolean
  }

  export type ManuscriptDocHistoryDoc_idVersionCompoundUniqueInput = {
    doc_id: string
    version: number
  }

  export type ManuscriptDocHistoryCountOrderByAggregateInput = {
    doc_id?: SortOrder
    version?: SortOrder
    client_id?: SortOrder
    steps?: SortOrder
  }

  export type ManuscriptDocHistoryAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type ManuscriptDocHistoryMaxOrderByAggregateInput = {
    doc_id?: SortOrder
    version?: SortOrder
    client_id?: SortOrder
  }

  export type ManuscriptDocHistoryMinOrderByAggregateInput = {
    doc_id?: SortOrder
    version?: SortOrder
    client_id?: SortOrder
  }

  export type ManuscriptDocHistorySumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
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

  export type ManuscriptDocRelationFilter = {
    is?: ManuscriptDocWhereInput
    isNot?: ManuscriptDocWhereInput
  }

  export type ManuscriptSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    snapshot?: SortOrder
    createdAt?: SortOrder
    doc_id?: SortOrder
  }

  export type ManuscriptSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    doc_id?: SortOrder
  }

  export type ManuscriptSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    doc_id?: SortOrder
  }

  export type ManuscriptSnapshotRelationFilter = {
    is?: ManuscriptSnapshotWhereInput | null
    isNot?: ManuscriptSnapshotWhereInput | null
  }

  export type ManuscriptCommentCountOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    target_id?: SortOrder
    user_model_id?: SortOrder
    doc_id?: SortOrder
    snapshot_id?: SortOrder
  }

  export type ManuscriptCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    target_id?: SortOrder
    user_model_id?: SortOrder
    doc_id?: SortOrder
    snapshot_id?: SortOrder
  }

  export type ManuscriptCommentMinOrderByAggregateInput = {
    id?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    target_id?: SortOrder
    user_model_id?: SortOrder
    doc_id?: SortOrder
    snapshot_id?: SortOrder
  }

  export type ManuscriptSnapshotCreateNestedManyWithoutDocInput = {
    create?: XOR<Enumerable<ManuscriptSnapshotCreateWithoutDocInput>, Enumerable<ManuscriptSnapshotUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ManuscriptSnapshotCreateOrConnectWithoutDocInput>
    createMany?: ManuscriptSnapshotCreateManyDocInputEnvelope
    connect?: Enumerable<ManuscriptSnapshotWhereUniqueInput>
  }

  export type ManuscriptCommentCreateNestedManyWithoutDocInput = {
    create?: XOR<Enumerable<ManuscriptCommentCreateWithoutDocInput>, Enumerable<ManuscriptCommentUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ManuscriptCommentCreateOrConnectWithoutDocInput>
    createMany?: ManuscriptCommentCreateManyDocInputEnvelope
    connect?: Enumerable<ManuscriptCommentWhereUniqueInput>
  }

  export type ManuscriptSnapshotUncheckedCreateNestedManyWithoutDocInput = {
    create?: XOR<Enumerable<ManuscriptSnapshotCreateWithoutDocInput>, Enumerable<ManuscriptSnapshotUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ManuscriptSnapshotCreateOrConnectWithoutDocInput>
    createMany?: ManuscriptSnapshotCreateManyDocInputEnvelope
    connect?: Enumerable<ManuscriptSnapshotWhereUniqueInput>
  }

  export type ManuscriptCommentUncheckedCreateNestedManyWithoutDocInput = {
    create?: XOR<Enumerable<ManuscriptCommentCreateWithoutDocInput>, Enumerable<ManuscriptCommentUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ManuscriptCommentCreateOrConnectWithoutDocInput>
    createMany?: ManuscriptCommentCreateManyDocInputEnvelope
    connect?: Enumerable<ManuscriptCommentWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ManuscriptSnapshotUpdateManyWithoutDocNestedInput = {
    create?: XOR<Enumerable<ManuscriptSnapshotCreateWithoutDocInput>, Enumerable<ManuscriptSnapshotUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ManuscriptSnapshotCreateOrConnectWithoutDocInput>
    upsert?: Enumerable<ManuscriptSnapshotUpsertWithWhereUniqueWithoutDocInput>
    createMany?: ManuscriptSnapshotCreateManyDocInputEnvelope
    set?: Enumerable<ManuscriptSnapshotWhereUniqueInput>
    disconnect?: Enumerable<ManuscriptSnapshotWhereUniqueInput>
    delete?: Enumerable<ManuscriptSnapshotWhereUniqueInput>
    connect?: Enumerable<ManuscriptSnapshotWhereUniqueInput>
    update?: Enumerable<ManuscriptSnapshotUpdateWithWhereUniqueWithoutDocInput>
    updateMany?: Enumerable<ManuscriptSnapshotUpdateManyWithWhereWithoutDocInput>
    deleteMany?: Enumerable<ManuscriptSnapshotScalarWhereInput>
  }

  export type ManuscriptCommentUpdateManyWithoutDocNestedInput = {
    create?: XOR<Enumerable<ManuscriptCommentCreateWithoutDocInput>, Enumerable<ManuscriptCommentUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ManuscriptCommentCreateOrConnectWithoutDocInput>
    upsert?: Enumerable<ManuscriptCommentUpsertWithWhereUniqueWithoutDocInput>
    createMany?: ManuscriptCommentCreateManyDocInputEnvelope
    set?: Enumerable<ManuscriptCommentWhereUniqueInput>
    disconnect?: Enumerable<ManuscriptCommentWhereUniqueInput>
    delete?: Enumerable<ManuscriptCommentWhereUniqueInput>
    connect?: Enumerable<ManuscriptCommentWhereUniqueInput>
    update?: Enumerable<ManuscriptCommentUpdateWithWhereUniqueWithoutDocInput>
    updateMany?: Enumerable<ManuscriptCommentUpdateManyWithWhereWithoutDocInput>
    deleteMany?: Enumerable<ManuscriptCommentScalarWhereInput>
  }

  export type ManuscriptSnapshotUncheckedUpdateManyWithoutDocNestedInput = {
    create?: XOR<Enumerable<ManuscriptSnapshotCreateWithoutDocInput>, Enumerable<ManuscriptSnapshotUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ManuscriptSnapshotCreateOrConnectWithoutDocInput>
    upsert?: Enumerable<ManuscriptSnapshotUpsertWithWhereUniqueWithoutDocInput>
    createMany?: ManuscriptSnapshotCreateManyDocInputEnvelope
    set?: Enumerable<ManuscriptSnapshotWhereUniqueInput>
    disconnect?: Enumerable<ManuscriptSnapshotWhereUniqueInput>
    delete?: Enumerable<ManuscriptSnapshotWhereUniqueInput>
    connect?: Enumerable<ManuscriptSnapshotWhereUniqueInput>
    update?: Enumerable<ManuscriptSnapshotUpdateWithWhereUniqueWithoutDocInput>
    updateMany?: Enumerable<ManuscriptSnapshotUpdateManyWithWhereWithoutDocInput>
    deleteMany?: Enumerable<ManuscriptSnapshotScalarWhereInput>
  }

  export type ManuscriptCommentUncheckedUpdateManyWithoutDocNestedInput = {
    create?: XOR<Enumerable<ManuscriptCommentCreateWithoutDocInput>, Enumerable<ManuscriptCommentUncheckedCreateWithoutDocInput>>
    connectOrCreate?: Enumerable<ManuscriptCommentCreateOrConnectWithoutDocInput>
    upsert?: Enumerable<ManuscriptCommentUpsertWithWhereUniqueWithoutDocInput>
    createMany?: ManuscriptCommentCreateManyDocInputEnvelope
    set?: Enumerable<ManuscriptCommentWhereUniqueInput>
    disconnect?: Enumerable<ManuscriptCommentWhereUniqueInput>
    delete?: Enumerable<ManuscriptCommentWhereUniqueInput>
    connect?: Enumerable<ManuscriptCommentWhereUniqueInput>
    update?: Enumerable<ManuscriptCommentUpdateWithWhereUniqueWithoutDocInput>
    updateMany?: Enumerable<ManuscriptCommentUpdateManyWithWhereWithoutDocInput>
    deleteMany?: Enumerable<ManuscriptCommentScalarWhereInput>
  }

  export type ManuscriptDocHistoryCreatestepsInput = {
    set: Enumerable<InputJsonValue>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ManuscriptDocHistoryUpdatestepsInput = {
    set?: Enumerable<InputJsonValue>
    push?: InputJsonValue | Enumerable<InputJsonValue>
  }

  export type ManuscriptDocCreateNestedOneWithoutSnapshotsInput = {
    create?: XOR<ManuscriptDocCreateWithoutSnapshotsInput, ManuscriptDocUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: ManuscriptDocCreateOrConnectWithoutSnapshotsInput
    connect?: ManuscriptDocWhereUniqueInput
  }

  export type ManuscriptCommentCreateNestedManyWithoutSnapshotInput = {
    create?: XOR<Enumerable<ManuscriptCommentCreateWithoutSnapshotInput>, Enumerable<ManuscriptCommentUncheckedCreateWithoutSnapshotInput>>
    connectOrCreate?: Enumerable<ManuscriptCommentCreateOrConnectWithoutSnapshotInput>
    createMany?: ManuscriptCommentCreateManySnapshotInputEnvelope
    connect?: Enumerable<ManuscriptCommentWhereUniqueInput>
  }

  export type ManuscriptCommentUncheckedCreateNestedManyWithoutSnapshotInput = {
    create?: XOR<Enumerable<ManuscriptCommentCreateWithoutSnapshotInput>, Enumerable<ManuscriptCommentUncheckedCreateWithoutSnapshotInput>>
    connectOrCreate?: Enumerable<ManuscriptCommentCreateOrConnectWithoutSnapshotInput>
    createMany?: ManuscriptCommentCreateManySnapshotInputEnvelope
    connect?: Enumerable<ManuscriptCommentWhereUniqueInput>
  }

  export type ManuscriptDocUpdateOneRequiredWithoutSnapshotsNestedInput = {
    create?: XOR<ManuscriptDocCreateWithoutSnapshotsInput, ManuscriptDocUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: ManuscriptDocCreateOrConnectWithoutSnapshotsInput
    upsert?: ManuscriptDocUpsertWithoutSnapshotsInput
    connect?: ManuscriptDocWhereUniqueInput
    update?: XOR<ManuscriptDocUpdateWithoutSnapshotsInput, ManuscriptDocUncheckedUpdateWithoutSnapshotsInput>
  }

  export type ManuscriptCommentUpdateManyWithoutSnapshotNestedInput = {
    create?: XOR<Enumerable<ManuscriptCommentCreateWithoutSnapshotInput>, Enumerable<ManuscriptCommentUncheckedCreateWithoutSnapshotInput>>
    connectOrCreate?: Enumerable<ManuscriptCommentCreateOrConnectWithoutSnapshotInput>
    upsert?: Enumerable<ManuscriptCommentUpsertWithWhereUniqueWithoutSnapshotInput>
    createMany?: ManuscriptCommentCreateManySnapshotInputEnvelope
    set?: Enumerable<ManuscriptCommentWhereUniqueInput>
    disconnect?: Enumerable<ManuscriptCommentWhereUniqueInput>
    delete?: Enumerable<ManuscriptCommentWhereUniqueInput>
    connect?: Enumerable<ManuscriptCommentWhereUniqueInput>
    update?: Enumerable<ManuscriptCommentUpdateWithWhereUniqueWithoutSnapshotInput>
    updateMany?: Enumerable<ManuscriptCommentUpdateManyWithWhereWithoutSnapshotInput>
    deleteMany?: Enumerable<ManuscriptCommentScalarWhereInput>
  }

  export type ManuscriptCommentUncheckedUpdateManyWithoutSnapshotNestedInput = {
    create?: XOR<Enumerable<ManuscriptCommentCreateWithoutSnapshotInput>, Enumerable<ManuscriptCommentUncheckedCreateWithoutSnapshotInput>>
    connectOrCreate?: Enumerable<ManuscriptCommentCreateOrConnectWithoutSnapshotInput>
    upsert?: Enumerable<ManuscriptCommentUpsertWithWhereUniqueWithoutSnapshotInput>
    createMany?: ManuscriptCommentCreateManySnapshotInputEnvelope
    set?: Enumerable<ManuscriptCommentWhereUniqueInput>
    disconnect?: Enumerable<ManuscriptCommentWhereUniqueInput>
    delete?: Enumerable<ManuscriptCommentWhereUniqueInput>
    connect?: Enumerable<ManuscriptCommentWhereUniqueInput>
    update?: Enumerable<ManuscriptCommentUpdateWithWhereUniqueWithoutSnapshotInput>
    updateMany?: Enumerable<ManuscriptCommentUpdateManyWithWhereWithoutSnapshotInput>
    deleteMany?: Enumerable<ManuscriptCommentScalarWhereInput>
  }

  export type ManuscriptDocCreateNestedOneWithoutCommentsInput = {
    create?: XOR<ManuscriptDocCreateWithoutCommentsInput, ManuscriptDocUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ManuscriptDocCreateOrConnectWithoutCommentsInput
    connect?: ManuscriptDocWhereUniqueInput
  }

  export type ManuscriptSnapshotCreateNestedOneWithoutCommentsInput = {
    create?: XOR<ManuscriptSnapshotCreateWithoutCommentsInput, ManuscriptSnapshotUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ManuscriptSnapshotCreateOrConnectWithoutCommentsInput
    connect?: ManuscriptSnapshotWhereUniqueInput
  }

  export type ManuscriptDocUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<ManuscriptDocCreateWithoutCommentsInput, ManuscriptDocUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ManuscriptDocCreateOrConnectWithoutCommentsInput
    upsert?: ManuscriptDocUpsertWithoutCommentsInput
    connect?: ManuscriptDocWhereUniqueInput
    update?: XOR<ManuscriptDocUpdateWithoutCommentsInput, ManuscriptDocUncheckedUpdateWithoutCommentsInput>
  }

  export type ManuscriptSnapshotUpdateOneWithoutCommentsNestedInput = {
    create?: XOR<ManuscriptSnapshotCreateWithoutCommentsInput, ManuscriptSnapshotUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ManuscriptSnapshotCreateOrConnectWithoutCommentsInput
    upsert?: ManuscriptSnapshotUpsertWithoutCommentsInput
    disconnect?: boolean
    delete?: boolean
    connect?: ManuscriptSnapshotWhereUniqueInput
    update?: XOR<ManuscriptSnapshotUpdateWithoutCommentsInput, ManuscriptSnapshotUncheckedUpdateWithoutCommentsInput>
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
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
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
    not?: InputJsonValue | JsonNullValueFilter
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

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
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

  export type ManuscriptSnapshotCreateWithoutDocInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    comments?: ManuscriptCommentCreateNestedManyWithoutSnapshotInput
  }

  export type ManuscriptSnapshotUncheckedCreateWithoutDocInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    comments?: ManuscriptCommentUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type ManuscriptSnapshotCreateOrConnectWithoutDocInput = {
    where: ManuscriptSnapshotWhereUniqueInput
    create: XOR<ManuscriptSnapshotCreateWithoutDocInput, ManuscriptSnapshotUncheckedCreateWithoutDocInput>
  }

  export type ManuscriptSnapshotCreateManyDocInputEnvelope = {
    data: Enumerable<ManuscriptSnapshotCreateManyDocInput>
    skipDuplicates?: boolean
  }

  export type ManuscriptCommentCreateWithoutDocInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_model_id: string
    snapshot?: ManuscriptSnapshotCreateNestedOneWithoutCommentsInput
  }

  export type ManuscriptCommentUncheckedCreateWithoutDocInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_model_id: string
    snapshot_id?: string | null
  }

  export type ManuscriptCommentCreateOrConnectWithoutDocInput = {
    where: ManuscriptCommentWhereUniqueInput
    create: XOR<ManuscriptCommentCreateWithoutDocInput, ManuscriptCommentUncheckedCreateWithoutDocInput>
  }

  export type ManuscriptCommentCreateManyDocInputEnvelope = {
    data: Enumerable<ManuscriptCommentCreateManyDocInput>
    skipDuplicates?: boolean
  }

  export type ManuscriptSnapshotUpsertWithWhereUniqueWithoutDocInput = {
    where: ManuscriptSnapshotWhereUniqueInput
    update: XOR<ManuscriptSnapshotUpdateWithoutDocInput, ManuscriptSnapshotUncheckedUpdateWithoutDocInput>
    create: XOR<ManuscriptSnapshotCreateWithoutDocInput, ManuscriptSnapshotUncheckedCreateWithoutDocInput>
  }

  export type ManuscriptSnapshotUpdateWithWhereUniqueWithoutDocInput = {
    where: ManuscriptSnapshotWhereUniqueInput
    data: XOR<ManuscriptSnapshotUpdateWithoutDocInput, ManuscriptSnapshotUncheckedUpdateWithoutDocInput>
  }

  export type ManuscriptSnapshotUpdateManyWithWhereWithoutDocInput = {
    where: ManuscriptSnapshotScalarWhereInput
    data: XOR<ManuscriptSnapshotUpdateManyMutationInput, ManuscriptSnapshotUncheckedUpdateManyWithoutSnapshotsInput>
  }

  export type ManuscriptSnapshotScalarWhereInput = {
    AND?: Enumerable<ManuscriptSnapshotScalarWhereInput>
    OR?: Enumerable<ManuscriptSnapshotScalarWhereInput>
    NOT?: Enumerable<ManuscriptSnapshotScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    snapshot?: JsonFilter
    createdAt?: DateTimeFilter | Date | string
    doc_id?: StringFilter | string
  }

  export type ManuscriptCommentUpsertWithWhereUniqueWithoutDocInput = {
    where: ManuscriptCommentWhereUniqueInput
    update: XOR<ManuscriptCommentUpdateWithoutDocInput, ManuscriptCommentUncheckedUpdateWithoutDocInput>
    create: XOR<ManuscriptCommentCreateWithoutDocInput, ManuscriptCommentUncheckedCreateWithoutDocInput>
  }

  export type ManuscriptCommentUpdateWithWhereUniqueWithoutDocInput = {
    where: ManuscriptCommentWhereUniqueInput
    data: XOR<ManuscriptCommentUpdateWithoutDocInput, ManuscriptCommentUncheckedUpdateWithoutDocInput>
  }

  export type ManuscriptCommentUpdateManyWithWhereWithoutDocInput = {
    where: ManuscriptCommentScalarWhereInput
    data: XOR<ManuscriptCommentUpdateManyMutationInput, ManuscriptCommentUncheckedUpdateManyWithoutCommentsInput>
  }

  export type ManuscriptCommentScalarWhereInput = {
    AND?: Enumerable<ManuscriptCommentScalarWhereInput>
    OR?: Enumerable<ManuscriptCommentScalarWhereInput>
    NOT?: Enumerable<ManuscriptCommentScalarWhereInput>
    id?: StringFilter | string
    body?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    target_id?: StringFilter | string
    user_model_id?: StringFilter | string
    doc_id?: StringFilter | string
    snapshot_id?: StringNullableFilter | string | null
  }

  export type ManuscriptDocCreateWithoutSnapshotsInput = {
    manuscript_model_id?: string
    user_model_id: string
    project_model_id: string
    doc: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ManuscriptCommentCreateNestedManyWithoutDocInput
  }

  export type ManuscriptDocUncheckedCreateWithoutSnapshotsInput = {
    manuscript_model_id?: string
    user_model_id: string
    project_model_id: string
    doc: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ManuscriptCommentUncheckedCreateNestedManyWithoutDocInput
  }

  export type ManuscriptDocCreateOrConnectWithoutSnapshotsInput = {
    where: ManuscriptDocWhereUniqueInput
    create: XOR<ManuscriptDocCreateWithoutSnapshotsInput, ManuscriptDocUncheckedCreateWithoutSnapshotsInput>
  }

  export type ManuscriptCommentCreateWithoutSnapshotInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_model_id: string
    doc: ManuscriptDocCreateNestedOneWithoutCommentsInput
  }

  export type ManuscriptCommentUncheckedCreateWithoutSnapshotInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_model_id: string
    doc_id: string
  }

  export type ManuscriptCommentCreateOrConnectWithoutSnapshotInput = {
    where: ManuscriptCommentWhereUniqueInput
    create: XOR<ManuscriptCommentCreateWithoutSnapshotInput, ManuscriptCommentUncheckedCreateWithoutSnapshotInput>
  }

  export type ManuscriptCommentCreateManySnapshotInputEnvelope = {
    data: Enumerable<ManuscriptCommentCreateManySnapshotInput>
    skipDuplicates?: boolean
  }

  export type ManuscriptDocUpsertWithoutSnapshotsInput = {
    update: XOR<ManuscriptDocUpdateWithoutSnapshotsInput, ManuscriptDocUncheckedUpdateWithoutSnapshotsInput>
    create: XOR<ManuscriptDocCreateWithoutSnapshotsInput, ManuscriptDocUncheckedCreateWithoutSnapshotsInput>
  }

  export type ManuscriptDocUpdateWithoutSnapshotsInput = {
    manuscript_model_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    project_model_id?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ManuscriptCommentUpdateManyWithoutDocNestedInput
  }

  export type ManuscriptDocUncheckedUpdateWithoutSnapshotsInput = {
    manuscript_model_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    project_model_id?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ManuscriptCommentUncheckedUpdateManyWithoutDocNestedInput
  }

  export type ManuscriptCommentUpsertWithWhereUniqueWithoutSnapshotInput = {
    where: ManuscriptCommentWhereUniqueInput
    update: XOR<ManuscriptCommentUpdateWithoutSnapshotInput, ManuscriptCommentUncheckedUpdateWithoutSnapshotInput>
    create: XOR<ManuscriptCommentCreateWithoutSnapshotInput, ManuscriptCommentUncheckedCreateWithoutSnapshotInput>
  }

  export type ManuscriptCommentUpdateWithWhereUniqueWithoutSnapshotInput = {
    where: ManuscriptCommentWhereUniqueInput
    data: XOR<ManuscriptCommentUpdateWithoutSnapshotInput, ManuscriptCommentUncheckedUpdateWithoutSnapshotInput>
  }

  export type ManuscriptCommentUpdateManyWithWhereWithoutSnapshotInput = {
    where: ManuscriptCommentScalarWhereInput
    data: XOR<ManuscriptCommentUpdateManyMutationInput, ManuscriptCommentUncheckedUpdateManyWithoutCommentsInput>
  }

  export type ManuscriptDocCreateWithoutCommentsInput = {
    manuscript_model_id?: string
    user_model_id: string
    project_model_id: string
    doc: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    snapshots?: ManuscriptSnapshotCreateNestedManyWithoutDocInput
  }

  export type ManuscriptDocUncheckedCreateWithoutCommentsInput = {
    manuscript_model_id?: string
    user_model_id: string
    project_model_id: string
    doc: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    snapshots?: ManuscriptSnapshotUncheckedCreateNestedManyWithoutDocInput
  }

  export type ManuscriptDocCreateOrConnectWithoutCommentsInput = {
    where: ManuscriptDocWhereUniqueInput
    create: XOR<ManuscriptDocCreateWithoutCommentsInput, ManuscriptDocUncheckedCreateWithoutCommentsInput>
  }

  export type ManuscriptSnapshotCreateWithoutCommentsInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc: ManuscriptDocCreateNestedOneWithoutSnapshotsInput
  }

  export type ManuscriptSnapshotUncheckedCreateWithoutCommentsInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    doc_id: string
  }

  export type ManuscriptSnapshotCreateOrConnectWithoutCommentsInput = {
    where: ManuscriptSnapshotWhereUniqueInput
    create: XOR<ManuscriptSnapshotCreateWithoutCommentsInput, ManuscriptSnapshotUncheckedCreateWithoutCommentsInput>
  }

  export type ManuscriptDocUpsertWithoutCommentsInput = {
    update: XOR<ManuscriptDocUpdateWithoutCommentsInput, ManuscriptDocUncheckedUpdateWithoutCommentsInput>
    create: XOR<ManuscriptDocCreateWithoutCommentsInput, ManuscriptDocUncheckedCreateWithoutCommentsInput>
  }

  export type ManuscriptDocUpdateWithoutCommentsInput = {
    manuscript_model_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    project_model_id?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    snapshots?: ManuscriptSnapshotUpdateManyWithoutDocNestedInput
  }

  export type ManuscriptDocUncheckedUpdateWithoutCommentsInput = {
    manuscript_model_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    project_model_id?: StringFieldUpdateOperationsInput | string
    doc?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    snapshots?: ManuscriptSnapshotUncheckedUpdateManyWithoutDocNestedInput
  }

  export type ManuscriptSnapshotUpsertWithoutCommentsInput = {
    update: XOR<ManuscriptSnapshotUpdateWithoutCommentsInput, ManuscriptSnapshotUncheckedUpdateWithoutCommentsInput>
    create: XOR<ManuscriptSnapshotCreateWithoutCommentsInput, ManuscriptSnapshotUncheckedCreateWithoutCommentsInput>
  }

  export type ManuscriptSnapshotUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc?: ManuscriptDocUpdateOneRequiredWithoutSnapshotsNestedInput
  }

  export type ManuscriptSnapshotUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doc_id?: StringFieldUpdateOperationsInput | string
  }

  export type ManuscriptSnapshotCreateManyDocInput = {
    id?: string
    name?: string
    snapshot: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type ManuscriptCommentCreateManyDocInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_model_id: string
    snapshot_id?: string | null
  }

  export type ManuscriptSnapshotUpdateWithoutDocInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ManuscriptCommentUpdateManyWithoutSnapshotNestedInput
  }

  export type ManuscriptSnapshotUncheckedUpdateWithoutDocInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ManuscriptCommentUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type ManuscriptSnapshotUncheckedUpdateManyWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    snapshot?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManuscriptCommentUpdateWithoutDocInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    snapshot?: ManuscriptSnapshotUpdateOneWithoutCommentsNestedInput
  }

  export type ManuscriptCommentUncheckedUpdateWithoutDocInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ManuscriptCommentUncheckedUpdateManyWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    snapshot_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ManuscriptCommentCreateManySnapshotInput = {
    id?: string
    body: string
    createdAt?: Date | string
    target_id: string
    user_model_id: string
    doc_id: string
  }

  export type ManuscriptCommentUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
    doc?: ManuscriptDocUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type ManuscriptCommentUncheckedUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target_id?: StringFieldUpdateOperationsInput | string
    user_model_id?: StringFieldUpdateOperationsInput | string
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