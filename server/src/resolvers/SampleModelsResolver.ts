import { Resolver, Query } from "type-graphql";

@Resolver()
export class SampleModelsResolver {
  @Query(() => String)
  hello() {
    return "world";
  }
}