(require '[clojure.java.io])

(defn find-recurring-characters [strs]
  (reduce (fn [a x]
            (into #{} (filter #(contains? a %) x)))
          (into #{} (first strs))
          strs))

(defn get-priority [c]
  (if (>= c 97)
    (- c 96)
    (- c 38)))

(defn obtain-total-priorities [rucksacks]
  (reduce + (map (fn [line]
                   (let [half (/ (count line) 2)]
                     (get-priority (int
                                    (first (find-recurring-characters
                                            (list (subs line 0 half)
                                                  (subs line half))))))))
                 rucksacks)))

(defn obtain-total-priorities-2 [rucksacks]
  (reduce + (map (fn [lines]
                   (get-priority (int (first (find-recurring-characters lines)))))
                 (partition 3 rucksacks))))

(defn main []
  (with-open [rdr (clojure.java.io/reader "input")]
    (println (obtain-total-priorities (line-seq rdr))))
  (with-open [rdr (clojure.java.io/reader "input")]
    (println (obtain-total-priorities-2 (line-seq rdr))))
  (System/exit 0))
(main)