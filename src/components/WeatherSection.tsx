import { useState, useEffect } from "react";
import {
  CloudSun,
  MapPin,
  Wind,
  Droplets,
  CloudRain,
  Compass,
  Thermometer,
  RefreshCw,
  Sun,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useWeather } from "@/hooks/useWeather";

export const WeatherSection = () => {
  const { location, getLocation, loading: geoLoading } = useGeolocation();
  const { weather, fetchWeather } = useWeather();
  const [cityInput, setCityInput] = useState("");
  const [activeCity, setActiveCity] = useState("Hyderabad, Telangana");

  // Fetch initial default weather or user's geolocation
  useEffect(() => {
    // Default coordinates: Central India / Hyderabad
    const lat = location.latitude || 17.385;
    const lon = location.longitude || 78.4867;
    fetchWeather(lat, lon);
  }, [location.latitude, location.longitude, fetchWeather]);

  const handleDetectLocation = () => {
    getLocation();
  };

  const handleCitySelect = async (cityName: string, lat: number, lon: number) => {
    setActiveCity(cityName);
    fetchWeather(lat, lon);
  };

  const temp = weather.temperature || 28;
  const humidity = weather.humidity || 62;
  const wind = weather.wind_speed || 11;
  const forecast = weather.forecast || "Mainly clear";
  const rainfall = weather.rainfall || "Low (< 2mm)";

  return (
    <section id="weather" className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-transparent via-emerald-950/30 to-transparent">
      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading & Advisory */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold tracking-wider uppercase">
              <CloudSun className="w-4 h-4 text-sky-400" />
              <span>Hyperlocal Meteorological Station</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white leading-tight">
              Real-Time Climate <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Telemetry</span>
            </h2>

            <p className="text-base text-emerald-100/70 leading-relaxed">
              Plan planting, spray operations, and irrigation with pinpoint accuracy. Open-Meteo live satellite feeds inform our automated agricultural recommendations.
            </p>

            {/* Quick Location Pills */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-emerald-300/80 uppercase tracking-wider block">
                Popular Agricultural Hubs:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Hyderabad, TS", lat: 17.385, lon: 78.4867 },
                  { name: "Guntur, AP", lat: 16.3067, lon: 80.4365 },
                  { name: "Ludhiana, PB", lat: 30.901, lon: 75.8573 },
                  { name: "Nagpur, MH", lat: 21.1458, lon: 79.0882 },
                  { name: "Indore, MP", lat: 22.7196, lon: 75.8577 },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleCitySelect(c.name, c.lat, c.lon)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      activeCity === c.name
                        ? "bg-sky-500/20 text-sky-200 border-sky-400/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                        : "bg-emerald-950/60 text-emerald-200/70 border-emerald-500/20 hover:text-white hover:border-emerald-500/40"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleDetectLocation}
              disabled={geoLoading}
              variant="outline"
              className="rounded-xl border-emerald-500/30 text-emerald-200 hover:bg-emerald-900/50 gap-2 text-xs"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              {geoLoading ? "Detecting GPS..." : "Detect My Farm GPS"}
            </Button>
          </div>

          {/* Right Column: Live Glassmorphic Weather Dashboard Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-6 md:p-8 bg-emerald-950/50 backdrop-blur-2xl border border-emerald-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(16,185,129,0.15)] overflow-hidden">
              {/* Header inside card */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-emerald-500/15">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400/20 to-emerald-400/20 border border-sky-500/30 flex items-center justify-center shadow-inner">
                    <Sun className="w-6 h-6 text-amber-300 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {location.city ? `${location.city}, ${location.state || ""}` : activeCity}
                    </h3>
                    <p className="text-xs text-emerald-300/70">
                      Live Open-Meteo Satellite Broadcast
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-semibold text-emerald-300">Live Telemetry</span>
                </div>
              </div>

              {/* Main Weather Metric Display */}
              <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl md:text-7xl font-display font-black text-white tracking-tighter">
                    {temp}°
                  </span>
                  <span className="text-2xl font-bold text-sky-300">C</span>
                  <div className="ml-2">
                    <div className="text-sm font-semibold text-white">{forecast}</div>
                    <div className="text-xs text-emerald-200/60">Condition Status</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Agronomic Action Plan</span>
                  </div>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    {temp > 32
                      ? "High daytime heat. Schedule irrigation in early hours before 8 AM to protect crop transpiration."
                      : temp < 18
                      ? "Cooler temperature. Watch for early morning frost and powdery mildew incidence."
                      : "Temperature is ideal for field preparation, foliar spraying, and normal irrigation cycles."}
                  </p>
                </div>
              </div>

              {/* 4 Sensor Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-emerald-500/15">
                <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-emerald-500/15">
                  <div className="flex items-center gap-2 text-sky-400 mb-1">
                    <Droplets className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/70">Humidity</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-white">{humidity}%</div>
                  <span className="text-[10px] text-emerald-200/50">Relative RH</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-emerald-500/15">
                  <div className="flex items-center gap-2 text-teal-400 mb-1">
                    <Wind className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/70">Wind Speed</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-white">{wind} <span className="text-xs">km/h</span></div>
                  <span className="text-[10px] text-emerald-200/50">10m Altitude</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-emerald-500/15">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <CloudRain className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/70">Rain Level</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-white">{rainfall}</div>
                  <span className="text-[10px] text-emerald-200/50">Next 24 Hours</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-900/40 border border-emerald-500/15">
                  <div className="flex items-center gap-2 text-amber-400 mb-1">
                    <Thermometer className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300/70">Soil Temp</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-white">{Math.round(temp * 0.92)}°C</div>
                  <span className="text-[10px] text-emerald-200/50">5cm Depth Est.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherSection;
