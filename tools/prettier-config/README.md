# prettier-config

## 이슈

### package.json에서 ESM을 지원하기 위해 `"type": "module"`을 설정할 경우 `.eslintrc.js`파일을 로드하는데 문제가 생긴다.

#### 증상
```shell
[Info  - 9:50:12 AM] ESLint server is starting.
[Info  - 9:50:12 AM] ESLint server running in node v20.9.0
[Info  - 9:50:12 AM] ESLint server is running.
[Info  - 9:50:12 AM] ESLint library loaded from: /Users/andromediano/workbench/playground/nextjs/turborepo-starter/node_modules/.pnpm/eslint@8.57.0/node_modules/eslint/lib/api.js
[Error - 9:50:12 AM] Calculating config file for file:///Users/andromediano/workbench/playground/nextjs/turborepo-starter/tools/prettier-config/prettier.config.mjs) failed.
Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/andromediano/workbench/playground/nextjs/turborepo-starter/tools/prettier-config/.eslintrc.js from /Users/andromediano/workbench/playground/nextjs/turborepo-starter/node_modules/.pnpm/@eslint+eslintrc@2.1.4/node_modules/@eslint/eslintrc/dist/eslintrc.cjs not supported.
.eslintrc.js is treated as an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which declares all .js files in that package scope as ES modules.
Instead either rename .eslintrc.js to end in .cjs, change the requiring code to use dynamic import() which is available in all CommonJS modules, or change "type": "module" to "type": "commonjs" in /Users/andromediano/workbench/playground/nextjs/turborepo-starter/tools/prettier-config/package.json to treat all .js files as CommonJS (using .mjs for all ES modules instead).

    at c._load (node:electron/js2c/node_init:2:13672)
    at module.exports [as default] (/Users/andromediano/workbench/playground/nextjs/turborepo-starter/node_modules/.pnpm/import-fresh@3.3.0/node_modules/import-fresh/index.js:32:59)
    at loadJSConfigFile (/Users/andromediano/workbench/playground/nextjs/turborepo-starter/node_modules/.pnpm/@eslint+eslintrc@2.1.4/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:2583:47)
    at loadConfigFile (/Users/andromediano/workbench/playground/nextjs/turborepo-starter/node_modules/.pnpm/@eslint+eslintrc@2.1.4/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:2667:20)
    at ConfigArrayFactory.loadInDirectory (/Users/andromediano/workbench/playground/nextjs/turborepo-starter/node_modules/.pnpm/@eslint+eslintrc@2.1.4/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:2877:34)
    at CascadingConfigArrayFactory._loadConfigInAncestors (/Users/andromediano/workbench/playground/nextjs/turborepo-starter/node_modules/.pnpm/@eslint+eslintrc@2.1.4/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:3871:46)
    at CascadingConfigArrayFactory.getConfigArrayForFile (/Users/andromediano/workbench/playground/nextjs/turborepo-starter/node_modules/.pnpm/@eslint+eslintrc@2.1.4/node_modules/@eslint/eslintrc/dist/eslintrc.cjs:3792:18)
    at CLIEngine.isPathIgnored (/Users/andromediano/workbench/playground/nextjs/turborepo-starter/node_modules/.pnpm/eslint@8.57.0/node_modules/eslint/lib/cli-engine/cli-engine.js:1000:18)
    at ESLint.isPathIgnored (/Users/andromediano/workbench/playground/nextjs/turborepo-starter/node_modules/.pnpm/eslint@8.57.0/node_modules/eslint/lib/eslint/eslint.js:681:26)
    at /Users/andromediano/.vscode/extensions/dbaeumer.vscode-eslint-3.0.10/server/out/eslintServer.js:1:23765
    at Object.M [as withClass] (/Users/andromediano/.vscode/extensions/dbaeumer.vscode-eslint-3.0.10/server/out/eslintServer.js:1:19813)
    at async O.then.m.validate (/Users/andromediano/.vscode/extensions/dbaeumer.vscode-eslint-3.0.10/server/out/eslintServer.js:1:23728)
    at async /Users/andromediano/.vscode/extensions/dbaeumer.vscode-eslint-3.0.10/server/out/eslintServer.js:1:234417
    at async /Users/andromediano/.vscode/extensions/dbaeumer.vscode-eslint-3.0.10/server/out/eslintServer.js:1:63886
```

#### 원인
[vite](https://vitejs.dev/guide/build.html#module-nomodule)에서는 package.json에 `"type": "module"`이 없다면 다른 방식으로 자바스크립트를 생성한다. `.js`는 `.mjs`가 되고 `.cjs`는 `.js`가된다.
`eslint`는 7.0.0버전부터 ESM을 지원하는데 이를 사용하기 위해서는 `@babel/eslint-parser`와 같은 ESM을 지원하는 별도의 parse를 사용해야 한다.

#### 해결
package.json에서 `"type": "module"`을 삭제한다. Restart Extension Host(`⇧⌘p`)명령으로 플러그인을 재시작거나 VScode를 재시작해야 에러가 사라진것을 확안 할 수 있다.
