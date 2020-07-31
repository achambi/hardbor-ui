import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {
  /**
   * Constructor
   * @param http contains HTTP Client
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Map of protocols for API endpoints.
   */
  public static PROTOCOL = {
    HTTP: 'http://',
    HTTPS: 'https://'
  };

  /**
   * Map of contexts for API endpoints.
   */
  private static CONTEXT = '/';
  private static AUTH_CONTEXT = '/login';

  public static getEndpoint(url: string): string {
    const { enableSSL, API_URL } = environment;
    const protocol = enableSSL ? ApiEndpointService.PROTOCOL.HTTPS : ApiEndpointService.PROTOCOL.HTTP;
    const context = this.isAuthEndpoint(url) ? '' : ApiEndpointService.CONTEXT;
    return `${protocol}${API_URL}${context}${url}`;
  }

  public static isAuthEndpoint(url: string = ''): boolean {
    return url.toLowerCase().indexOf(ApiEndpointService.AUTH_CONTEXT) > -1;
  }

  public static isApiEndpoint(url: string = ''): boolean {
    return url.toLowerCase().indexOf(ApiEndpointService.CONTEXT) > -1;
  }
}
