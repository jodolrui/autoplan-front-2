type Create<T> = (create: () => T) => T | void; //* predesign
type Item<T> = (item: T) => void; //* design
type Stored<T> = {
  isPredesign: boolean;
  funct: Create<T> | Item<T>;
};

export type Data<T> = {
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

export function createBuilder<T>(): Builder<T> {
  const data: Data<T> = {
    create: () => ({} as T),
    before: (item: T) => {},
    after: (item: T) => {},
    stored: [] as Stored<T>[],
  };
  const instance: Builder<T> = {
    create: function (funct: () => T) {
      data.create = funct;
    },
    predesign: function (funct: (create: () => T) => T | void) {
      data.stored.push({ isPredesign: true, funct });
    },
    before: function (funct: (item: T) => void) {
      data.before = funct;
    },
    design: function (funct: (item: T) => void) {
      data.stored.push({ isPredesign: false, funct });
    },
    after: function (funct: (item: T) => void) {
      data.after = funct;
    },
    build: function () {
      let item: T | void | undefined = undefined;
      data.stored.forEach((element: Stored<T>) => {
        if (element.isPredesign) {
          item = (element.funct as Create<T>)(data.create as () => T);
        } else {
          if (!item) if (data.create) item = data.create();
          if (item) {
            if (data.before) data.before(item);
            (element.funct as Item<T>)(item);
            if (data.after) data.after(item);
            item = undefined;
          }
        }
      });
    },
  };
  return instance;
}
