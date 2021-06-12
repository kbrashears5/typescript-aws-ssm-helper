/* eslint-disable no-unused-vars */
import * as SSM from '@aws-sdk/client-ssm';
import { Parameters } from './any';

/**
 * SSM Helper
 */
export interface ISSMHelper {
  /**
   * Cancel document command
   * @param commandId {string} Command id to cancel
   */
  CancelCommandAsync(commandId: string): Promise<SSM.CancelCommandResult>;

  /**
   * Delete parameter from Parameter Store
   * @param name {string} Parameter name to delete
   */
  DeleteParameterAsync(name: string): Promise<SSM.DeleteParameterResult>;

  /**
   * Get parameter from Parameter Store
   * @param name {string} Parameter name to get
   */
  GetParameterAsync(name: string): Promise<SSM.GetParameterResult>;

  /**
   * Recursively gets all parameters by path
   * @param path {string} Path hierarchy of parameters to get
   * @param nextToken {string} NextToken of response. Supplied by recursion
   */
  GetParametersByPathAsync(
    path: string,
    nextToken?: string,
  ): Promise<SSM.GetParametersByPathResult>;

  /**
   * Put a parameter into Parameter Store
   * @param name {string} Parameter name
   * @param value {string} Value to give parameter
   * @param type {string} Type to give parameter
   * @param description {string} Description to give value
   * @param kmsKeyId {string} KMS Key ID to encrypt Secure Strings with
   */
  PutParameterAsync(
    name: string,
    value: string,
    type: string,
    description: string,
    kmsKeyId?: string,
  ): Promise<SSM.PutParameterResult>;

  /**
   * Send command to execute a document on list of instances
   * @param documentName {string} Document name to execute
   * @param parameters {Parameters} Parameters to send to document
   * @param instanceIds {string[]} Array of instance ids to execute command on
   * @param logGroupName {string} Optional name of CloudWatch Log Group
   */
  SendCommandAsync(
    documentName: string,
    parameters: Parameters,
    instanceIds: string[],
    logGroupName?: string,
  ): Promise<SSM.SendCommandResult>;
}
