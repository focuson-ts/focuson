# Overview

We have two main options when we edit data

We can 'edit it here' or we can open a modal window and open it in the modal window

It is far more common for us to open a modal window because then we have the 'save' and 'back' options

## Opening modal windows

There are two very common patterns with these modal windows
* Creating a new item
* Editing an existing item
This cookbook is looking at the first

### Creating a new item

We need the following
* Create an empty data item (with sensible defaults)
* A place to store the new data while we are editing it
* To decide what we do when we click save on the modal window

### Creating the empty data

* The modal button has a `createEmpty` option which makes an 'empty' data object at the target
* Very occasionally we only want to create an empty thing if it doesn't already exist so we can use `createEmptyIfUndefined

Each primitive comes with default 'empty'. For example most numbers are '0` and strings are often the empty space ''. However
sometimes we want something specific. For example a checkbox that defaults to true

### Empty for an enum - at point of declaration
Note that the empty value is the 'key' of the enum: the value that goes to the database
Another option here is to set the emptyValue to `undefined` but when you do that you need to specify `allowUndefined: true` as well
```typescript
export const EAccountDisplayTypeDD: StringPrimitiveDD = {
  ...OneLineStringDD,
  emptyValue: "savings",
  name: "EAccountDisplayType",
  description: "The component that displays an EAccountDisplayType (savings/checking)",
  display: LabelAndRadioCD,
  enum: { savings: 'Savings', checking: 'Checking' }
  //Note samples come from enum
}
```

### Empty: defining defaults at point of usage
Here we have a value that is a string. At point of creation of an empty we want it to be undefined rather than the empty string, so we can declare that here.

```typescript
  structure: {
  id: { dataDD: NatNumDd, hidden: true, sample: [ 1, 2, 3 ] },
  requestedBy: {
    dataDD: { ...StringDD, emptyValue: undefined, allowUndefined: true, },
``` 
### Empty: defining defaults at the point of definition
This is a primitive that defaults to true. It can be used anywhere BooleanDD could have been
```typescript
export const BooleanDefaultTrue: BooleanPrimitiveDD = {
  ...BooleanDD,
  emptyValue: true,
}
``` 
### Empty: defaulting a checkbox at the point of usage
This is a primitive that defaults to true. It can be used anywhere BooleanDD could have been
```typescript
export const ListOfPaymentsDD: ExampleDataD = {
  name: 'ListOfPayments',
  description: 'The information about the person who requested the payments',
  structure: {
    standingOrders: { dataDD: {...BooleanDD, emptyValue: true}, displayParams: { number: '~/currentPayments/standingOrders' }, sampleOffset: 0 },
  }
}
``` 

## A place to store the data
Usually we declare a variable in the domain of the correct type. Sometimes this is just called `temp`.

```typescript
export const OccupationAndIncomeSummaryPD: ExampleMainPage = {
  name: 'OccupationAndIncomeSummary',
  /** This defines the domain data structures in react*/
  domain: {
    temp: { dataDD: oneOccupationIncomeDetailsDD },
    //... other stuff
  }
}
```
## A modal button to open the window - with lists of data
Here we see how we build a modal button to add to a list of data
* We `createEmpty` as the button is diplayed,
* when the `save` button is pressed 
  * the contents of `temp` is copied to  `'#currentOccupation/[$append]'`
  * The new length of the list of data is copied to selected

```typescript
    addEntry: {
      control: 'ModalButton', modal: occupationIncomeModalPD, mode: 'create',
      focusOn: '~/temp',
      createEmpty: oneOccupationIncomeDetailsDD,
      setToLengthOnClose: { variable: '#selected', array: '#currentOccupation' },
      copyOnClose: { to: '#currentOccupation/[$append]' }
    },

```

## A modal button to open the window with just a single item
Here we are creating a 'payment'. The 'temp' here is '~/createPayment'

Note that in this example a couple of pieces of data are needed, and they are being copied in. This copying happens after `createEmpty` 
```typescript
    createPayment: {
      control: 'ModalButton',
      mode: 'create', focusOn: '~/createPayment',
      modal: CreatePaymentMP,
      createEmpty: CreatePaymentDD,
      copy: [
        { from: '~/display/collectionSummary/allowance', to: '~/createPayment/allowance' },
        { from: '~/display/collectionSummary/period', to: '~/createPayment/period' } ],
      restOnCommit: { restName: 'createPayment', action: 'create', pathToDelete: [ '~/display/collectionSummary', '~/display/collectionHistory' ], result: 'refresh' }
    },
```
Note that here we are not copying the item back, but are causing a restful action if commit is pressed

