#!/usr/bin/bash
echo "Creating json file..."
first=$(truffle networks | grep "Platform" | awk '{ print $2 }')
second=$(truffle networks | grep "Staff" | awk '{ print $2 }')

PLD=$(cat ../build/contracts/Platform.json | python3 -c "import sys,json; print(json.load(sys.stdin)['bytecode'])")
STD=$(cat ../build/contracts/Staff.json | python3 -c "import sys,json; print(json.load(sys.stdin)['bytecode'])")

PLABI=$(cat ../build/contracts/Platform.json | python3 -c "import sys,json; print(json.load(sys.stdin)['abi'])")
STABI=$(cat ../build/contracts/Staff.json | python3 -c "import sys,json; print(json.load(sys.stdin)['abi'])")

sed -e "s/fi/$first/g" -e "s/seco/$second/g" -e "s/PLD/$PLD/g" -e "s/STD/$STD/g" -e "s/PLABI/$PLABI/g" -e "s/STABI/$STABI/g" template.json > contracts.js
sed -i -e "s/True/true/g" -e "s/False/false/g" ./contracts.js

echo "Done!"
