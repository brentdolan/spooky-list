migrate:
	docker-compose exec backend poetry run ./manage.py migrate

makemigrations:
	docker-compose exec backend poetry run ./manage.py makemigrations

super:
	docker-compose exec backend poetry run ./manage.py createsuperuser

kill-db:
	docker-compose down db

reset:
	cd ../ &&\
	docker-compose down &&\
	docker-compose up -d --force-recreate db &&\
	docker-compose build --no-cache &&\
	docker-compose up -d --force-recreate &&\
	docker-compose exec backend poetry run ./manage.py pull_movie_data -f ./misc/movie_data.csv &&\
	cd backend