#! /bin/bash

pg_dump -d $POSTGRES_DB -U $POSTGRES_USER > backup.sql