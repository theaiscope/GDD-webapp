import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class SampleModels {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  healthFacility: string;

  @Field(() => String)
  microscopist: string;

  @Field(() => String)
  disease: boolean;

  constructor(id:string, healthFacility:string, microscopist:string, disease:boolean) {
    this.id = id
    this.healthFacility = healthFacility
    this.microscopist = microscopist
    this.disease = disease
  }
}
