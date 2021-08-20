<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

인프런 탄탄한 백엔드 NestJs, 기초부터 심화까지 강의를 보고 만든 NestJs Simple App 입니다.  
강의에서는 MongoDB + mongoose를 사용했지만, Prisma + MySQL로 변경했습니다.

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

### JWT && Passport

- auth라는 폴더에 새로운 모듈을 만들고 `jwt` 를 위한 가드와 `jwt.strategy` 를 생성.
- auth.moudule에 Jwt모듈과 passport 모듈을 Import 해서 Auth모듈에서 사용가능하게 함.
- `auth.service`안에 `jwtLogin`은 유저 정보가 있는지 확인하고 유저 정보를 통해 jwt 를 발급해서 프론트에게 넘김, 이후 이 `jwtLogin`은 `CatController`에서 login 메소드에서 사용.
- `CatController` 에서 유저만 접근 가능한 인증 처리는 전에 만든 jwt가드를 컨트롤러의 메소드 단위로 적용, `@UseGuards(JwtAuthGuard)`를 사용하면 요청이 가드로 넘어가게 되고 가드-> jwt 전략을 수행, jwt 전략에서 헤더에 있는 토큰에서 payload(유저 정보)를 추출해서 인증, 이후 request 객체 안에 유저정보를 담음,
- 가드와 전략을 통과한 요청은 req.user안에 유저 정보가 담기게 되고 이 유저정보를 통해 컨트롤러와 서비스 코드에서 사용 가능.(마치 기존 로컬 패스포트 전략의 serializeUser) 역할

### Multer

- `Multer`를 사용하는 모듈에 Multer 모듈을 import. Multer를 사용하기 위해서는 `FileInterceptor` 이라는 인터셉터를 사용하게 되는데 이 인터셉터의 첫 번째 인자는 HTML 코드의 id값, 두번째는 option을 줄 수 있음. 이 options을 통해 multer의 파일 저장 경로나 저장 이름 등의 셋팅 가능.
- 저장된 이미지를 프론트에게 제공하기위한 static 설정을 위해서는 main.ts에 미들웨어를 추가해줘야 하는데 `app.useStaticAssets`을 추가 하기 위해서는 app을 만들때 Express 라이브러리를 사용한다고 명시해줘야 함.
