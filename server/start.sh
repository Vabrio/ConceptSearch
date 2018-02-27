#!/bin/bash

tsc --target ES5
cd build
nodejs rest_server.js
