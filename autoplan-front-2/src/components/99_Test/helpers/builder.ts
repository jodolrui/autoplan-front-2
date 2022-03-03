type Create<T> = (create: () => T) => T | void;
type Item<T> = (item: T) => void;
type Stored<T> = {
  isPredesign: boolean;
  funct: Create<T> | Item<T>;
};

export type Builder<T> = {
  create: (funct: () => T) => void;
  before: (funct: (item: T) => void) => void;
  design: (funct: (item: T) => void) => void;
  after: (funct: (item: T) => void) => void;
  predesign: (funct: (create: () => T) => T | void) => void;
  build: () => void;
  __create: () => T;
  __before: (item: T) => void;
  __after: (item: T) => void;
  __stored: Stored<T>[];
};

//! puede que almacenarlos no haga falta
const builders: Builder<any>[] = [];

export function createBuilder<T>(): Builder<T> {
  const instance: Builder<T> = {} as Builder<T>;
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

  builders.push(instance);
  // console.log({ builders });

  // return builders.at(builders.length - 1) as Builder<T>;
  return instance;
}
