#!/bin/sh

set -e;

sudo npm install -g flow-bin@v0.49.1
sudo npm install -g flow-typed@v2.1.2

npm install
flow-typed install
