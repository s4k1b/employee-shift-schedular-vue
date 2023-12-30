import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { StoreUser } from "../typings/user"
import { initStoreFetchingProp, updateFetchingPropStatus, updateFetchingPropValue } from '@/plugins/store-utilities';
import { user$get } from '@/api/user';

export const useUserStore = defineStore('user', () => {
  const user = ref<StoreUser>(initStoreFetchingProp({name: '', email: '', phone: NaN}));

  async function fetchAndStoreUser() {
    updateFetchingPropStatus(user.value, 'pending')
    const [resp, error] = await user$get()
    if(!error) {
      updateFetchingPropStatus(user.value, 'success')
      updateFetchingPropValue(user.value, resp)
    } else {
      updateFetchingPropStatus(user.value, 'error', error)
    }
  }
  
  return {
    user,
    fetchAndStoreUser
  }
})
