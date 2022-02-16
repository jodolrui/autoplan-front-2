# Wall anidados

```js
<Wall
  :key="foo.pulse"
  :items="foo.items"
  @pressed="foo.pressed($event)"
>
  <template v-slot:my-slot-name>
    <Wall
      :key="bar.pulse"
      :items="bar.items"
      @pressed="bar.pressed($event)"
    >
    </Wall>
  </template>
</Wall>
```
