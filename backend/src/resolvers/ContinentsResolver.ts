import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";
import { Continent, CreateContinentInput } from "../entities/Continent";
import { Country } from "../entities/Country";
import { validate } from "class-validator";

@Resolver()
export class ContinentsResolver {
  @Query(() => [Country], { nullable: true })
  async getContinentCountries(
    @Arg("id", () => ID) id: number,
  ): Promise<Country[] | null> {
    const continent = await Continent.findOne({
      relations: {
        countries: true,
      },
      where: {
        id,
      },
    });

    if (!continent) return null;
    return continent.countries;
  }

  @Mutation(() => Continent)
  async createContinent(
    @Arg("data", () => CreateContinentInput) data: CreateContinentInput,
  ): Promise<Continent | null> {
    const newContinent = new Continent();
    Object.assign(newContinent, data);

    const errors = await validate(data);
    if (errors.length > 0) {
      throw new Error(
        errors.map((e) => Object.values(e.constraints!)).join(", "),
      );
    } else {
      await newContinent.save();
      return newContinent;
    }
  }
}
