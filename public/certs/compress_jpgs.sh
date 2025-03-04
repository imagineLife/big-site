#!/bin/bash

# Check if jpegoptim is installed
if ! command -v jpegoptim &> /dev/null
then
    echo "Error: jpegoptim is not installed. Install it with 'brew install jpegoptim' or 'sudo apt install jpegoptim'."
    exit 1
fi

# Directory to process (defaults to current directory if not provided)
DIR="${1:-.}"

# Loop through all JPG files in the directory
for file in "$DIR"/*.jpg "$DIR"/*.JPG "$DIR"/*.jpeg; do
    # Skip if no JPG files exist
    [ -e "$file" ] || continue

    # Get filename without extension
    filename=$(basename -- "$file")

    # Define output file name
    output_file="$DIR/${filename%.jpg}-small.jpg"
    # output_file="${output_file%.jpeg}-small.jpeg"

    # Compress with jpegoptim
    jpegoptim --max=80 --strip-all --dest="$DIR" -- "$file"

    # Rename output file with "-small"
    mv -- "$file" "$output_file"

    echo "Compressed: $file → $output_file"
done

echo "Compression complete!"
