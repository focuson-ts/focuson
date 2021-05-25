# State fetch

A common pattern in GUIs is 'showing the data revealed by an API'. For example we might show the data in shopping site,
or show account data about customers.

When doing this typically there is a navigation area which determines what is being looked at, and then multiple
places that show information about what is being looked at. Each time the state is changed a decision needs to be made
about whether to get more information from the backing API(s).

The core idea is to have all this done as part of the 'flux loop'. So the components communicating by setting parameters in the state
such as 'the selected thing' and possible a 'tag' that explains how to load the data. Thus the components don't 'call actions' or anything


# Key Concepts

## State
The state is 
## Fetchers
