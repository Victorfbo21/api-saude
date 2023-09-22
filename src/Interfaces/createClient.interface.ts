import { IHealthProblems } from "./health-problems.interface"

export interface ICreateClient {
    name: string,
    dateOfBirth: string,
    gender: string,
    healthProblems: [IHealthProblems]
}