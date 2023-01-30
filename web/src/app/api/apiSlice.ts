import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APIURL } from '../../config'
import { logOut, RootState, setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: APIURL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async<ExtraArgs> (args:any, api:any, extraOptions:ExtraArgs) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === "PARSING_ERROR") {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token 
            api.dispatch(setCredentials({ ...(refreshResult.data  as Record<string, unknown>), user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result 
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
apiSlice.enhanceEndpoints({addTagTypes: ['Foo']})
