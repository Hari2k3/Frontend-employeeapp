/**
 * Type definitions for the employee domain in the Redux store.
 * This file contains:
 * - Employee data structure and related types (Address, Role, Status)
 * - Redux action types and action interfaces
 * - State interface for the employee slice
 */

export interface Address {
  house_no: string;
  line1: string;
  line2: string;
  pincode: string;
}

export const EmployeeRole = {
  UI: "UI",
  UX: "UX",
  DEVELOPER: "DEVELOPER",
  HR: "HR",
} as const;

export type Role = (typeof EmployeeRole)[keyof typeof EmployeeRole];

export const EmployeeStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PROBATION: "PROBATION",
} as const;

export type Status = (typeof EmployeeStatus)[keyof typeof EmployeeStatus];

// export interface Employee {
//   employee_id: string;
//   email: string;
//   name: string;
//   age: number;
//   address: Address;
//   password: string;
//   role: string;
//   dateofjoining: Date;
//   experience: number;
//   status: string;
//   departmentId: number | string;
// }
export interface Employee{
  name: string,
        email:string,
        age: number,
        employee_id: string,
        role: string,
        dateofjoining: string,
        status: string,
        experience: number,
        dept_id: number,
        password:string,
        address: {
            house_no: string,
            line1: string,
            line2: string,
            pincode: string
}}

export const EMPLOYEE_ACTION_TYPES = {
    ADD: "employee/ADD",
  DELETE: "employee/DELETE",
  UPDATE: "employee/UPDATE",
} as const;

export type EmployeeActionTypes =
  (typeof EMPLOYEE_ACTION_TYPES)[keyof typeof EMPLOYEE_ACTION_TYPES];

export interface EmployeeState {
  employees: Employee[];
}

export interface DeleteEmployeeAction {
  type: typeof EMPLOYEE_ACTION_TYPES.DELETE;
  payload: string; // employee id
}

export interface UpdateEmployeeAction {
  type: typeof EMPLOYEE_ACTION_TYPES.UPDATE;
  payload: Employee;
}

export interface AddEmployeeAction {
  type: typeof EMPLOYEE_ACTION_TYPES.ADD;
  payload: Employee;
}
export type EmployeeAction = DeleteEmployeeAction | UpdateEmployeeAction | AddEmployeeAction;