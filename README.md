<h1 align="center">typescript-aws-ssm-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS STS service</b>
    
[![Build Status](https://dev.azure.com/kbrashears5/github/_apis/build/status/kbrashears5.typescript-aws-sts-helper?branchName=master)](https://dev.azure.com/kbrashears5/github/_build/latest?definitionId=18&branchName=master)
[![Tessm](https://img.shields.io/azure-devops/tests/kbrashears5/github/18)](https://img.shields.io/azure-devops/tessm/kbrashears5/github/18)
[![Code Coverage](https://img.shields.io/azure-devops/coverage/kbrashears5/github/18)](https://img.shields.io/azure-devops/coverage/kbrashears5/github/18)

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
const logger = new Logger(LogLevel.Trace);

const options: AWS.SSM.ClientConfiguration = {
    accessKeyId: '{access_key}',
    secretAccessKey: '{secret_key}',
    region: 'us-east-1',
};

const repository = new AWS.SSM(options);

const helper = new SSMHelper(logger,
    repository);

const response = await helper.GetParametersByPathAsync('path');
```