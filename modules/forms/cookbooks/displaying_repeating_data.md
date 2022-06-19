# Tables

The table is the primary way that we show repeating data. It is quite a flexible component and has a number of options

## A simple table

We have the data that will be a single row in the table `ChequeCreditbooksHistoryLineDD` and the repeating data
structure (where we display the table)  `ChequeCreditbooksHistoryDD`

Because we want to have the selected row highlighted, we need to store it in the state. That is done using
the `copySelectedIndexTo`

### In the DataD

```typescript
export const ChequeCreditbooksHistoryLineDD: DataD<AllGuards> = {
  name: "ChequeCreditbooksHistoryLine",
  description: "The create plan data (actually just put in one place to allow a test for a structure)",
  layout: { component: LayoutCd, displayParams: { details: '[[3]]', defaultProps: `{"valueWidth": 50}` } },
  structure: {
    serialNumber: { dataDD: { ...IntegerDD, sample: [ 937453 ] }, },
    howOrdered: { dataDD: OneLineStringDD, sample: [ 'Manually' ] },
    dateOrder: { dataDD: DateDD, sample: [ '2022-10-01' ] }
  }
}
export const ChequeCreditbooksHistoryDD: RepeatingDataD<AllGuards> = {
  name: "ChequeCreditbooksHistory",
  paged: false,
  description: "The history of how cheque and credit books have been ordered",
  dataDD: ChequeCreditbooksHistoryLineDD,
  display: TableCD,
  displayParams: { order: [ 'serialNumber', 'howOrdered', 'dateOrder' ], copySelectedIndexTo: [ 'selectedBook' ] }
}
```

### In the pageD

The most import part is the `selectedBook` needs to be defined in the domain to store the index. Without this there will
be compilation issues in the generated code

```typescript
export const ChequeCreditbooksPD: ExampleMainPage = {
  name: 'ChequeCreditbooks',
  domain: {
    temp: { dataDD: ChequeCreditbooksHistoryDD }, //this holds the repeating data structure
    selectedBook: { dataDD: NatNumDd } // this is where the index is stored
    // ...other stuff
  }
//..other stuff
}
```

## A table with joiners and a search

Occasionally we have a table about data that is mostly 'flat'. i.e. mostly just composed of primitives, but there is
something like `sortcode` modelled as three numbers. In this case we want to join the parts of the sort code together.
The joiners field allows us to do that. Here the values are joined together with '-'

Note that we have a search here as well allowing the user to search for the post code

### dataD

```typescript

export const SortCodePartDD: StringPrimitiveDD = {
  ...OneLineStringDD
}
export const SortCodeDD: ExampleDataD = {
  name: 'SortCode',
  description: 'All the data displayed on the screen',
  structure: {
    one: { dataDD: SortCodePartDD, sample: [ '10', '20' ] },
    two: { dataDD: SortCodePartDD, sample: [ '11', '12' ] },
    three: { dataDD: SortCodePartDD, sample: [ '23', '24' ] }
  }
}

export const MandateDD: ExampleDataD = {
  name: 'Mandate',
  description: 'All the data displayed on the screen',
  layout: { component: LayoutCd, displayParams: { details: '[[3,3]]' } },
  structure: {
    sortCode: { dataDD: SortCodeDD },
    accountId: { dataDD: AccountDD, sample: [ 12341234, 23456123, 3245454 ] },
    mandateStatus: { dataDD: StringDD, sample: [ 'ACTIVE' ] },
    bankName: { dataDD: StringDD, sample: [ 'Bank Of Happiness', 'Royal Bank of Success' ] },
    accountName: { dataDD: StringDD, sample: [ 'F & J Bloggs' ] },
    mandateRef: { dataDD: StringDD, sample: [ '12099845-34', '12099845-78' ] }
  }
}


export const MandateListDD: ExampleRepeatingD = {
  name: "MandateList",
  description: "The list of mandates that we display in the search results for 'select mandate'",
  display: TableCD,
  displayParams: {
    order: [ "sortCode", 'accountId', 'bankName', 'accountName', 'mandateRef', "mandateStatus" ],
    copySelectedItemTo: [ 'tempMandate' ],
    copySelectedIndexTo: [ 'selectIndex' ],
    prefixFilter: '~/selectMandateSearch/sortCode',
    joiners: '-',
    prefixColumn: 'sortCode'
  },
  sampleCount: 5,
  dataDD: MandateDD,
  paged: false
}
```

