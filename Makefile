setup: prepare install

prepare:
	cp -n .envExample .env || true

install:
	npm ci

start:
	npx nodemon api/bin/server.js

start-dev:
	heroku local -f Procfile.dev


lint:
	npx eslint .
