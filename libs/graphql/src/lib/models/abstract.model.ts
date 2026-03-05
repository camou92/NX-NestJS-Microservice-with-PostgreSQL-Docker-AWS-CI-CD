import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AbstractModel {
  @Field(() => ID)
  id!: number;
}