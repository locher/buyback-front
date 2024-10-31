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
import { UserContractSubscribeRequestInputUserSubscribeDocumentation } from './user-contract-subscribe-request-input-user-subscribe-documentation';

/**
 * 
 * @export
 * @interface UserUserSubscribeRequestInputUserSubscribeDocumentation
 */
export interface UserUserSubscribeRequestInputUserSubscribeDocumentation {
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputUserSubscribeDocumentation
     */
    'brand': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputUserSubscribeDocumentation
     */
    'email': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputUserSubscribeDocumentation
     */
    'firstName': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputUserSubscribeDocumentation
     */
    'lastName': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputUserSubscribeDocumentation
     */
    'languageCode': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputUserSubscribeDocumentation
     */
    'countryCode': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputUserSubscribeDocumentation
     */
    'phoneNumber': string;
    /**
     * 
     * @type {Array<UserContractSubscribeRequestInputUserSubscribeDocumentation>}
     * @memberof UserUserSubscribeRequestInputUserSubscribeDocumentation
     */
    'contracts'?: Array<UserContractSubscribeRequestInputUserSubscribeDocumentation>;
}
