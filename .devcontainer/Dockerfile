FROM node:16-bullseye

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        git \
        openssh-client \
        procps \
    && rm -rf /var/lib/apt/lists/*

USER node