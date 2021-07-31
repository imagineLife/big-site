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
Fanning data out either happens on read or write.  
Fanning out is about the "state" of data being in several places. Fan out on write is about while writing data, writing to many places.  
Fan out on read is about reading from many places on read.  
One advantage to fan out on write is to take MORE time writing in exchange for MORE time on read.
Fan-Out on write can work in social network "follower" style data sources - when data gets written by the person or entity being followed, the data gets written to all followers' content list. The data that followers see is specific to the follower, but the data is actually copies of the person posting.

**Roll-Up operations.**  
Merge Data together: grouping categories into PARENT categories, grouping time-based categories into LARGER time-frame categories. Roll-Up data is more generic than the detailed data.

## Polymorphic

## Attribute

## Bucket
