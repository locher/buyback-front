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
import { ContractJsonldContractReadByTokenDocumentation } from './contract-jsonld-contract-read-by-token-documentation';

/**
 * 
 * @export
 * @interface ContractContractCollectionJsonldContractReadByTokenDocumentation
 */
export interface ContractContractCollectionJsonldContractReadByTokenDocumentation {
    /**
     * 
     * @type {AddressJsonldContractInfosReadDocumentationContext}
     * @memberof ContractContractCollectionJsonldContractReadByTokenDocumentation
     */
    '@context'?: AddressJsonldContractInfosReadDocumentationContext;
    /**
     * 
     * @type {string}
     * @memberof ContractContractCollectionJsonldContractReadByTokenDocumentation
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof ContractContractCollectionJsonldContractReadByTokenDocumentation
     */
    '@type'?: string;
    /**
     * 
     * @type {Array<ContractJsonldContractReadByTokenDocumentation>}
     * @memberof ContractContractCollectionJsonldContractReadByTokenDocumentation
     */
    'data'?: Array<ContractJsonldContractReadByTokenDocumentation>;
}
