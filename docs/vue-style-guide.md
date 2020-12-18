# Vue Component Style Guide

## TypeScript
All component should have the attribute `lang="ts"` so it will be interpreted as TypeScript. Currently, `strict` is set to `false` in the `tsconfig.json` so you don't have to type the component if you are not experienced with TypeScript. For more information, see the [TypeScript Docs](/docs/typescript.md)

## Component Composition
```JavaScript
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

export default class [Namespace][Object] extends Vue {}
</script>

<template>
<template/>

<style lang="scss" scoped>
</style>
```

Normally Vue's elements are orderd template-script-style. However, this lead to poor readablity and developers scroll up then down the file just to set some styles for example. The relationship between styles and scripts are minimal if at all, so why have these in this order? It makes more sense to have your components ordered scripts-template-styles. This is because the template code relates to both scripts and styles. "Why not have styles first?" We both know 99% of the time you are viewing a component, it's for the script, not styles.

The codebase also will be using Class Component Syntax over Vue's Vanillia Component Syntax. This is because a object based component is pure maddness.

## Class Component Naming Schema
In the example above of a class component, you can see the class's name is `[Namespace][object]`. This is not literal and should be replaced with the proper name. The namespace part relates to the overall scope of that component and match the folder name while object refers to a item that is apart of that namespace. Here are some examples:

### Components
```
components/User/Avatar => UserAvatar
components/User/index => User
```

### Pages
```
pages/index => PageIndex
pages/about => PageAbout
pages/session/watch => PageSessionWatch
```

### Layouts
```
layouts/default => LayoutDefault
layouts/dashboard => LayoutDashboard
```

#### Note About Component Naming
As you can see in the examples above, Component Classes are the only ones to not add it's inital folder name to the class name. This is because Component is a longish word that even I have got tired of typing just in this document.

## v-for
For the most part, Vue's `v-for` attribute should only be used on `<template>` elements. Having it this way may add a additional 2 lines of code, but it is better for readability and allows for more control over the element actually being iterated.

