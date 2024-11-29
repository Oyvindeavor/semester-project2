/* eslint-disable */

export interface NoroffApiErrorDetail {
  code: string;
  message: string;
  path: string[];
}

export interface NoroffApiError {
  errors: NoroffApiErrorDetail[];
  status: string;
  statusCode: number;
}
