# Identify the workload

- Usability Scenarios
- Production Logs & Stats
- Business Domain Experts
- **Data Modeling Expert**
- Assumptions on workloads
  - frequencies
  - relationship amounts (minimum 0, maximum 24?!, maximum 2500?)

Example:

- an IoT EDB
- 100 million weather sensors sending data
- collect the data
- make it available to 10 data scientists
- MOST trends can be deduced hourly
- no logs or stats to leverage
- data can be collected and sent 1x per minute
- need to keep data for more than 10 years
- ops team needs to validate faulty devices
- ops team needs to be able to aggregate data for the data scientists
- data scientists need to explore and find trends

## list the CRUD

| Item/Person    | Use-Case                         | Data                        | CRUD         |
| -------------- | -------------------------------- | --------------------------- | ------------ |
| Devices        | Sending data every minute        | device_id, metrics          | WRITE        |
| Ops Team       | ID busted devices                | device_id, timestamp        | READ         |
| Ops Team       | aggregate hourly data sets       | device_id, metrics          | READ / WRITE |
| Data Scientist | run 10 analytical queries hourly | metrics, aggregated metrics | READ         |

## Understanding write operations

- sent by sensors
- sent to the server
- WRITE / INSERT
- data has device ID, timestamp and metrics
- 1.6M writes per second: db partitioned in 10-20 shards can handle this
- Data size = 1000 Bytes
- Life of data is 10 years
- Does not need to be extensively durability, do not need multiple-node majority confirmation on write: even though we want 1x-per-minute data, the data will get aggregated hourly most often when consumed
- consider grouping the writes because there are so many

## Understand the read operations

- most queries will be on temperature data
- read queries
- 100 queries per hour: 10 scientists, 10 reqs per person
- will require collection scans
- mostly uses last-hour's worth of data

## Understand Relationships

- What are the relationships?!
- How many relationships are there?
- Should these relationships be embedded or linked?!

## Apply patterns

- recognize patterns
- apply patterns

## A takeaway

Consider leveraging a dedicated node for analytics.  
Primary for writes, secondary for reads.

## A Flexible Methodology For Modeling Data

| Goal                              | Shooting For Simplicity                             | Between Simple & Performance | Shooting For Optimal Performance        |
| :-------------------------------- | :-------------------------------------------------- | :--------------------------- | :-------------------------------------- |
| Describe the Workload             | ID Most-Frequent Operations                         |                              | ID ALL Operations, quantify ALL of them |
| Describe ID & Model relationships | Embed a lot of content: large object, less querying |                              | Embed AND Link                          |
| Apply Patterns                    | Few Patterns - May Include data-duplication         |                              | Many Patterns for many details          |

### An Example, Data For A Coffee Shop

#### Business Needs

- 1K stores
- make killer coffee
- stick to a strict coffee recipe
- use smart && automated coffee hardware (shelving stock systems, coffee makers, etc.)

#### Describe Data Workload

| Query                                                      | Operation Type                                                         | Business Description                                                                          |
| :--------------------------------------------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| Get/Set the weight of coffee beans on a shelf              | **Write**, when person takes coffee off shelf or stocker adds to shelf | Shelf sends event when coffee bags are removed && added                                       |
| Read how much coffee was consumed by the store & customers | **Read** as analytics                                                  | Show how much coffee was consumed and forecast how much coffee should be ordered the next day |
| Find anomalies in the inventory                            | **Read** as analytics                                                  | Gain insights into unexpected inventory details                                               |
