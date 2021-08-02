# Thoughts on Mongo

I've begun an endeavor into mongoDB.

## The Intrigue of noSQL and the Flexible Schema

During an interview with a backend-focused dev, a question was posed about their experience with database work. `How have you dealt with database versioning in a Continuous Integration and Continuous Deployment setup?`

I've personally only really dabbled with database "versioning", and it seems more sensitive than the frontend of a web-app, and more sensitive than API changes. Databases, because they deal with data directly, seem super temperamental...
Delete data without ba backup? busted.  
Remove columns without api changes? busted.  
Change how data is stored to simplify query logic? Better update that api or else.

Anywho, the candidate's reply has poured metaphorical gasoline on a little flame of mine... `well we've been using Mongo so we don't really have to deal with it`(_or something like that_).
