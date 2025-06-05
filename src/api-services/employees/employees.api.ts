import baseApi from "../api";
// import type { LoginResponse,LoginPayload } from "./types";
import type { Employee } from "../../store/employee/employee.types";
import { CreateEmployee } from "../../pages/create.employee/CreateEmployee";
import { EditEmployee } from "../../pages/edit.employee/EditEmployee";
export const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getEmployeeList:builder.query<Employee[],void>({
            query:()=>'/employee',
            providesTags:['EMPLOYEES']
        }),
        deleteEmployee:builder.mutation({
            query:({id})=>({
                url:`/employee/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['EMPLOYEES']
        }),
        CreateEmployee:builder.mutation({
            query:(payload)=>({
                url:'/employee',
                method:'POST',
                body: payload
            }),
            invalidatesTags:['EMPLOYEES']
        }),
        EditEmployee: builder.mutation({
    query: ({ id, payload }) => ({
        url: `/employee/${id}`,
        method: 'PUT',
        body: payload
    }),
    invalidatesTags: ['EMPLOYEES']
}),
    getEmployeeById: builder.query<Employee, number>({
  query: (id) => `/employee/${id}`,
  providesTags: ['EMPLOYEES']
})
    })
})

export const {useGetEmployeeListQuery,useDeleteEmployeeMutation,useCreateEmployeeMutation,useEditEmployeeMutation,useGetEmployeeByIdQuery}  = employeeApi;