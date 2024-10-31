export interface UserInfo {
  iat: number;
  exp: number;
  roles: string[];
  username: string;
  id: number;
  firstName: string;
  lastName: string;
  enabled: boolean;
  languageCode: string;
  countryCode: string;
  originalUsernameFromSubstitution: string;
  phone: string;
  brand: string;
  currentContract: CurrentContract;
  countContract: number;
  contracts: Contract[];
}

export interface CurrentContract {
  email: string;
  brand: string;
  contractNumber: string;
  phoneNumber: string;
  firstname: string;
  lastname: string;
  countActiveContract: number;
  package: string;
  creationDate: string;
}

export interface Contract {
  number: string;
  brand: string;
  type: string;
  enabled: boolean;
  externalId: string;
  locked: boolean;
}
