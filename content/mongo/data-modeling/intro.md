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
