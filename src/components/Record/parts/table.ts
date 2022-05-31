import { defineComponent, ref, computed, watch, reactive } from "vue";
import { expose, exposed } from "@jodolrui/glue";
import { useState } from "../state";
import { Slot, Rack, useRack, useSlot } from "@jodolrui/racket";
import { Field, RecordBase } from "../../shared/interfaces/dataInterfaces";
import { createBuilder } from "../../shared/helpers/builder";
import { useCurrent } from "../../shared/stores/useCurrent";
//! los controles Cell y Edit se cargan desde el main.ts principal

export default defineComponent({
  emits: ["updated"],
  setup(props, context) {
    const state = useState();
    const current = useCurrent();
    //* transmitimos el pulse hacia atrás
    //! si no pasamos el pulse hacia atrás el edit-box no responde
    //! pero si lo dejo monta toda la tabla con cada nueva selección
    watch(state.tablePulse, () => {
      context.emit("updated");
    });

    state.table = reactive(useRack("table"));
    let { setup } = state.table;
    setup = () => {
      //* al seleccionarse un campo tenemos que refrescar
      watch(
        () => current.selected.field,
        () => {
          state.table.refreshAll();
          state.tablePulse.value++;
        },
      );
    };

    const { create, design, after, build } = createBuilder<Rack>();

    create(() => state.table);
    after((rack: Rack) => {
      rack.mount();
    });

    design((rack) => {
      let { style } = rack;
      style.set("display", "grid");
      style.set("grid-template-columns", "1fr 1fr");

      const { create, before, design, after, build } = createBuilder<Slot>();

      create(useSlot);
      before((slot: Slot) => {
        const { classes } = slot;
      });
      after((slot: Slot) => {
        slot.mount(rack);
      });

      state.fields.forEach((field: Field, i: number) => {
        //* label
        design((slot) => {
          const elementId: string = `${state.record.__id}_${field.key}_label`;
          slot.id = elementId;
          slot.caption = field.label?.caption as string;
          slot.component = "Cell";
          let { classes, style } = slot;
          // if (i === 0) classes.set("field-first", true);
          style.set("grid-area", `${i + 1} / 1`);
          slot.clicked = () => {
            current.setSelected(null, null, null);
          };
        });

        //* value
        design((slot) => {
          const elementId: string = `${state.record.__id}_${field.key}_value`;
          slot.id = elementId;
          slot.caption = !state.record[field.key].units
            ? state.record[field.key].value
            : `${state.record[field.key].value} ${
                state.record[field.key].units
              }`;
          slot.component = "Cell";
          let { classes, style, vars } = slot;
          style.set("grid-area", `${i + 1} / 2`);
          vars.set("record", state.record);
          vars.set("field", field);
          slot.setup = () => {
            watch(
              () => current.selected,
              () => {
                if (
                  current.selected.slot &&
                  current.selected.slot.id === slot.id
                ) {
                  slot.classes.set("selected", true);
                  slot.component = "Edit";
                } else {
                  slot.classes.delete("selected");
                  slot.component = "Cell";
                }
                //! no he tenido más remedio que añadir un pulse
                current.pulse++;
              },
            );
          };
          slot.clicked = () => {
            current.setSelected(vars.get("record"), vars.get("field"), slot);
            current.keyboardOn = true;
          };
        });
      });

      build();
    });

    build();
  },
});
