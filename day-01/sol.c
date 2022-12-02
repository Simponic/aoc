#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

/*
  USAGE: ./sol <inputfile>
*/

int get_my_score(char elf, char me)
{
  int elf_choice = (int)(elf - 'A') + 1;
  int my_choice = (int)(me - 'X') + 1;
  int i_won = 0;
  if (elf_choice == my_choice)
    return my_choice + 3;

  switch (elf_choice + my_choice)
  {
  case 3:
    i_won = (elf_choice == 1);
    break;
  case 4:
    i_won = (elf_choice == 3);
    break;
  case 5:
    i_won = (elf_choice == 2);
    break;
  }

  return my_choice + i_won * 6;
}

const int wins[3] = {2, 3, 1};
const int loss[3] = {3, 1, 2};

int get_my_score_2(char elf, char me)
{
  int elf_choice = (int)(elf - 'A') + 1;
  int outcome = (int)(me - 'X') + 1;

  if (outcome == 2)
    return elf_choice + 3;

  if (outcome == 1)
    return loss[elf_choice - 1];
  return 6 + wins[elf_choice - 1];
}

int main(int argc, char *argv[])
{
  char *fileName = argv[1];

  FILE *file = fopen(fileName, "r");
  char line[256];
  char elf, me;

  int score1 = 0;
  int score2 = 0;
  while (1)
  {
    int i = fscanf(file, "%c %c\n", &elf, &me);
    if (i == EOF)
      break;
    score1 += get_my_score(elf, me);
    score2 += get_my_score_2(elf, me);
  }

  printf("Score one: %d\n", score1);
  printf("Score two: %d\n", score2);

  fclose(file);
  return 0;
}
