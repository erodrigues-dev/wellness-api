#!/bin/sh

echo '>>> Build image'
docker build . -t wellness/api

echo '>>> Save image to .tar.gz'
docker image save wellness/api | gzip > docker-image-wellness-api.tar.gz

echo '>>> Upload image to server'
scp docker-image-wellness-api.tar.gz wellness-production:/var/www/api.wellness.com/

echo '>>> Load image in server'
ssh wellness-production -t "cd /var/www/api.wellness.com; docker load < docker-image-wellness-api.tar.gz"

echo '>>> Run Compose UP'
ssh wellness-production -t "cd /var/www/api.wellness.com; docker-compose up -d"

echo '>>> Remove temp files'
rm docker-image-wellness-api.tar.gz

echo '>>> DONE <<<'