### PageD

Note the use of the `copyJustString` in the modal button to view the mandate. This copies the string that would be
displayed.

```typescript

export const LinkedAccountDetailsPD: ExampleMainPage = {
  name: "LinkedAccountDetails",
  domain: {
    selectMandateSearch: { dataDD: MandateSearchDD },
    tempMandate: { dataDD: MandateDD },
    selectIndex: { dataDD: NatNumDd },
    //...other
  },
  buttons: {
    selectMandate: {
      control: 'ModalButton',
      modal: SelectMandateMP, mode: 'edit', focusOn: '~/selectMandateSearch',
      copy: [
        { from: '~/display/mandate', to: '~/tempMandate' },
      ],
      copyJustString: [
        { from: '~/display/mandate/sortCode', to: '~/selectMandateSearch/sortCode', joiners: '-' },
      ],
      copyOnClose: { from: '~/tempMandate', to: '~/display/mandate' }
    },
    // others...
  }
}

```

## A table where most of the data isn't an immediate child

There will be occasions where the data being shown isn't just a simple child of a data structure. The idea in @focuson
is that the simple is easy and the complex is doable. The simple (most of the data being a single structure) is easy.
But when we move to more complicated structures it is a little more complex.

Instead of `order` we have `paths`. The other difference is that there are no `joiners`.

```typescript
export const postCodeSearchResponseDD: RepeatingDataD<AllGuards> = {
  name: "PostCodeSearchResponse",
  description: "The array of all the data",
  dataDD: postCodeDataLineD,
  paged: false,
  display: StructureTableCD,
  displayParams: {
    paths: { postcode: 'postcode', line1: 'line1', line2: 'line2', line3: 'line3', line4: 'line4' },  //<--------------
    copySelectedItemTo: [ 'postcode', 'addressResults' ],
    copySelectedIndexTo: [ 'selectedPostcodeIndex' ],

  }
```

The paths are an object. The keys are the table column names. The values are a path. As normal the path can use `~` but
the 'default' start of the path is the current object.

## Table properties

| property | type | description|
| --- | --- | --- | 
| order | string[] | the list of properties that you want displayed on the screen. They must be 'immediate children'
| copySelectedIndexTo | string[] that is a path from the page domain | When the table is clicked, the selected row index is copied here. This also is used to display the current selected index
| copySelectedItemTo | string[]  that is a path from the page domain | When the table is clicked the selected row is copied here (the actual data)
| joiners | string or string[] | if the object being displayed is complex itself, then the joiners will allow them to be displayed in a 'reasonable fashion' See the sort code example above
| prefixFilter| string that is a path | this does an in memory filter. It only works if the prefixColumn is specified too.
| prefixColumn| string that is a path | this does an in memory filter. It only works if the prefixFilter is specified too. Only rows that start with the prefixfilter in this column will be displayed
| maxCount| string | although it is specified as a string, it has to be a number. this is the maximum count of rows that will be displayed
| emptyData| string | If there is no data, and this is specified, it will be displayed
| tableTitle| sring | If you want the table to have a table, this is it.

# SelectedItem

Occasionally we want to just show one item in a list. The 'selected item'. Often this will be accompanied by `next`
and `prev` buttons

### dataD

Here we see the same idea as for tables: there is a dataD that is the item which will be repeated, and then
a `repeatingDataD` which represents the array. In the repeatingDataD we specify how to display it with
a `SelectedItemCD`

The `SelectedItemCD` needs to 'point' to the selected item. Other options include a title and whether to show `3 of 7`
or similar

