#!/usr/bin/env bash

# Check if the script was run with root permissions
if [[ $EUID -ne 0 ]]; then
	echo "This script must be run with root privileges."
	exit 1
fi

# colors defined
RESET=$(tput sgr0)               # Reset
PURPLE=$(tput setaf 141)         # bba4ff
TEAL=$(tput setaf 48)            # 3cd2a5
PINK=$(tput setaf 205)           # f070af
YELLOW=$(tput setaf 220)         # f0f0a5
BLUE=$(tput setaf 87)            # 5fafaf
# add styles
BOLD=$(tput bold)
# create styled color variables
PURPLE_BOLD="${BOLD}${PURPLE}"
TEAL_BOLD="${BOLD}${TEAL}"
PINK_BOLD="${BOLD}${PINK}"
YELLOW_BOLD="${BOLD}${YELLOW}"
# directory paths
CTF_DIR="/home/kali/Desktop/ctf"
LINE=$(printf '%*s\n' "$((${COLUMNS:-$(tput cols)}*3/4))" '' | sed "s/ /${PINK}=/g")

function initialize() {
  # Update and upgrade system packages & install required tools
  echo
  echo "${PURPLE_BOLD}[${YELLOW_BOLD}i${PURPLE_BOLD}] ${RESET}${PURPLE}${PURPLE}Initializing with updates and dependencies...${RESET}"
  apt update && apt upgrade -y && apt install -y kali-tools-crypto-stego kali-tools-forensics kali-tools-passwords software-properties-common python3 python3-pip python3-dev git libssl-dev libffi-dev build-essential python3.11-venv pipx
  export PATH="$HOME/.local/bin:$PATH"
  echo
  echo -e "${LINE}${RESET}"
}

# This function prints a banner with version and contact information
function banner() {
    echo -e "${PURPLE}"
    echo -e "
 ██████ ████████ ███████       ██████  ██████  ███████ ██████
██         ██    ██            ██   ██ ██   ██ ██      ██   ██
██         ██    █████   █████ ██████  ██████  █████   ██████
██         ██    ██            ██      ██   ██ ██      ██
 ██████    ██    ██            ██      ██   ██ ███████ ██
    "
    echo -e "    ${BLUE}Version: ${PINK_BOLD}0.1.0${RESET}"
    echo -e "    ${BLUE}www.linkedin.com/in/${PINK_BOLD}gabrielle-decker $RESET"
}

function install_pimpmykali() {
  # Clone PimpMyKali repository and run the script with selected options
  echo
  echo "${PURPLE_BOLD}[${YELLOW_BOLD}i${PURPLE_BOLD}] ${RESET}${PURPLE}Now running pimpmykali...${RESET}"
  if ! git clone https://github.com/Dewalt-arch/pimpmykali "$CTF_DIR/pimpmykali"; then
      echo "Unable to clone repository."
      exit 1
  fi

  declare -a OPTIONS=("H" "1" "3" "8")
  for option in "${OPTIONS[@]}"; do
      echo "$option" | "$CTF_DIR/pimpmykali/pimpmykali.sh"
  done

  rm -rf pimpmykali.log

  echo "${TEAL_BOLD}[${PINK_BOLD}i${TEAL_BOLD}] ${TEAL}Successfuly completed.${RESET}"
  echo
  echo -e "${LINE}${RESET}"
}

function symlink_for_wordlist() {
  # Create a symlink to wordlists on the desktop
  echo
  echo "${PURPLE_BOLD}[${YELLOW_BOLD}i${PURPLE_BOLD}] ${RESET}${PURPLE}Now creating wordlist symlink...${RESET}"
  ln -s /usr/share/wordlists /home/kali/Desktop/wordlists && chmod -R 755 /home/kali/Desktop/wordlists

  echo "${TEAL_BOLD}[${PINK_BOLD}i${TEAL_BOLD}] ${TEAL}Successfuly completed.${RESET}"
  echo
  echo -e "${LINE}${RESET}"
}

function install_ophcrack() {
  # Download Ophcrack tables for Windows XP
  echo
  echo "${PURPLE_BOLD}[${YELLOW_BOLD}i${PURPLE_BOLD}] ${RESET}${PURPLE}Now downloading ophcrack tables...${RESET}"
  echo "${PURPLE_BOLD}[${YELLOW_BOLD}i${PURPLE_BOLD}] ${RESET}${PURPLE}This will take a while...${RESET}"
  mkdir -p "$CTF_DIR/ophcrack_tables/windows_xp_free" && cd "$CTF_DIR/ophcrack_tables/windows_xp_free" || exit
  for file in "table3.start" "table3.index" "table3.bin" "table2.start" "table2.index" "table2.bin" "table1.start" "table1.index" "table1.bin" "table0.start" "table0.index" "table0.bin" "md5sum.txt"
  do
      wget -O "$CTF_DIR/ophcrack_tables/windows_xp_free/$file" "https://sourceforge.net/projects/ophcrack/files/tables/XP%20special/$file"
  done

  cd ../..

  echo "${TEAL_BOLD}[${PINK_BOLD}i${TEAL_BOLD}] ${TEAL}Successfuly completed.${RESET}"
  echo
  echo -e "${LINE}${RESET}"
}

