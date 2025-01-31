# Apollo Client Issue #12313

This project will build and run correctly with `@apollo/client@3.12.15` but not newer releases. 

To reproduce the errors:
```
npm install @apollo/client@latest
tsc --noEmit --skipLibCheck
npm run start
```
