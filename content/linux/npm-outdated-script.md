---
parentDir: linux
title: A Script for checking outdated npm dependency versions
slug: linux/npm-outdated-script
author: Jake Laursen
excerpt: Intended to add to a ci-cd flow, i.e github action
tags: linux, bash, npm, dependencies, maintenance
order: 26
---

## The script
Requirements:
- must be located in the root directory of a node project
- project must include a `package.json` file with dependencies &/or devDependencies listed
- project must have the dependencies installed, via something like `npm install`
- running `npm outdated` must work in the project root - this script uses npm outdated

NOTE: this is a work-in-progress...
- dealing with package version strings seems particular:
  - getting the version numbers into a list
  - replacing any "*" with a value seems important
  - comparing current vs. wanted version for major, minor, and patch differences will matter

```bash
#!/bin/bash
NEW_LINE='\n'

echo "cli output"
echo "_ _ _ _ _"
npm outdated

echo "- - - - -"
echo "Prettier output"
echo "_ _ _ _ _"

minor_output_header="******${NEW_LINE}Minor Updates Available${NEW_LINE}These can be updated per running \"npm i\", as your package.json indicates the new version is allowed${NEW_LINE}******"

echo $minor_output_header
# outdated line handler
function getLineParts(){
  # INPUT like...
  # $1 Package 
  # $2 Current 
  # $3 Wanted 
  # $4 Latest  
  # $5 Location  (MIGHT not use)
  # $6 Depended by (wont use)
  echo "$1 latest available: $4";
}

line_no=1

# npm outdated | while read line; do
npm outdated | while IFS= read -r line; do
  if [ "$line_no" -gt 1 ]; then
    # ((line_no++))
    # line_no=$((line_no+1))
    # my_process "$line"
    getLineParts $line
    ((line_no=line_no+1))
  fi
  if [ "$line_no" = 1 ]; then
    # SKIP the header row
    ((line_no=line_no+1))
  fi
done
```