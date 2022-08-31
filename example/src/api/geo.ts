import { createGeoService, GeoResponse } from "~/components/visualizer/service";
import type { Handler, Request } from "lasso";

type GeoParams = {
  years: string;
  geoids: string;
};

export type GeoRequest = Request<{
  Querystring: GeoParams;
}>;

const GeoHandler: Handler = (server, route) => {
  server.get(route, async (_: GeoRequest, reply) => {
    const service = createGeoService<GeoResponse>(
      "https://coast.noaa.gov/api/services/enow/v1/getenowdatafor",
      _.query.years,
      _.query.geoids
    );

    const results = await service();

    reply.send(results.Geography.GeographyData);
  });
};

export default GeoHandler;
