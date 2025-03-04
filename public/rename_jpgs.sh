#!/bin/bash

# Directory to process (defaults to current directory if not provided)
DIR="${1:-.}"

# Loop through all PNG files with "-small" suffix
for file in "$DIR"/*-small.png; do
    # Skip if no matching files exist
    [ -e "$file" ] || continue

    # Remove "-small" from filename
    new_name="${file/-small/}"

    # Rename file
    mv -- "$file" "$new_name"

    echo "Renamed: $file → $new_name"
done

echo "Renaming complete!"