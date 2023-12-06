const EMAIL_REGEX = "(^$|^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$)"

export const requiredValidator = (value: any): ValidationError | undefined | string => {
  if (typeof value === "string") {
    return value.trim() !== "" ? undefined : "REQUIRED";
  } else if (typeof value === "number" || typeof value === "boolean") {
    return undefined;
  } else if (Array.isArray(value) && !value.length) {
    return "REQUIRED";
  } else {
    return value ? undefined : "REQUIRED";
  }
};

export const emailValidator = (value: string): ValidationError | undefined => {

  if (value) {
    return value.match(EMAIL_REGEX) ? undefined : "INVALID_EMAIL";
  }

  return undefined;
}

export const equalsValidator = (valueToMatch: any) => (value: any): ValidationError | undefined => {
  return valueToMatch === value ? undefined : "DOES_NOT_EQUAL"
}

export const anyValidator = (...validators: any) => (value: ValidationError | undefined) =>
    validators.reduce((error: ValidationError | undefined, validator: any) => error || validator(value), undefined)

export type ValidationError = "REQUIRED" | "INVALID_EMAIL" | "DOES_NOT_EQUAL";

