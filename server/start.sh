#!/bin/bash

cd /home/nath/concept_search/server
tsc
cd src
node rest_server.js
