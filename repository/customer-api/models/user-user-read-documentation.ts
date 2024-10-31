/* tslint:disable */
/* eslint-disable */
/**
 * Customer Service
 * API for Customer Service
 *
 * The version of the OpenAPI document: 1.23.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { ContractUserReadDocumentation } from './contract-user-read-documentation';

/**
 * 
 * @export
 * @interface UserUserReadDocumentation
 */
export interface UserUserReadDocumentation {
    /**
     * 
     * @type {string}
     * @memberof UserUserReadDocumentation
     */
    'brand'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserReadDocumentation
     */
    'firstName'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUserReadDocumentation
     */
    'lastName'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUserReadDocumentation
     */
    'username'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UserUserReadDocumentation
     */
    'enabled'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof UserUserReadDocumentation
     */
    'languageCode'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUserReadDocumentation
     */
    'countryCode'?: string;
    /**
     * 
     * @type {Array<ContractUserReadDocumentation>}
     * @memberof UserUserReadDocumentation
     */
    'contracts'?: Array<ContractUserReadDocumentation>;
    /**
     * 
     * @type {number}
     * @memberof UserUserReadDocumentation
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof UserUserReadDocumentation
     */
    'creationDateAt'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserReadDocumentation
     */
    'updateDateAt'?: string | null;
}
