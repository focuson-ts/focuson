# Long running transactions 

In Oracle forms we have many forms that rely on long running transactions. 

Example
* A form is displayed on the screen (and a transaction starts)
  * Fields are edited, data is examined, more data is exampled, more triggers take place
  * At any time the user can click 'save' when commits the changes. But they can also do 'back'

Let's take the following example
* Get a list of items
* Edit item number 2
* Edit item number 3
* Go back and edit number 2 again
* Go back and edit number 3 again
* Add a new item 4
* Add a new item 5

## The problem
* In the original oracle forms all these changes are in one transaction and can be rolled back.
* In our world we have apis that access oracle forms and we only have short lived transactions

### Example
Imagine we worked like this

* Get a list of items
* Edit item number 2 and commit
* Edit item number 3
* Go back and edit number 2 again and commit
* Go back and edit number 3 again and commit
* Add a new item 4 and commit
* Add a new item 5 and rollback

In the original that would have rolled back everything. In our new pattern it only rolls back the latest edit

## The impact

In the original Oracle forms it was possible to edit anything at any time. Thus there was often no clean separation of when you were 
editing or viewing.

In our new world we have three basic choices, and we need to make it for each form. The following is in increasing levels of complexity
* Do we make clean separate of edit and views, and thus each edit is a separate transaction
* Do we use optimistic locking with a three way merge
* Do we do 'anything at any time' and have 'compensatory logic' for the undo

By far the simplest: to test, to reason about, and to use, is the first. It is simple, works well in most cases.

The second is much more complex but can work well if only a tiny amount of data needs to change. For example a single field like 'status'

The last is horribly complex, error prone, and currently there is no support for it in @focuson


# Changing from 'edit anything at any time' to clean

In the example 'list of payments' the 'landing page' in the original oracle forms is a read/write and at any time any field can be edited.

We have made it so that the landing page is read only. In order to change an item the edit button is pressed and the edit is commited 
when the edit is completed. Similar to add it we click add

Now there are no long running transactions

# Changing from edit to 'optimistic locking with three way merge'

This is MUCH more complex and to be avoid if at all possible
* We make two copies of the data from the api
* All edits and changes are in memory in the gui
* At commit time we send the original data and the changed data to the backend
* The backend performs a three way merge on the original data, the current data in the database and the changed data
  * If the original data = current data, then we accept the changed data
  * If the current data = changed data then we accept the changed data
  * If the original data = changed data then we accept the changed data
  * Failing these: it's an expection and we ask the operator to start again (this should happen very very infrequently)





