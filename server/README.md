# rAthena Server

Docker를 사용한 rAthena 서버 설정입니다.

## 요구사항

- Docker
- Docker Compose

## 설치 및 실행

1. Docker 이미지 빌드 및 서버 시작:
```bash
docker-compose up -d
```

2. 로그 확인:
```bash
docker-compose logs -f rathena
```

3. 서버 중지:
```bash
docker-compose down
```

## 서버 포트

- **Login Server**: 5121
- **Char Server**: 6121
- **Map Server**: 6900
- **MySQL**: 3306

## 설정

서버 설정을 변경하려면:

1. `conf/` 디렉토리의 설정 파일 수정
2. 서버 재시작: `docker-compose restart rathena`

## 데이터베이스

- 호스트: localhost (외부) / mysql (컨테이너 내부)
- 사용자: ragnarok
- 비밀번호: ragnarok
- 데이터베이스: ragnarok

## 계정 생성

컨테이너 내부에서 계정을 생성할 수 있습니다:

```bash
docker exec -it rathena-mysql mysql -u ragnarok -p ragnarok
```

## 문제 해결

컨테이너 내부 접속:
```bash
docker exec -it rathena-server bash
```

MySQL 접속:
```bash
docker exec -it rathena-mysql mysql -u ragnarok -pragnarok ragnarok
```
