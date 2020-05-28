import * as AWS from 'aws-sdk';
import { ILogger } from 'typescript-ilogger';
import { BaseClass } from 'typescript-helper-functions';
import { ISSMHelper } from './interface';

/**
 * SSM Helper
 */
export class SSMHelper extends BaseClass implements ISSMHelper {

    /**
     * AWS Repository for SSM
     */
    public Repository: AWS.SSM;

    /**
     * Initializes new instance of SSMHelper
     * @param logger {ILogger} Injected logger
     * @param repository {AWS.SSM} Injected Repository. A new repository will be created if not supplied
     * @param options {AWS.SSM.ClientConfiguration} Injected configuration if a Repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.SSM,
        options?: AWS.SSM.ClientConfiguration) {

        super(logger);
        this.Repository = repository || new AWS.SSM(options);
    }

    /**
     * Cancel document command
     * @param commandId {string} Command id to cancel
     */
    public async CancelCommandAsync(commandId: string): Promise<AWS.SSM.CancelCommandResult> {

        const action = `${SSMHelper.name}.${this.CancelCommandAsync.name}`;
        this.LogHelper.LogInputs(action, { commandId });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(commandId)) { throw new Error(`[${action}]-Must supply commandId`); }

        // create params object
        const params: AWS.SSM.CancelCommandRequest = {
            CommandId: commandId,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.cancelCommand(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Delete parameter from Parameter Store
     * @param name {string} Parameter name to delete
     */
    public async DeleteParameterAsync(name: string): Promise<AWS.SSM.DeleteParameterResult> {

        const action = `${SSMHelper.name}.${this.DeleteParameterAsync.name}`;
        this.LogHelper.LogInputs(action, { name });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(name)) { throw new Error(`[${action}]-Must supply name`); }

        // create params object
        const params: AWS.SSM.DeleteParameterRequest = {
            Name: name,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteParameter(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Get parameter from Parameter Store
     * @param name {string} Parameter name to get
     */
    public async GetParameterAsync(name: string): Promise<AWS.SSM.GetParameterResult> {

        const action = `${SSMHelper.name}.${this.GetParameterAsync.name}`;
        this.LogHelper.LogInputs(action, { name });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(name)) { throw new Error(`[${action}]-Must supply name`); }

        // create params object
        const params: AWS.SSM.GetParameterRequest = {
            Name: name,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.getParameter(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Recursively gets all parameters by path
     * @param path {string} Path hierarchy of parameters to get
     * @param nextToken {string} NextToken of response. Supplied by recursion
     */
    public async GetParametersByPathAsync(path: string,
        nextToken?: string): Promise<AWS.SSM.GetParametersByPathResult> {

        const action = `${SSMHelper.name}.${this.GetParametersByPathAsync.name}`;
        this.LogHelper.LogInputs(action, { path });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(path)) { throw new Error(`[${action}]-Must supply path`); }

        // create params object
        const params: AWS.SSM.GetParametersByPathRequest = {
            Path: path,
            Recursive: true,
            WithDecryption: true,
        };
        if (this.ObjectOperations.IsNullOrWhitespace(nextToken)) { params.NextToken = nextToken; }
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.getParametersByPath(params).promise();
        this.LogHelper.LogResponse(action, response);

        // recursively call the function if NextToken is present
        if (response.NextToken && response.Parameters) {
            const nextParameters = await this.GetParametersByPathAsync(path,
                response.NextToken);

            if (nextParameters.Parameters) {
                for (const parameter of nextParameters.Parameters) {
                    response.Parameters.push(parameter);
                }
            }
        }

        return response;
    }

    /**
     * Put a parameter into Parameter Store
     * @param name {string} Parameter name
     * @param value {string} Value to give parameter
     * @param type {string} Type to give parameter
     * @param description {string} Description to give value
     * @param kmsKeyId {string} KMS Key ID to encrypt Secure Strings with
     */
    public async PutParameterAsync(name: string,
        value: string,
        type: string,
        description: string,
        kmsKeyId?: string): Promise<AWS.SSM.PutParameterResult> {

        const action = `${SSMHelper.name}.${this.PutParameterAsync.name}`;
        this.LogHelper.LogInputs(action, { name, value, type, description, kmsKeyId });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(name)) { throw new Error(`[${action}]-Must supply name`); }
        if (this.ObjectOperations.IsNullOrWhitespace(value)) { throw new Error(`[${action}]-Must supply value`); }
        if (this.ObjectOperations.IsNullOrWhitespace(type)) { throw new Error(`[${action}]-Must supply type`); }

        // create params object
        const params: AWS.SSM.PutParameterRequest = {
            Description: description,
            KeyId: kmsKeyId,
            Name: name,
            Type: type,
            Value: value,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.putParameter(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    /**
     * Send command to execute a document on list of instances
     * @param documentName {string} Document name to execute
     * @param parameters {AWS.SSM.Parameters} Parameters to send to document
     * @param instanceIds {string[]} Array of instance ids to execute command on
     * @param logGroupName {string} Optional name of CloudWatch Log Group
     */
    public async SendCommandAsync(documentName: string,
        parameters: AWS.SSM.Parameters,
        instanceIds: string[],
        logGroupName?: string): Promise<AWS.SSM.SendCommandResult> {

        const action = `${SSMHelper.name}.${this.SendCommandAsync.name}`;
        this.LogHelper.LogInputs(action, { documentName, parameters, instanceIds, logGroupName });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(documentName)) { throw new Error(`[${action}]-Must supply documentName`); }
        if (this.ObjectOperations.IsNullOrEmpty(parameters)) { throw new Error(`[${action}]-Must supply parameters`); }
        if (this.ObjectOperations.IsNullOrEmpty(instanceIds)) { throw new Error(`[${action}]-Must supply at least one instanceId`); }

        // create params object
        const params: AWS.SSM.SendCommandRequest = {
            DocumentName: documentName,
            InstanceIds: instanceIds,
            Parameters: parameters,
        };
        if (this.ObjectOperations.IsNullOrWhitespace(logGroupName)) { params.CloudWatchOutputConfig = { CloudWatchLogGroupName: logGroupName, CloudWatchOutputEnabled: true }; }
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.sendCommand(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }
}
