import {databaseClient} from "./firebaseService";
import {query, ref} from "firebase/database";

export async function GetDataAsObject(container: string): Promise<string> {
  return query(ref(databaseClient, container)).toJSON()
}
