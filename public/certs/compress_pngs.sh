#!/bin/bash

# Check if pngquant is installed
if ! command -v pngquant &> /dev/null
then
    echo "Error: pngquant is not installed. Install it with 'brew install pngquant' or 'sudo apt install pngquant'."
    exit 1
fi

# Directory to process (defaults to current directory if not provided)
DIR="${1:-.}"

# Loop through all PNG files in the directory
for file in "$DIR"/*.png; do
    # Skip if no PNG files exist
    [ -e "$file" ] || continue

    # Get filename without extension
    filename=$(basename -- "$file" .png)

    # Define output file name
    output_file="$DIR/${filename}-small.png"

    # Compress with pngquant
    pngquant --quality=65-80 --speed 1 --output "$output_file" -- "$file"

    echo "Compressed: $file → $output_file"
done

echo "Compression complete!"
