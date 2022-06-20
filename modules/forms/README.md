# @focuson/forms

* [Release notes](https://github.com/focuson-ts/focuson/blob/master/RELEASES.md)
* [A cookbook of 'howtos' Cookbook](cookbooks/index.md)
* [Example code](https://github.com/focuson-ts/focuson/tree/master/modules/forms/src/example)
* [Training materials - ppt](https://docs.google.com/presentation/d/e/2PACX-1vQaJOECJbjQZynmzieigICB_6GAgz8E_BaVzLwnnfmzunhyXcVADL1cHNKs3COjVmoM9eQmejy0y27b/pub?start=false&loop=false&delayms=3000)
* [Training materials - git](https://github.com/focuson-ts/training)

## Summary
This is a 'low code' mechanism for generating the apis and the react components for a website from a declarative representation.
Unlike most low code solutions it does not rely on a gui, but instead uses a text based representation leveraging 
the existing skills of developers with text based tools such as their IDE and version control systems

It is mostly suited for things like 'Forms'. So simple crud, displaying status, maintenance screens and so on. It is unsuited 
for sexy customer facing guis: much more business to employee.

The tools that are easily to use in making guis are:
* Easy access to any data source
  * clever data source 'stiching' (so some data from one source, another elsewhere)
* Validation
* Messaging to user (apis report issues, middle tier issues...etc). A simple and robust (suitable for B<=>E not B<=>C) mechanism for such issues
* Retreiving and modifying data in a database. 
* The Auto generated React gui uses the restful api
* Simple pages and model pages are both straightforwards

Importantly it is entirely data driven and extensible by injection of code. There is no  'make a skeleton and edit'.
