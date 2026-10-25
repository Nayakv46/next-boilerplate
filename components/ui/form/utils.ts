export function getNestedError(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, part) => (acc && acc[part] ? acc[part] : undefined), obj);
}
