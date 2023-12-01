(ql:quickload "cl-ppcre")

(defun get-ranges (line)
  (ppcre:register-groups-bind ((#'parse-integer first second third fourth))
      ("(\\d+)-(\\d+),(\\d+)-(\\d+)" line :sharedp t)
    `((,first ,second) (,third ,fourth))))

(defun ranges-may-subset-of-one (a b)
  (member-if
   (lambda (r)
     (and
      (>= (caar r) (caadr r))
      (<= (cadar r) (cadadr r))))
   `((,a ,b) (,b ,a))))

(defun range-is-contained-at-all (a b)
  (and
   (<= (car a) (cadr b))
   (>= (cadr a) (car b))))

(defun main ()
  (let ((lines (uiop:read-file-lines "input")))    
    (print
     (mapcar (lambda (f)
               (reduce (lambda (a x)
                         (if (apply f (get-ranges x))
                             (1+ a)
                             a))
                       lines
                       :initial-value 0))
             '(range-is-contained range-may-be-subset-of-one)))))

(main)
