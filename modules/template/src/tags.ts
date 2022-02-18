import { Tags } from "@focuson/fetcher";
import { MakeAEqualsBProps, nameLensFn, NameLensFn, queryParamsFor } from "./template";
import { Lens, Optional } from "@focuson/lens";

export interface TagOps<Main, Details> {
  queryParam: ( ...names: (keyof Details)[] ) => ( m: Main ) => string
  tags: ( ...names: (keyof Details)[] ) => ( m: Main ) => Tags
}

export function tagOps<Main,Details>(lens: Optional<Main, Details>, props: MakeAEqualsBProps): TagOps<Main, Details>{
  return {queryParam: queryParamsFor(lens, {}), tags: findTagsFor(lens)}

}

export const findTagsFor = <Main, Details> ( lens: Optional<Main, Details> ) => ( ...names: (keyof Details)[] ): ( m: Main ) => Tags =>
  findTags ( nameLensFn ( lens ) ) ( ...names.map ( n => n.toString () ) )

export const findTags = <Main> ( nameFn: NameLensFn<Main, string> ) => ( ...names: string[] ): ( m: Main ) => Tags =>
  main => names.map ( nameFn ).map ( opt => opt.getOption ( main ) )

