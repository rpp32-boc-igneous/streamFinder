#!/bin/bash

#download node and npm
curl -o- htts://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash . ~/.nvm/nvm.sh
nvm install node

#create working dir if it doesn't exist
DIR="/homme/ec2-user/streamFinder"
if [ -d "$DIR" ]; then
  echo "${DIR} exists"
else
  echo "Creating ${DIR} directory"
  mkdir ${DIR}
fi