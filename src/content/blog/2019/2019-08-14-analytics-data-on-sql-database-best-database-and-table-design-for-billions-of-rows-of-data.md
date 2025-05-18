---
title: "Analytics Data on SQL Database - Best database and table design for billions of rows of data"
slug: analytics-data-on-sql-database-best-database-and-table-design-for-billions-of-rows-of-data
date: 2019-08-14
url: https://mfyz.com/?p=339
tags: ["Back-End","database","db","postgresql","sql"]
category: Back-End
migration: {"wpId":339,"wpPostDate":"2019-08-14T00:57:55.000Z"}
---

This is not an article that I am writing but I'm mostly quoting a great gem on a stack overflow answer I came across when I was researching a DIY way to store and create analytics reports for a small to medium size project. The project's type doesn't matter because this is a generic problem and great solution.

#### Why not use analytics tools/services?

I am in constant search of the better alternatives or simpler versions of the solutions we use at my team. We certainly use many services and tools from open source to licensed software. But I still choose to understand, know and be able to apply these solutions by myself on a custom solution where I have full control over the data, output and user experience.

So I casually read and research how others approach the issues or queries wander in my mind.

Then I stumbled upon this stack overflow thread with a brilliant answer that contains steps to try out from scratch that I suggest any engineer to just try and play on their own time.

# PostgreSQL and BRIN indexes

To create a sample table with 1.7 billion rows of a sample sensor data (temperature read from the sensor with timestamps in the logs):

```
EXPLAIN ANALYZE
CREATE TABLE electrothingy
AS
  SELECT
    x::int AS id,
    (x::int % 20000)::int AS locid,  -- fake location ids in the range of 1-20000
    now() AS tsin,                   -- static timestmap
    97.5::numeric(5,2) AS temp,      -- static temp
    x::int AS usage                  -- usage the same as id not sure what we want here.
  FROM generate_series(1,1728000000) -- for 1.7 billion rows
    AS gs(x);

                             QUERY PLAN                              
--------------------------------------------------------------------
 Function Scan on generate_series gs  (cost=0.00..15.00 rows=1000 width=4) (actual time=173119.796..750391.668 rows=1728000000 loops=1)
 Planning time: 0.099 ms
 Execution time: 1343954.446 ms
(3 rows)
```

So it took 22min to create the table. Largely, because the table is a modest 97GB. Next, we create the indexes,

```
CREATE INDEX ON electrothingy USING brin (tsin);
CREATE INDEX ON electrothingy USING brin (id);    
VACUUM ANALYZE electrothingy;
```

It took a good long while to create the indexes too. Though because they're BRIN they're only 2-3 MB and they store easily in ram. Reading 96 GB isn't instantaneous, but it's not a real problem for my laptop at your workload.

Now we query it.

```
EXPLAIN ANALYZE
SELECT max(temp)
FROM electrothingy
WHERE id BETWEEN 1000000 AND 1001000;

                             QUERY PLAN                                                                  
--------------------------------------------------------------------
 Aggregate  (cost=5245.22..5245.23 rows=1 width=7) (actual time=42.317..42.317 rows=1 loops=1)
   ->  Bitmap Heap Scan on electrothingy  (cost=1282.17..5242.73 rows=993 width=7) (actual time=40.619..42.158 rows=1001 loops=1)
         Recheck Cond: ((id >= 1000000) AND (id <= 1001000))
         Rows Removed by Index Recheck: 16407
         Heap Blocks: lossy=128
         ->  Bitmap Index Scan on electrothingy_id_idx  (cost=0.00..1281.93 rows=993 width=0) (actual time=39.769..39.769 rows=1280 loops=1)
               Index Cond: ((id >= 1000000) AND (id <= 1001000))
 Planning time: 0.238 ms
 Execution time: 42.373 ms
(9 rows)
```

## Update with timestamps

Here we generate a table with different timestamps in order to satisfy the request to index and search on a timestamp column, creation takes a bit longer because `to_timestamp(int)` is substantially more slow than `now()` (which is cached for the transaction)

