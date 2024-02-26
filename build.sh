#!/bin/bash

cp -r server dist
cd client
npm run build
cd ..
cp -r client/dist/* dist/static/
cd dist
