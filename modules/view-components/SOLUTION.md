## Impact on developers
I think very little as long as they are familiar with HATEOAS. The same components need to be written.

As before they should be decoupled from each other.

The mental model is different.
* While we still want to 'bundle up' all the dependencies, much of the actual application code will be shipped on demand.
* The idea of actually use Rest is different: most people think of rest as 'json with http using a schema and at known carefully thought about urls'



## Copying the files
* The files are copied to 'public/created' so that we can simulate the server. Note the url has the sha256 in it

## Access to the shas
* The gamejson needs to know what urls to use to render the components. This is provided in src/created/shas