```typescript
export const printRecordDD: ExampleDataD = {
  name: 'PrintRecordItem',
  description: 'A single request for the list of payments that happened at a point at time, or will happen when we click print',
  layout: { component: LayoutCd, displayParams: { details: '[[1],[1,4]]' } },
  guards: {
    requestedBy: { condition: 'in', path: 'requestedBy', values: { j: 'joint', m: 'main', n: 'new bank' } },
    alreadyPrinted: { condition: 'equals', path: 'alreadyPrinted', value: true },
  },
  sealedBy: 'alreadyPrinted',
  structure: {
    id: { dataDD: NatNumDd, hidden: true, sample: [ 1, 2, 3 ] },
    newBankDetails: { dataDD: newBankDetailsDD, hidden: true },
    authorisedByCustomer: { dataDD: authorisedByCustomerDD, guard: { requestedBy: [ 'N' ] } },
    datePrinted: { dataDD: StringDD, guard: { alreadyPrinted: [ 'true' ] } }
    //...more stuff
  }
}

export const PrintRecordHistoryDD: ExampleRepeatingD = {
  name: 'PrintRecordHistory',
  dataDD: printRecordDD,
  display: SelectedItemCD,
  displayParams: { index: '~/selected', display: printRecordDD.name, header: 'Request # ', showNofM: true },
  paged: false,
  description: 'This is the list of all the requests for past payments'
}
```

### PageD

Here we can see that in the domain we need to 'put a place' to store the selected There are also two buttons `next`
and `prev`. There need to point to the same place

```typescript

export const ListOfPaymentsPagePD: ExampleMainPage = {
  name: "ListOfPaymentsPage",
  domain: {
    display: { dataDD: PrintRecordHistoryDD },
    selected: { dataDD: NatNumDd },
    //...other
  },
  modals: [ { modal: EditlistOfPaymentsPagePD }, { modal: AddressModalPage } ],
  modes: [ 'view' ],
  initialValue: { selected: 0 },
  buttons: {
    prev: { control: 'ListPrevButton', list: '~/display', value: '~/selected' },
    next: { control: 'ListNextButton', list: '~/display', value: '~/selected' },
  },
  //...other stuff
}
```

### Adding and Editing to these 'selected items'

As usual when we add or edit things we want to do it with a modal window and a 'copy in/copy out' approach. This allows
us all the semantics of 'save' and 'back' when the window is closed.

There is a little extra complexity that the thing we are copying is 'the nth item' in a list, and the number 'n'
varies (it's the `selected` in the above example)

To handle this we use a feature in the @focuson paths. `~/display[~/selected]`. In this path `~/display` points to a
list and
`[~/selected]` gets the nth item out of the list. We can also use 'special' items in the [] such as [$append]. This is
useful when we are 'adding' items as it will 'copyOnClose' the temporay data to the end of the list.

Because there is so much common behavior between the add/edit button we have a common data block.

```typescript
const addButton: RawButtons<AllGuards> = {
  control: 'ModalButton',
  modal: EditlistOfPaymentsPagePD,
  focusOn: '~/tempListOfPayments',
  mode: "create",
  createEmpty: printRecordDD,
  copyOnClose: { to: '~/display[$append]' },                           // this copies the temp item to the end of the list
  setToLengthOnClose: { variable: '~/selected', array: '~/display' },  // this makes sure that the selected is update
  restOnCommit: { restName: 'onePayment', action: 'create', result: "refresh" }
}
```

```typescript
const editButton: RawButtons<AllGuards> = {
  control: 'ModalButton',
  modal: EditlistOfPaymentsPagePD,
  focusOn: '~/tempListOfPayments',
  enabledBy: 'canPrint',
  mode: "edit",
  copyOnClose: { to: '~/display[~/selected]' },
  copy: [ { from: '~/display[~/selected]' } ],
  restOnCommit: { restName: 'onePayment', action: 'update', result: "refresh" }
}
```
## SelectedItemCD properties

| property | type | description|
| --- | --- | --- | 
| index | string[] that represents a path from the home page | This is the pointer to where the 'currently selected item is' in the state
| header | string | An optional title 
| showNofM | boolean | If true the text 'n of m' will be added to header (n: is the page number and m is the number of pages)
| display | string | This is the name of the method used to display the item. It is often something a `dataDD.name`

# Roadmap

It is quite frustrating that the property copySelectedIndexTo and copySelectedItemTo use string[] rather than the same
path language as everything else. This will be changed in future released




