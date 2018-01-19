#!/usr/bin/env node
const fs = require('fs');
const json = require('../package.json');

const visioning = /(\d+)\.(\d+)\.(\d+)/;
const versions = json.version.match(visioning);

const MAX_VERSION = 9;

let major = parseInt(versions[1]);
let minor = parseInt(versions[2]);
let patch = parseInt(versions[3]);

patch++;

if (patch > MAX_VERSION) {
    patch = 0;
    minor++;

    if (minor > MAX_VERSION) {
        minor = 0;
        major++;
    }
}

json.version = `${major}.${minor}.${patch}`;

fs.writeFileSync(`${__dirname}/../package.json`, JSON.stringify(json, null, 2), 'utf-8');
