import * as AWS from 'aws-sdk';

/**
 * SSM Helper
 */
export interface ISSMHelper {

    /**
     * AWS Repository for SSM
     */
    Repository: AWS.SSM;

    /**
     * Cancel document command
     * @param commandId {string} Command id to cancel
     */
    CancelCommandAsync(commandId: string): Promise<AWS.SSM.CancelCommandResult>;

    /**
     * Delete parameter from Parameter Store
     * @param name {string} Parameter name to delete
     */
    DeleteParameterAsync(name: string): Promise<AWS.SSM.DeleteParameterResult>;

    /**
     * Get parameter from Parameter Store
     * @param name {string} Parameter name to get
     */
    GetParameterAsync(name: string): Promise<AWS.SSM.GetParameterResult>;

    /**
     * Recursively gets all parameters by path
     * @param path {string} Path hierarchy of parameters to get
     * @param nextToken {string} NextToken of response. Supplied by recursion
     */
    GetParametersByPathAsync(path: string,
        nextToken?: string): Promise<AWS.SSM.GetParametersByPathResult>;

    /**
     * Put a parameter into Parameter Store
     * @param name {string} Parameter name
     * @param value {string} Value to give parameter
     * @param type {string} Type to give parameter
     * @param description {string} Description to give value
     * @param kmsKeyId {string} KMS Key ID to encrypt Secure Strings with
     */
    PutParameterAsync(name: string,
        value: string,
        type: string,
        description: string,
        kmsKeyId?: string): Promise<AWS.SSM.PutParameterResult>;

    /**
     * Send command to execute a document on list of instances
     * @param documentName {string} Document name to execute
     * @param parameters {AWS.SSM.Parameters} Parameters to send to document
     * @param instanceIds {string[]} Array of instance ids to execute command on
     * @param logGroupName {string} Optional name of CloudWatch Log Group
     */
    SendCommandAsync(documentName: string,
        parameters: AWS.SSM.Parameters,
        instanceIds: string[],
        logGroupName?: string): Promise<AWS.SSM.SendCommandResult>;
}
