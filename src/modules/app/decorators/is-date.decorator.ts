import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
class IsDateConstraint implements ValidatorConstraintInterface {
  validate(dateString: any): boolean {
    const date = new Date(dateString);
    if (Object.prototype.toString.call(date) === '[object Date]') {
      if (isNaN(date.getTime())) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}

export function IsDate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateConstraint,
    });
  };
}