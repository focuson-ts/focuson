# Overview

We have two main options when we edit data

We can 'edit it here' or we can open a modal window and open it in the modal window

It is far more common for us to open a modal window because then we have the 'save' and 'back' options

## Opening modal windows

There are two very common patterns with these modal windows
* Creating a new item
* Editing an existing item
This cookbook is looking at the second

### Editing an item

Typically we will copy the data from 'where it is' to a 'new space' so that the modal window can edit it freely and only copy it back
if 'save' is pressed. This makes the save/cancel semanitics very easy to get right

We need the following
* A place to store the new data while we are editing it
* To copy the data into the temporary place when we press the edit button
* To decide what we do when we click save on the modal window
  * Do we update the data in memory
  * Do we update the data in the database and force it to be reloaded into memory


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

