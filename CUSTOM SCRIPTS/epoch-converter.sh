#!/bin/bash
# This script converts epoch timestamps to normal timestamps in a log file

# Check if log file is provided
if [ -z "$1" ]
then
  echo "Please provide a log file"
  exit 1
fi

# Check if log file exists
if [ ! -f "$1" ]
then
  echo "File not found"
  exit 1
fi

# Create new file name
output_file="${1%.*}_converted.log"

# Loop through each line in the log file
while read line; do
  # Find all epoch timestamps in the line
  epoch_timestamps=$(echo "$line" | grep -Eo '[0-9]{10,13}')

  # Convert each epoch timestamp to a normal timestamp
  for epoch_timestamp in $epoch_timestamps; do
    normal_timestamp=$(date -d @$epoch_timestamp '+%Y-%m-%d %H:%M:%S')
    line=$(echo "$line" | sed "s/$epoch_timestamp/$normal_timestamp/")
  done

  # Write the modified line to the new file
  echo "$line" >> "$output_file"
done < "$1"

echo "Conversion complete. Output saved as $output_file"
