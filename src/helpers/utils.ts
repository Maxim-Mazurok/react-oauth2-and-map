export class Utils {
  static capitalize = (stringValue: string): string =>
    stringValue.charAt(0).toUpperCase() + stringValue.slice(1);

  static valuedById = (
    elements: HTMLFormControlsCollection,
    id: string,
  ): string => (elements.namedItem(id) as HTMLInputElement).value;
}
