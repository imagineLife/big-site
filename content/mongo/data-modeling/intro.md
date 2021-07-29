# introduction to data modeling for mongodb

Some constraints with apps:

- hardware
  - ram
  - SSD/HD size
- data
  - size
  - security
- app
  - network latency
- db server
  - MAX SIZE OF 16MB
  - atomicity of updates

The **Working Set** of data is the total body of data that the app normally uses.

The model of data is defined by hardware & by the nature of the datasets.  
Constraints and their impacts are important to identify as contributors to data models.  
The model should get updated as the tech and landscape changes.

## A method

Creating a schema.

### Describe the workload

- user scenarios
- business domain experts for usability details
- get logs and stats about the current system(s) involved
- assemble all info in a schema, by a _data modeling expert_
- guess at size the data over time - will get this wrong, but awareness of these details over time will be helpful when iterating over schema changes
- figure out how many operations are run at a time
  - latency
  - tolerance to staleness

### ID the relationships between the entities

### Apply design patterns or transformations to the current model for performance improvements
