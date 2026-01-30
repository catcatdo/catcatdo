FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    make \
    gcc \
    g++ \
    libmysqlclient-dev \
    zlib1g-dev \
    libpcre3-dev \
    mysql-client \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Clone rAthena
WORKDIR /
RUN git clone https://github.com/rathena/rathena.git

WORKDIR /rathena

# Configure and compile
RUN ./configure && make clean && make server

# Copy configuration script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 6900 6121 5121

ENTRYPOINT ["/docker-entrypoint.sh"]
