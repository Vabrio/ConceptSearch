#!/bin/bash

npm install tsc
npm install iconv-lite
npm install express
npm install fs
npm install mysql

mysql -u conceptsearch -ppassword -e "create database cs;"
