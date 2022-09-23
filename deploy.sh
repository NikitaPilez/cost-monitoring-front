#!/bin/bash
npm run build &&
rsync -av --delete ./dist/ user@143.198.113.70:www/
