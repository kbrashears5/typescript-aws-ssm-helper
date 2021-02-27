import { SSMHelper } from './helper';
import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';

const error = new Error(`AWS Error`);

const cancelCommand = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const deleteParameter = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const getParameter = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const getParametersByPath = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const putParameter = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});
const sendCommand = jest.fn().mockImplementation(() => {
  return Promise.reject(error);
});

// mock the functions
jest.mock('@aws-sdk/client-ssm', () => {
  return {
    SSM: jest.fn().mockImplementation(() => {
      return {
        cancelCommand,
        deleteParameter,
        getParameter,
        getParametersByPath,
        putParameter,
        sendCommand,
      };
    }),
  };
});

const logger = new Logger(LogLevel.Off);
const ssmHelperMock = new SSMHelper(logger);
const TestValues = new TestingValues();

/**
 * Test the CancelCommandAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMock.CancelCommandAsync.name}`, () => {
  test(TestValues.InvalidTest, () => {
    const actual = ssmHelperMock.CancelCommandAsync(TestValues.Id);
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the DeleteParameterAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMock.DeleteParameterAsync.name}`, () => {
  test(TestValues.InvalidTest, () => {
    const actual = ssmHelperMock.DeleteParameterAsync(TestValues.Name);
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the GetParameterAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMock.GetParameterAsync.name}`, () => {
  test(TestValues.InvalidTest, () => {
    const actual = ssmHelperMock.GetParameterAsync(TestValues.Name);
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the GetParametersByPathAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMock.GetParametersByPathAsync.name}`, () => {
  test(TestValues.InvalidTest, () => {
    const actual = ssmHelperMock.GetParametersByPathAsync(TestValues.Path);
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the PutParameterAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMock.PutParameterAsync.name}`, () => {
  test(TestValues.InvalidTest, () => {
    const actual = ssmHelperMock.PutParameterAsync(
      TestValues.Name,
      TestValues.StringValue,
      TestValues.Type,
      TestValues.Description,
    );
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});

/**
 * Test the SendCommandAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMock.SendCommandAsync.name}`, () => {
  test(TestValues.InvalidTest, () => {
    const actual = ssmHelperMock.SendCommandAsync(
      TestValues.Name,
      TestValues.Parameters,
      [TestValues.Id],
    );
    return expect(actual).rejects.toThrow(TestValues.AWSError);
  });
});
