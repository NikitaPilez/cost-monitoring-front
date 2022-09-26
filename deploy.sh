#!/bin/bash
tmp=/dev/shm/cost-monitoring-front
rm -rf ${tmp} && \
git clone -l -s . ${tmp} -b master && \
cd ${tmp} && \
echo "Building..." && \
npm i && \
npm run build && \
rm -rf .gitignore deploy.sh .git* README.md && \
echo "Deploying..." && \
rsync -av --delete ./dist/ user@143.198.113.70:www/ && \
echo "Done in ${SECONDS} sec."
