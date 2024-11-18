import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { findNewCartListAPI, delCartAPI, insertCartAPI } from "@/apis/cart";


export const useCartStore = defineStore('cart',() => {
    const userStore = useUserStore()

    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])

    //获取最新购物车列表
    const updateNewList = async () =>{
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }

    const addCart = async (goods) =>{
        const {skuId, count} = goods
        if(isLogin){
            await insertCartAPI({skuId, count}) 
            updateNewList()
            
        }else{
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if(item){
                item.count ++
            }else{
                cartList.value.push(goods)
            }
        }
    }

    const delCart = async (skuId) =>{
        if(isLogin.value){
            await delCartAPI([skuId])
            updateNewList()
        }else{
            const idx = cartList.value.findIndex((item)=> skuId === item.skuId)
            cartList.value.splice(idx,1)
        }

    }
    const singleCheck = (skuId,selected)=>{
        const item = cartList.value.find((item)=>item.skuId === skuId)
        item.selected = selected
    }

    const allCheck = (selected)=>{
        cartList.value.forEach(item => item.selected = selected)
    }

    const allCount = computed(()=> cartList.value.reduce((a,c)=>a + c.count,0))

    const allPrice = computed(()=> cartList.value.reduce((a,c)=> a + c.count * c.price,0))
    
    const isAll = computed(()=> cartList.value.every((item)=>item.selected))

    //已选择数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a,c) => a + c.count,0))
    //已选择商品总价
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a,c) => a + c.count * c.price,0))

    return {
        cartList,
        allPrice,
        allCount,
        isAll,
        selectedCount,
        selectedPrice,
        allCheck,
        addCart,
        delCart,
        singleCheck
    }
}, {
    persist: true
})