// Initialize the map. We'll set the view later once we get the user's location.
var map = L.map('map');

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// --- SIMULATED REAL-TIME MOVEMENT TEST ---

var simulationMarker = null;
var simulationInterval = null;

function startSimulation(startLatLng) {
    console.log("Starting simulation with a longer path from:", startLatLng);

    map.setView(startLatLng, 17);

    if (!simulationMarker) {
        simulationMarker = L.marker(startLatLng, {
            title: "My Simulated Position"
        }).addTo(map);
    }

    // --- THIS IS THE MODIFIED SECTION ---
    // 1. Define a longer, more complex path with 9 offsets (for 10 total points).
    // This will trace a sort of rounded rectangle or stadium shape.
    const pathOffsets = [
        { lat:  0.0003, lng:  0.0000 }, // 1. Move North
        { lat:  0.0002, lng:  0.0003 }, // 2. Move North-East
        { lat:  0.0000, lng:  0.0005 }, // 3. Move East
        { lat: -0.0002, lng:  0.0003 }, // 4. Move South-East
        { lat: -0.0003, lng:  0.0000 }, // 5. Move South
        { lat: -0.0003, lng:  0.0000 }, // 6. Move South again
        { lat: -0.0002, lng: -0.0003 }, // 7. Move South-West
        { lat:  0.0000, lng: -0.0005 }, // 8. Move West
        { lat:  0.0002, lng: -0.0003 }  // 9. Move North-West (brings it near the start to loop)
    ];
    // --- END OF MODIFIED SECTION ---

    // 2. Create the full path of coordinates (this logic is unchanged)
    let currentPos = L.latLng(startLatLng.lat, startLatLng.lng);
    const simulationPath = [currentPos];
    pathOffsets.forEach(offset => {
        let nextPos = L.latLng(currentPos.lat + offset.lat, currentPos.lng + offset.lng);
        simulationPath.push(nextPos);
        currentPos = nextPos;
    });

    let pathIndex = 0;

    // 3. Start an interval to update the marker position (this logic is unchanged)
    if (simulationInterval) clearInterval(simulationInterval); // Clear any old interval
    
    simulationInterval = setInterval(function() {
        pathIndex++;
        if (pathIndex >= simulationPath.length) {
            pathIndex = 0;
        }

        const nextCoord = simulationPath[pathIndex];
        simulationMarker.setLatLng(nextCoord);
        
        const popupContent = `
            <b>Simulated Position #${pathIndex + 1}</b><br>
            Lat: ${nextCoord.lat.toFixed(5)}<br>
            Lng: ${nextCoord.lng.toFixed(5)}
        `;
        simulationMarker.bindPopup(popupContent).openPopup();

    }, 1500); // Update every 1.5 seconds
}

// Function to handle location found event (unchanged)
function onLocationFound(e) {
    map.stopLocate();
    startSimulation(e.latlng);
}

// Function to handle location error (unchanged)
function onLocationError(e) {
    alert("Location access denied. The simulation cannot start. Using Lahore as a fallback.");
    const fallbackLatLng = L.latLng(31.5204, 74.3587);
    startSimulation(fallbackLatLng);
}

// Add event listeners (unchanged)
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// Request the user's location to start (unchanged)
console.log("Requesting user location to begin simulation...");
map.locate({
    setView: false,
    watch: false,
    maxZoom: 16,
    enableHighAccuracy: true
});