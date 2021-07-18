# accumulator exps inside project
The accumulator logic happens on a per-doc basis.  

Start with some data.  
Not to forget, this is on the `aggregation` db. Here, the icecream dataset will be leveraged.  

A snapshot of the data
```bash
db.icecream_data.findOne()

{
"\_id" : ObjectId("59bff494f70ff89cacc36f90"),
"trends" : [
{
"month" : "January",
"avg_high_tmp" : 42,
"avg_low_tmp" : 27,
"icecream_cpi" : 238.8,
"icecream_sales_in_millions" : 115
},
{
"month" : "February",
"avg_high_tmp" : 44,
"avg_low_tmp" : 28,
"icecream_cpi" : 225.5,
"icecream_sales_in_millions" : 118
},
{
"month" : "March",
"avg_high_tmp" : 53,
"avg_low_tmp" : 35,
"icecream_cpi" : 221.9,
"icecream_sales_in_millions" : 121
},
# ...etc
```

Idea One, find the, use `$reduce` to find the maximum avg. high-temp value from the `trends` array
```bash
db.icecream_data.aggregate([
  {
    $project: {
      _id: 0,
      max_avg_high: {
        $reduce: {
          input: "$trends",
          initialValue: 0,
          in: { 
            $cond: {
              if: {
                $gt : ["$$this.avg_high_tmp"
, "$$value"]
              },
              then: "$$this.avg_high_tmp",
              else: "$$value"
            } 
          }
        }
      }
    }
  }
])
```
- if the current iteration avg high temp is greater than the accumulator
  - return this high temp val
  - else return the accumulator
- here, `$$value` is like the accumulator
- $this is the current item in the iterator