export interface GeoResponse {
  Geography: Geography;
}

export interface Geography {
  GeographyData: GeographyDatum[];
}

export interface GeographyDatum {
  GeoID?: string;
  GeoName?: string;
  Year: string;
  OceanSectorId?: string;
  OceanSector?: string;
  Establishments?: string;
  Employment?: string;
  Wages?: string;
  GDP?: string;
}

export const cached = <T>(key: string, url: string) => {
  const cache: Record<string, T> = {};

  return async () => {
    if (cache[key]) return cache[key];

    const results = await fetch(url);
    const data: T = await results.json();
    cache[key] = data;
    return data;
  };
};

const defaultApiPath = "http://localhost:3000";

const queryGeo = (baseUrl = defaultApiPath, years: string, geoids: string) =>
  `${baseUrl}?geoids=${geoids}&years=${years}&f=json`;

export const createGeoService = <T>(
  baseUrl = defaultApiPath,
  years: string,
  geoIds: string
) => {
  return cached<T>(years, queryGeo(baseUrl, years, geoIds));
};
