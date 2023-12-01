defmodule Solution do
  def solve(input, chunk) do
    (String.split(input, "", trim: true)
     |> Enum.chunk_every(chunk, 1, :discard)
     |> Enum.map(fn window ->
       Enum.reduce(window, %{}, fn char, acc ->
         Map.put(acc, char, Map.get(acc, char, 0) + 1)
       end)
     end)
     |> Enum.find_index(fn letter_counts ->
       Enum.all?(letter_counts, fn {_key, value} ->
         value == 1
       end)
     end)) + chunk
  end

  def main do
    input = File.read!("input")

    solve(input, 4)
    |> IO.inspect()

    solve(input, 14)
    |> IO.inspect()
  end
end

Solution.main()
