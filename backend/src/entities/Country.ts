import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IdInput } from "./Id";
import { Continent } from "./Continent";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

@Entity("country")
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @ManyToOne(() => Continent, (continent) => continent.countries, {
    eager: true,
  })
  @Field(() => Continent)
  continent!: Continent;

  @Column({ unique: true })
  @Field(() => String)
  iso!: string;

  @Column({ unique: true })
  @Field(() => String)
  name!: string;

  @Column({ unique: true })
  @Field()
  emoji!: string;
}

@InputType()
export class CountryCreateInput {
  @Field(() => IdInput)
  continent!: IdInput;

  @Field(() => String)
  @MinLength(2)
  @MaxLength(3)
  iso!: string;

  @Field(() => String)
  @MinLength(4)
  @MaxLength(56)
  name!: string;

  @Field(() => String)
  @IsNotEmpty()
  emoji!: string;
}
