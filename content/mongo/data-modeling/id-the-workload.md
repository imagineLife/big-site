# Identify the workload

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

## A takeaway

Consider leveraging a dedicated node for analytics.  
Primary for writes, secondary for reads.