function install_tools() {
  # Install and configure required tools
  echo
  echo "${PURPLE_BOLD}[${YELLOW_BOLD}i${PURPLE_BOLD}] ${RESET}${PURPLE}Installing pwntools and xortool...${RESET}"
  python3 -m venv "$CTF_DIR/env" && source "$CTF_DIR/env/bin/activate"
  python3 -m pip install --upgrade pwntools xortool

  echo "${TEAL_BOLD}[${PINK_BOLD}i${TEAL_BOLD}] ${TEAL}Successfuly completed.${RESET}"
  echo
  echo -e "${LINE}${RESET}"
}

function install_stego {
  # Install and configure stegseek
  echo
  echo "${PURPLE_BOLD}[${YELLOW_BOLD}i${PURPLE_BOLD}] ${RESET}${PURPLE}Now installing stegonography packages...${RESET}"
  curl -L -o "$CTF_DIR/stegseek.deb" "$(curl -s https://api.github.com/repos/RickdeJager/stegseek/releases/latest | grep browser_download_url | cut -d '"' -f 4 | grep '.deb')"
  dpkg -i "$CTF_DIR/stegseek.deb"

  # Install and configure stegextract
  curl https://raw.githubusercontent.com/evyatarmeged/stegextract/master/stegextract > /usr/local/bin/stegextract
  chmod +x /usr/local/bin/stegextract

  # Install and configure zsteg
  gem install zsteg

  # Download diit
  mkdir -p "$CTF_DIR/diit" && wget -O "$CTF_DIR/diit/diit-1.5.jar" http://downloads.sourceforge.net/sourceforge/diit/diit-1.5.jar

  # Create diit-command.txt
  echo 'java -jar -Xmx512m diit-1.5.jar' > "$CTF_DIR/diit/diit-command.txt"

  rm -rf "$CTF_DIR/stegseek.deb"
  echo "${TEAL_BOLD}[${PINK_BOLD}i${TEAL_BOLD}] ${TEAL}Successfuly completed.${RESET}"
  echo
  echo -e "${LINE}${RESET}"
}

function install_uncompyle() {
  echo
  echo "${PURPLE_BOLD}[${YELLOW_BOLD}i${PURPLE_BOLD}] ${RESET}${PURPLE}Now installing Uncompyle...${RESET}"

  cd "$CTF_DIR/" || exit
  wget https://www.python.org/ftp/python/3.8.0/Python-3.8.0.tgz https://files.pythonhosted.org/packages/85/c1/9db89847044e5607960abac4bacc034ecfaba116518adb39fa8edfd71423/uncompyle6-3.9.0-py38-none-any.whl
  tar -xf Python-3.8.0.tgz
  cd Python-3.8.0 || exit
  ./configure --enable-optimizations
  make -j"$(nproc)"
  sudo make altinstall
  cd ".."
  python3.8 -m pip install --user pipx
  python3.8 -m pipx ensurepath
  python3.8 -m pipx install uncompyle6-3.9.0-py38-none-any.whl

  rm -rf Python-3.8.0.tgz uncompyle6-3.9.0-py38-none-any.whl
  echo "${TEAL_BOLD}[${PINK_BOLD}i${TEAL_BOLD}] ${TEAL}Successfuly completed.${RESET}"
  echo
  echo -e "${LINE}${RESET}"
}

function main() {
  echo
  echo "${PINK}========================================${RESET}"
  echo
  echo "Let's get ready for that ${PINK_BOLD}CTF!${RESET}"
  echo "Please ${PINK_BOLD}choose${RESET} an option:"
  echo
  echo "${TEAL}1. Download Windows XP Free Ophcrack Table.${RESET}"
  echo "${PURPLE}2. Install Python 3.8 and Uncompyle6.${RESET}"
  echo "${PINK}3. All of it.${RESET}"
  echo "${YELLOW}4. Just the basics."
  echo "${RESET}"
  echo "${PINK}========================================${RESET}"
  echo
  read -r -p "Enter your choice (${TEAL}1${RESET}, ${PURPLE}2${RESET}, ${PINK}3${RESET} or ${YELLOW}4${RESET}): " choice

  case $choice in
    1)
      # execute code for Option 1
      install_pimpmykali
      symlink_for_wordlist
      install_ophcrack
      install_tools
      install_stego
      chmod -R 755 "$CTF_DIR"
      ;;
    2)
      # execute code for Option 2
      install_pimpmykali
      symlink_for_wordlist
      install_tools
      install_stego
      install_uncompyle
      chmod -R 755 "$CTF_DIR"
      ;;
    3)
      # execute code for Option 3
      install_pimpmykali
      symlink_for_wordlist
      install_ophcrack
      install_tools
      install_stego
      install_uncompyle
      chmod -R 755 "$CTF_DIR"
      ;;
    4)
      # execute code for Option 4
      install_pimpmykali
      symlink_for_wordlist
      install_tools
      install_stego
      chmod -R 755 "$CTF_DIR"
      ;;
    *)
      echo "Invalid choice. Please enter a number between 1 and 4."
      exit 1
      ;;
  esac
}

initialize
clear
banner
main
#reboot
