import React from "react";
import MapComponent from "./components/MapComponent";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="containerHeading">
        Vehicle Stoppage Identification and Visualization
      </h1>
      <MapComponent className="mapContainer" />
      

      <div class="vehicle-stoppage-visualization">
        <h1>Vehicle Stoppage Visualization</h1>

        <div class="section">
          <h2>Introduction</h2>
          <p>
            This web application is designed to detect and display vehicle
            stoppage events using GPS data. The application provides an
            interactive means of examining vehicle movement, marking periods
            where the vehicle remains stationary beyond a user-specified time
            limit.
          </p>
        </div>

        <div class="section">
          <h2>Inputs</h2>
          <ul>
            <li>
              <strong>GPS Data:</strong> The application handles both live and
              historical GPS data streams, which include timestamps,
              coordinates, speed, and odometer readings.
            </li>
            <li>
              <strong>Stoppage Time Limit:</strong> A configurable time limit
              (in minutes) set by the user to identify stoppage events. If the
              vehicle stays still for more than this period, it is recorded as a
              stoppage.
            </li>
          </ul>
        </div>

        <div class="section">
          <h2>Outputs</h2>
          <h3>Map Display</h3>
          <p>
            The vehicle's route is plotted on a map, with stoppage points marked
            distinctly. Red color is used for each stoppage marker to
            clearly visualize different stoppage.
          </p>

          <h3>Stoppage Details</h3>
          <p>
            When a user clicks on a stoppage marker, detailed information about
            that stoppage is shown, including:
          </p>
          <ul>
            <li>
              <strong>Arrival Time:</strong> The timestamp when the vehicle
              reached the stoppage location.
            </li>
            <li>
              <strong>Departure Time:</strong> The timestamp when the vehicle
              left the stoppage location (if available in real-time data) or the
              last known timestamp for historical data.
            </li>
            <li>
              <strong>Stoppage Length:</strong> The duration (in minutes) for
              which the vehicle was stationary.
            </li>
          </ul>
        </div>

        <div class="section">
          <h2>Features</h2>
          <ul>
            <li>
              <strong>Custom Time Limit:</strong> Users can define what
              constitutes a stoppage by setting a custom time limit, which can
              be adjusted using a slider for convenience.
            </li>
            <li>
              <strong>Interactive Map:</strong> The map allows users to click on
              stoppage markers to view detailed information about each stoppage
              event.
            </li>
            <li>
              <strong>Dynamic Updates:</strong> The map and stoppage markers are
              dynamically updated based on the user-defined time limit.
            </li>
            <li>
              <strong>Color-coded Markers:</strong> Stoppage markers are
              red coloured for easy distinction, with each marker representing a
              unique stoppage event.
            </li>
          </ul>
        </div>

        <div class="section">
          <h2>Technologies Utilized</h2>
          <ul>
            <li>
              <strong>React:</strong> A JavaScript library for constructing user
              interfaces.
            </li>
            <li>
              <strong>OpenLayers:</strong> A robust mapping library used to
              display maps and interact with geographical data.
            </li>
            <li>
              <strong>JavaScript:</strong> Utilized for data processing and
              interactive functionalities.
            </li>
            <li>
              <strong>HTML/CSS:</strong> For structuring and styling the
              application.
            </li>
          </ul>
        </div>

        <div class="section">
          <h2>Implementation Details</h2>
          <ul>
            <li>
              <strong>Data Retrieval:</strong> The application retrieves GPS
              data from a specified source (such as an API endpoint or a JSON
              file) and stores it in the application state.
            </li>
            <li>
              <strong>Data Processing:</strong> The GPS data is processed to
              detect stoppage events based on the user-defined time limit. The
              duration of each stoppage and the start and end times are
              calculated.
            </li>
            <li>
              <strong>Map Display:</strong> The vehicle's route is displayed on
              a map using a polyline, with stoppage points highlighted by
              distinct markers. Each marker is clickable, showing detailed
              stoppage information.
            </li>
            <li>
              <strong>Threshold-based Updates:</strong> The application updates
              the visualization based on the user-defined time limit. Adjusting
              the time limit recalculates the stoppage events and refreshes the
              map.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
