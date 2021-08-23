import type { Jwt } from 'jsonwebtoken';
import type { CamelCaseKeys } from '~/util';

export type SFHubPricebookEntry = {
  Id: string;
  Pricebook2Id: string;
  ProductCode: string;
  UnitPrice: number;
  attributes: {
    type: string;
    url: string;
  };
};

export type SFHubProduct = Pick<CamelCaseKeys<SFHubPricebookEntry>, 'productCode' | 'unitPrice'>;

export type SFHubResponse<T, E extends Dict = Dict> = T | SFHubError<E>;

export interface SFHubError<D extends Dict = Dict> {
  error: string;
  message?: string;
  data?: D;
}

export interface SFHubTokenRequest {
  client: string;
  key: string;
}

export interface SFHubEncodedToken {
  token: string;
}

export type SFHubDecodedToken = Required<Pick<Jwt['payload'], 'iss' | 'sub' | 'exp' | 'iat'>> & {
  aud: string;
};

export type SFHubTokenResponse = SFHubEncodedToken | SFHubError;

export function isSFHubError(res: unknown): res is SFHubError {
  if (typeof res === 'object' && res !== null) {
    if ('error' in res || 'message' in res) {
      return true;
    }
  }
  return false;
}

export function isSFHubToken(obj: unknown): obj is SFHubDecodedToken {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'iss' in obj &&
    'sub' in obj &&
    'exp' in obj &&
    'iat' in obj
  );
}
