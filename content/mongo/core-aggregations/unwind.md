# unwind  
Unwinds an array.  
Each item becomes a document.  
```bash
db.movies.aggregate([
  {$match: {title: "Baby's Dinner"}},
  {$unwind: "$cast"},
  {$project: { title: 1, _id: 0, "cast": 1 }}
])

# returns...
{ "title" : "Baby's Dinner", "cast" : "Mrs. Auguste Lumiere" }
{ "title" : "Baby's Dinner", "cast" : "Andr�e Lumi�re" }
{ "title" : "Baby's Dinner", "cast" : "Auguste Lumi�re" }
```

## Can be helpful for grouping on array entries
Grouping movies based on year AND genres is complex. Array order matters.  

### Exampl
Find 
- most popular genre 
  - grouped by year
  - from 2010-2015  
  - with runtime of greater-than 90 min
  - movies that have been rated

```bash
```