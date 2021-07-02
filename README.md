<h1 align="center">typescript-aws-ssm-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS SSM service</b>

[![CI/CD](https://github.com/kbrashears5/typescript-aws-ssm-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-ssm-helper/actions/workflows/ci-cd.yml)
[![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-ssm-helper/branch/master/graph/badge.svg?token=5WVHWVKSSS)](https://codecov.io/gh/kbrashears5/typescript-aws-ssm-helper)
[![NPM Version](https://img.shields.io/npm/v/typescript-aws-ssm-helper)](https://img.shields.io/npm/v/typescript-aws-ssm-helper)
[![Downloads](https://img.shields.io/npm/dt/typescript-aws-ssm-helper)](https://img.shields.io/npm/dt/typescript-aws-ssm-helper)

</div>

## Install

```
npm install typescript-aws-ssm-helper@latest
```

## Usage

### Default - running in Lambda in your own account

```typescript
const logger = new Logger(LogLevel.Trace);

const helper = new SSMHelper(logger);

const response = await helper.GetParametersByPathAsync('path');
```

### Running in separate account or not in Lambda

```typescript
import * as SSM from '@aws-sdk/client-ssm';

const logger = new Logger(LogLevel.Trace);

const options: SSM.SSMClientConfig = {
  accessKeyId: '{access_key}',
  secretAccessKey: '{secret_key}',
  region: 'us-east-1',
};

const repository = new SSM.SSM(options);

const helper = new SSMHelper(logger, repository);

const response = await helper.GetParametersByPathAsync('path');
```

## Notes

If no options are supplied, will default to `us-east-1` as the region

## Development

Clone the latest and run

```npm
npm run prep
```

to install packages and prep the git hooks
