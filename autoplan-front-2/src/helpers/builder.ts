type Predesign<T> = (create: () => T) => T | void;
type Design<T> = (item: T) => void;
type Batch<T> = {
  isPredesign: boolean;
  funct: Predesign<T> | Design<T>;
};

export type Data<T> = {
  create: () => T;
  before: (item: T) => void;
  after: (item: T) => void;
  batch: Batch<T>[]; //* almacena funciones predesign y design
};

//* create: función *común* creadora de objetos, si queremos pasarle siempre el mismo objeto pasarle "() => objeto"
//* predesign: función configuradora de objetos recibiendo como argumento la función creadora de objetos
//*     y devolviendo (return) el objeto creado para pasarlo a las funciones siguientes
//*     sirve para casos donde la creación de objetos necesite pasarle argumentos a la función creadora
//* before: función *común* configuradora de objetos que se ejecuta antes de cada "design" recibiendo como argumento el objeto ya creado
//* design: función configuradora de objetos recibiendo como argumento el objeto ya creado
//* after: función *común* configuradora de objetos que se ejecuta después de cada "design" recibiendo como argumento el objeto ya creado
//* build: función *común* que ejecuta todo el batch de funciones predesign y design, debe ejecutarse al final
export type Builder<T> = {
  create: (funct: () => T) => void;
  before: (funct: (item: T) => void) => void;
  design: (funct: (item: T) => void) => void;
  after: (funct: (item: T) => void) => void;
  predesign: (funct: (create: () => T) => T | void) => void;
  build: () => void;
};

export function createBuilder<T>(): Builder<T> {
  const data: Data<T> = {
    create: () => ({} as T),
    before: (item: T) => {},
    after: (item: T) => {},
    batch: [] as Batch<T>[],
  };
  const instance: Builder<T> = {
    create: function (funct: () => T) {
      data.create = funct;
    },
    predesign: function (funct: (create: () => T) => T | void) {
      data.batch.push({ isPredesign: true, funct });
    },
    before: function (funct: (item: T) => void) {
      data.before = funct;
    },
    design: function (funct: (item: T) => void) {
      data.batch.push({ isPredesign: false, funct });
    },
    after: function (funct: (item: T) => void) {
      data.after = funct;
    },
    build: function () {
      let item: T | void | undefined = undefined;
      //* recorremos las funciones predesign y design
      data.batch.forEach((element: Batch<T>) => {
        if (element.isPredesign) {
          item = (element.funct as Predesign<T>)(data.create as () => T);
        } else {
          if (!item) if (data.create) item = data.create();
          if (item) {
            if (data.before) data.before(item);
            (element.funct as Design<T>)(item);
            if (data.after) data.after(item);
            item = undefined;
          }
        }
      });
    },
  };
  return instance;
}
