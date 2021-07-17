# project
Like map in js.  

## Remove values 
Project can remove fields from being presented after this pipeline step.  

```bash
{fieldName: 0}
```
## Keep Values
Project can explicitly keep values to keep after this pipeline step.  
```bash
{ fieldname: 1}
```

an example of keeping 1 field, and even removing the `_id` field:
```bash
db.solarSystem.aggregate([
  {
   $project: {_id:0, name:1} 
  }
])

# should return...
{ "name" : "Sun" }
{ "name" : "Mercury" }
{ "name" : "Venus" }
{ "name" : "Earth" }
{ "name" : "Mars" }
{ "name" : "Jupiter" }
{ "name" : "Saturn" }
{ "name" : "Uranus" }
{ "name" : "Neptune" }

```