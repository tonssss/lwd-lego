<template>
  <hello msg="hello worlds" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hello from './components/Hello'
export default defineComponent({
  name: 'App',
  components:{
    Hello
  }
})
</script>
