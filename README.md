
1st terminal
```
npm install knex -g
```
```
npm install postgres -g
```
```
npm install
```
```
createdb dev_test
```
```
postgres -D /usr/local/var/postgres
```

2nd  terminal
```
nodemon
```

3rd terminal

Populate the database
```
node db/populate.js
```

Test out readOrg function
```
node api/readOrg.js
```

Test out addEmployee function
```
node api/addEmployee.js
```

Test out promoteEmployee function
```
node api/promoteEmployee.js
```

4th terminal

run sql queries
```
psql dev_test
```
