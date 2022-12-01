#!/bin/bash

# USAGE: ./sol.sh (n: top elves)

NUM_ELVES=${1:-3}

declare -a ELVES=()
for (( i = 0; i<$NUM_ELVES; i++))
do
  ELVES+=(0)
done


add_to_elves () {
  local max=$1
  for (( i = 0; i<${NUM_ELVES}; i++));
  do
    local tmp="${ELVES[$i]}";
    if [[ $max -ge $tmp ]];
    then
      ELVES[$i]=$max 
      max=$tmp
    fi
  done
}

CURRENT_ELF=0
while read -r line
do
  if [[ -z "$line" ]];
  then
    add_to_elves $CURRENT_ELF 
    CURRENT_ELF=0 
  else
    CURRENT_ELF=$((CURRENT_ELF+line))
  fi
done < input

echo "MAX ELF = ${ELVES[0]}"
echo "sum(TOP $NUM_ELVES ELVES) = $(printf "%s\n" $(echo "${ELVES[*]}") | paste -sd+ - | bc)"
