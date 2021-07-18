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
