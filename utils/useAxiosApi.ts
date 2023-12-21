// import { useAxios } from '@vueuse/integrations/useAxios'
// import axios, { type AxiosRequestConfig } from 'axios'
// import { useUserStore } from '~/store/modules/user'

// const API_BASE_URL = ''

// // create an axios instance
// const instance = axios.create({
//   withCredentials: false,
//   timeout: 5000,
// })

// // request interceptor
// instance.interceptors.request.use(
//   (config) => {
//     config.baseURL = 'http://localhost:8000'
//     // do something before request is sent
//     // const token = store.state.user.token;

//     // if (token) {
//     //   // let each request carry token
//     //   config.headers = {
//     //     ...config.headers,
//     //     Authorization: `Bearer ${token}`
//     //   };
//     // }
//     return config
//   },
//   (error) => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   },
// )

// // response interceptor
// instance.interceptors.response.use(
//   (response) => {
//     const res = response.data
//     // if the custom code is not 200, it is judged as an error.
//     if (res.code !== 200) {
//       console.debug(res.msg)
//       // 412: Token expired;
//       if (res.code === 412) {
//         // store.dispatch('user/userLogout');
//       }
//       return Promise.reject(res.msg || 'Error')
//     }
//     else {
//       return res
//     }
//   },
//   (error) => {
//     console.log(`err${error}`)
//     console.debug(error.message)
//     return Promise.reject(error.message)
//   },
// )

// /**
//  * reactive useFetchApi
//  */
// export default async function useAxiosApi(url: string, config: AxiosRequestConfig) {
//   const userStore = useUserStore()
//   config.baseURL = `${API_BASE_URL}`
//   if (userStore.isLogin) {
//     config.headers = {
//       ...config.headers,
//       Authorization: `${userStore.access_token}`,
//     }
//   }
//   const resp = (await useAxios(url, config)).response.value
//   console.log('%c [ resp ]-66', 'font-size:13px; background:pink; color:#bf2c9f;', resp)
//   return resp
// }
