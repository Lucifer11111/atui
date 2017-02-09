<template>
  <div id="app">
    atui web
    <template v-for="(item, index) in demos">
      <component :is="item"></component>
    </template>
    <div class="markup" v-html="markup" :id="randomId">
      
    </div>
    <div class="code">
      <pre>
        <code>
          {{markup}}
        </code>
        <code>
          {{code}}
        </code>
      </pre>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// require('site/theme/static/markdown.less');
// import start from 'docs/atui/getting-started.md';
import manifest from './manifest'

const docNameArr = ['getting-started', 'introduce']
const demoDir = './Button/demo/'
const demoNameArr = ['primary']
/*
const docsReq = require.context('docs', true, /\.md/)
const demoReq = require.context('src/components', true, /\.md/)

const docs = docNameArr.map( (name) => {
  // return require(`docs/atui/${name}.md`)
  return docsReq(`./atui/${name}.md`)
})

const demos = demoNameArr.map( (name) => {
  // let modPath = demoDir + name + '.md';
  // return require(modPath)
  return demoReq(`${demoDir}${name}.md`)
})
*/

const buttonDemo = require('src/components/Table/demo/filter.md')

console.log(buttonDemo)

export default {
  name: 'app',
  components: {
    
  },
  data() {
    let randomId = 'J_vue_' + Math.random().toString(36).substring(2)
    let code = buttonDemo.code.replace(/([^\r?\n]el:\s*['"]{1})body(['"]{1})/, '$1#'+ randomId +'$2');
    return {
      demos: [],
      randomId: randomId,
      code: code,
      markup: buttonDemo.markup
    };
  },
  methods: {
    onClick() {
    },
  },
  mounted() {
    let self = this
    this.$nextTick(() => {
      let code = self.code
      eval(code)
    })
  }
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
