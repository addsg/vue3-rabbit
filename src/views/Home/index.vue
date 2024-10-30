<script setup lang="ts">
import HomeCategory from './components/HomeCategory.vue'
import HomeHot from './components/HomeHot.vue'
import HomeNew from './components/HomeNew.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomePanel from './components/HomePanel.vue'
</script>

<template>
    <div class="container">
      <HomeCategory/>
      <HomeBanner/>
    </div>
    <HomeNew/>
    <HomeHot/>
    <HomeProduct/>
    <HomePanel title="新鲜好物" sub-title="好多商品">
        <div>
            插槽
        </div>
    </HomePanel>

    <HomePanel title="人气好物" sub-title="好多商品">
        
    </HomePanel>
</template>
  