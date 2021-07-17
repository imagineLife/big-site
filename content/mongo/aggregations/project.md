# project
Like map in js.  
Project shapes a new output in this step of the pipeline.

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

### Keep Subfields
With subfields, the key(s) containing the subfields must be a string with dot notation, `parentObj.childKey`:
```bash
db.solarSystem.aggregate([{$project: {_id:0, name:1, 'gravity.value': 1}}])
{ "name" : "Sun", "gravity" : { "value" : 274 } }
{ "name" : "Mercury", "gravity" : { "value" : 3.24 } }
{ "name" : "Venus", "gravity" : { "value" : 8.87 } }
{ "name" : "Earth", "gravity" : { "value" : 9.8 } }
{ "name" : "Mars", "gravity" : { "value" : 3.71 } }
{ "name" : "Jupiter", "gravity" : { "value" : 24.79 } }
{ "name" : "Saturn", "gravity" : { "value" : 10.44 } }
{ "name" : "Uranus", "gravity" : { "value" : 8.87 } }
{ "name" : "Neptune", "gravity" : { "value" : 11.15 } }
```

## Reassigning fields
Here, the dub-field of `gravity.value` will be re-assigned to `value`.  
The new field gets declared as a key. The value that the project uses to assign to the new key, the aggregation expression must prefix the field (_& subfield combo if present, like below_) with a `$`.
```bash
db.solarSystem.aggregate([{$project: {_id:0, name:1, gravity: '$gravity.value'}}])
{ "name" : "Sun", "gravity" : 274 }
{ "name" : "Mercury", "gravity" : 3.24 }
{ "name" : "Venus", "gravity" : 8.87 }
{ "name" : "Earth", "gravity" : 9.8 }
{ "name" : "Mars", "gravity" : 3.71 }
{ "name" : "Jupiter", "gravity" : 24.79 }
{ "name" : "Saturn", "gravity" : 10.44 }
{ "name" : "Uranus", "gravity" : 8.87 }
{ "name" : "Neptune", "gravity" : 11.15 }
```