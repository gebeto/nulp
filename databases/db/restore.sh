#! /bin/bash

sqll -d $POSTGRES_DB -U $POSTGRES_USER < backup.sql