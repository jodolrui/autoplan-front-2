type Create<T> = (create: () => T) => T | void;
type Item<T> = (item: T) => void;
type Stored<T> = {
  isPredesign: boolean;
  funct: Create<T> | Item<T>;
};

type Instance<T> = {
  create: () => T;
  before: (item: T) => void;
  after: (item: T) => void;
  stored: Stored<T>[];
};

export type Builder<T> = {
  create: (funct: () => T) => void;
  before: (funct: (item: T) => void) => void;
  design: (funct: (item: T) => void) => void;
  after: (funct: (item: T) => void) => void;
  predesign: (funct: (create: () => T) => T | void) => void;
  build: () => void;
};

const instances: Instance<any>[] = [];

export function builder<T>(): Builder<T> {
  const instance: Instance<T> = {} as Instance<T>;
  instance.stored = [];
  const item = {
    create: (funct: () => T) => {
      instance.create = funct;
    },
    predesign: (funct: (create: () => T) => T | void) => {
      instance.stored.push({ isPredesign: true, funct });
    },
    before: (funct: (item: T) => void) => {
      instance.before = funct;
    },
    design: (funct: (item: T) => void) => {
      instance.stored.push({ isPredesign: false, funct });
    },
    after: (funct: (item: T) => void) => {
      instance.after = funct;
    },
    build: () => {
      let item: T | void | null = null;
      instance.stored.forEach((element: Stored<T>) => {
        if (element.isPredesign) {
          item = (element.funct as Create<T>)(instance.create);
        } else {
          if (!item) item = instance.create();
          if (item) {
            if (instance.before) instance.before(item);
            (element.funct as Item<T>)(item);
            if (instance.after) instance.after(item);
            item = null;
          }
        }
      });
    },
  };
  instances.push(instance);
  // console.log({ instances });

  return instances.at(instances.length - 1) as Instance<T>;
  // return item;
}
