#!/bin/bash
set -e

echo "Waiting for MySQL to be ready..."
until mysql -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASS" -e "SELECT 1" &> /dev/null; do
    sleep 2
done

echo "MySQL is ready!"

# Update configuration files with environment variables
if [ -f "/rathena/conf/import/inter_conf.txt" ]; then
    sed -i "s/sql.db_hostname: .*/sql.db_hostname: $DB_HOST/" /rathena/conf/import/inter_conf.txt
    sed -i "s/sql.db_username: .*/sql.db_username: $DB_USER/" /rathena/conf/import/inter_conf.txt
    sed -i "s/sql.db_password: .*/sql.db_password: $DB_PASS/" /rathena/conf/import/inter_conf.txt
    sed -i "s/sql.db_database: .*/sql.db_database: $DB_NAME/" /rathena/conf/import/inter_conf.txt
fi

# Start servers
cd /rathena
./login-server &
./char-server &
./map-server

# Keep container running
wait
