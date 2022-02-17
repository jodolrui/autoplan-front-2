import { Ref, ref, reactive, watch } from "vue";
import _ from "lodash";

export type Brick = {
  code?: string;
  caption?: string;
  row?: number;
  col?: number;
  rowSpan?: number;
  colSpan?: number;
  icon?: string;
  classes?: { [key: string]: any };
  style?: { [key: string]: any };
  click?: () => void;
  __click?: () => void; //* click() + wall.refresh()
  slot?: string;
  div?: {
    classes?: { [key: string]: any };
    style?: { [key: string]: any };
    html: string;
  };
};

export type Wall = {
  pulse: number;
  classes: { [key: string]: any };
  style: { [key: string]: any };
  items: Brick[];
  refresh: () => void;
};

export type WallConfig = {
  classes: { [key: string]: any };
  style: { [key: string]: any };
  items: Brick[];
  refresh?: () => void;
};

const walls: Wall[] = [];
//* canRefresh sirve para evitar refrescos recursivos
const canRefresh: boolean[] = [];

export function defineWall(config: WallConfig): Wall {
  const wall: Wall = reactive({
    pulse: 0,
    items: config.items ? config.items : [],
    classes: config.classes ? config.classes : {},
    style: config.style ? config.style : {},
    refresh: config.refresh ? config.refresh : () => {},
  });

  wall.items.forEach((brick: Brick) => {
    if (brick.click)
      brick.__click = () => {
        if (brick.click) brick.click();
        wall.refresh();
      };
    else brick.__click = () => {};
  });

  if (wall.refresh) wall.refresh();

  walls.push(wall);
  canRefresh.push(true);
  const index = walls.length - 1;

  //* _.cloneDeep(wall) reacciona a cualquier cambio en todo el objeto wall
  watch(
    () => _.cloneDeep(wall),
    () => {
      if (canRefresh[index]) {
        //* desactivamos el refresco
        canRefresh[index] = false;
        if (wall.refresh) wall.refresh();
        //* activamos el refresco
        canRefresh[index] = true;
      }
    },
  );

  return <Wall>walls.at(walls.length - 1);
}
