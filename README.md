# CatCatDo

간단한 웹 프론트엔드와 rAthena 게임 서버를 포함한 프로젝트입니다.

## 프로젝트 구조

- `/` - 웹 프론트엔드 (GitHub Pages로 배포)
- `/server` - rAthena 게임 서버 (Docker)

## 웹사이트

https://catcatdo.github.io/catcatdo

## rAthena 서버

Docker를 사용하여 rAthena 서버를 실행할 수 있습니다.

### 시작하기

```bash
# 서버 빌드 및 시작
docker-compose up -d

# 로그 확인
docker-compose logs -f rathena

# 서버 중지
docker-compose down
```

자세한 내용은 [server/README.md](server/README.md)를 참조하세요.

## 개발

프론트엔드 파일을 수정하고 `main` 브랜치에 푸시하면 자동으로 GitHub Pages에 배포됩니다.
