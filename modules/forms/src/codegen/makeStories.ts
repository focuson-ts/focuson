import { PageD } from "../common/pageD";
import { TSParams } from "./config";
import { domainName, emptyName, pageComponentName, sampleName } from "./names";


export function makeOneStory ( params: TSParams, p: PageD ): string[] {
  if ( p.pageType === 'MainPage' ) return makeOneMainStory ( params, p )
  if ( p.pageType === 'ModalPage' ) return makeOneModalStory ( params, p )
  throw new Error ( `Don't know how to make a story for page ${p.name} of type ${p.pageType}` )
}
export function makeOneModalStory ( params: TSParams, p: PageD ): string[] {
  return [ `export const x=1 // modal stories not yet supported ` ]
}
export function makeOneMainStory ( params: TSParams, p: PageD ): string[] {
  return [
    `import React from 'react';`,
    `import { Story } from "@storybook/react";`,
    ` import { findOneSelectedPageDetails, PageMode } from "@focuson/pages";`,
    ` import { SBookProvider } from "@focuson/stories";`,
    ` import { defaultPageSelectionAndRestCommandsContext } from "@focuson/focuson";`,
    ` import { Context, emptyState, ${params.stateName} } from "../common";`,
    ` import { pages } from "../pages";`,
    ` import * as render  from "../render";`,
    ` import * as domain  from "../domains";`,
    ` import * as samples  from "../${params.samplesFile}";`,
    ` import * as empty from "../${params.emptyFile}";`,
    ` `,
    ` export default {`,
    `   component: render.${pageComponentName ( p )},`,
    `   title: 'Forms/${p.name}'`,
    ` }`,
    ` `,
    ` interface StoryState {`,
    `   domain: domain.${domainName ( p.display.dataDD )}`,
    `   pageMode: PageMode`,
    ` }`,
    ` `,
    ` const Template: Story<StoryState> = ( args: StoryState ) =>`,
    `   SBookProvider<${params.stateName}, Context> ( { ...emptyState, ${p.name}: { ${p.display.target[ 0 ]}: args.domain } },//NOTE currently stories only work if the target depth is 1`,
    `     defaultPageSelectionAndRestCommandsContext<${params.stateName}> ( pages ),`,
    `     s => findOneSelectedPageDetails ( s ) ( { pageName: '${p.name}', pageMode:args.pageMode} ) );`,
    ` `,
    ` `,
    ` export const View = Template.bind ( {} );`,
    ` View.args = {`,
    `   domain: samples.${sampleName ( p.display.dataDD )}0,`,
    `   pageMode: 'view'`,
    ` }`,
    ` export const Edit = Template.bind ( {} );`,
    ` Edit.args = {`,
    `   domain: samples.${sampleName ( p.display.dataDD )}0,`,
    `   pageMode: 'edit'`,
    ` }`,
    ` `,
    ` export const Empty = Template.bind ( {} );`,
    ` Empty.args = {`,
    `   domain: empty.${emptyName ( p.display.dataDD )},`,
    `   pageMode: 'create'`,
    ` }`
  ]
}

