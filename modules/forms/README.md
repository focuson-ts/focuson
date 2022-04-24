# @focuson/forms

This is a 'low code' mechanism for generating the apis and the react components for a website from a declarative representation. 

It is mostly suited for things like 'Forms'. So simple crud, status, and so on.

It is unsuited for sexy customer facing guis: much more business to employee.

The tools that are easily to use in making guis are:
* Easy access to any data source
  * clever data source 'stiching' (so some data from one source, another elsewhere)
* Validate (server side and client side)
* Messaging (apis report issues, middle tier issues...etc). A simple and robust (suitable for B<=>E not B<=>C) mechanism for such issues
* There is both a restful api, and a GraphQL generated for the data
* The Auto generated React gui uses the restful api
* Simple pages and model pages are both straightforwards
* 
Importantly it is entirely data driven and extensible by injection of code. There is no  'make a skeleton and edit'. 


# Release notes
## 1.4.0:
* Buttons now have enabledBy meaning we can disable them instead of vanish them.
* Reports are generated in formTs and formJava
* Guard reports are generated for each page that has guards, to allow automated tests to validate them
* Ids on pages have inverted, so that page 1 is the 'top page' that the user interacts with. This is to help tests
* The 'debug' button is now nicer to use: page json easier to see, looks a bit better
* The general layout is a little better, but still needs work

 