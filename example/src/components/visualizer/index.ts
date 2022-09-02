import {
  stateless,
  useEffect,
  useState,
  map,
  style,
  type FC,
} from "@rodeostar/lasso";
import { computeBarChart } from "./chart";
import { createGeoService, GeographyDatum } from "./service";

const years = [...new Array(14)]
  .map((_, i) => (new Date().getFullYear() - i).toString())
  .join();

const service = createGeoService<GeographyDatum[]>("/api/geo", years, "45019");

export const GeoRow: FC<GeographyDatum> = stateless(({ props, html }) => {
  return html`<li>
    ${Object.entries(props || {})
      .map((e) => e.join(":"))
      .join("")}
  </li>`;
});

const GeoPoint: FC<number[]> = stateless(({ props, html, css }) => {
  return html`<span
    class=${css("bg-white")}
    style=${style({
      position: "absolute",
      left: `${props[0]}px`,
      bottom: `${props[1]}px`,
      background: "white",
      "border-radius": "50%",
      width: "3px",
      height: "3px",
    })}
  ></span>`;
});

export const Visualizer: FC = () => {
  const [geo, setGeo] = useState<GeographyDatum[]>(null);
  useEffect(() => {
    setGeo(service);
  }, [geo]);

  return ({ html }) => {
    const values = computeBarChart(geo(), [
      (item) => parseInt(item.Year),
      (item) => parseInt(item.GDP),
    ]);

    const isLoading = values?.plot == null;

    const renderChart = () => (!isLoading ? map(GeoPoint, values.plot) : null);

    return html`<lib-chart
      style=${style({
        display: "block",
        position: "relative",
        width: `${values?.width || 0}px`,
        height: `${values?.height || 0}px`,
      })}
    >
      ${isLoading ? "Loading..." : ""} ${renderChart()}
    </lib-chart>`;
  };
};
