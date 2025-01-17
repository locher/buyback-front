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
 * @interface ProductDeclarationJsonldProductDeclarationReadDocumentation
 */
export interface ProductDeclarationJsonldProductDeclarationReadDocumentation {
    /**
     * 
     * @type {string}
     * @memberof ProductDeclarationJsonldProductDeclarationReadDocumentation
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductDeclarationJsonldProductDeclarationReadDocumentation
     */
    '@type'?: string;
    /**
     * 
     * @type {AddressJsonldContractInfosReadDocumentationContext}
     * @memberof ProductDeclarationJsonldProductDeclarationReadDocumentation
     */
    '@context'?: AddressJsonldContractInfosReadDocumentationContext;
    /**
     * 
     * @type {string}
     * @memberof ProductDeclarationJsonldProductDeclarationReadDocumentation
     */
    'type': string;
    /**
     * 
     * @type {string}
     * @memberof ProductDeclarationJsonldProductDeclarationReadDocumentation
     */
    'brand': string;
    /**
     * 
     * @type {string}
     * @memberof ProductDeclarationJsonldProductDeclarationReadDocumentation
     */
    'model': string;
    /**
     * 
     * @type {string}
     * @memberof ProductDeclarationJsonldProductDeclarationReadDocumentation
     */
    'purchaseInvoice'?: string | null;
    /**
     * 
     * @type {Array<string>}
     * @memberof ProductDeclarationJsonldProductDeclarationReadDocumentation
     */
    'productDetails'?: Array<string> | null;
    /**
     * 
     * @type {string}
     * @memberof ProductDeclarationJsonldProductDeclarationReadDocumentation
     */
    'contract'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof ProductDeclarationJsonldProductDeclarationReadDocumentation
     */
    'id'?: number;
}

