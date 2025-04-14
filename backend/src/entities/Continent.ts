import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./Country";
import { ID, ObjectType, Field, InputType } from "type-graphql";

@Entity("continent")
@ObjectType()
export class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @OneToMany(() => Country, (country) => country.continent)
  @Field(() => [Country])
  countries!: Country[];

  @Column({unique: true})
  @Field(() => String)
  name!: string;
  
}

@InputType()
export class CreateContinentInput {
  @Field()
  name!: String;
}

