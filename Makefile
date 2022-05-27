install:
	npm ci

start:
	npx nodemon api/bin/server.js

lint:
	npx eslint .
