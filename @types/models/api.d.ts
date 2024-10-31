export interface ActivateOfferResponse {
  amount?: any;
  cardNumber?: any;
  offerId?: any;
  offerUuidBappli?: any;
  serviceCode?: any;
  message?: any;
  status?: any;
  url?: any;
  session?: any;
  partner?: any;
}

export interface OfferState {
  offer?: Offer;
  type?: string;
  id?: string;
}

export interface OptionsFetchData {
  infosContract?: boolean;
  advantage?: boolean;
  favoriteGift?: boolean;
  evasion?: boolean;
  historicAdvantages?: boolean;
  packs?: boolean;
  partnerClickAndGift?: boolean;
}

export interface FormErrorRefund {
  status?: number;
  purchaseAmount?: string;
  purchaseDate?: string;
  invoice?: string;
  rib?: string;
  iban?: string;
}

export interface FormErrorLogin {
  code?: number;
  message?: string;
  usernameError?: string;
  passwordError?: string;
}

export interface FormErrorContact {
  subject?: string;
  message?: string;
}

export interface ErrorApi {
  code?: any;
  message?: any;
  errorSmsCode?: any;
}

export interface TypeOffer {
  brand?: any;
  name?: any;
  type?: any;
  attachments?: any;
  amount?: any;
  purchaseAmount?: any;
  purchaseDate?: any;
  amountType?: any;
  currency?: any;
}

export interface CustomerForm {
  data?: any;
}

export interface CustomerFormData {
  email?: string;
  formId?: string;
  nbSteps?: number;
  status?: number;
  steps?: any;
}
