# Created after watching a Dan North video

## Why an external instead of an internal DSL?
An internal DSL for this kind of project really requires people who understand functional programming to use it
effectively. Strong typing is a constraint, so that really leaves Scala, F# or Haskall type languages. That would
make it hard to hire people to use it

## Why make the code representation just json (numbers/boolean/strings) and not have functions
For machine readability purposes. If we go to functions, functions are opaque (part of their power) and we don't want
that opaqueness. We want to enable machines to understand what we have to generate reports, generate code in different
ways... etc...

## Why typescript as the main language?
Once an internal DSL was chosen, I decided to basically use raw JSON. This means no functions for example. There are
(literally) a couple of places where this is awkward, but it has the huge benefit that the whole structure of everything
is machine readable.

## Why generate code instead of just an interpreter?
There are a number of benefits:
* Skill levels. The generated code is actually quite simple and nearly idiomatic java and typescript
* Debugging. We can debug the generated code far more easily than an interpreter (we'd need to write our own debugger)
* Generated code can live in a repo and be subject to version control. This is great when we have regression errors
* Visibility: what the DSL does can easily be demonstrated in the code that is produced

## Why does the data have the view coded up in it?
Specifically in the .dataD we put display logic. 

This is for ease of writing and reading. Each page is a standalone, one shot without much reuse component. There is a whole layer of abstraction 
missed by doing this. That layer would lead to parallel data structure with the same structure that all would have to change
if we made a single change. So we would be saying 'to make a change to this field you have to change it in N places' where N
is greater than 1. At the moment almost all the data about this field: how to display it, validate it, get it for the database...everything is in 
one place.

I do 'feel' it would be more technically correct to have that extra layer of abstraction, and that would allow reuse... 
but we can do quite a lot of reuse like this (we can copy structures using typescript ... feature) and it's much easier to read.

It does lead to some anomalies that I would like to fix. Like for example we code business logic into the data with 
the TableCD component or the SelectedItemCD component. I'd like to avoid that, but I don't know how to and still keep
the simplicity and 'single point of data entry' that we have at the moment. I feel that fixing it would actually make 
much worse problems: it would become much harder to change anything (repeating why: because we would need to synchronise 
different data structures and couldn't see everything in one place)

## Why do modal pages have fewer capabilities than main pages?
Look back on it this was a mistake. At the beginning we though they were different and they aren't. It did 
simplify things a lot and allow us to get going quicker, but it's 'bad design'. Now that we are making more
complex things the composibility of things is threatened by this.

It would be a major change to do this, but we might do it for v2.

## Why do the crud operations not include lists
Our rest is intended to be about 'this memory space in the state'. The memory space in the state obviously is either a thing or a list of things, 
it can't be both. 

## Why we recommend using existing stored procedures, rather than new apis in a migration?
Stored procedures are already tied into transactions easily. All the work is done. If we adopt a 'new api' then we have
to start thinking about compensatory logic. We need to test the compensatory logic. The complexity of everything explodes.
It might take an hour to use a stored procedure and a week to a month to get the compensatory logic 'right'. A change this
big is highly risky, requiring deep business logic and can introduce existential threats to the company (TSB anyone?).
Where as stored procedures might have already been used for decades, and while perhaps still buggy are well understood

Typically we aren't netflix, google with hundreds of millions of customers who can't scale to use a database as a transactional
system, and we don't need to cargo cult their behaviour when it's this high risk

## Why are we using RPC intead of proper Rest?
Education of users. There is a huge body of developers that think 'swagger + json over HTTP = REST'. Thus we have 
an enormous number of brittle systems around. We're just going to use the power of RPC (easy to develop, works if there 
are only a small number of clients) and deliver a modular monolith. This will fulfil a number of goals, and actually 
gives a great deal of flexibility in the future: modular monoliths can be changed quicker as long as we can refactor 
across network boundaries easily. 

## Why do we have a simpler mechanism for Custom Layouts and Custom Displays than Guards or Buttons?
Because we anticipate that people will create many more custom layouts and custom displays than they will Guards or Buttons.
it takes an extra step, and an extra learning to program in the type system in the way needed for guards and buttons and
I didn't want to impose that burden for the creation of custom layouts or displays

## Why do we have non compile time checked strings in some places?
Most of our strings that represent paths are turned into code which is type checked. But awkwardly some of these strings 
need to incorporated into the state, and we have a rule that only simple things (strings/numbers/boolean...) go into 
the state. An example would be the 'on close' behavior of the modal windows.

I think if we spend effort we could come up with a way to do this with strings. Perhaps the string is a look up into 
generated code... That would shift left in a very good way.  We haven't done it yet

## Why are we making such heavy use of snap shot tests for generated code?
Firstly they are quick to make. It's important that it's easy to write tests.

Secondly... I've tried unit tests on code generators a number of tmes and never really had success. What tends to happen
is that the unit test focuses on something that isn't actually that important, and becomes very difficult to maintain. I 
don't find this when writing code for 'behavior'. 

The current work flow is
* Get it working
* Snapshot it
* When we change the snapshots check carefully the deltas are in line with expectations

They have proven to be 'medium maintainance' (for code generation less than the unit tests in my experience) and have
stopped many regression errors, so they give high value.

## Why are we making contract tests when we generate both sides of the network?
Several reasons
* Does the framework work? When we make changes do we cover all the cases
* When we merge code together: team A does 10 forms, team B another 10, do we have clashes
* When we go to production, we might not be so monolithic. For example we might just update the server, or update the client, for a purpose unrelated to our code. Is it safe to do so?

## Why use lenstate instead of just lens
There are many things we pass through react
* The global state (aka main)
* A lens pointing to where this component is
* A whole load of dependency injected stuff

I really like compile time checking of dependency injection, so... we might end up with ten things in that list. We bundle them all into a lenstate and
just pass it through

Was this the right choice? I don't know. The problem with it is that the lenstate changes each time, but the lens don't.... 

Really if this takes off we want to cooperate with react and work out how to do this more optimally. Effectively we want to hook into the 'have we changed' react 
system. Most components have changed if and only if the data they are focused on has changed.

---------

## Should we introduce a new layer of abstraction for mass changes (or change the current)
At the moment we typically use Transforms to do 'more than one change. A transform is a 'optional + function'.

We can have instead commands like 'copy', 'set',  'setToLength'. Semantically richer and I think much easier to work with.

I think the answer is 'hell yes': look at the modal buttons to see why... it's a wall of maths. But with these it would become a lot more readable.
It also reads better in the trace log and while debugging

Obviously we don't want both layers, but we can do the following:
* Have the 'new way' generate transformers
* Graduablly migrate old code to the new way
* When they are all there, and the only user of transformers is the 'new way' we can delete the transformers

This will easy the writing of the following
* Actions on 'initial page'
* Rest and fetcher actions
* New buttons


## Why are we removing GraphQL from the mutations

When we started we assumed that GraphQL gave the same power over mutations that it does over queries. But it doesn't.
With a query we can have partial queries and graph ql 'stiches them up'. BUT for mutations they are 'one thing'

So it's a layer of abstraction and code and potential bugs with no benefit

## How are we going to manage new item creation / ID management

### Scenarios to consider
* Making a thing that we will edit after we have made it 
  * Making one thing and viewing it after the create
  * Making an item in a list, and we continue editing. This is a special case of the above
* Making a message and we shut down the gui and return when it is made (easy we can ignore ids)

### Comments
If there was just a simple id it would be easy. We would return the new id. Or the new object with ID in it. And the id management
would be easy: we return it from the function that creates the id

BUT the ids can be 'multiple'. i.e composite ids. And how are we going to represent that in Java?

If we did it manually we would have to create a class for the ID unless the class already existed (String / Integer/...) as
Java can only return one thing from a method. 

### Patterns
So one problem is 'how did the original code do ID management?'. Did it do it well. Oracle doesn't have a standard, it's
just a tool box. Sequences are obviously an answer. We might get the next id from a sequence, change the sql ... Or maybe
there was a trigger and somehow magically the row got the right answer? Which?

We have to be able to deal with the patterns that occur. Probably
* Get NEXT_ID from sequence, use id from sequence one or more times
* Insert into row, and it's triggered and ... and in this case I don't know how to get the id... so we'd probably blow 
away the master object and do a get. Might need to talk this over with an oracle guy.
* Call a stored procedure and one of the returned values is the id

### Solution for internal
```typescript
 restAction: 'create', mutateBy: [
    { mutation: 'sql', name: 'getId', sql: 'select nextId from someSeq', params: [ {type: 'output', name: 'someId'} ] , schema: onlySchema},
    { mutation: 'storedProc', name: 'create', params: [ {type: 'fromPrevious', name: 'someId'} ], schema: onlySchema },
  ]
```

### As yet undecided: 
How do we return this data/consume it on our (very constrained) gui
* We could allow the developer to say 'return the getter passing these arguments in '. 
  * Then we would copy the data over the data on the gui
  * We could do this by an 'optional' argument in the parameter 
* We could return all the ids used (where we need them or not) 
  * This feels hard to consume
```typescript
 restAction: 'create', mutateBy: [
    { mutation: 'sql', name: 'getId', sql: 'select nextId from someSeq', params: [ {type: 'output', name: 'someId', useInGetter: true} ] , schema: onlySchema},
    { mutation: 'storedProc', name: 'create', params: [ {type: 'fromPrevious', name: 'someId'} ], schema: onlySchema },
  ]
```

Realisation:
* Just use the getter... We don't need a separate create/update etc.. query. Just the getter.
* It will require ids... and it's the job of the developer to provide them
* We can put a // From xxx... If this doesn't compile because an id doesn't exist you need to create it as output params with mutations
* We can also detect if we make them all in the report.


# Initial data
We get initial data (CommonIds and other things) from two places:
* Other pages that have already executed and done their thing. Like the login pages, or search pages
* An API for things like dates and holidays and ...

## Data from other pages
CommonIds and we can have CommonData by 'just doing it'. If we are in control of adding things, the copy commands are enough. If it's another page outside 
ourcontrol, we just need to know where the data is and as control is passed to us update our state.

## Date and holidays
'Today' is a particularly interesting idea. Is it the browser today or the bank today? It doesn't take long to answer that it should be the
server today. Other answers lead to awkwardness. 

`Today` is interesting because it changes over time. If the browser makes a local cache of '`today`' how often should it change that local copy? 
We also want the browser to cache holidays, and the 'staleness requirement' for holidays is different to the staleness for `today`.

Let's assume we have two apis for this. And then generalise it to N. We effectively want N fetchers to execute. The logic for these fetchers
is slightly different. We want to execute these fetchers regularly.
* Type A: always update (used for `today`) and override the cached values
* Type B: check `regularly` (use for holidays and currency and lists of brands and stuff). Where `regularly` is the cache staleness setting

So suppose we add the idea of cache staleness
* Every 10 minutes (works for `today` quite well)
* Every hour (works for long lived reference data)
* ...

* We can have a list of fetchers at each staleness setting. 

## Updating
Two options:
* regular triggers. 'every ten mins', 'every hour', 'at eight o'clock every day'...
* Part of the flux loop

## Data recorded
We still need tags... and if they change the data loaded changes. 
We probably want to record 'when it was made'. And there is little downside in doing this for regular data
We could change the tag structure to support that...

## sharing
We want many of these to be shared across teams. If we have four teams and two releases each we don't want eight regular calls for today and holiday and currencies...

Some of these will be delivered by the central team (perhaps most). Others by the individual teams.

I propose we keep this data under the 'CommonData' location. Indexed by name under there (dateInfo)

## Steps
* Add time to the tags.
* Make lists of fetchers by staleness...  (these should compose)
* Have a widget to run the fetchers at the right time 
* Add CommonData to the debugger