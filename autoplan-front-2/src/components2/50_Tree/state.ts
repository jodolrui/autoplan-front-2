import { defineState } from "../../components/__shared/helpers/defineState";

export function useState() {
  return defineState<{}>({});
}
