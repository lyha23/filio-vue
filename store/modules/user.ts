import { useCookies } from '@vueuse/integrations/useCookies'
import { defineStore } from 'pinia'

const { VITE_TOKEN_KEY } = import.meta.env
const token = useCookies().get(VITE_TOKEN_KEY as string)

interface StoreUser {
  access_token: string
  info: Record<any, any>
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): StoreUser => ({
    access_token: token,
    info: {},
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {}
    },
    isLogin(): boolean {
      return this.access_token !== ''
    },
  },
  actions: {
    setInfo(info: any) {
      this.info = info || ''
    },
    setToken(token: string) {
      this.access_token = token || ''
    },
    async refreshMyInfo() {
      const resp = await this.getMyinfo()
      this.setInfo(resp.data.result)
    },
    getMyinfo(): any {
      return useAxiosApi(`/user/info`, {
        method: 'GET',
        data: {},
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
    },
  },
  persist: {
    key: 'user-content',
    storage: localStorage,
    paths: ['access_token', 'info'],
  },
})
