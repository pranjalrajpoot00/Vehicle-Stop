import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Stroke, Fill, Circle as CircleStyle } from "ol/style";

const MapComponent = () => {
    const mapRef = useRef(null);
  const [data, setData] = useState([]);
  const [stoppageThreshold, setStoppageThreshold] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/data.json");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!mapRef.current || data.length === 0) return;

    const stoppageLocations = [];
    let stoppageStartTime = null;
    let stoppageEndTime = null;
    for (let i = 0; i < data.length; i++) {
      const curr = data[i];
      if (curr.speed === 0) {
        if (!stoppageStartTime) {
          stoppageStartTime = curr.eventGeneratedTime;
        }
      } else {
        if (stoppageStartTime) {
          stoppageEndTime = curr.eventGeneratedTime;
          const stoppageDuration =
            (stoppageEndTime - stoppageStartTime) / (1000 * 60);
          if (stoppageDuration >= stoppageThreshold) {
            const stoppage = {
              latitude: curr.latitude,
              longitude: curr.longitude,
              startTime: stoppageStartTime,
              endTime: stoppageEndTime,
              duration: stoppageDuration,
            };
            stoppageLocations.push(stoppage);
          }
          stoppageStartTime = null;
        }
      }
    }

    if (stoppageStartTime) {
      const lastDataPoint = data[data.length - 1];
      stoppageEndTime = lastDataPoint.eventGeneratedTime;
      const stoppageDuration =
        (stoppageEndTime - stoppageStartTime) / (1000 * 60);
      if (stoppageDuration >= stoppageThreshold) {
        const stoppage = {
          latitude: lastDataPoint.latitude,
          longitude: lastDataPoint.longitude,
          startTime: stoppageStartTime,
          endTime: stoppageEndTime,
          duration: stoppageDuration,
        };
        stoppageLocations.push(stoppage);
      }
    }

    const pathCoordinates = data.map((data) =>
      fromLonLat([data.longitude, data.latitude])
    );
    const lineString = new LineString(pathCoordinates);
    const lineFeature = new Feature({
      geometry: lineString,
    });
    lineFeature.setStyle(
      new Style({
        stroke: new Stroke({
          color: "black",
          width: 2,
        }),
      })
    );
    const pathLayer = new VectorLayer({
      source: new VectorSource({
        features: [lineFeature],
      }),
    });


    const stoppageMarkers = stoppageLocations.map((stoppage, index) => {
      
      const stoppageMarker = new Feature({
        geometry: new Point(
          fromLonLat([stoppage.longitude, stoppage.latitude])
        ),
        stoppageData: stoppage,
      });
      stoppageMarker.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 6,
            stroke: new Stroke({
              color: "red",
              width: 2,
            }),
            fill: new Fill({
              color: "red",
            }),
          }),
        })
      );
      return stoppageMarker;
    });

    const stoppageLayer = new VectorLayer({
      source: new VectorSource({
        features: stoppageMarkers,
      }),
    });

    mapRef.current.addEventListener("click", (event) => {
      map.forEachFeatureAtPixel(map.getEventPixel(event), (feature) => {
        const stoppageData = feature.get("stoppageData");
        if (stoppageData) {
          const reachTime = new Date(stoppageData.startTime).toLocaleString();
          const endTime = new Date(stoppageData.endTime).toLocaleString();
          const stoppageDuration = stoppageData.duration;

        alert(
            `Reach Time: ${reachTime}\nEnd Time: ${endTime}\nStoppage Duration: ${stoppageDuration.toFixed(2)} minutes`
          );
        }
      });
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        pathLayer,
        stoppageLayer,
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    const extent = pathLayer
      .getSource()
      .getExtent()
      .concat(stoppageLayer.getSource().getExtent());
    map.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 20 });

    return () => map.setTarget(null);
  }, [data, stoppageThreshold]);

  const handleThresholdValue = (e) => {
    setStoppageThreshold(parseInt(e.target.value, 10));
  };

  return (
    <>
      <div className="userDefinedThreshold">
        <label htmlFor="threshold">
          Stoppage Threshold
          (in minutes):
        </label>
        <input
          id="threshold"
          type="number"
          min={0}
          value={stoppageThreshold}
          onChange={handleThresholdValue}
        />
      </div>
      <div ref={mapRef} className="mapContainer">
      </div>
    </>
  );

}
export default MapComponent;