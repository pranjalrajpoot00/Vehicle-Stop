Problem Statement: Vehicle Stoppage Identification and Visualization
Objective: Develop a React/NextJs webapp that allows users to identify and visualize stoppages on a map.

Inputs:
GPS Data: Real-time or historical GPS data stream containing timestamps and location coordinates for each data point.
Stoppage Threshold: A user-defined time threshold (in minutes) to define a stoppage event. Any period where the vehicle remains stationary for a duration exceeding the threshold will be considered a stoppage.

Outputs:
Map Visualization: The system should display the vehicle's path on a map, highlighting stoppage locations with distinct markers.

Stoppage Information:
Each stoppage marker should display relevant information upon user interaction, including:
Reach Time: The timestamp of when the vehicle reached the stoppage location.
End Time: The timestamp of when the vehicle departed from the stoppage location (if available in real-time data) or the last recorded timestamp for historical data (indicating the vehicle remained stopped until the end of the data).
Stoppage Duration: The calculated duration (in minutes) for which the vehicle remained stopped.

Success Criteria:
The system accurately identifies stoppages based on the user-defined threshold.
Stoppage locations are clearly visualized on the map with distinct markers.
Detailed information about each stoppage (reach time, end time, duration) is readily accessible to the user upon interaction with the marker.
The system performs well with real-time and historical GPS data streams.

https://docs.google.com/spreadsheets/d/1Lro5MJbxHtbjEg4TLuO6qTs5sPYL6DmqbQNJOEtiGPQ/edit#gid=422350783
