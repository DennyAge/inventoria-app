<template>
  <div
    ref="mapContainer"
    class="w-full h-[15rem] md:h-[15rem] lg:h-[25rem] rounded-md"
  ></div>
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

<style scoped></style>
