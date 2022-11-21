echo "MATH HERE: Creating files"
for num in $(seq 1 3)
do
echo "Math created from bash loop: $((num))+2=$(($num + 2))" > math-$((num)).txt
done
