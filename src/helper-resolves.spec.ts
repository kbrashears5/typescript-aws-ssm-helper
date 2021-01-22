import { SSMHelper } from './helper';
import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';
import * as SSM from '@aws-sdk/client-ssm';

const cancelCommandResultResponse: SSM.CancelCommandResult = {};
const deleteParameterResultResponse: SSM.DeleteParameterResult = {};
const getParameterResultResponse: SSM.GetParameterResult = {};
const getParametersByPathResultResponse: SSM.GetParametersByPathResult = {};
const putParameterResultResponse: SSM.PutParameterResult = {};
const sendCommandResultResponse: SSM.SendCommandResult = {};

const cancelCommand = jest.fn().mockImplementation(() => {
    return Promise.resolve<SSM.CancelCommandResult>(cancelCommandResultResponse);
});
const deleteParameter = jest.fn().mockImplementation(() => {
    return Promise.resolve<SSM.DeleteParameterResult>(deleteParameterResultResponse);
});
const getParameter = jest.fn().mockImplementation(() => {
    return Promise.resolve<SSM.GetParameterResult>(getParameterResultResponse);
});
const getParametersByPath = jest.fn().mockImplementation(() => {
    return Promise.resolve<SSM.GetParametersByPathResult>(getParametersByPathResultResponse);
});
const putParameter = jest.fn().mockImplementation(() => {
    return Promise.resolve<SSM.PutParameterResult>(putParameterResultResponse);
});
const sendCommand = jest.fn().mockImplementation(() => {
    return Promise.resolve<SSM.SendCommandResult>(sendCommandResultResponse);
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
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMock.CancelCommandAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} commandId`, () => {
        const actual = ssmHelperMock.CancelCommandAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} commandId`);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMock.CancelCommandAsync(TestValues.Id);
        return expect(actual).resolves.toEqual(cancelCommandResultResponse);
    });
});

/**
 * Test the DeleteParameterAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMock.DeleteParameterAsync.name}`, () => {
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMock.DeleteParameterAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} name`, () => {
        const actual = ssmHelperMock.DeleteParameterAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMock.DeleteParameterAsync(TestValues.Name);
        return expect(actual).resolves.toEqual(deleteParameterResultResponse);
    });
});

/**
 * Test the GetParameterAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMock.GetParameterAsync.name}`, () => {
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMock.GetParameterAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} name`, () => {
        const actual = ssmHelperMock.GetParameterAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMock.GetParameterAsync(TestValues.Name);
        return expect(actual).resolves.toEqual(getParameterResultResponse);
    });
});

/**
 * Test the GetParametersByPathAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMock.GetParametersByPathAsync.name}`, () => {
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMock.GetParametersByPathAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} path`, () => {
        const actual = ssmHelperMock.GetParametersByPathAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} path`);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMock.GetParametersByPathAsync(TestValues.Path);
        return expect(actual).resolves.toEqual(getParametersByPathResultResponse);
    });
});

/**
 * Test the PutParameterAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMock.PutParameterAsync.name}`, () => {
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMock.PutParameterAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} name`, () => {
        const actual = ssmHelperMock.PutParameterAsync(TestValues.EmptyString, TestValues.StringValue, TestValues.Type, TestValues.Description);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(`${TestValues.ThrowsOnEmpty} value`, () => {
        const actual = ssmHelperMock.PutParameterAsync(TestValues.Name, TestValues.EmptyString, TestValues.Type, TestValues.Description);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} value`);
    });
    test(`${TestValues.ThrowsOnEmpty} type`, () => {
        const actual = ssmHelperMock.PutParameterAsync(TestValues.Name, TestValues.StringValue, TestValues.EmptyString, TestValues.Description);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} type`);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMock.PutParameterAsync(TestValues.Name, TestValues.StringValue, TestValues.Type, TestValues.Description);
        return expect(actual).resolves.toEqual(putParameterResultResponse);
    });
});

/**
 * Test the SendCommandAsync method
 */
describe(`${SSMHelper.name}.${ssmHelperMock.SendCommandAsync.name}`, () => {
    // set action for this method
    const action = `${SSMHelper.name}.${ssmHelperMock.SendCommandAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} documentName`, () => {
        const actual = ssmHelperMock.SendCommandAsync(TestValues.EmptyString, TestValues.Parameters, [TestValues.Id]);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} documentName`);
    });
    test(`${TestValues.ThrowsOnEmpty} parameters`, () => {
        const actual = ssmHelperMock.SendCommandAsync(TestValues.Name, TestValues.EmptyObject, [TestValues.Id]);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} parameters`);
    });
    test(`${TestValues.ThrowsOnEmpty} instanceIds`, () => {
        const actual = ssmHelperMock.SendCommandAsync(TestValues.Name, TestValues.Parameters, TestValues.EmptyArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} at least one instanceId`);
    });
    test(TestValues.ValidTest, () => {
        const actual = ssmHelperMock.SendCommandAsync(TestValues.Name, TestValues.Parameters, [TestValues.Id]);
        return expect(actual).resolves.toEqual(sendCommandResultResponse);
    });
});
