# Wall anidados

```js
<Wall
  :key="foo.key"
  :items="foo.items"
  @pressed="foo.pressed($event)"
>
  <template v-slot:my-slot-name>
    <Wall
      :key="bar.key"
      :items="bar.items"
      @pressed="bar.pressed($event)"
    >
    </Wall>
  </template>
</Wall>
```
