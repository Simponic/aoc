import           Data.List    (find, transpose)
import qualified Data.Set     as Set
import qualified Data.Text    as Text
import qualified Data.Text.IO as Text

countVisibleTrees ::
     [[Int]] -> [Int] -> Int -> (Set.Set (Int, Int)) -> (Set.Set (Int, Int))
countVisibleTrees [] _ _ seen = seen
countVisibleTrees (row:rows) maxTrees depth seen =
  countVisibleTrees
    rows
    (zipWith (\x y -> max x y) row maxTrees)
    (depth + 1)
    (foldl
       (\acc x -> Set.insert x acc)
       seen
       (zipWith
          (\i x ->
             if x == 1
               then (depth, i)
               else (0, 0))
          [0 ..]
          (zipWith
             (\x y ->
                if x > y
                  then 1
                  else 0)
             row
             maxTrees)))

treeScore :: [[Int]] -> (Int, Int) -> Int -> Int -> [Int]
treeScore digits (x, y) width height =
  let currentHeight = ((digits !! y) !! x)
   in [ (case (find
                 (\x -> (digits !! y) !! x >= currentHeight)
                 [(x + 1) .. (width - 1)]) of
           Just value -> (value - x)
           Nothing    -> (width - x - 1))
      , (case (find
                 (\x -> (digits !! y) !! x >= currentHeight)
                 (reverse [0 .. (x - 1)])) of
           Just value -> (x - value)
           Nothing    -> x)
      , (case (find
                 (\y -> (digits !! y) !! x >= currentHeight)
                 (reverse [0 .. (y - 1)])) of
           Just value -> (y - value)
           Nothing    -> y)
      , (case (find
                 (\y -> (digits !! y) !! x >= currentHeight)
                 [(y + 1) .. (height - 1)]) of
           Just value -> (value - y)
           Nothing    -> (height - y - 1))
      ]

getDigitsFromString :: String -> [Int]
getDigitsFromString = map (read . (: ""))

rotl :: [[Int]] -> [[Int]]
rotl = reverse . transpose

rotr :: [[Int]] -> [[Int]]
rotr = transpose . reverse

mmult :: [[Int]] -> [[Int]] -> [[Int]]
mmult a b = [[sum $ zipWith (*) ar bc | bc <- (transpose b)] | ar <- a]

main = do
  ls <- fmap Text.lines (Text.readFile "input")
  let digits = map (getDigitsFromString . Text.unpack) ls
  let height = length digits
  let width = length (head digits)
  let topDownSeen =
        countVisibleTrees digits (take width (repeat (-1))) 0 Set.empty
  let rightLeftSeen =
        Set.map
          (\x -> ((snd x), width - (fst x) - 1))
          (countVisibleTrees
             (rotl digits)
             (take height (repeat (-1)))
             0
             Set.empty)
  let downTopSeen =
        Set.map
          (\x -> (height - (fst x) - 1, (snd x)))
          (countVisibleTrees
             (reverse digits)
             (take width (repeat (-1)))
             0
             Set.empty)
  let leftRightSeen =
        Set.map
          (\x -> (height - (snd x) - 1, (fst x)))
          (countVisibleTrees
             (rotr digits)
             (take height (repeat (-1)))
             0
             Set.empty)
  let allSeen =
        (foldl
           (\acc x -> Set.union acc x)
           Set.empty
           [topDownSeen, rightLeftSeen, downTopSeen, leftRightSeen])
  print (Set.size allSeen)
  print
    (maximum
       (map
          (\y ->
             maximum
               (map
                  (\x ->
                     (foldl
                        (\acc x -> acc * x)
                        1
                        (treeScore digits (x, y) width height)))
                  [0 .. (width - 1)]))
          [0 .. (height - 1)]))
