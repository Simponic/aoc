#!/bin/bash

unme="$(uname -s)"
case "${unme}" in
  Linux*)     machine=Linux;;
  Darwin*)    machine=Mac;;
  *)          machine="UNKNOWN:${unme}"
esac

pastecmd=["$machine" == "Mac"] && "pbpaste" || "wl-paste"
copycmd=["$machine" == "Mac"] && "pbcopy" || "wl-copy"


function aoc() {
  mkdir $1
  cd $1

}
