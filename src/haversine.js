export function haversineDistance(coord1, coord2, options = {}) {
    const R = options.unit === 'mi' ? 3960 : 6371;

    const [lat1, lon1] = coord1.map(Number);
    const [lat2, lon2] = coord2.map(Number);

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return Math.ceil(distance);
}
