export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface VersionResponse {
  apiversion: string;
  hostname: string;
  'current-time'?: string;
}

export interface Domain {
  domain: string;
  reseller: string;
  description: string;
  'time-zone'?: string;
  'area-code'?: number;
  'caller-id-name'?: string;
  'caller-id-number'?: string;
  'synchronous'?: 'yes' | 'no';
}

export interface User {
  user: string;
  domain: string;
  'name-first-name': string;
  'name-last-name': string;
  'email-address'?: string;
  password?: string;
  'synchronous'?: 'yes' | 'no';
}

export interface CallQueue {
  callqueue: string;
  domain: string;
  description: string;
  'callqueue-dispatch-type'?: string;
  'synchronous'?: 'yes' | 'no';
}

export interface Agent {
  'callqueue-agent-id': string;
  'callqueue-agent-availability-type'?: string;
  'synchronous'?: 'yes' | 'no';
}

export interface Config {
  bearerToken: string;
  server: string;
  baseUrl: string;
  fakeDomain: string;
  fakeReseller: string;
  fakeUser: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  fakeCallQueue: {
    extension: string;
    name: string;
  };
}