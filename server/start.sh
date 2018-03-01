#!/bin/bash

tsc #--target ES2017
cd build
nodejs rest_server.js
