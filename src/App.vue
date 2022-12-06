<template>
  <Test/>
  <SubdirectoryVueFile/>
</template>

<script lang="ts">
import Vue from 'vue';
import Test from '@/test';
import SubdirectoryVueFile from '@/subdirectory/subdirectory-vue-file';

export default Vue.extend({
  components: {
    Test,
    SubdirectoryVueFile
  },
});
</script>

<style></style>