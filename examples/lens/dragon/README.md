#  General nature of problem
 * A complex data structure with repeating structure, needing updating as an immutable thing

## Files
* index.ts The datastructure about Dragons
* dragonMethodsWithlens.ts What the code looks like using lens
* dragonMethodsWithoutLens.ts What the code looks like without lens

## Problem
We are writing a game about dragons. The dragons has different body parts and some have 'hit points'.

There are multiple body parts that we can damage: the wings, the chest or the head.

We need to write the following methods:
* Damage(index: Dragon, location: ?, amount: Hitpoints): Dragaon
    * The location is some means of references 'wing, chest or head. The amount is a number of hitpoints that are going to be subtracted from that locations hps
    * The hitpoints cannot go below zero
* Heal(index: Dragon, location: ?,maxHitpoints: Hitpoints, amount: Hitpoints, )
    * The inverse of damage. Hitpoints can't go above the maxHitpoints
* Eat(index: Dragon, thing: any): Dragon
    * the thing is added to the stomach

# Handling change

Let us now assume that there are two stories on the backlog
* Rename all the fields called 'hitpoint' to 'hp'
* Move the wings data structure so that they are not under 'body' but directly under index
* We are going to add People to project
** People have locations (head, chest). We are going to write heal, damage and eat methods for them 

# Solutions

## [Dragon without lens](https://github.com/focuson-ts/focuson/blob/master/examples/lens/dragon/src/withoutLens/dragonMethodsWithoutLens.ts)

The first thing to notice is how much code there is, and how much of it looks 'the same'. It
is possible to do some refactoring and clean this up, but all the attempts I tried ended
up with less readable code not more, and the refactored methods were not much easier
to refactor in the event of code change.

One of the things I dislike about this type of code is how the business logic become dominated by the 
boiler plate copy and paste code. There are solutions like [immer](https://immerjs.github.io/immer/docs/introduction) 
but they are typically large libraries and I don't think the resulting code is as clear and intention revealing

Other thing to look at is [the tests](/src/withoutLens/dragonMethodsWithoutLens.spec.ts). I found them to be difficult
to write, and the effort of writing them dominated by test data management rather than the business logic that the methods
are trying to implement. 

I did actually make a couple of typo errors accidentally when making the tests, and it was quite hard to detect and correct them.

## [Dragon with lens](https://github.com/focuson-ts/focuson/blob/master/examples/lens/dragon/src/withLens/dragonMethodsWithlens.ts)

Now compare these business logic methods with the equivalent in the without lens code. The first thing to note
is that the business logic doesn't actually know how the dragon is structures. It has no visibility at all to it. All 
it has is a lens that goes focuses on the bit of the structure we are interested in from the 'main object'. 

```typescript
export function eat(item: any): (d: Dragon) => Dragon {
    return dragonContentsL.transform(oldContents => [...oldContents, item]);}

export function damage(locationHpL: Lens<Dragon, Hitpoint>, damage: Hitpoint): (d: Dragon) => Dragon {
    return locationHpL.transform(hp => damage > hp ? 0 : hp - damage)
}
export function heal(locationHpL: Lens<Dragon, Hitpoint>, maxHp: Hitpoint, amount: Hitpoint): (d: Dragon) => Dragon {
    return locationHpL.transform(hp =>  (hp + amount)>maxHp ? maxHp : hp + amount)
}
```

It's also worth looking at the tests. They are dramatically smaller and simpler. They are much simpler to maintain 
especially when the domain changes as they don't have any test data management problems

# Observations
Consider the items on the backlog:
* Rename all the fields called 'hitpoint' to 'hp'
* Move the wings data structure so that they are not under 'body' but directly under index
* We are going to add People to project
     * People have locations (head, chest). We are going to write heal, damage and eat methods for them
  

## Rename all the fields called 'hitpoint' to 'hp'

We just use a refactoring browser. The last time I tried this 73 lines changed without lens, 5 lines with the lens. There were no signficant
problems with either approach

## Move the wings data structure so that they are not under 'body' but directly under index

### Without lens
I think it's at least a days work for me to do this refactor without the lens. The biggest pain is in the test data management. 
I could of course just delete some of the tests... which is what I have seen people do when this kind of painful refactor is
needed. Please note that as the number of business methods increase, this pain increases. After a point this becomes effectively 
impossible to do

### With lens
It's a couple of minutes work. In the tests we just need to change the 'startDragon'. In the code we just need to correct a couple of 
compiler errors. This is an exercise I recommend you do just to see how powerful the lens are in this scenario.

##  We are going to add People to project

### Without Lens
There is almost no ability to reuse the existing code, as all of it is tightly coupled to the Dragon. We start again. All the 
business methods need writing. We are doubling up on the test data management.... Pain all the way

### With the Lens

Something quite beautiful happened. I could have cut and pasted the dragon code. But instead it was trivial
to use generics and reuse the existing code for damage and heal. This means that I don't need to write new 
methods and test them: I can use the existing tests. I do need to change the tests for eat because I changed the
signature slightly but that turns out to be a one line change in the tests.

Basically because we have abstracted the path from 'the main' to the 'thing we are interested in', it turns
out that we can reuse the same business logic methods across different objects in the domain. We are used to
doing that through inheritance, but here we are doing it using powerful functional programming techniques

```typescript

interface Person{
    head: Head,
    chest: Chest
}

export let personL: Lens<Person, Person> = Lenses.build('person')
export let personContentsL: Lens<Person, any[]> = personL.focusOn('chest').focusOn('stomach').focusOn('contents')

//Note that I changed the signature of eat. We could have left the old method signature, made a new method and called the new one from the old
// if we wanted to minimize the scope of this change
export let eat = <Main>(toContentsL: Lens<Main, any[]>) => (item: any) =>
        toContentsL.transform(oldContents => [...oldContents, item]);
export function damage<Main>(locationHpL: Lens<Main, Hitpoint>, damage: Hitpoint): (main: Main) => Main {
    return locationHpL.transform(hp => damage > hp ? 0 : hp - damage)
}
export function heal<Main>(locationHpL: Lens<Main, Hitpoint>, maxHp: Hitpoint, amount: Hitpoint): (d: Main) => Main {
    return locationHpL.transform(hp =>  (hp + amount)>maxHp ? maxHp : hp + amount)
}
```
