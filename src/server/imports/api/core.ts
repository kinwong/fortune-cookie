export interface ICountry {
  code: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface ICurrency {
  code: string;
  name: string;
  symbol: string;
}

export interface IExchange {
  mic: string;
  country: string;
  countryCode: string;
  operatingMic: string;
  marketType: string;
  description: string;
  acronym: string;
  city: string;
  website: string;
  statusDate: string;
  status: string;
  creationDate: string;
  comments: string;
}

export interface ISpot {
  ric: string;
  timestamp: Date;
  value: number;
}

export interface IStrategy {
  name: string;
  description: string;
}
