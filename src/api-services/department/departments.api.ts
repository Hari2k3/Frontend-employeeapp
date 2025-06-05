import baseApi from "../api";
export const departmentApi = baseApi.injectEndpoints({
    endpoints: (builder) =>({
        getDepartmentList: builder.query<any,void>({
            query: () => '/department'
        })
    })
        
})

export const { useGetDepartmentListQuery} = departmentApi