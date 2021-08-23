import jwt from 'jsonwebtoken';
import queryString from 'query-string';
import { camelCaseObj } from '~/util';
import { isSFHubError, isSFHubToken } from '~/types';

import type {
  SFHubResponse,
  SFHubDecodedToken,
  SFHubTokenRequest,
  SFHubTokenResponse,
  SFHubPricebookEntry,
  SFHubProduct,
} from '~/types';

const PATHS = {
  requestToken: '/auth/token/request/',
  productCodes: '/sfdc/pricebookentries/',
};

/**
 * Interact with Stellar's SFHub Application.
 *
 * @see https://github.com/stellaraf/sfhub
 */
export class SFHub {
  /**
   * SFHub API paths.
   */
  private readonly paths: typeof PATHS = PATHS;

  /**
   * SFHub Base URL. In development the TLD should be '.af', i.e. 'stellar.af'. In production, the
   * TLD should be '.tech', i.e. 'stellar.tech'.
   */
  private readonly baseUrl: string;

  /**
   * SFHub Client ID.
   */
  private readonly clientId: 'https://stellar.tech' = 'https://stellar.tech';

  /**
   * JSON Web Token (JWT), if initialized.
   */
  private token: SFHubDecodedToken | null = null;

  /**
   * Encoded JWT, if initialized. Used in the Authorization header.
   */
  private encodedToken: string | null = null;

  constructor() {
    const tld = process.env.NODE_ENV === 'production' ? 'tech' : 'af';
    this.baseUrl = `https://sfhub.stellar.${tld}`;
  }

  /**
   * Construct a full URL **with a trailing slash** from `paths`.
   *
   * @param paths URL paths from which to construct a full URL path.
   */
  private url(...paths: string[]): string {
    let parts = [] as string[];
    for (const path of paths) {
      parts = [...parts, ...path.split('/').filter(p => p)];
    }
    return [this.baseUrl, ...parts, ''].join('/');
  }

  /**
   * Determine if the current authentication token is valid.
   */
  private get tokenIsValid(): boolean {
    if (this.token !== null) {
      // Subtract 15 seconds from the validity to account for race conditions during fetching.
      const nowIsh = Date.now() - 15_000;
      return nowIsh >= this.token.exp * 1000;
    }
    return false;
  }

  /**
   * Request a new authentication token from SFHub.
   */
  private async getNewToken(): Promise<void> {
    const client = this.clientId;
    const key = process.env.SFHUB_AUTH_TOKEN_REQUEST_KEY;
    if (typeof key !== 'string' || key === '') {
      throw new Error('SFHub token request key is missing from environment variables');
    }

    const body = JSON.stringify({ client, key } as SFHubTokenRequest);
    const headers = new Headers({ 'content-type': 'application/json' });
    const res = await fetch(this.url(this.paths.requestToken), { method: 'POST', body, headers });
    const data = (await res.json()) as SFHubTokenResponse;

    if (isSFHubError(data)) {
      throw new Error(data.error || data.message);
    }
    const decoded = jwt.decode(data.token);
    if (!isSFHubToken(decoded)) {
      throw new Error(`Decoded token is improperly formatted: '${data.token}'`);
    }
    this.encodedToken = data.token;
    this.token = decoded;
  }

  /**
   * Emulate `window.fetch`, but add authentication headers to all requests.
   */
  private async authenticatedFetch(input: RequestInfo, init: RequestInit = {}): Promise<Response> {
    if (this.encodedToken === null) {
      await this.getNewToken();
      if (this.encodedToken === null) {
        throw new Error('Unable to retrieve SFHub access token');
      }
    }
    const { headers: initHeaders, ...initRest } = init;
    const headers = new Headers(initHeaders);
    headers.set('Authorization', this.encodedToken);
    return await fetch(input, { headers, ...initRest });
  }

  /**
   * Get product details from SFHub.
   *
   * @param products Salesforce Product Codes/SKUs.
   */
  public async getProductDetails(...products: string[]): Promise<SFHubProduct[]> {
    if (!this.tokenIsValid) {
      await this.getNewToken();
    }

    const productCodes = products
      .map(p => p.trim())
      .filter(p => p)
      .join(',');

    const url = queryString.stringifyUrl({
      url: this.url(this.paths.productCodes),
      query: { productCodes },
    });

    const res = await this.authenticatedFetch(url);
    const data = (await res.json()) as SFHubResponse<SFHubPricebookEntry[]>;

    if (isSFHubError(data)) {
      throw new Error(data.error);
    }

    return data
      .map(({ UnitPrice, ProductCode }) => ({ ProductCode, UnitPrice }))
      .map(d => camelCaseObj(d)) as SFHubProduct[];
  }
}
