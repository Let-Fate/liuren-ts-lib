# liuren-ts-lib

![NPM Version](https://img.shields.io/npm/v/liuren-ts-lib)
![License](https://img.shields.io/npm/l/liuren-ts-lib)
![size](https://img.shields.io/github/repo-size/let-fate/liuren-ts-lib)
![last commit](https://img.shields.io/github/last-commit/let-fate/liuren-ts-lib)

一个使用 TypeScript 编写的，基于 [tyme](https://github.com/6tail/tyme4j) 的六壬神课- TypeScript lib 库。

## ✨ 特性

-   六壬神课排盘
-   TypeScript 支持

## 📦 安装

```bash
yarn add liuren-ts-lib
```

## 🔨 使用

```typescript
import { getLiuRenByDate } from 'liuren-ts-lib';

const result = getLiuRenByDate(new Date());

console.log(result);
```

## 📜 脚本

-   `yarn build`: 编译 TypeScript 代码。
-   `yarn dev`: 监听文件变化并自动编译。
-   `yarn test`: 运行测试。
-   `yarn lint`: 检查代码风格。
-   `yarn fix`: 自动修复代码风格问题。

## 📄 版权与协议

本仓库代码遵循 [Apache 2.0](https://github.com/let-fate/liuren-ts-lib/blob/main/LICENSE) 协议。

**本项目仅供个人学习和研究使用，严禁用于任何商业用途。** 