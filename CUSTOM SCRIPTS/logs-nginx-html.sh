#!/bin/bash

# Prompt the user to enter the name of the NGINX log file
echo "Please enter the name of the NGINX log file (including the file extension):"
read logfile

# Create the output file name
outputfile="${logfile%.*}.html"

# Start creating the HTML table
echo "<html><body><table border=\"1\"><tr><th>IP Address</th><th>Time</th><th>HTTP Method</th><th>URL</th><th>HTTP Protocol</th><th>HTTP Status Code</th><th>Bytes Sent</th><th>Referrer</th><th>User Agent</th></tr>" > "$outputfile"

# Use awk to extract the relevant fields from the log file and output them to the HTML table
awk '{print "<tr><td>"$1"</td><td>"$4" "$5"</td><td>"$6"</td><td>"$7"</td><td>"$8"</td><td>"$9"</td><td>"$10"</td><td>"$11"</td><td>"$12"</td></tr>"}' "$logfile" >> "$outputfile"

# Finish creating the HTML table
echo "</table></body></html>" >> "$outputfile"

echo "Conversion complete. The output file is located at $outputfile."
