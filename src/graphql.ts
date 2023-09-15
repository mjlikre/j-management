
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    userName: string;
    password: string;
    lang?: Nullable<string>;
}

export class UpdateUserInput {
    id: UUID;
    password?: Nullable<string>;
    lang?: Nullable<string>;
}

export class LoginInput {
    userName: string;
    password: string;
}

export class User {
    id: UUID;
    userName: string;
    password: string;
    access: string;
    lang?: Nullable<string>;
    createdAt: DATE;
    updatedAt?: Nullable<DATE>;
}

export class UserAuth {
    id: UUID;
    token: string;
    lang?: Nullable<string>;
}

export abstract class IQuery {
    abstract user(id: UUID): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): UserAuth | Promise<UserAuth>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract login(loginInput: LoginInput): UserAuth | Promise<UserAuth>;

    abstract validate(): boolean | Promise<boolean>;

    abstract removeUser(id: UUID): Nullable<User> | Promise<Nullable<User>>;
}

export type DATE = any;
export type UUID = any;
type Nullable<T> = T | null;
