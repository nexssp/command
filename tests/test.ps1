nexssp-command add npmup "npm version patch && git push && npm publish"
nexssp-command add myc echo 1
nexssp-command add myc2 echo 1
nexssp-command add myc3 echo 1

nexssp-command add myc echo 1 --platform=all

nexssp-command list

nexssp-command add my2 echo "linux1" --platform=linux
nexssp-command add my3 echo "linux1" --platform=linux
nexssp-command add my4 echo "linux1" --platform=linux

nexssp-command delete my2 --platform=linux
nexssp-command delete my3 --platform=linux
nexssp-command delete my4 --platform=linux
nexssp-command delete myc
nexssp-command delete myc2
nexssp-command delete myc3
