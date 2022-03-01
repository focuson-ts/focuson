import React from 'react';
import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { defaultPageSelectionAndRestCommandsContext } from "@focuson/focuson";
import { ETransferPage } from "../render";
import { ETransferDataDDomain } from "../domains";
import { Context, emptyState, FState } from "../common";
import { sampleETransferDataD0 } from "../samples";
import { emptyETransferDataD } from "../empty";
import { pages } from "../pages";

export default {
  component: ETransferPage,
  title: 'Forms/ETransferPage'
}

interface StoryState {
  domain: ETransferDataDDomain
  pageMode: PageMode
}

const Template: Story<StoryState> = ( args: StoryState ) =>
  SBookProvider<FState, Context> ( { ...emptyState, ETransfer: { fromApi: args.domain } },
    defaultPageSelectionAndRestCommandsContext<FState> ( pages ),
    s => findOneSelectedPageDetails ( s ) ( { pageName: 'ETransfer', pageMode:args.pageMode} ) );


export const View = Template.bind ( {} );
View.args = {
  domain: sampleETransferDataD0,
  pageMode: 'view'
}
export const Edit = Template.bind ( {} );
Edit.args = {
  domain: sampleETransferDataD0,
  pageMode: 'edit'
}

export const Empty = Template.bind ( {} );
Empty.args = {
  domain: emptyETransferDataD,
  pageMode: 'create'
}
