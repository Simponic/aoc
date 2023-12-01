#include <tuple>
#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <stack>
#include <cmath>
#include <array>
#include <algorithm>
#include <cstdint>
#include <vector>

using stack_type = std::stack<char>;

enum PROBLEM
{
  PROBLEM_1 = 1,
  PROBLEM_2 = 2
};

std::tuple<std::vector<stack_type>, int> build_stacks(std::vector<std::string> &lines)
{
  int num_stacks = std::ceil(lines[0].size() / 4.0);

  std::vector<stack_type> stacks(num_stacks);

  std::vector<int> stack_positions(num_stacks, 0);
  int lines_of_stacks = 0;
  for (std::string line : lines)
  {
    char l = '1';
    for (int i = 0; i < line.size(); ++i)
      if (line[i] == l)
      {
        stack_positions[l - '1'] = i;
        l++;
      }
    if (l == num_stacks + '1')
      break;
    lines_of_stacks++;
  }

  for (int i = lines_of_stacks - 1; i >= 0; i--)
    for (int j = 0; j < num_stacks; ++j)
      if (lines[i][stack_positions[j]] != ' ')
        stacks[j].push(lines[i][stack_positions[j]]);

  return std::make_tuple(stacks, lines_of_stacks);
}

std::string solve(std::vector<stack_type> &stacks, std::vector<std::string> &lines, int start_from, PROBLEM problem)
{
  stack_type curr;
  for (auto line = lines.begin() + start_from; line != lines.end(); ++line)
  {
    std::istringstream iss(*line);
    std::string word;
    int from = 0, to = 0, amount = 0;

    while (iss >> word >> amount >> word >> from >> word >> to)
      ;

    if (problem == PROBLEM_1)
      for (int i = 0; i < amount; ++i)
      {
        stacks[to - 1].push(stacks[from - 1].top());
        stacks[from - 1].pop();
      }
    else
    {
      for (int i = 0; i < amount; ++i)
      {
        curr.push(stacks[from - 1].top());
        stacks[from - 1].pop();
      }
      for (int i = 0; i < amount; ++i)
      {
        stacks[to - 1].push(curr.top());
        curr.pop();
      }
    }
  }

  std::string result;
  for (auto &stack : stacks)
    result += stack.top();
  return result;
}

int main()
{
  std::ifstream input("input");
  std::vector<std::string> lines;
  for (std::string line; std::getline(input, line);)
    lines.push_back(line);

  auto [stacks, start_from] = build_stacks(lines);
  std::cout << "Solve 1: " << solve(stacks, lines, start_from + 1, PROBLEM_1) << std::endl;
  auto [stacks2, start_from2] = build_stacks(lines);
  std::cout << "Solve 2: " << solve(stacks2, lines, start_from2 + 1, PROBLEM_2) << std::endl;

  return 0;
}
