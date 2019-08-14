export class Utils {
  static capitalize = (stringValue: string): string =>
    stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
}
