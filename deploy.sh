#!/bin/bash
npm run build &&
rsync -av --delete ./dist/ $1@$2:www/
