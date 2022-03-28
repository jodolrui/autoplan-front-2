import { getCurrentInstance, reactive } from "vue";

type Exposed = [{ [key: string]: any }];

export function defineState<T>(defaultValue: T | {}): T {
  const gi = getCurrentInstance()?.glueInstance;
  const isEmpty: boolean =
    Object.keys(gi?.exposed()).length === 0 &&
    Object.getPrototypeOf(gi?.exposed()) === Object.prototype;
  if (isEmpty) {
    gi?.expose(defaultValue as Exposed);
  }
  return getCurrentInstance()?.glueInstance.exposed();
}
