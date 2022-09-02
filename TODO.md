# Front end
* Validation
  * Mouse over explaining what is wrong
  * What happens when you actually enter the wrong data 
* css for 'issues'
* validation
* nicer layout component 

# Backend
* More declarative insert and update
* tables as just another resolver - check it's done
* server validation
* site map on the back end

# Reports
revisit ... see what we think
How do we do a report on an aggregated project

# quality of life
* CLI to 'do stuff'
  * It does the copying
  * It will npm i or yarn at appropriate times
  * It can clean up the code, and will when it things it's needed at the appropriate time

# Integration
* common project, team projects, merged project (fractal)
* Are we using the right back end?

# Admin
* Check accessibility

# Missing stuff - minor at moment
## Repeating data structures
* why do we need list in the resolvers/mutations
* cannot do layout on repeating data structures

# New features
* Wizards as state machines
* more checking of any paths
* More checking of... make a list

# Tech debt
* We have dependency issues when we create a project
* the guards ... some need `'"value"'` and some `"value"`
* buttons should have guardedBy as an attribute
* themes
  * make work
  * simplify
* target in the `display` for modal pages
* undefined names in our generated code... and the names are a bit long
* Moving examples into examples
* documentation: redo training course as the code has changed
* cook book
* new project (with react dependencies) fpr 

# Minor tech debt
* imports only when needed in generated code
* Sort out debugs (reduce)
* remove normal fetchers

# Version 2
* Create an intermediate form first which is validated/type safe and known to be correct
* Have a clean 'generator story' so that you can configure the generators (entire sub project and cool)
  * We want to be able to support `different stories` 
* Re-entrant pages: all data on a stack maintained on the react state
* Clean support for more versions of react/redux
* Consider doing it restful