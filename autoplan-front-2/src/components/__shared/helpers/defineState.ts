import { getCurrentInstance } from "vue";

export function defineState<T>(defaultValue: T): T {
  const gi = getCurrentInstance()?.glueInstance;
  const isFirstAccess: boolean =
    Object.keys(gi?.exposed()).length === 0 &&
    Object.getPrototypeOf(gi?.exposed()) === Object.prototype;
  if (isFirstAccess) gi?.expose(defaultValue);
  return getCurrentInstance()?.glueInstance.exposed();
}
