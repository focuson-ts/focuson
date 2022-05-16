* Shared RestD
* So we should probably include page name in url...
* Actions in Fetcher/Post
    * Delete
    * Update to length of list ?
    * copy 
    * message on success - do I want to cancel it? change it?
* Actions on enter page
    * create empty
    * create copy
    * set values 
    * set to length of list
* Enter causes associated button press (configurable)

Buttons
* Copy button / set value button are these the same?  inc 'set to last value'

Rest/Fetchers
* Merge (have fetchers use rest)
* Have them use transforms
  * Which lets us tie them into trace
  * What do we do about generational fetchers

StateActions
* Copy / Copystring / Set /...etc. A layer of abstraction making it easy to mess with the data

Graph ql
* The graph ql schema is a global name space .. aha... we can fix this by just prefixing types with main page name
* Stop using it for mutations
* Don't have a connection in the context for queries, just for mutations
* Make sure types are correct for resolvers (is it a map or a string/number?)

Backend - done
* Allow manual states 
* Allow multiple 'useStoredProc' and 'useSql' and 'a bit of manual code' 

# Priorities

## Critical
* Easier backend... multiple 'useStored proc' better parameter specification etc...
* We do need 'set variable to length of array on entry'. Or phrased differently 'execute this arbitary code on entry'. Actions would allow this. Only need one action though... 

## Important
* Then the 'actions'
* Stuff to make it easier to test.

