import input from "fs";

class File {
  constructor(name, size, parent) {
    this.name = name;
    this.fileSize = size;
    this.parent = parent;
  }

  size() {
    return this.fileSize;
  }
}

class Directory {
  constructor(name, parent) {
    this.children = [];
    this.name = name;
    this.parent = parent;
  }

  add(child) {
    this.children.push(child);
  }

  size() {
    return this.children.reduce((acc, child) => acc + child.size(), 0);
  }

  searchDirectoresOfSizePredicate(sizeP) {
    const dirs = [];
    for (const child of this.children) {
      if (child instanceof Directory) {
        if (sizeP(child.size())) {
          dirs.push(child);
        }
        dirs.push(...child.searchDirectoresOfSizePredicate(sizeP));
      }
    }
    return dirs;
  }
}

class OS {
  constructor() {
    this.root = new Directory("/", null);

    this.current = this.root;
  }

  cd(path) {
    if (path === "/") {
      this.current = this.root;
    } else if (path === ".." && this.current.parent) {
      this.current = this.current.parent;
    } else {
      this.current = this.current.children.find((child) => child.name === path);
    }
  }

  printFs() {
    const print = (dir, depth) => {
      for (const child of dir.children) {
        console.log(" ".repeat(depth) + child.name);
        if (child instanceof Directory) {
          print(child, depth + 1);
        }
      }
    };

    print(this.root, 0);
  }
}

const main = () => {
  const os = new OS();
  const lines = input.readFileSync("input", "utf8").split("\n");

  let currentCommand = null;
  for (const line of lines) {
    if (line.startsWith("$")) {
      const [command, path] = line.split(" ").splice(1);
      if (command == "cd") os.cd(path);
      currentCommand = command;
    } else if (currentCommand == "ls") {
      const [dirOrSize, name] = line.split(" ");
      if (dirOrSize === "dir") {
        const dir = new Directory(name, os.current);
        os.current.add(dir);
      } else {
        const file = new File(name, parseInt(dirOrSize), os.current);
        os.current.add(file);
      }
    }
  }

  //os.printFs();

  console.log(
    os.root
      .searchDirectoresOfSizePredicate((size) => size <= 100000)
      .reduce((a, x) => a + x.size(), 0)
  );

  const rootSize = os.root.size();
  const freeSpace = 70000000 - rootSize;
  console.log(
    [...os.root.searchDirectoresOfSizePredicate(() => true), os.root]
      .map((x) => x.size())
      .filter((x) => freeSpace + x >= 30000000)
      .reduce((a, x) => Math.min(a, x), Infinity)
  );
};

main();
