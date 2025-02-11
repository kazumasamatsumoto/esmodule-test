NestJSプロジェクトをESModuleとして初期設定する手順をまとめましょう。これまでの作業で得られた知見を基に、必要な設定をステップバイステップで説明します。

Task Completed
NestJSプロジェクトをESModuleとして設定する手順：

プロジェクトの作成

```bash
nest new project-name
```

package.jsonの設定

```json
"type": "module"
```

Jest設定を以下のように変更：

```json
"jest": {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": ["ts-jest", {
      "useESM": true
    }]
  },
  "transformIgnorePatterns": [
    "/node_modules/(?!(@nestjs|react-is)/)"
  ],
  "moduleNameMapper": {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  "collectCoverageFrom": [
    "**/*.(t|j)s"
  ],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node"
}
```

tsconfig.jsonの設定

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ESNext",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
```

ソースファイルの拡張子
インポート時に.js拡張子を付ける必要がある場合は、すべてのインポート文に.jsを追加（これほんと重要）

src/app.controller.ts

src/app.controller.spec.ts

src/app.module.ts

src/app.service.ts

src/main.ts

test/app.e2e-spec.ts

test/jest-e2e.json

ESLint設定（eslint.config.mjs）

```js
import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {},
  },
];
```

これらの設定により：

ESModuleとしてプロジェクトが動作
テストが正常に実行可能
TypeScriptとESMの互換性が確保
適切なモジュール解決が可能
注意点：

Node.js v14.8.0以上が必要
依存パッケージによってはCommonJSとの互換性の問題が発生する可能性があるため、transformIgnorePatternsで適切に対応する
TypeScriptのmodule設定をESNextにすることで、最新のESM機能を使用可能

動作確認

```pwsh
PS C:\Users\kazum\portfolio\nest\esmodule-test> npm run test

> esmodule-test@0.0.1 test
> jest

 PASS  src/app.controller.spec.ts
  AppController
    root
      √ should return "Hello World!" (21 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.073 s, estimated 5 s
Ran all test suites.
PS C:\Users\kazum\portfolio\nest\esmodule-test>
```

```pwsh
npm run start:dev

[16:41:25] Starting compilation in watch mode...

[16:41:28] Found 0 errors. Watching for file changes.

[Nest] 95300  - 2025/02/11 16:41:29     LOG [NestFactory] Starting Nest application...
[Nest] 95300  - 2025/02/11 16:41:29     LOG [InstanceLoader] AppModule dependencies initialized +28ms
[Nest] 95300  - 2025/02/11 16:41:29     LOG [RoutesResolver] AppController {/}: +6ms
[Nest] 95300  - 2025/02/11 16:41:29     LOG [RouterExplorer] Mapped {/, GET} route +5ms
[Nest] 95300  - 2025/02/11 16:41:29     LOG [NestApplication] Nest application successfully started +5ms
```

```pwsh
PS C:\Users\kazum\portfolio\nest\esmodule-test> Invoke-RestMethod -Method Get -Uri "http://localhost:3000"
Hello World!
```
