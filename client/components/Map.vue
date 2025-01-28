<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  locations: Array<{ lat: number; lng: number; name: string }>;
  zoom?: number;
}>();

const mapContainer = ref<HTMLElement | null>(null);
let map: L.Map | null = null;

onMounted(async () => {
  const L = await import("leaflet");
  await import("leaflet/dist/leaflet.css");

  const defaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  L.Marker.prototype.options.icon = defaultIcon;

  if (mapContainer.value) {
    map = L.map(mapContainer.value);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Invetoria",
    }).addTo(map);

    const bounds = L.latLngBounds(
      props.locations.map((location) => [location.lat, location.lng]),
    );
    props.locations.forEach((location) => {
      L.marker([location.lat, location.lng])
        .addTo(map!)
        .bindPopup(location.name)
        .openPopup();
    });

    if (map) {
      map.fitBounds(bounds);
    }
  }
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 25rem;
  border-radius: 0.5rem;
  overflow: hidden;
}
@media screen and (max-height: 1000px) {
  .map-container {
    height: 20rem;
  }
}
@media screen and (max-height: 800px) {
  .map-container {
    height: 15rem;
  }
}
</style>
