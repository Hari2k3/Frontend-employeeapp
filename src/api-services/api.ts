import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const baseApi = createApi({
    reducerPath: "baseApi",
    tagTypes: ['EMPLOYEES','EMPLOYEE_DETAILS'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            console.log("token",token);
            if(token){
                headers.set("Authorization",`Bearer ${token}`);
            }

            return headers
        },
    }),
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    endpoints: () =>({})    
});

export default baseApi;
