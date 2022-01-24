import { Resolver, Query } from 'type-graphql';
import {SampleModels} from "../models/SampleModels";

@Resolver()
export class SampleModelsResolver {

  private sampleModels: SampleModels[] = [
      new SampleModels("1234", "Health facility", "Microscopist", true),
      new SampleModels("5678", "Health facility", "Microscopist", false)]

  @Query(() => String)
  hello() {
    return 'world';
  }

  @Query(() => [SampleModels], { nullable: true })
  async getSampleModels() : Promise<SampleModels[]> {
    return this.sampleModels;
  }


}
