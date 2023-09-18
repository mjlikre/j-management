
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateDebtPaymentInput {
    amount: number;
    workerId: UUID;
}

export class CreateDebtInput {
    amount: number;
    workerId: UUID;
}

export class SalaryInput {
    salaryPaid: number;
    salaryAmount: number;
    workerId: UUID;
}

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

export class CreateWorkerInput {
    firstName: string;
    lastName: string;
    phone?: Nullable<string>;
    salaryAmount: number;
}

export class UpdateWorkerInput {
    id: UUID;
    salaryAmount?: Nullable<number>;
    debtAmount?: Nullable<number>;
    debtPaymentAmount?: Nullable<number>;
}

export class DebtPayment {
    id: UUID;
    amount: number;
    createdAt: DATE;
}

export abstract class IQuery {
    abstract getWorkerDebtPayments(workedId: UUID): DebtPayment[] | Promise<DebtPayment[]>;

    abstract getWorkerDebts(workerId: UUID): Debt[] | Promise<Debt[]>;

    abstract getWorkerSalaries(workedId: UUID): Salary[] | Promise<Salary[]>;

    abstract user(id: UUID): User | Promise<User>;

    abstract validateUser(): User | Promise<User>;

    abstract workers(): Worker[] | Promise<Worker[]>;

    abstract worker(id: UUID): Nullable<Worker> | Promise<Nullable<Worker>>;
}

export abstract class IMutation {
    abstract createDebtPayment(createDebtPaymentInput: CreateDebtPaymentInput): DebtPayment | Promise<DebtPayment>;

    abstract createDebt(createDebtInput: CreateDebtInput): Debt | Promise<Debt>;

    abstract createSalary(salaryInput: SalaryInput): Salary | Promise<Salary>;

    abstract createUser(createUserInput: CreateUserInput): UserAuth | Promise<UserAuth>;

    abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract login(loginInput: LoginInput): UserAuth | Promise<UserAuth>;

    abstract removeUser(id: UUID): Nullable<User> | Promise<Nullable<User>>;

    abstract createWorker(createWorkerInput: CreateWorkerInput): Worker | Promise<Worker>;

    abstract updateWorker(updateWorkerInput: UpdateWorkerInput): Worker | Promise<Worker>;

    abstract removeWorker(id: UUID): Nullable<Worker> | Promise<Nullable<Worker>>;

    abstract updateWorkerDebt(id: UUID): Worker | Promise<Worker>;
}

export class Debt {
    id: UUID;
    amount: number;
    createdAt: DATE;
}

export class Salary {
    id: UUID;
    salaryPaid: number;
    salaryAmount: number;
    createdAt: DATE;
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

export class Worker {
    id?: Nullable<UUID>;
    firstName: string;
    lastName: string;
    phone?: Nullable<string>;
    createdAt: DATE;
    updatedAt?: Nullable<DATE>;
    debtAmount?: Nullable<number>;
    salaryAmount: number;
    debtPaymentAmount: number;
    debt: Debt[];
    salary: Salary[];
    debtPayment: DebtPayment[];
}

export type DATE = any;
export type UUID = any;
type Nullable<T> = T | null;
