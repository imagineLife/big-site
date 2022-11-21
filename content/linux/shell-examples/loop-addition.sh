echo "MATH HERE!"
for num in $(seq 1 3)
do
cat <<EOF
"$num + 2: $(($num + 2))"
EOF
done
