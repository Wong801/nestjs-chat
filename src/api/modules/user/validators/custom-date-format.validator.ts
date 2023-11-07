import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsDateFormat(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any) {
          const [day, month, year] = value?.split(' ').map(Number) ?? [];
          return (
            !isNaN(day) &&
            !isNaN(month) &&
            !isNaN(year) &&
            day >= 1 &&
            day <= 31 &&
            month >= 1 &&
            month <= 12 &&
            year >= 1900 &&
            year <= 9999
          );
        },
      },
    });
  };
}