```
EXPLAIN ANALYZE
CREATE TABLE electrothingy
AS
  SELECT
    x::int AS id,
    (x::int % 20000)::int AS locid,
    -- here we use to_timestamp rather than now(), we
    -- this calculates seconds since epoch using the gs(x) as the offset
    to_timestamp(x::int) AS tsin,
    97.5::numeric(5,2) AS temp,
    x::int AS usage
  FROM generate_series(1,1728000000)
    AS gs(x);

                             QUERY PLAN                                                                
--------------------------------------------------------------------
 Function Scan on generate_series gs  (cost=0.00..17.50 rows=1000 width=4) (actual time=176163.107..5891430.759 rows=1728000000 loops=1)
 Planning time: 0.607 ms
 Execution time: 7147449.908 ms
(3 rows)
```

Now we can run a query on a timestamp value instead,,

```
EXPLAIN ANALYZE
SELECT count(*), min(temp), max(temp)
FROM electrothingy WHERE tsin BETWEEN '1974-01-01' AND '1974-01-02';
                                                                        
                              QUERY PLAN                                                                         
--------------------------------------------------------------------
 Aggregate  (cost=296073.83..296073.84 rows=1 width=7) (actual time=83.243..83.243 rows=1 loops=1)
   ->  Bitmap Heap Scan on electrothingy  (cost=2460.86..295490.76 rows=77743 width=7) (actual time=41.466..59.442 rows=86401 loops=1)
         Recheck Cond: ((tsin >= '1974-01-01 00:00:00-06'::timestamp with time zone) AND (tsin <= '1974-01-02 00:00:00-06'::timestamp with time zone))
         Rows Removed by Index Recheck: 18047
         Heap Blocks: lossy=768
         ->  Bitmap Index Scan on electrothingy_tsin_idx  (cost=0.00..2441.43 rows=77743 width=0) (actual time=40.217..40.217 rows=7680 loops=1)
               Index Cond: ((tsin >= '1974-01-01 00:00:00-06'::timestamp with time zone) AND (tsin <= '1974-01-02 00:00:00-06'::timestamp with time zone))
 Planning time: 0.140 ms
 Execution time: 83.321 ms
(9 rows)
```

Result:

```
 count |  min  |  max  
-------+-------+-------
 86401 | 97.50 | 97.50
(1 row)
```

So in 83.321 ms we can aggregate 86,401 records in a table with 1.7 Billion rows. That should be reasonable.

# Hour ending

Calculating the hour ending is pretty easy too, truncate the timestamps down and then simply add an hour.

```
SELECT date_trunc('hour', tsin) + '1 hour' AS tsin,
  count(*),
  min(temp),
  max(temp)
FROM electrothingy
WHERE tsin >= '1974-01-01'
  AND tsin < '1974-01-02'
GROUP BY date_trunc('hour', tsin)
ORDER BY 1;
          tsin          | count |  min  |  max  
------------------------+-------+-------+-------
 1974-01-01 01:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 02:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 03:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 04:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 05:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 06:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 07:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 08:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 09:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 10:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 11:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 12:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 13:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 14:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 15:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 16:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 17:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 18:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 19:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 20:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 21:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 22:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-01 23:00:00-06 |  3600 | 97.50 | 97.50
 1974-01-02 00:00:00-06 |  3600 | 97.50 | 97.50
(24 rows)

Time: 116.695 ms
```

It's important to note, that it's not using an index on the aggregation, though it could. If that's your typical query you probably want a BRIN on `date_trunc('hour', tsin)` therein lies a small problem in that `date_trunc` is not immutable so you'd have to first wrap it to make it so.

# Partitioning

Another important point of information on PostgreSQL is that PG 10 bring [partitioning DDL](https://www.postgresql.org/docs/10/static/ddl-partitioning.html#ddl-partitioning-declarative). So you can, for instance, easily create partitions for every year. Breaking down your modest database into minor ones that are tiny. In doing so, you should be able to use and maintain btree indexes rather than BRIN which would be even faster.

```
CREATE TABLE electrothingy_y2016 PARTITION OF electrothingy
    FOR VALUES FROM ('2016-01-01') TO ('2017-01-01');
```

This is a great answer to the topic around working with analytics data on SQL databases. Finally thinking about table partitioning is always a good plan-ahead strategy for any data gets over millions and have distributed data around timestamps.

Reference: [Best database and table design for billions of rows of data](https://dba.stackexchange.com/a/188681)