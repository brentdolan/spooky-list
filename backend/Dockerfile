# pull official base image
FROM python:3.11.4-alpine

# set work directory
WORKDIR /app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install linux dependencies
# these may vary by project
# this list is relatively lightweight
# and it handles most of what I need
RUN apk update && apk upgrade && \
  apk add --no-cache gcc g++ musl-dev curl libffi-dev postgresql-dev zlib-dev jpeg-dev freetype-dev

# install poetry to manage python dependencies
RUN curl -sSL https://install.python-poetry.org | python3 -

# install python dependencies
COPY /pyproject.toml .
COPY /poetry.lock .
RUN /root/.local/bin/poetry update && /root/.local/bin/poetry install

# Update poetry path and configure Django settings
ENV PATH="${PATH}:/root/.local/bin"

# copy project
COPY . .

RUN /root/.local/bin/poetry run ./manage.py migrate

# run at port 8000
EXPOSE 8000
CMD /root/.local/bin/poetry run ./manage.py runserver 0.0.0.0:8000