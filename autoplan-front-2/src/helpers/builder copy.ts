type Create<T> = (create: () => T) => T | void; //* predesign
type Item<T> = (item: T) => void; //* design
type Stored<T> = {
  isPredesign: boolean;
  funct: Create<T> | Item<T>;
};


expor typ

export type Builder<T> = {
  //* propiedades asignadas
  __create: () => T;
  __before: (item: T) => void;
  __after: (item: T) => void;
  __stored: Stored<T>[];
  //* son los métodos que se utilizarán, requieren nombre sencillo
  create: (funct: () => T) => void;
  before: (funct: (item: T) => void) => void;
  design: (funct: (item: T) => void) => void;
  after: (funct: (item: T) => void) => void;
  predesign: (funct: (create: () => T) => T | void) => void;
  build: () => void;
};

export function createBuilder<T>(): Builder<T> {
  const instance: Builder<T> = {} as Builder<T>;
  //! tengo que crearlo así haciendo uso de "instance"
  //! para que me deje acceder a las propiedades __x desde los métodos
  instance.__create = () => ({} as T);
  instance.__before = (item: T) => {};
  instance.__after = (item: T) => {};
  instance.__stored = [] as Stored<T>[];
  instance.create = function (funct: () => T) {
    instance.__create = funct;
  };
  instance.predesign = function (funct: (create: () => T) => T | void) {
    instance.__stored.push({ isPredesign: true, funct });
  };
  instance.before = function (funct: (item: T) => void) {
    instance.__before = funct;
  };
  instance.design = function (funct: (item: T) => void) {
    instance.__stored.push({ isPredesign: false, funct });
  };
  instance.after = function (funct: (item: T) => void) {
    instance.__after = funct;
  };
  instance.build = function () {
    let item: T | void | undefined = undefined;
    instance.__stored.forEach((element: Stored<T>) => {
      if (element.isPredesign) {
        item = (element.funct as Create<T>)(instance.__create as () => T);
      } else {
        if (!item) if (instance.__create) item = instance.__create();
        if (item) {
          if (instance.__before) instance.__before(item);
          (element.funct as Item<T>)(item);
          if (instance.__after) instance.__after(item);
          item = undefined;
        }
      }
    });
  };
  return instance;
}
