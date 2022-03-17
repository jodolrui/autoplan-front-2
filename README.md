# Wall anidados

```js
<Wall
  :key="navbar.key"
  :items="navbar.items"
  @pressed="navbar.pressed($event)"
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
