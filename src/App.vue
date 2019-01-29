<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <div>{{33.444 | currency}}</div>
      <div>{{1548311700000 | date}}</div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
