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
import { GetContractCollection200ResponseHydraSearch } from './get-contract-collection200-response-hydra-search';
// May contain unused imports in some cases
// @ts-ignore
import { GetContractCollection200ResponseHydraView } from './get-contract-collection200-response-hydra-view';
// May contain unused imports in some cases
// @ts-ignore
import { UserJsonldUserChangePasswordDocumentation } from './user-jsonld-user-change-password-documentation';

/**
 * 
 * @export
 * @interface GetControlConfirmationTokenBeforeChangePasswordUserCollection200Response
 */
export interface GetControlConfirmationTokenBeforeChangePasswordUserCollection200Response {
    /**
     * 
     * @type {Array<UserJsonldUserChangePasswordDocumentation>}
     * @memberof GetControlConfirmationTokenBeforeChangePasswordUserCollection200Response
     */
    'hydra:member': Array<UserJsonldUserChangePasswordDocumentation>;
    /**
     * 
     * @type {number}
     * @memberof GetControlConfirmationTokenBeforeChangePasswordUserCollection200Response
     */
    'hydra:totalItems'?: number;
    /**
     * 
     * @type {GetContractCollection200ResponseHydraView}
     * @memberof GetControlConfirmationTokenBeforeChangePasswordUserCollection200Response
     */
    'hydra:view'?: GetContractCollection200ResponseHydraView;
    /**
     * 
     * @type {GetContractCollection200ResponseHydraSearch}
     * @memberof GetControlConfirmationTokenBeforeChangePasswordUserCollection200Response
     */
    'hydra:search'?: GetContractCollection200ResponseHydraSearch;
}

