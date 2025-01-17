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
import { AddressJsonldContractInfosReadDocumentationContext } from './address-jsonld-contract-infos-read-documentation-context';
// May contain unused imports in some cases
// @ts-ignore
import { UserContractSubscribeRequestInputJsonldUserSubscribeDocumentation } from './user-contract-subscribe-request-input-jsonld-user-subscribe-documentation';

/**
 * 
 * @export
 * @interface UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
 */
export interface UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation {
    /**
     * 
     * @type {AddressJsonldContractInfosReadDocumentationContext}
     * @memberof UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
     */
    '@context'?: AddressJsonldContractInfosReadDocumentationContext;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
     */
    '@type'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
     */
    'brand': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
     */
    'email': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
     */
    'firstName': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
     */
    'lastName': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
     */
    'languageCode': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
     */
    'countryCode': string | null;
    /**
     * 
     * @type {string}
     * @memberof UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
     */
    'phoneNumber': string;
    /**
     * 
     * @type {Array<UserContractSubscribeRequestInputJsonldUserSubscribeDocumentation>}
     * @memberof UserUserSubscribeRequestInputJsonldUserSubscribeDocumentation
     */
    'contracts'?: Array<UserContractSubscribeRequestInputJsonldUserSubscribeDocumentation>;
}

