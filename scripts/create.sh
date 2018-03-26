#!/usr/bin/bash
echo "Creating json file..."
first=$(truffle networks | grep "Platform" | awk '{ print $2 }')
second=$(truffle networks | grep "Staff" | awk '{ print $2 }')

sed -e "s/fi/$first/g" -e "s/seco/$second/g" create.json > contracts.js
sed -i -e "s/True/true/g" -e "s/False/false/g" ./contracts.js

echo "Done!"
