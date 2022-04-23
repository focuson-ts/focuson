# Don't work - fixes planned but not started
* Restful operations (including fetching) on RepeatingData. 
    * Work round: Wrap the RepeatingData in a DataD.
* Having a MultipleEntity that is a child of a multiple entity
* optional names '#selected' in paths for rest
* 
# Work poorly
* Guards on data: very painful (not impossible) to create new types although easy to use existing types
* Guards on button: very painful (not impossible) to create new type, and not particularly easy to use
* There is 'bodge' in the MultipleEntity for linking the entity to the DataD. Hard to explain but needed, so we should work out how to do this better

