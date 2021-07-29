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
