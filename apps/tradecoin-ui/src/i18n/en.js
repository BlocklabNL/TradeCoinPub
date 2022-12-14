export const en = {
    loading: 'Loading',
    siteTitle: 'NaviPorta',
    dashboard: 'Dashboard',
    home: 'Home',
    logout: 'Log Out',
    shipments: 'Shipments',
    bookings: 'Bookings',
    billing: 'Billing',
    more: 'More',
    activeShipments: 'Active Shipments',
    allShipments: 'All Shipments',
    shipmentDetails: 'Shipment Details',
    shipmentId: 'Shipment ID',
    currentStatus: 'Current Status',
    vesselName: 'Vessel Name',
    actualVesselName: 'Actual Vessel Name',
    documents: 'Documents',
    services: 'Services',
    details: 'Details',
    success: 'Success',
    failure: 'Failure',
    inTime: 'According to schedule',
    currentLocation: 'Last Known Location',
    delayed: 'Discrepancy',
    delivered: 'Delivered',
    notDelivered: 'Not Delivered',
    retrievingFromBlockchain: 'Retrieving information from blockchain',
    mySif: 'Mijn SIF',
    factures: 'Facturen',
    debitors: 'Debiteuren',
    arrivesInTime: 'Arrives in time',
    discrepancyDescription: 'There is a difference between estimated and actual time of arrival! Or maybe some other significant reason.',
    ata: 'ATA',
    eta: 'ETA',
    etaAis: 'ETA (based on AIS)',
    sea: 'Sea shipping',
    inland: 'Inland shipping',
    warehouse: 'Warehouse',
    showAll: 'Show all',
    moreDetails: 'See more details',
    departure: 'Departure',
    arrival: 'Arrival',
    totalAssets: 'Total Assets',
    runReplay: 'Run Replay',
    sif: 'SIF (ABN Amro)',
    currentDestination: 'Current Destination:',
    nextDestination: 'Next Destination',
    trackPoints: 'Track Points',
    voyage: 'Voyage',
    buildingAssetsMap: 'Building Assets Map',
    dataIsVerified: 'Data is verified',
    dataVerificationFailed: 'Data verification failed',
    dataHash: 'Data Hash',
    owner: 'Owner',
    source: 'Source',
    notary: 'Notary',
    hide: 'Hide',
    show: 'Show',
    assetsMap: 'Assets Map',
    play: 'Play',
    pause: 'Pause',
    stop: 'Stop',
    table: 'Table',
    json: 'JSON',
    from: 'From',
    to: 'To',
    cookiesMessage: 'We use cookies to enhance the user experience.',
    ok: 'Okay',
    returnToHome: 'Return to Home',
    notAuthorized: 'Your account is not authorized to view this page!',
    copyrightFooter: 'NaviPorta. All rights reserved. Version',
  
    bookingRequest: 'Booking Request',
    bookingConfirmation: 'Booking Confirmation',
    bookingRequestConfirmation: 'Booking Request Confirmation',
    houseBL: 'House Bill of Lading',
    iotData: 'IoT Data',
    iotAisData: 'IoT/AIS Data',
    ecmr: 'eCMR',
    prontoAsset: 'Pronto asset',
    deliveryOrder: 'Delivery Order',
    proofOfDelivery: 'Proof of Delivery',
    certificateOfOrigin: 'Certificate of Origin',
    certificateOfQuality: 'Certificate of Quality',
    certificateOfAnalysis: 'Certificate of Analysis',
    certificateOfHealth: 'Health Certificate',
    certificateOfIngridientsComposition: 'Certificate of Ingridients Composition',
    unknown: 'Unknown',
    deliverOracle: 'Deliver Oracle',
    deliverNotary: 'Deliver Notary',
    negotiableBL: 'TradeTrust Bill of Lading',
    filterBy: 'Filter by',
    ethConnected: 'You are connected to the Ethereum network',
    ethNotConnected: 'You are not connected to the Ethereum network',
  
    'issue-temprerature': 'Condition alert: \nInappropriate temperature in the container',
    'issue-wrongRoute': 'Location alert: \nContainer left pre-defined location',
    'issue-doorOpen': 'Sensor alert: \nDoor may be opened',
    'issue-delayed': 'Ship will arrive later',
  
    negotiableBLIsValid: 'The document is valid.',
    negotiableBLIsInvalid: 'The document is invalid.',
    
  };
  
  export default en;
  
  export const t = (alias) => (en[alias] || alias);
  
  export const i18n = {
    changeLanguage: () => {},
  };
  
  export const dateFormat = 'dd MMM yyyy';
  export const dateTimeFormat = 'dd MMM yyyy HH:mm';