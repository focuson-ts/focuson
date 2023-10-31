import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SelectedPage } from "@focuson/pages";
import { dataDefinedState, lensStateWith, PageSpecState, rootState } from "./page.fixture";
import { PageMode } from "@focuson/utils";

let view: PageMode = 'view';

describe("selectedPage", () => {

  it("should display one page", () => {
    const state = lensStateWith(dataDefinedState, () => {}, ['firstPage', 'edit', undefined]);
    const { container } = render(<SelectedPage state={state} />);
    expect(container.innerHTML).toEqual("<div class=\"combine\"><div class=\"focus-page\"><div id=\"default_template\">" +
      "<h1>[firstPageTitle]:</h1>" +
      "<p>firstPage[one]/edit</p>" +
      "</div></div></div>");
  });

  it("should display two pages", () => {
    const state = lensStateWith(dataDefinedState, () => {}, ['firstPage', 'edit', undefined], ['secondPage', 'view', undefined]);
    const { container } = render(<SelectedPage state={state} />);
    expect(container.innerHTML).toEqual('<div class="combine"><div class="focus-page"><div id="default_template">' +
      '<h1>[firstPageTitle]:</h1>' +
      '<p>firstPage[one]/edit</p></div></div>' +
      '<div class="focus-page"><div id="default_template">' +
      '<h1>[secondPageTitle]:</h1>' +
      '<p>secondPage[two]/view</p></div></div></div>');
  });

  it("should display three pages", () => {
    const state = lensStateWith(dataDefinedState, () => {}, ['firstPage', 'edit', undefined], ['secondPage', 'view', undefined], ['modalData', 'edit', undefined]);
    const { container } = render(<SelectedPage state={state} />);
    expect(container.innerHTML).toEqual(
      '<div class="combine"><div class="focus-page"><div id="default_template">' +
      '<h1>[firstPageTitle]:</h1>' +
      '<p>firstPage[one]/edit</p></div></div>' +
      '<div class="focus-page"><div id="default_template">' +
      '<h1>[secondPageTitle]:</h1>' +
      '<p>secondPage[two]/view</p></div></div>' +
      '<div class="focus-page"><div id="default_template">' +
      '<h1>[modalDataTitle]:</h1>' +
      '<p>modalData[x]/edit</p></div></div></div>');
  });

  it("should be using the combine for multiple pages", () => {
    const state = lensStateWith(dataDefinedState, () => {}, ['firstPage', 'edit', undefined], ['secondPage', 'view', undefined], ['modalData', 'edit', undefined]);
    const { container } = render(<SelectedPage state={state} />);
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const combineElements = container.querySelectorAll('.combine');
    expect(combineElements.length).toEqual(1);
  });


  it("display loading when no data", () => {
    const state = lensStateWith(rootState, () => {}, ['firstPage', 'edit', undefined], ['secondPage', 'view', undefined], ['modalData', 'edit', undefined]);
    const { container } = render(<SelectedPage state={state} />);
    expect(container.innerHTML).toEqual('<div class="combine">' +
      '<div class="focus-page"><div id="default_template"><h1>[firstPageTitle]:</h1>' +
      '<div><p>Loading</p><span class="tooltip-wrap">' +
      '<button class="button" id="loading.cancel" aria-errormessage="loading.cancel.error" aria-invalid="false">Cancel </button>' +
      '<ul hidden="" class="errormessage tooltip" id="loading.cancel.error"></ul></span></div></div></div><div class="focus-page">' +
      '<div id="default_template"><h1>[secondPageTitle]:</h1><div><p>Loading</p>' +
      '<span class="tooltip-wrap"><button class="button" id="loading.cancel" aria-errormessage="loading.cancel.error" aria-invalid="false">Cancel </button>' +
      '<ul hidden="" class="errormessage tooltip" id="loading.cancel.error"></ul></span></div></div></div>' +
      '<div class="focus-page"><div id="default_template">' +
      '<h1>[modalDataTitle]:</h1><p>modalData[x]/edit</p></div></div></div>');
  });
});
