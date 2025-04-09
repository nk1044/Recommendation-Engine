#!/bin/sh

docker stop $(docker ps -q)

docker rm $(docker ps -aq)
docker rmi $(docker images -q)

docker system prune -a --volumes -f

docker pull neerajkumar1044/prml-project-backend:latest
docker run -it -p 8000:8000 --name prml-project-backend neerajkumar1044/prml-project-backend:latest
