export type FlattenUnion<T> = T extends infer U ? U : never;

export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I,
) => void
    ? I
    : never;

export type KeysUnder<T, K extends PropertyKey> = T extends object
    ? {
          [P in keyof T]-?: (P extends K ? keyof T[P] : never) | KeysUnder<T[P], K>;
      }[keyof T]
    : never;

export type PathInto<T extends Record<string, unknown>> = keyof {
    [K in keyof T as T[K] extends string
        ? K
        : T[K] extends Record<string, unknown>
        ? `${K & string}.${PathInto<T[K]> & string}`
        : never]: unknown;
};
