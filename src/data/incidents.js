export const INCIDENTS = [
  {
    id: 'bank-job',
    caseNo: '4412',
    title: 'THE PALMETTO WITHDRAWAL',
    location: 'Downtown vault · Costa Luma',
    image: '/cases/bankrobbing.png',
    description:
      'heist still: rifles up, vault cracked, cash bags walking. Identify the shooter who emptied the branch.',
    officerQuote: 'If the vault still fits in the JPEG, you have not found the thief.',
    subject: 'HEIST GUNMAN',
    charge: 'ARMED BANK RAID · WANTED LEVEL MAX',
    radioLines: {
      WANTED: 'APB: the one filling the JPEG walked the vault. Bags first, then the face.',
      IDENTIFIED: 'Positive ID. Desk 4 scoped the raid down to a gunman. Print the poster.',
      'POSSIBLE SUSPECT': 'Could be the rifle. Could be the bag. Scope the raid, not the lobby.',
      'INSUFFICIENT EVIDENCE': "That's a whole bank mission, Desk 4. Pick the shooter.",
      DENIED: 'You submitted the branch. Do your job.',
    },
  },
  {
    id: 'train-blast',
    caseNo: '7701',
    title: 'YARDSIDE FIREWORKS',
    location: 'Freight spur · yard 51',
    image: '/cases/trainblast.jpg',
    description:
      'Mission still: beige suit, rifle, locomotive cooking on the rails. He lit the train and walked the blast like a schedule.',
    officerQuote: 'If the explosion is still the star, you failed.',
    subject: 'SUIT ON THE RAILS',
    charge: 'TRAIN BOMBING · FLIGHT FROM THE BLAST',
    radioLines: {
      WANTED: 'APB: the man who detonated the freight. Bring a wanted star, not a hose.',
      IDENTIFIED: 'We have a frame. That is legally a confession on this blotter.',
      'POSSIBLE SUSPECT': 'Too much locomotive. Scope the guy, not the fireball.',
      'INSUFFICIENT EVIDENCE': "That's a whole yard mission. Tighter.",
      DENIED: 'You sent the whole explosion. Try again, Desk 4.',
    },
  },
  {
    id: 'dock-getaway',
    caseNo: '0909',
    title: 'DOCKSIDE EXIT WOUNDS',
    location: 'Bolero Pier · south slips',
    image: '/cases/poster-wallpaper.jpg',
    description:
      'Getaway still: two shooters, one briefcase, police boat eating wake, chopper inbound. They shot their way off the dock. Scope who pulled first.',
    officerQuote: 'We do not chase the boat. We Scope the trigger finger.',
    subject: 'GETAWAY PAIR',
    charge: 'ARMED FLIGHT · FELONY BOAT EXIT',
    radioLines: {
      WANTED: 'APB: two in the JPEG, one bag, chopper inbound. Print whoever fills the frame.',
      IDENTIFIED: 'Positive ID: the shooter who still fits. Mayor will love this wanted poster.',
      'POSSIBLE SUSPECT': 'Could be him. Could be her. Scope harder.',
      'INSUFFICIENT EVIDENCE': "That's a whole shootout mission, Desk 4. Pick a shooter.",
      DENIED: 'You submitted the whole waterfront. Do your job.',
    },
  },
  {
    id: 'city-sightseeing',
    caseNo: '3310',
    title: 'WAIT FOR THE BOOM',
    location: 'Overpass 12724 · downtown lookout',
    image: '/cases/desktop-wallpapaer.jpg',
    description:
      'He is not sightseeing. Duffel on the shoulder, skyline in front of him, timer already running. This still is him waiting for the downtown blast to go off.',
    officerQuote: 'If the city still fits, you missed the man who packed the boom.',
    subject: 'BLAST LOOKOUT',
    charge: 'STANDING BY FOR DETONATION',
    radioLines: {
      WANTED: 'APB: lookout on 12724, duffel, waiting on the blast. Scope him before the skyline cooks.',
      IDENTIFIED: 'We got the back of the bomber. Close enough for Costa Luma.',
      'POSSIBLE SUSPECT': 'Still seeing too much downtown. Scope the lookout, not the view.',
      'INSUFFICIENT EVIDENCE': "That's a postcard of a city about to pop, Desk 4. Pick the guy with the bag.",
      DENIED: 'You sent the whole skyline. The crime is the wait. Scope.',
    },
  },
];

export function customIncident(src, fileName) {
  return {
    id: `custom-${Date.now()}`,
    caseNo: String(4000 + Math.floor(Math.random() * 5999)),
    title: 'SMUGGLED EVIDENCE',
    location: 'Unknown · Costa Luma',
    image: src,
    description: fileName
      ? `Desk 4 accepted ${fileName}. The department will believe the Scope.`
      : 'Desk 4 accepted a civilian JPEG. The Scope is still the arrest.',
    officerQuote: "We don't do witnesses. We do JPEGs.",
    subject: 'UNKNOWN SUBJECT',
    charge: 'CRIMES AGAINST THE JPEG',
    radioLines: {
      WANTED: 'Unknown subject, known Scope. Print it.',
      IDENTIFIED: 'Whatever is in that frame is guilty. Policy.',
      'POSSIBLE SUSPECT': 'Could be anyone. Scope like you have a favorite.',
      'INSUFFICIENT EVIDENCE': "That's the whole picture, Desk 4.",
      DENIED: 'You submitted the original. Do your job.',
    },
  };
}
