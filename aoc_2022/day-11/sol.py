
def get_neighbors(grid, current):
  neighbors = []
  y, x = current
  cur_height = ord(grid[y][x])
  if (grid[y][x] == "S"):
    cur_height = ord("a")
  for i in range(-1, 2):
    for j in range(-1, 2):
      if i == 0 and j == 0 or (i != 0 and j != 0):
        continue
      if (y + i) < 0 or (y + i) >= len(grid):
        continue
      if (x + j) < 0 or (x + j) >= len(grid[y + i]):
        continue
      new_height = ord(grid[y + i][x + j])
      if (grid[y + i][x + j] == "E"):
        new_height = ord("z")
      if abs(new_height - cur_height) <= 1 or new_height <= cur_height:
        neighbors.append((y + i, x + j))
  return neighbors

def bfs(grid, start, end):
  queue = []
  queue.append(start)
  visited = {} 
  visited[start] = 0
  while queue:
    current = queue.pop(0)
    if current == end:
      return visited[current]
    for neighbor in get_neighbors(grid, current):
      if neighbor not in visited:
        queue.append(neighbor)
        visited[neighbor] = visited[current] + 1
  return False

def main():
  file = open("input", "r")
  grid = file.readlines()
  file.close()

  start = (0, 0)
  end = (0, 0)

  for i in range(len(grid)):
    for j in range(len(grid[i])):
      if grid[i][j] == "S":
        start = (i, j)
      elif grid[i][j] == "E":
        end = (i, j)

  best = bfs(grid, start, end)
  print(best)

  for i in range(len(grid)):
    for j in range(len(grid[i])):
      if grid[i][j] == "a":
        this_as_start = bfs(grid, (i, j), end)
        if this_as_start and this_as_start < best:
          best = this_as_start
    
  print(best)


if __name__ == "__main__":
  main()
