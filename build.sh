#docker-compose build \
#--build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
#--build-arg BUILD_COMMIT="444"

docker buildx build -t simple-todo/arm64 \
-f api/Dockerfile \
--platform=linux/arm64 api/ --load \
--build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
--build-arg BUILD_COMMIT=$(git rev-parse --short HEAD)

docker buildx build -t simple-todo/amd64 \
-f api/Dockerfile \
--platform=linux/amd64 api/ --load \
--build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
--build-arg BUILD_COMMIT=$(git rev-parse --short HEAD)
