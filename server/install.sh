#!/bin/bash

npm install typescript
npm install iconv-lite
npm install express
npm install fs
npm install mysql
npm install bcrypt
npm install body-parser
npm install jsonwebtoken

mysql -u conceptsearch -ppassword -e "create database cs;"
