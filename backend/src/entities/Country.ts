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


@Entity("country")
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @ManyToOne(() => Continent, (continent) => continent.countries, { eager: true })
  @Field(() => Continent)
  continent!: Continent;

  @Column()
  @Field(() => String)
  iso!: string;

  @Column({unique: true})
  @Field(() => String, )
  name!: string;

  @Column({unique: true})
  @Field()
  emoji!: string;
}

@InputType()
export class CountryCreateInput {
  @Field(() => IdInput)
  continent!: IdInput;

  @Field(() => String)
  iso!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  emoji!: string;
}