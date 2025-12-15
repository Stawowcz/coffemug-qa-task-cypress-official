import { faker } from "@faker-js/faker";
import { RegisterData } from "@typing/user-data";

export class UserDataGenerator {
  public static generateRegisterData(
    overrides: Partial<RegisterData> = {},
  ): RegisterData {
    const password = faker.internet.password({ length: 10, prefix: "Test" });

    const defaultData: RegisterData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password,
      confirmPassword: password,
      gender: faker.helpers.arrayElement(["male", "female"]),
    };

    return { ...defaultData, ...overrides };
  }
}
