# Patterns

There are several "patterns" for storing related data.
These are patterns that solve problems.
If there is no problem, these patterns may be overkill.

## Extended Reference

Carry SOME details of one dataset into another.  
When there are many "joins" going in, consider bringing frequently-accessed fields from the joined collections into the mainly-accessed collection.

## Subset

Sort of like an extended reference.  
Useful when a LARGE portion of data is in a doc that is rarely used. When a doc size starts getting large, introduce this subset idea.
As long as the `working set` of data fits in ram, the app will perform well.  
Subset could be about moving a handful of unused fields to a different 1-to-1 related side table: taking a `user` object and splitting unused keys into a `user_extra` type collection.

## Computed

**Math Operations.**  
Compute sums, averages, median, etc.  
When doing MANY more reads than writes, the computed pattern saves cpu energy by calculating on-write instead of on-read.

**Fan-Out operations.**

**Roll-Up operations.**

## Polymorphic

## Attribute

## Bucket
