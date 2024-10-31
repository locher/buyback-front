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
 * @interface OfferActivateOfferInputJsonldActivateOfferDocumentation
 */
export interface OfferActivateOfferInputJsonldActivateOfferDocumentation {
    /**
     * 
     * @type {AddressJsonldContractInfosReadDocumentationContext}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    '@context'?: AddressJsonldContractInfosReadDocumentationContext;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    '@type'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'brand'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'contractNumber'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'typeContract'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'packageName'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'languageCode'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'name'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'type'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'category'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'refContract'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'typeAdvantage'?: string;
    /**
     * 
     * @type {Array<File>}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'attachments'?: Array<File>;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'amount': string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'purchaseAmount'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'purchaseDate'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'currency'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'amountType'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof OfferActivateOfferInputJsonldActivateOfferDocumentation
     */
    'iban'?: string | null;
}

