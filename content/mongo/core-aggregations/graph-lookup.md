# graphLookup
A "Tree" structure of data, laid out in a "flat" style:
- A CEO (_has 5 direct reports_)
  - CMO
  - CRO
  - SVP Services
  - CFO
  - CTO (_has 2 direct reports_)
    - VP Product
    - SVP Engineering (_has 3 reports_)
      - vp ed
      - vs cloud eng.
      - vp core
In a dataset like this, each doc has...
- _id
- name
- title
- reports_to
  - pointing to another ID, conditionally present  

## Who reports to dave
```bash
db.parent_reference.aggregate([
  {
    $match: {
      name: 'Eliot'
    }
  },
  {
    $graphLookup: {
      from: 'parent_reference',
      startWith: '$_id',
      connectFromField: '_id',
      connectToField: 'reports_to',
      as: 'all_reports'
    }
  }
])
```
- match the `reports_to` val to the `_id` field
- stores in `all_reports`