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
import { OfferItemOutputJsonldOfferFavoriteGiftAvailableDocumentation } from './offer-item-output-jsonld-offer-favorite-gift-available-documentation';

/**
 * 
 * @export
 * @interface OfferOfferOutputJsonldOfferFavoriteGiftAvailableDocumentation
 */
export interface OfferOfferOutputJsonldOfferFavoriteGiftAvailableDocumentation {
    /**
     * 
     * @type {AddressJsonldContractInfosReadDocumentationContext}
     * @memberof OfferOfferOutputJsonldOfferFavoriteGiftAvailableDocumentation
     */
    '@context'?: AddressJsonldContractInfosReadDocumentationContext;
    /**
     * 
     * @type {string}
     * @memberof OfferOfferOutputJsonldOfferFavoriteGiftAvailableDocumentation
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof OfferOfferOutputJsonldOfferFavoriteGiftAvailableDocumentation
     */
    '@type'?: string;
    /**
     * []
     * @type {Array<OfferItemOutputJsonldOfferFavoriteGiftAvailableDocumentation>}
     * @memberof OfferOfferOutputJsonldOfferFavoriteGiftAvailableDocumentation
     */
    'offers'?: Array<OfferItemOutputJsonldOfferFavoriteGiftAvailableDocumentation>;
}
