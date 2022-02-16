//* avoid returning proxies instead of target values
export default function avoidProxy(variable: any) {
  if (typeof variable === "object" && variable !== null)
    variable = JSON.parse(JSON.stringify(variable));
  return variable;
}
