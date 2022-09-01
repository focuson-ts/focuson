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

# quality of life
* CLI

# Integration
* common project, team projects, merged project (fractal)

# Missing stuff - minor at moment
## Repeating data structures
* why do we need list in the resolvers/mutations
* cannot do layout on repeating data structures

# Major features
* Wizards as state machines

# Tech debt
* the guards ... some need `'"value"'` and some `"value"`
* buttons should have guarded by
* themes
* target in the `display` for modal pages
* undefined names in our generated code... and the names are a bit long
* Moving examples into examples
* documentation: redo training course as the code has changed
* cook book

# Minor tech debt
* imports only when needed in generated code

# Version 2
* Create an intermediate form first which is validated/type safe and known to be correct
* Have a clean 'generator story' so that you can configure the generators (entire sub project and cool)
* Re-entrant pages: all data on a stack maintained on the react state