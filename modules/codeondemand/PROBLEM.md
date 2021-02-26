# Why is this good
Read https://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven (mentioned above)

What we are doing here is focusing on the media type and the Rest 'code on demand' idea. The client knows nothing about the data representation / schema, and doesn't need to.

## Data representation changing by time
The one constant in IT is change. Json formats will change across time. The design principles in the link above tell us
how to deal with those changes:
* We focus on the media type
* We can use code on demand to render up the data

### Example

At time t=0 we have the representation of a person:
``` { "name": "phil", address: "some address" }```
Later we decide to implement addresses properly as a child object
``` { "name": "phil", address: { "line1": "some address", "line2": "more about the address"} }```
And as time progresses we want to allow multiple addresses
```` { "name": "phil", addresses: [{ "line1": "some address", "line2": "more about the address"}] }``

Our api that serves up addresses could have dozens of clients. It is desirable that they are not coupled to the data representation.
We can deal with this by
``` { "name": "phil", address: "some address" , "_render": "someUrlOfTheComponentToRender"}```
The client doesn't 'decide' how to render the address: it asks the server 'how should I render it', and is thus decoupled from the data representation

# Geographic variations

Sometimes we need to do things differently in different geographies. The data needs to be different, the business processes different, and we don't want to change the client

## Example: Login to a bank application

In many parts of the world we can use username and password, but some places are different. For example in  Belgium we need to use a card reader as part of the login process.
The data, the instructions and what to do are different

By using code on demand the server can give the different data, and the client can render it using the appropriate code

## Example: Addresses

* An address in the UK might have counties and postcodes
* In Switzerland cantons are important and postcodes are 4 digit numbers
* In America we have zip codes
* In China the order of all the data is 'biggest first.'. e.g.: Country, Province, City, region, street, house number

Some of this can be handled by (extremely complex) css, but this approach gives massive simplicity

# White labeling

Depending on such things as the domain, or who the customer is logged in as, we might be white labeling our application to look very different. CSS can go
a long way, but the power of having different components is very high.

# Experiments

If we want to try out a new widget on 1% of the customers, and have a hundred different experiments at once, it would be nice not to have keep
updating and deploying the application. Code on demand means that the client remains the same, and the server just delivers a different component for that part of the screen

