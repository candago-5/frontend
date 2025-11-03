export type LatLng = { lat: number; lng: number };
const cache = new Map<string, string>();

async function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

function shortAddressFromOSM(json: any, lat: number, lng: number) {
  const addr = json?.address || {};

  const house = addr.house_number || addr.housenumber || '';
  const road =
    addr.road ||
    addr.street ||
    addr.pedestrian ||
    addr.residential ||
    addr.neighbourhood ||
    '';
  const bairro = addr.neighbourhood || addr.suburb || addr.city_district || '';
  const postcode = addr.postcode || '';
  const city = addr.city || addr.town || addr.village || addr.hamlet || addr.county || '';
  const state = addr.state || addr.region || addr.state_district || '';

  // linha 1: "Rua, número - bairro"
  let line1 = '';
  if (road) line1 = house ? `${road}, ${house}` : road;
  if (line1 && bairro) line1 = `${line1} - ${bairro}`;
  else if (!line1 && bairro) line1 = bairro;

  // linha 2: "CEP Cidade - Estado"
  let line2 = '';
  const cityState = [city, state].filter(Boolean).join(' - ');
  if (postcode) line2 = `${postcode}${cityState ? ' ' : ''}${cityState}`;
  else if (cityState) line2 = cityState;

  if (line1 && line2) return `${line1}\n${line2}`;
  if (line1) return line1;
  if (line2) return line2;
  if (json?.display_name) return String(json.display_name).split(',').slice(0, 3).join(', ');
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const key = `${lat.toFixed(6)},${lng.toFixed(6)}`;
  if (cache.has(key)) return cache.get(key)!;

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`;
  try {
    // small delay to be polite with public Nominatim
    await sleep(250);
    const res = await fetch(url, {
      headers: { 'User-Agent': 'ABP-frontend/1.0 (contact@yourdomain.com)' },
    });
    if (!res.ok) throw new Error('geocode-fail');
    const json = await res.json();
    const short = shortAddressFromOSM(json, lat, lng);
    cache.set(key, short);
    return short;
  } catch (e) {
    const fallback = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    cache.set(key, fallback);
    return fallback;
  }
}

export async function reverseGeocodeBatch(coords: LatLng[]): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  const unique = Array.from(new Map(coords.map(c => [`${c.lat.toFixed(6)},${c.lng.toFixed(6)}`, c])).values());
  for (const c of unique) {
    const key = `${c.lat.toFixed(6)},${c.lng.toFixed(6)}`;
    out[key] = await reverseGeocode(c.lat, c.lng);
  }
  return out;
}