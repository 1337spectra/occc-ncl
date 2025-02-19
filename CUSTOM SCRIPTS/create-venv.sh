#!/bin/bash

# SYNOPSIS
# Creates a Python virtual environment in a specified directory.

# DESCRIPTION
# This script prompts the user for a virtual environment name and a development directory path.
# It creates the specified directory if it does not exist and sets up a Python virtual environment within it.
# The script checks for the presence of Python in the system PATH before attempting to create the virtual environment.

# PARAMETER envName
# The name of the virtual environment to be created. If not provided, the user will be prompted to enter it.

# PARAMETER devDir
# The full path to the development directory where the virtual environment will be created. If not provided, the user will be prompted to enter it.

# EXAMPLE
# ./create-venv.sh -envName myenv -devDir /path/to/dev/venvs
# Creates a virtual environment named 'myenv' in the directory '/path/to/dev/venvs'.

# NOTES
# - Ensure Python is installed and available in the system PATH.
# - The script will create the development directory if it does not exist.
# - To activate the virtual environment, run the activation script located in the bin directory of the virtual environment.

# Function to prompt for input
prompt_for_input() {
    local prompt_message="$1"
    local input_variable
    read -r -p "$prompt_message" input_variable
    echo "$input_variable"
}

# Main script execution
envName=$(prompt_for_input "Enter environment name: ")
devDir=$(prompt_for_input "Enter full path to dev directory (e.g., /path/to/dev/venvs): ")

# Validate inputs
if [ -z "$envName" ]; then
    echo "Environment name cannot be empty."
    exit 1
fi

if [ -z "$devDir" ]; then
    echo "Dev directory cannot be empty."
    exit 1
fi

# Create development directory if it doesn't exist
[ ! -d "$devDir" ] && mkdir -p "$devDir" && echo "Creating directory: $devDir"

venvPath="$devDir/$envName"
echo "Creating virtual environment at: $venvPath"

# Check for Python installation
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed or not found in PATH."
    exit 1
fi

# Create the virtual environment
if ! python3 -m venv "$venvPath"; then
    echo "Failed to create virtual environment."
    exit 1
fi

echo "Virtual environment '$envName' created successfully."
echo "To activate, run:"
echo "   source $venvPath/bin/activate"
