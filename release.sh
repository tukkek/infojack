#!/bin/bash
rm -r build
polymer build --add-service-worker
if [ ! -d "build" ]; then
  exit
fi
rm -r docs
mv build/default docs
rm -r build
git add docs
git add docs/**
git commit -m "Updating live site"
git push
