import { isMainPage, isModalPage, MainPageD, PageD } from "../common/pageD";
import { TSParams } from "./config";
import { domainName, domainsFileName, emptyFileName, emptyName, pageComponentName, renderFileName, sampleName, samplesFileName } from "./names";
import { parsePath, stateCodeBuilder } from "@focuson/lens";
import { stateCodeBuilderWithSlashAndTildaFromIdentity } from "./lens";


export function makeOneStory<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  if ( isMainPage ( p ) ) return makeOneMainStory ( params, p )
  if ( isModalPage ( p ) ) return makeOneModalStory ( params, p )
  // @ts-ignore
  throw new Error ( `Don't know how to make a story for page ${p.name} of type ${p.pageType}` )
}
export function makeOneModalStory<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  return [ `export const x=1 // modal stories not yet supported ` ]
}
export function makeOneMainStory<B, G> ( params: TSParams, p: MainPageD<B, G> ): string[] {
  return [
    `import { Story } from "@storybook/react";`,
    `import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";`,
    `import { SBookProvider } from "@focuson/stories";`,
    `import { Lenses } from "@focuson/lens";`,
    `import { context, Context, emptyState, ${params.stateName} } from "../common";`,
    `import { pages } from "../pages";`,
    `import * as render  from "${renderFileName ( '..', params, p, p )}";`,
    `import * as domain  from "${domainsFileName ( '..', params, p )}";`,
    `import * as samples  from "${samplesFileName ( '..', params, p )}";`,
    `import * as empty from "${emptyFileName ( '..', params, p )}";`,
    ` `,
    `export default {`,
    `   component: render.${pageComponentName ( p )},`,
    `   title: 'Forms/${p.name}'`,
    `}`,
    ` `,
    `interface StoryState {`,
    `   domain: domain.${domainName ( p.display.dataDD )}`,
    `   pageMode: PageMode`,
    `}`,
    ` `,
    p.initialValue === 'empty' ? `const initial = ${params.emptyFile}.${emptyName ( p.display.dataDD )}` : `const initial = ${JSON.stringify ( p.initialValue )}`,
    `function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: '${p.name}', pageMode}}`,
    `const Template: Story<StoryState> = ( args: StoryState ) =>{`,
    `  const pageDetails: any = pages[ '${p.name}' ];`,
    `  const initial = pageDetails.initialValue?pageDetails.initialValue:{}`,
    `  const rawState: ${params.stateName} = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], ${p.name}: initial }`,
    `  const startState=${parsePath ( p.display.target, stateCodeBuilderWithSlashAndTildaFromIdentity ( params, p ) )}.set(rawState, args.domain)`,
    `  return SBookProvider<${params.stateName}, Context> (startState, context,`,
    `     s => findOneSelectedPageDetails ( s, pageDetails.lens) (pageSelection(args.pageMode)).element );}`,
    ` `,
    ` `,
    `export const View = Template.bind ( {} );`,
    `View.args = {`,
    `   domain: samples.${sampleName ( p.display.dataDD )}0,`,
    `   pageMode: 'view'`,
    `};`,
    `export const Edit = Template.bind ( {} );`,
    ` Edit.args = {`,
    `   domain: samples.${sampleName ( p.display.dataDD )}0,`,
    `   pageMode: 'edit'`,
    `};`,
    ` `,
    `export const Empty = Template.bind ( {} );`,
    `Empty.args = {`,
    `   domain: empty.${emptyName ( p.display.dataDD )},`,
    `   pageMode: 'create'`,
    `};`
  ]
}

