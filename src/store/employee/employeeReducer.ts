// import { EMPLOYEE_ACTION_TYPES } from "./employee.types";
// import { type EmployeeState } from "./employee.types";
// import { type EmployeeAction } from "./employee.types";
// const initialState = {employees:[]};
// function employeeReducer(state:EmployeeState =initialState, action:EmployeeAction):EmployeeState {
//     switch(action.type){
//         case EMPLOYEE_ACTION_TYPES.DELETE:
//             return {
//                 ...state,
//                 employees:state.employees.filter((emp)=>action.payload!==emp.employee_id)
//             }
//         case EMPLOYEE_ACTION_TYPES.UPDATE:
//             return {
//                 ...state,
//                 employees:state.employees.map((emp)=>{
//                     if(action.payload.employee_id == emp.employee_id)
//                         return action.payload
//                     else
//                         return emp;
//                 })
//             }
//         case EMPLOYEE_ACTION_TYPES.ADD:
//             return{
//                 ...state,
//                 employees:state.employees.concat(action.payload)
//             }
//         default : return state;
//     }
//     return state;

// }

// export default employeeReducer;
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee,EmployeeState } from "./employee.types";

const initialState:EmployeeState={
    employees: [],
}

export const employeeSlice = createSlice({
    name:'employee',
    initialState,
    reducers:{
        addEmployee:(state,action:PayloadAction<Employee>)=>{
            console.log(action.payload)
            state.employees.push(action.payload);
        },
}});

export const {addEmployee} = employeeSlice.actions;
export default employeeSlice.reducer;