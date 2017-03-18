#!/bin/bash
rm -r build
polymer build --add-service-worker
if [ ! -d "build" ]; then
  exit
fi
rm -r docs
mv build/default docs
rm -r build
timestamp=`date "+%Y%m%d-%H%M"`
sed -i "s/dev build/build $timestamp/g" docs/index.html
git add docs
git add docs/**
git commit -m "Updating live site"
git push
