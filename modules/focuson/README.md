Many applications are not so complex that they need a sophisticated paging system

Here we just have the idea of 'pages' and that there is a single page displayed at once.

# Features

* Pages can have messages on them: from other pages, from actions, or from apis
* Loading of pages is important
* Pages might just be 'show this api result' (i.e. 'show customer account details'). Here the state for the page is just from an api
   * This is such a common situation it has 'simpler configuration'
* Pages can also have 'some of the state from the api, some local'. A good example here is a search page with a search query and the results of the search
* Pages need to get their data from the backend, and some fetchers are provided that integrate smoothly with the pages

## Current Page
We have a component that displays the current selected page. There is always a current selected page (even if it is an 'empty page')

The current page is stored in the state as a 
```typescript
export interface PageSelection<Details> {
  pageName: keyof Details,
  firstTime?: boolean
}
```
First time is set to true when the page changes, and reset to undefined when the 'processing of the first page' has been completed. 

Note the details: that is an object that has keys (page name) and values. It's for page configuration. This interface knows 
nothing other than the details has legal page names as keys. 

In many places we use PageSelection<any> just to avoid threading that Details through the application

```typescript
export interface HasPageSelection<Details> {
  pageSelection: PageSelection<Details>
}
function pageSelectionlens<S extends HasPageSelection<any>, Details> (): Lens<S, PageSelection<Details>>{}
```
These are useful when the main state has the page selection as a `HasPageSelection`

## Modal Pages
It is quite common to want 'popup' a modal page over the top of another page. This is very easy to do




