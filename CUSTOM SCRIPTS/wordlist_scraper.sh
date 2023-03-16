#!/bin/bash

RESET=$(tput sgr0)                      # Text Reset
PURPLE=$(tput setaf 93)                 # Purple
MAGENTA=$(tput setaf 162)               # Magenta
BCYAN=$(tput bold; tput setaf 51)       # Cyan
BRED=$(tput bold; tput setaf 196)       # Bold Red
BGREEN=$(tput bold; tput setaf 118)     # Bold Green

# Function to check if the required packages are installed; installs them if not found.
function check_dependencies {
    if ! command -v cewl &> /dev/null
    then
        echo "cewl could not be found. Installing..."
        sudo apt install -y cewl
    fi

    if ! command -v grep &> /dev/null
    then
        echo "grep could not be found. Installing..."
        sudo apt install -y grep
    fi
}
check_dependencies

banner="$BCYAN
 _|          _|    _|                    _|  _|    _|              _|      
 _|          _|  _|  _|  _|  _|_|    _|_|_|  _|  _|_|    _|_|_|  _|_|_|_|  
 _|    _|    _|  _|  _|  _|_|      _|    _|  _|    _|  _|_|        _|      
   _|  _|  _|    _|  _|  _|        _|    _|  _|    _|      _|_|    _|      
     _|  _|        _|    _|          _|_|_|  _|    _|  _|_|_|        _|_|
$RESET"
header="$MAGENTA Gabrielle Decker:  https://www.linkedin.com/in/gabrielle-decker"
separator="$PURPLE------------------------------------------------------------------$RESET"
#Instructions to guide the user about the expected input format
instructions="Expected URL format:$BCYAN https://en.wikipedia.org/wiki/Word_list$RESET\nExpected filename format:$BCYAN wordlist.txt"

echo -e "$banner\n$header\n$separator\n\n$instructions\n"

#########################################################################################################################################################
# Start of script
#########################################################################################################################################################

# Function to validate the Wikipedia URL format entered by the USER
function validate_url () {
    url_regex='^https?://'

    while true; do
        read -r -p "$BCYAN>>$RESET Enter a Wikipedia URL: " url

        if [[ $url =~ $url_regex ]] && curl --output /dev/null --silent --head --fail $url; then
            break
        else
            echo -e "\n$BRED X $RESET Invalid URL. Please try again.\n"
        fi
    done
}

#Function to validate the file name entered by the USER
function validate_filename () {
    filename_regex='^[a-zA-Z0-9._-]+$'

    while true; do
        read -r -p "$BCYAN>>$RESET Enter a filename: " filename
        echo
        if [[ $filename =~ $filename_regex ]]; then
            break
        else
            echo -e "\n$BRED X $RESET Invalid filename. Please try again.\n"
        fi
    done
}

# Function to create a Wordlist as per USER inputs; writes the wordlist into a file.
function wikiCrawl () {
    local DIR   #Store the current folder path in the variable DIR.
    DIR=$(pwd)  #pwd command returns current working directory
    local temp_file
    temp_file="tmp_wikiCrawl.txt"   #Temporary file needed for the cewl command.
    echo
    cewl -v $url -d 1 -w "$temp_file"   #cewl command extracts words from the url and saves to $temp_file
    # Drops words shorter than 5 letters, filters out all the stuff at the end, and does some checking for wikipedia-specific junk.
    grep -P "\b[a-zA-Z0-9]+\b" "$temp_file" | grep "\w\{5,\}" | grep -v "^wg" | head -n -50 > "$filename"   #Extracts relevant words to a new $filename.
    echo
    echo -e "$BGREEN Wordlist saved to $DIR/$filename $RESET"   #Message indicating where the wordlist file was saved.
    rm "$temp_file"  #Removes the temporary file created by the cewl command.
}

validate_url
validate_filename
wikiCrawl