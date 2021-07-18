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

Idea One, find the max avg_high_temp, && use `$reduce`. high-temp value from the `trends` array
```bash
db.icecream_data.aggregate([
  {
    $project: {
      _id: 0,
      max_high: {
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

# should return 
{ "max_high" : 87 }

```
- if the current iteration avg high temp is greater than the accumulator
  - return this high temp val
  - else return the accumulator
- here, `$$value` is like the accumulator
- $this is the current item in the iterator

## Max
Now, use the `$max` which is a type of grouping.
```bash
db.icecream_data.aggregate([
  {
    $project: {
      _id: 0,
      max_high: { $max: "$trends.avg_high_tmp" }
    }
  }
])

# should return same as above,
{ "max_high" : 87 }
```
Much smaller query.   

## Min
Now, get the min avg low temp
```bash
db.icecream_data.aggregate([
  {
    $project: {
      _id: 0,
      min_avg_low: {
        $min: "$trends.avg_low_tmp"
      }
    }
  }
])

# should return
{ "min_avg_low" : 27 }
```
## stdDevPop and Avg
Calc avg cpi.  
Calc the cpi standard deviation.    
```bash
db.icecream_data.aggregate([
  {
    $project: {
      _id: 0,
      avg_cpi: {
        $avg: "$trends.icecream_cpi"
      },
      cpi_deviation: {
        $stdDevPop: "$trends.icecream_cpi"
      }
    }
  }
])

# should return...
{ "avg_cpi" : 221.275, "cpi_deviation" : 6.632511464998266 }
```

## Sum
```bash
db.icecream_data.aggregate([
  {
    $project: {
      _id:0,
      yearly_sales_in_millions: {
        $sum: "$trends.icecream_sales_in_millions"
      }
    }
  }
])

# should return...
{ "yearly_sales_in_millions" : 1601 }
```
