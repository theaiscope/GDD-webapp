import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class SampleModels  {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    healthFacility: string;

    @Field(() => String)
    microscopist: string;

    @Field(() => String)
    disease: boolean;
}