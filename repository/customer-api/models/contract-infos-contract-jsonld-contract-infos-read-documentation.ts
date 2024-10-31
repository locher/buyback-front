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
import { AddressJsonldContractInfosReadDocumentation } from './address-jsonld-contract-infos-read-documentation';
// May contain unused imports in some cases
// @ts-ignore
import { AddressJsonldContractInfosReadDocumentationContext } from './address-jsonld-contract-infos-read-documentation-context';
// May contain unused imports in some cases
// @ts-ignore
import { InfosContractContractCreationDateJsonldContractInfosReadDocumentation } from './infos-contract-contract-creation-date-jsonld-contract-infos-read-documentation';

/**
 * 
 * @export
 * @interface ContractInfosContractJsonldContractInfosReadDocumentation
 */
export interface ContractInfosContractJsonldContractInfosReadDocumentation {
    /**
     * 
     * @type {AddressJsonldContractInfosReadDocumentationContext}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    '@context'?: AddressJsonldContractInfosReadDocumentationContext;
    /**
     * 
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    '@id'?: string;
    /**
     * 
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    '@type'?: string;
    /**
     * 
     * @type {AddressJsonldContractInfosReadDocumentation}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'address'?: AddressJsonldContractInfosReadDocumentation;
    /**
     * Gets id.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'id'?: string | null;
    /**
     * Gets uuid.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'uuid'?: string | null;
    /**
     * Gets contract_number.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'contractNumber'?: string | null;
    /**
     * Gets brand.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'brand'?: string | null;
    /**
     * Gets account_active.
     * @type {boolean}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'accountActive'?: boolean | null;
    /**
     * Gets civility.
     * @type {number}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'civility'?: number | null;
    /**
     * Gets email.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'email'?: string | null;
    /**
     * Gets first_name.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'firstName'?: string | null;
    /**
     * Gets last_name.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'lastName'?: string | null;
    /**
     * Gets language_code.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'languageCode'?: string | null;
    /**
     * Gets id_client.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'idClient'?: string | null;
    /**
     * Gets birth_date.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'birthDate'?: string | null;
    /**
     * 
     * @type {InfosContractContractCreationDateJsonldContractInfosReadDocumentation}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'contractCreationDate'?: InfosContractContractCreationDateJsonldContractInfosReadDocumentation | null;
    /**
     * Gets phone_number.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'phoneNumber'?: string | null;
    /**
     * Gets creation_date.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'creationDate'?: string | null;
    /**
     * Gets package.
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'package'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'generalCondition'?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof ContractInfosContractJsonldContractInfosReadDocumentation
     */
    'contractDocument'?: string;
}
