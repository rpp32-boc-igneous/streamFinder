#!/bin/bash
sudo chmod -R 777 /home/ec2-user/streamFinder

#navigate into our working directory where app exists
cd /home/ec2-user/streamFinder

#add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # load nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # load nvm bash completion

#install node modules
npm install

#start node app in background
node app.js > app.out.log 2> app.err.log < /dev/null &
