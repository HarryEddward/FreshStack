export function getIANATimeZone(timeZone?: string): string {
  switch (timeZone) {
    case 'EUROPE_AMSTERDAM': return 'Europe/Amsterdam';
    case 'EUROPE_ANDORRA': return 'Europe/Andorra';
    case 'EUROPE_BELGRADE': return 'Europe/Belgrade';
    case 'EUROPE_BERLIN': return 'Europe/Berlin';
    case 'EUROPE_BRATISLAVA': return 'Europe/Bratislava';
    case 'EUROPE_BRUSSELS': return 'Europe/Brussels';
    case 'EUROPE_BUDAPEST': return 'Europe/Budapest';
    case 'EUROPE_COPENHAGEN': return 'Europe/Copenhagen';
    case 'EUROPE_GIBRALTAR': return 'Europe/Gibraltar';
    case 'EUROPE_LISBON': return 'Europe/Lisbon';
    case 'EUROPE_LJUBLJANA': return 'Europe/Ljubljana';
    case 'EUROPE_LUXEMBOURG': return 'Europe/Luxembourg';
    case 'EUROPE_MADRID': return 'Europe/Madrid';
    case 'EUROPE_MALTA': return 'Europe/Malta';
    case 'EUROPE_MONACO': return 'Europe/Monaco';
    case 'EUROPE_OSLO': return 'Europe/Oslo';
    case 'EUROPE_PARIS': return 'Europe/Paris';
    case 'EUROPE_PODGORICA': return 'Europe/Podgorica';
    case 'EUROPE_PRAGUE': return 'Europe/Prague';
    case 'EUROPE_ROME': return 'Europe/Rome';
    case 'EUROPE_SAN_MARINO': return 'Europe/San_Marino';
    case 'EUROPE_SARAJEVO': return 'Europe/Sarajevo';
    case 'EUROPE_SKOPJE': return 'Europe/Skopje';
    case 'EUROPE_STOCKHOLM': return 'Europe/Stockholm';
    case 'EUROPE_TIRANE': return 'Europe/Tirane';
    case 'EUROPE_VADUZ': return 'Europe/Vaduz';
    case 'EUROPE_VIENNA': return 'Europe/Vienna';
    case 'EUROPE_WARSAW': return 'Europe/Warsaw';
    case 'EUROPE_ZAGREB': return 'Europe/Zagreb';
    case 'EUROPE_ZURICH': return 'Europe/Zurich';
    case 'AFRICA_CEUTA': return 'Africa/Ceuta';
    case 'AFRICA_TUNIS': return 'Africa/Tunis';
    case 'ARCTIC_LONGYEARBYEN': return 'Arctic/Longyearbyen';
    default: return 'Europe/Madrid'; // Default for your primary zone
  }
}