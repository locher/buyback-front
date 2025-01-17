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
 * @interface ProductSwapProductSwapOutputJsonldProductSwapReadDocumentation
 */
export interface ProductSwapProductSwapOutputJsonldProductSwapReadDocumentation {
    /**
     * 
     * @type {string}
     * @memberof ProductSwapProductSwapOutputJsonldProductSwapReadDocumentation
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductSwapProductSwapOutputJsonldProductSwapReadDocumentation
     */
    '@type'?: string;
    /**
     * 
     * @type {AddressJsonldContractInfosReadDocumentationContext}
     * @memberof ProductSwapProductSwapOutputJsonldProductSwapReadDocumentation
     */
    '@context'?: AddressJsonldContractInfosReadDocumentationContext;
    /**
     * 
     * @type {number}
     * @memberof ProductSwapProductSwapOutputJsonldProductSwapReadDocumentation
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof ProductSwapProductSwapOutputJsonldProductSwapReadDocumentation
     */
    'offerUuidBappli'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductSwapProductSwapOutputJsonldProductSwapReadDocumentation
     */
    'contractNumber'?: string;
    /**
     * 
     * @type {number}
     * @memberof ProductSwapProductSwapOutputJsonldProductSwapReadDocumentation
     */
    'productDeclaration'?: number;
    /**
     * 
     * @type {string}
     * @memberof ProductSwapProductSwapOutputJsonldProductSwapReadDocumentation
     */
    'registrationDate'?: string | null;
}

