
# This creates 3 persistet-volumb yaml files,
#  ready for consumption by kubernetes via kubectl
#  i.e "kubectl create -f pv01.yaml"

echo "Creating $1 files"
for num in $(seq 1 ${1})
do
echo "apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv${num}
spec:
  capacity:
    storage: 1Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /dir${num}" >> pv$((num)).yaml
done
