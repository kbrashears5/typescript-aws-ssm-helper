import { BaseMock } from 'typescript-helper-functions';
import * as SSM from '@aws-sdk/client-ssm';

/**
 * SSM Mock class
 */
export class SSMMock extends BaseMock {

    /**
     * Mocks an SSM.CancelCommandResult response
     */
    public CancelCommandResult: SSM.CancelCommandResult = {};

    /**
     * Mocks an SSM.DeleteParameterResult response
     */
    public DeleteParameterResult: SSM.DeleteParameterResult = {};

    /**
     * Mocks an SSM.GetParameterResult response
     */
    public GetParameterResult: SSM.GetParameterResult = {};

    /**
     * Mocks an SSM.GetParametersByPathResult response
     */
    public GetParametersByPathResult: SSM.GetParametersByPathResult = {};

    /**
     * Mocks an SSM.PutParameterResult response
     */
    public PutParameterResult: SSM.PutParameterResult = {};

    /**
     * Mocks an SSM.SendCommandResult response
     */
    public SendCommandResult: SSM.SendCommandResult = {};

    /**
     * Create the SSM mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        // implement the AWS responses
        const awsResponses = {
            // cancel command response
            cancelCommand: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<SSM.CancelCommandResult>(this.CancelCommandResult);
                }),
            },
            // delete parameter response
            deleteParameter: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<SSM.DeleteParameterResult>(this.DeleteParameterResult);
                }),
            },
            // get parameter response
            getParameter: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<SSM.GetParameterResult>(this.GetParameterResult);
                }),
            },
            // get parameters by path response
            getParametersByPath: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<SSM.GetParametersByPathResult>(this.GetParametersByPathResult);
                }),
            },
            // put parameter response
            putParameter: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<SSM.PutParameterResult>(this.PutParameterResult);
                }),
            },
             // send command response
             sendCommand: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<SSM.SendCommandResult>(this.SendCommandResult);
                }),
            },
        };

        const options = {} as SSM.SSMClientConfig;

        // create the functions
        let functions = new SSM.SSM(options);
        functions = {
            cancelCommand: () => awsResponses.cancelCommand,
            deleteParameter: () => awsResponses.deleteParameter,
            getParameter: () => awsResponses.getParameter,
            getParametersByPath: () => awsResponses.getParametersByPath,
            putParameter: () => awsResponses.putParameter,
            sendCommand: () => awsResponses.sendCommand,
        };

        return functions;
    }
}
