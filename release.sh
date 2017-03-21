#!/bin/bash
au build --env prod
if [ $? -ne 0 ]; then
    exit
fi
rm -r docs
mkdir docs
cp -r scripts docs
cp -r fonts docs
cp -r images docs
cp -r sounds docs
cp index.html docs
mkdir docs/src
cp src/*.css docs/src
timestamp=`date "+%Y%m%d-%H%M"`
sed -i "s/dev build/build $timestamp/g" docs/index.html
git add docs
git add docs/**
git commit -m "Updating live site"
git push
