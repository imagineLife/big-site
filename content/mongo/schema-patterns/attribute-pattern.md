# Attribute Patterns

Some attributes & characteristics will be present across docs, common schema details.
With tons of fields and tons of query needs, there may be tons of indexes.

## Solves a Problem

A lot of similar fields with similar types.  
Some fields may NOT be present in some docs.

## How to solve

Id fields to make conditional.  
Make them conditional.  
Convert them to array-of-object setup.  
Create indexes on the array key/val fields.

```bash
# starting
{
  itm: 'battery',
  'built_in': 'China',
  brand: 'LowPower',
  input: "5V/1300 mA",
  output: "5V/1A",
  cap: "4200 mAh"
}

# maybe the input/output/capacity fields are not always present

# migrated to attribute pattern
{
  itm: 'battery',
  'built_in': 'China',
  brand: 'LowPower',
  extra_specs: [
    { k: "input", v: "5V/1300 mA"},
    { k: "output", v: "5V/1A"},
    { k: "cap", v: "4200 mAh"}
  ]
}

```
