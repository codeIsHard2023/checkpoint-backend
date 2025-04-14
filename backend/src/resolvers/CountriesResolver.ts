import {
  Arg,
  Query,
  Resolver,
  ID,
  Mutation,
} from "type-graphql";

import { Country, CountryCreateInput } from "../entities/Country";

@Resolver()
export class CountriesResolver {
  @Mutation(() => Country)
  async createCountry(
    @Arg("data", () => CountryCreateInput) data: CountryCreateInput,
  ): Promise<Country> {
    const newCountry = new Country();
    Object.assign(newCountry, data);

    await newCountry.save();
    return newCountry;
  }

  @Query(() => [Country])
  async getAllcountries(): Promise<Country[]> {
    const countries = await Country.find();
    return countries;
  }

  @Query(() => Country, { nullable: true })
  async getCountryByIso(@Arg("iso", () => String) iso: string): Promise<Country | null> {
    const country = await Country.findOne({
      relations: {
        continent: true,
      },
      where: {
        iso,
      },
    });

    if (country) {
      return country;
    } else {
      return null;
    }
  }
  
}
