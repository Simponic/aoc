import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Scanner;
import java.awt.Point;
import java.util.Set;

public class sol {
  enum PROBLEM {
    PROBLEM_1, PROBLEM_2
  }

  class Grid {
    private Set<Point> sand;
    private Set<Point> filled;
    private Point source;
    private int maxYP2;

    public Grid(Point source, ArrayList<ArrayList<Point>> paths) {
      this.sand = new HashSet<Point>();
      this.filled = new HashSet<Point>();
      this.source = source;

      for (ArrayList<Point> path : paths)
        for (int i = 1; i < path.size(); i++) {
          Point p1 = path.get(i - 1);
          Point p2 = path.get(i);
          for (int x = Math.min(p1.x, p2.x); x <= Math.max(p1.x, p2.x); x++)
            for (int y = Math.min(p1.y, p2.y); y <= Math.max(p1.y, p2.y); y++)
              this.filled.add(new Point(x, y));
        }

      maxYP2 = bottomRight().y + 1;
    }

    public boolean addSandGrain(PROBLEM problem) {
      Point p = new Point(this.source.x, this.source.y);
      while (true) {
        if (this.filled.contains(p) || (problem == PROBLEM.PROBLEM_2 && p.y >= maxYP2)) {
          if (problem == PROBLEM.PROBLEM_2 && p.x == this.source.x && p.y == this.source.y)
            return false;

          p.y--;
          filled.add(p);
          sand.add(p);
          return true;
        }

        if (problem == PROBLEM.PROBLEM_1 && p.y >= bottomRight().y)
          return false;

        p.y++;
        if (this.filled.contains(new Point(p.x, p.y))) {
          if (!this.filled.contains(new Point(p.x - 1, p.y)))
            p.x--;
          else if (!this.filled.contains(new Point(p.x + 1, p.y)))
            p.x++;
        }
      }
    }

    public Point topLeft() {
      return new Point(
          filled.stream().min((p1, p2) -> p1.x - p2.x).get().x,
          filled.stream().min((p1, p2) -> p1.y - p2.y).get().y);
    }

    public Point bottomRight() {
      return new Point(
          filled.stream().max((p1, p2) -> p1.x - p2.x).get().x,
          filled.stream().max((p1, p2) -> p1.y - p2.y).get().y);
    }

    public void print() {
      Point topLeft = topLeft();
      Point bottomRight = bottomRight();

      Point curr = new Point(topLeft.x, topLeft.y);
      for (; curr.y <= bottomRight.y; curr.y++) {
        for (; curr.x <= bottomRight.x; curr.x++) {
          if (sand.contains(curr))
            System.out.print("o");
          else if (filled.contains(curr))
            System.out.print("#");
          else
            System.out.print(".");
        }
        curr.x = topLeft.x;
        System.out.println();
      }
    }
  }

  public static ArrayList<ArrayList<Point>> parsePaths(ArrayList<String> inputList) {
    ArrayList<ArrayList<Point>> paths = new ArrayList<ArrayList<Point>>();
    for (String line : inputList) {
      ArrayList<Point> path = new ArrayList<Point>();

      String[] points = line.split(" -> ");
      for (String point : points) {
        String[] coords = point.split(",");
        path.add(new Point(Integer.parseInt(coords[0]), Integer.parseInt(coords[1])));
      }

      paths.add(path);
    }
    return paths;
  }

  public static ArrayList<String> getInputLines(String file) {
    ArrayList<String> inputList = new ArrayList<String>();

    try {
      File input = new File(file);
      Scanner sc = new Scanner(input);

      while (sc.hasNextLine())
        inputList.add(sc.nextLine());

      sc.close();
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    }

    return inputList;
  }

  public static void main(String[] args) {
    ArrayList<ArrayList<Point>> paths = parsePaths(getInputLines("input"));

    sol s = new sol();
    Grid gridP1 = s.new Grid(new Point(500, 0), paths);
    int i = 0;
    for (; gridP1.addSandGrain(PROBLEM.PROBLEM_1); i++) {
      // gridP1.print();
    }
    System.out.println(i);

    Grid gridP2 = s.new Grid(new Point(500, 0), paths);
    i = 0;
    for (; gridP2.addSandGrain(PROBLEM.PROBLEM_2); i++) {
      // gridP2.print();
    }
    System.out.println(i);
  }
}