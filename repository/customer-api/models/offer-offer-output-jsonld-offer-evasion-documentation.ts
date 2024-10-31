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
import { OfferItemOutputJsonldOfferEvasionDocumentation } from './offer-item-output-jsonld-offer-evasion-documentation';

/**
 * 
 * @export
 * @interface OfferOfferOutputJsonldOfferEvasionDocumentation
 */
export interface OfferOfferOutputJsonldOfferEvasionDocumentation {
    /**
     * 
     * @type {AddressJsonldContractInfosReadDocumentationContext}
     * @memberof OfferOfferOutputJsonldOfferEvasionDocumentation
     */
    '@context'?: AddressJsonldContractInfosReadDocumentationContext;
    /**
     * 
     * @type {string}
     * @memberof OfferOfferOutputJsonldOfferEvasionDocumentation
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferOfferOutputJsonldOfferEvasionDocumentation
     */
    '@type'?: string;
    /**
     * []
     * @type {Array<OfferItemOutputJsonldOfferEvasionDocumentation>}
     * @memberof OfferOfferOutputJsonldOfferEvasionDocumentation
     */
    'offers'?: Array<OfferItemOutputJsonldOfferEvasionDocumentation>;
}
