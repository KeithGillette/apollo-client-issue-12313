import {Type} from "@angular/core";

/** Remove properties that are functions */
export type OmitMethodKeys<T> = Pick<T, ({ [P in keyof T]: T[P] extends Type<T> ? never : P })[keyof T]>;
