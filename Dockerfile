# 가볍고 빠른 Nginx 알파인 버전을 사용합니다.
FROM nginx:alpine

# 기본 Nginx 설정 파일을 덮어쓰거나, 
# 웹 파일들을 Nginx의 기본 서빙 디렉토리로 복사합니다.
COPY . /usr/share/nginx/html

# 80번 포트를 노출합니다.
EXPOSE 80

# Nginx를 포그라운드 모드로 실행합니다.
CMD ["nginx", "-g", "daemon off;"]