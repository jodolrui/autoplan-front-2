import { RecordBase } from "./data-interfaces";

const root = [
  {
    __designKey: "root",
    __id: "root",
    __parentId: "-",
    __order: 0,
    __breadcrumb: "Root",
    name: { value: "Root" },
  },
];

const sites = [
  {
    __designKey: "site",
    __id: "16dcd0-f5f8-4052-a569-b2e729ab1949",
    __parentId: "root",
    __order: 0,
    __breadcrumb: "Establecimiento",
    name: { value: "ST Benimaclet" },
    address: { value: "Camino de Moncada s/n" },
    zipCode: { value: "46123" },
    locality: { value: "Valencia" },
    province: { value: "Valencia" },
    latitudeSide: { value: "Norte" },
    latitudeDegrees: { value: null },
    latitudeMinutes: { value: null },
    latitudeSeconds: { value: null },
    latitudeDecimals: { value: null },
    longitudeSide: { value: null },
    longitudeDegrees: { value: null },
    longitudeMinutes: { value: null },
    longitudeSeconds: { value: null },
    longitudeDecimals: { value: null },
  },
];

const coordinates = [
  {
    __designKey: "coordinates",
    __id: "86d498d0-7b2b-4a67-8003-b1792e1a939d",
    __parentId: "16dcd0-f5f8-4052-a569-b2e729ab1949",
    __order: 0,
    __breadcrumb: "Coordenadas",
    latitudeSide: { value: "Norte" },
    latitudeDegrees: { value: 38 },
    latitudeMinutes: { value: 45 },
    latitudeSeconds: { value: 2 },
    latitudeDecimals: { value: 3 },
    longitudeSide: { value: "Oeste" },
    longitudeDegrees: { value: 37 },
    longitudeMinutes: { value: 59 },
    longitudeSeconds: { value: 12 },
    longitudeDecimals: { value: 5 },
  },
];

const buildings = [
  {
    __designKey: "building",
    __id: "082f48-439c-11ec-81d3-0242ac130003",
    __parentId: "16dcd0-f5f8-4052-a569-b2e729ab1949",
    __order: 0,
    __breadcrumb: "Edificio Principal",
    name: { value: "Edificio principal" },
  },
  {
    __designKey: "building",
    __id: "ae0f01-79ea-4629-a9ed-1592f92a41c5",
    __parentId: "16dcd0-f5f8-4052-a569-b2e729ab1949",
    __order: 1,
    __breadcrumb: "Edificio de Celdas",
    name: { value: "Edificio de celdas" },
  },
];

const buildingExits = [
  {
    __designKey: "buildingExit",
    __id: "26df5e3b-6f61-423c-9d0c-ee9da3cfe156",
    __parentId: "082f48-439c-11ec-81d3-0242ac130003",
    __order: 0,
    __breadcrumb: "Salida de edificio 1",
    number: { value: 1 },
    to: { value: "Exterior" },
    isForEmergencyUseOnly: { value: false },
    width: { value: 1, units: "m" },
  },
];

const floors = [
  {
    __designKey: "floor",
    __id: "6c3fd9-145a-465d-bd56-29897e488e6b",
    __parentId: "082f48-439c-11ec-81d3-0242ac130003",
    __order: 0,
    __breadcrumb: "Sótano",
    name: { value: "Sótano" },
    abbreviation: { value: "S" },
    order: { value: -1 },
    use: { value: null },
    constructedArea: { value: 100, units: "m2" },
    evacuationHeight: { value: -3, units: "m" },
    isUnderground: { value: true },
    edit: { value: true },
  },
  {
    __designKey: "floor",
    __id: "e0c9e6-a7f0-4655-8010-c719d7151b85",
    __parentId: "082f48-439c-11ec-81d3-0242ac130003",
    __order: 1,
    __breadcrumb: "Planta baja",
    name: { value: "Planta baja" },
    abbreviation: { value: "PB" },
    order: { value: 0 },
    use: { value: null },
    constructedArea: { value: 100, units: "m2" },
    evacuationHeight: { value: 0, units: "m" },
    isUnderground: { value: false },
    edit: { value: true },
  },
  {
    __designKey: "floor",
    __id: "66a676-c52c-4619-acc0-1f3b1f184318",
    __parentId: "082f48-439c-11ec-81d3-0242ac130003",
    __order: 2,
    __breadcrumb: "Planta primera",
    name: { value: "Planta primera" },
    abbreviation: { value: "P1" },
    order: { value: 1 },
    use: { value: null },
    constructedArea: { value: 100, units: "m2" },
    evacuationHeight: { value: 3, units: "m" },
    isUnderground: { value: false },
    edit: { value: true },
  },
  {
    __designKey: "floor",
    __id: "f3245c-439b-11ec-81d3-0242ac130003",
    __parentId: "ae0f01-79ea-4629-a9ed-1592f92a41c5",
    __order: 0,
    __breadcrumb: "Planta baja",
    name: { value: "Planta baja" },
    abbreviation: { value: "PB" },
    order: { value: 0 },
    use: { value: null },
    constructedArea: { value: 100, units: "m2" },
    evacuationHeight: { value: 0, units: "m" },
    isUnderground: { value: false },
    edit: { value: true },
  },
];

const zones = [
  {
    __designKey: "zone",
    __id: "5fd2ae-792b-479a-99ad-864f3fc75adc",
    __parentId: "e0c9e6-a7f0-4655-8010-c719d7151b85",
    __order: 0,
    __breadcrumb: "Oficina 1",
    number: { value: 1 },
    name: { value: "Oficina 1" },
    use: { value: null },
    detailedUse: { value: null },
    usableArea: { value: 40, units: "m2" },
  },
  {
    __designKey: "zone",
    __id: "1d3642-d75b-42c6-bae7-01ba5a61b507",
    __parentId: "e0c9e6-a7f0-4655-8010-c719d7151b85",
    __order: 1,
    __breadcrumb: "Oficina 2",
    number: { value: 2 },
    name: { value: "Oficina 2" },
    use: { value: null },
    detailedUse: { value: null },
    usableArea: { value: 40, units: "m2" },
  },
];

const floorExits = [
  {
    __designKey: "floorExit",
    __id: "7fy2ae-795b-479y-99gd-974f0fc75tdr",
    __parentId: "e0c9e6-a7f0-4655-8010-c719d7151b85",
    __order: 0,
    __breadcrumb: "Salida de planta 1",
    number: { value: 1 },
    to: { value: "Escalera 1" },
    isForEmergencyUseOnly: { value: false },
    width: { value: 1, units: "m" },
  },
];

let sampleData: RecordBase[] = [];

sampleData = sampleData.concat(root);
sampleData = sampleData.concat(sites);
sampleData = sampleData.concat(coordinates);
sampleData = sampleData.concat(buildings);
sampleData = sampleData.concat(buildingExits);
sampleData = sampleData.concat(floors);
sampleData = sampleData.concat(zones);
sampleData = sampleData.concat(floorExits);

export { sampleData };
