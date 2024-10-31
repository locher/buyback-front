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

/**
 * 
 * @export
 * @interface ContractJsonldContractWriteDocumentation
 */
export interface ContractJsonldContractWriteDocumentation {
    /**
     * 
     * @type {AddressJsonldContractInfosReadDocumentationContext}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    '@context'?: AddressJsonldContractInfosReadDocumentationContext;
    /**
     * 
     * @type {string}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    '@type'?: string;
    /**
     * 
     * @type {string}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    'contractNumber'?: string;
    /**
     * 
     * @type {string}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    'type'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    'enabled'?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    'locked'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    'externalId'?: string;
    /**
     * 
     * @type {string}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    'firstName'?: string;
    /**
     * 
     * @type {string}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    'lastName'?: string;
    /**
     * 
     * @type {string}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    'user'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    'creationDateAt'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ContractJsonldContractWriteDocumentation
     */
    'updateDateAt'?: string | null;
}

