# Blocks anidados

```js
<Blocks
  :key="foo.pulse"
  :items="foo.items"
  @pressed="foo.pressed($event)"
>
  <template v-slot:my-slot-name>
    <Blocks
      :key="bar.pulse"
      :items="bar.items"
      @pressed="bar.pressed($event)"
    >
    </Blocks>
  </template>
</Blocks>
```
