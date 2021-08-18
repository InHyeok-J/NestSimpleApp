<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

NestJs Simple App

## Feature

### Logging

- `src/common/middleware/logger.middleware.ts`  
  `app.module.ts` 에 모든 라우터 경로 `forRoute('*')` 로 적용

### exception filter

- `src/common/exceptions/http-exception.filter.ts`  
  커스텀 에러 (error의 값이 string)인 경우와 내장 exception layer을 통해 발생한 에러에 대한 응답 값을 필터링 해서 response의 포맷을 만들어줘서 응답.
- filter는 main.ts에 `useGlobalFilters` 을 통한 전역 적용.

### interceptors

- `src/common/interceptors/success.interceptor.ts`  
  인터셉터를 적용해서, `handle()` 함수가 처리된 이후 ( 서비스 코드에서 성공이 되면) success.interceptor를 통해 응답 값의 형태를 변경해줌.

### validation

- `class validation` 을 사용하기 위해 main.ts에 `ValidationPipe()`을 Global로 설정해줌.

### prisma Setting

- nest와 prisma를 연동해주는 `prisma.service.ts`를 만들고 repository 패턴을 적용시키기 위해 각 레포지에서 전역으로 이 service에 접근하기 위해 `prisma.module`을 만들어 그 모듈에 provider을 DI 시킨 후 `Global()`로 설정.
- 각 모듈에서 필요한 prisma repository들은 각 모듈에서 provider로 등록해서 사용한다.
