setup: prepare install

prepare:
	cp -n .envExample .env || true

install:
	npm ci

start:
	npx nodemon api/bin/server.js

lint:
	npx eslint .
