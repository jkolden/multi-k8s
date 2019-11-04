docker build -t jkolden/multi-client:latest -t jkolden/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t jkolden/multi-server:latest -t jkolden/multi-server:$SHA -f ./server/Dockerfile ./server
docker push jkolden/multi-client:latest
docker push jkolden/multi-server:latest
docker push jkolden/multi-client:$SHA
docker push jkolden/multi-server:$SHA
kubectl apply -f k8s
kubectl set image deployments/server-deployment server=jkolden/multi-server:$SHA
kubectl set image deployments/client-deployment client=jkolden/multi-client:$SHA