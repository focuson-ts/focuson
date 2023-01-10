# Releases

* [v1.10](/releaseNotes/legacy/v1.10.md)
  * Mutations: mutations are now the first class way to do back end mutations. The use of 'fetchers' will soon be deprecate (a clear migration guide will be given)
  * Date picker: Supports holidays / don't allow weekends / ...
  * DataDrivenFixedOptionDropDownAndDetails: Allows drop
  * InsertSqlStrategy: Autogenerates the sample sql for the backend database. We have on strategy and will add more 
  * Conditions/Guards upgrade: Now supports or/and conditions
  * Minor: Improvements to dropdowns, Modal pages have labels, Modal pages support rest buttons, commit/cancel have text

* [v1.12](/releaseNotes/legacy/v1.12.md)
  * Strong typing on java side parameters
  * Breaking change in mutations: `mutation` has been changed to `type`
  * Resolvers

* [v1.14](/releaseNotes/legacy/v1.14.md)
  * Action Buttons
  * Case statements in resolvers/mutations
  * Message on commit
  * Control of annotation on params

* [v1.16](/releaseNotes/legacy/v1.16.md)
  * Gui
    * Action buttons enhancement (paths)
    * emptyValue/allowDefined for default data
    * Themes
  * Backend
    * Data transformation in java easier with setParam mechanism
    * Mutation and resolver params can now be optional/null and are checked against null
    * Params have their own parameter sets

* [v1.18](/releaseNotes/legacy/v1.18.md)
  * Gui
    * MoneyDD is now a float
    * Variables in paths (so commonly repeating paths can be centralised)
    * Selected item enhancements (header and showNofM)
    * Validation mechanism totally revamped to remove 'console errors'
    * Minor gui enhancements
  * Backend
    * Fetcher/rest code heavily changed

* [v1.20](/releaseNotes/legacy/v1.20.md)
  * Gui and Backend
    * Messaging cleaned up 
    * Many improvements to Table and a new StructuredTable
  * Gui F
    * Redux now used
    * Rests  can have multiple deletes
    * action buttons have multiple paths
    * Main Pages can now be used like modal pages
  * Backend
    * alias on main entity for sql
    * autowiring for class variables
    * makeMock is now possible for resolvers/mutations to stop the mock being generated 
    * names now optional on manual/sql mutations and resolvers
