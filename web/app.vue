<template>
  <div id="app">
    atui web
    <start :class="['markdown']"></start>
  </div>
</template>

<script>
import Vue from 'vue';
// require('site/theme/static/markdown.less');
import start from 'docs/atui/getting-started.md';

export default {
  name: 'app',
  components: {
    start
  },
  data() {
    return {
      apps: [
        'tab1', 'tab2',
      ],
    };
  },
  methods: {
    onClick() {
      console.log(111);
      this.apps.splice(0, 1);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
</style>
