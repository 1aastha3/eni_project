// const setThreshold = async (thresholdValue) => {
//   const url = 'http://your-esp8266-ip-address/set-threshold'; // Replace with your ESP8266's IP address and endpoint

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ threshold: thresholdValue }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to set threshold');
//     }

//     // Threshold set successfully
//     console.log('Threshold set successfully');
//   } catch (error) {
//     console.error('Error setting threshold:', error);
//   }
// };


// #include <ESP8266WiFi.h>
// #include <ESPAsyncWebServer.h>

// const char *ssid = "your-ssid";
// const char *password = "your-password";

// AsyncWebServer server(80);

// void setup() {
//   Serial.begin(115200);

//   WiFi.begin(ssid, password);
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(1000);
//     Serial.println("Connecting to WiFi...");
//   }
//   Serial.println("Connected to WiFi");

//   server.on("/set-threshold", HTTP_POST, [](AsyncWebServerRequest *request){
//     String requestBody = request->arg("plain");
//     Serial.println("Received threshold value: " + requestBody);

//     // Process the received threshold value here

//     request->send(200, "text/plain", "Threshold set successfully");
//   });

//   server.begin();
// }

// void loop() {
//   // Your loop code here
// }
