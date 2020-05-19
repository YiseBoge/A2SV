const { Tests } = require("../models/TestModel");
const { MapData } = require("../models/MapDataModel");

const Ak = {
  cough: 0.861,
  fever: 0.85,
  "difficulty breathing": 0.8,
  myalgia: 0.344,
  diarrhoea: 0.267,
  "sore throat": 0.178,
  headaches: 0.161,
  "runny nose": 0.161,
  "chest pain": 0.15,
  "abdominal pain": 0.083,
  wheezing: 0.067,
  nausea: 0.244,

  fatigue: 0.65,
  sneezing: 0.34,
  conjunctivitis: 0.12,
  chills: 0.44,
  pneumonia: 0.53,
  anosmia: 0.12,
};
const Sk = {
  fatigue: 0.355,
  headaches: 0.354,
  "runny nose": 0.344,
  cough: 0.283,
  myalgia: 0.231,
  "difficulty breathing": 0.132,
  diarrhoea: 0.067,
  fever: 0.07,
  "abdominal pain": 0.117,
  anosmia: 0.04,
  "sore throat": 0.2,
  "chest pain": 0.1,
  wheezing: 0.04,
  nausea: 0.34,
  sneezing: 0.66,
  conjunctivitis: 0.15,
  chills: 0.52,
  pneumonia: 0.12,
};

exports.calculateProbability = async (symptoms, country) => {
  let total_prob = 1.0;
  const prevalence = await getCountryStat(country);
  for (let i = 0; i < symptoms.length; i++) {
    var symptom = `${symptoms[i]}`.toLowerCase();
    if (symptom == "persistent dry cough") {
      symptom = "cough";
    } else if (
      symptom == "high-grade fever" ||
      symptom == "medium-grade fever"
    ) {
      symptom = "fever";
    } else if (symptom == "repeated shaking with chills") {
      symptom = "chills";
    }
    const prob = 1 - (prevalence * Ak[symptom]) / Sk[symptom];
    total_prob *= prob;
  }
  total_prob = 1.0 - total_prob;
  console.log("Probabilty = " + total_prob);
  return total_prob;
};
const setStartDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return "" + date.toISOString().slice(0, 10);
};
const getCountryStat = async (input_country_iso) => {
  let startDate = setStartDate();
  let isoConverter = {
    AFG: "Afghanistan",
    ALB: "Albania",
    DZA: "Algeria",
    AND: "Andorra",
    AGO: "Angola",
    ATG: "Antigua and Barbuda",
    ARG: "Argentina",
    ARM: "Armenia",
    AUS: "Australia",
    AUT: "Austria",
    AZE: "Azerbaijan",
    BHS: "Bahamas",
    BHR: "Bahrain",
    BGD: "Bangladesh",
    BRB: "Barbados",
    BLR: "Belarus",
    BEL: "Belgium",
    BLZ: "Belize",
    BEN: "Benin",
    BTN: "Bhutan",
    BOL: "Bolivia",
    BIH: "Bosnia and Herzegovina",
    BWA: "Botswana",
    BRA: "Brazil",
    BRN: "Brunei",
    BGR: "Bulgaria",
    BFA: "Burkina Faso",
    MMR: "Burma",
    BDI: "Burundi",
    CPV: "Cabo Verde",
    KHM: "Cambodia",
    CMR: "Cameroon",
    CAN: "Canada",
    CAF: "Central African Republic",
    TCD: "Chad",
    CHL: "Chile",
    CHN: "China",
    COL: "Colombia",
    COM: "Comoros",
    COD: "Congo (Brazzaville)",
    COG: "Congo (Kinshasa)",
    CRI: "Costa Rica",
    CIV: "Cote d'Ivoire",
    HRV: "Croatia",
    CUB: "Cuba",
    CYP: "Cyprus",
    CZE: "Czechia",
    DNK: "Denmark",
    JPN: "Japan",
    DJI: "Djibouti",
    DMA: "Dominica",
    DOM: "Dominican Republic",
    ECU: "Ecuador",
    EGY: "Egypt",
    SLV: "El Salvador",
    GNQ: "Equatorial Guinea",
    ERI: "Eritrea",
    EST: "Estonia",
    SWZ: "Eswatini",
    ETH: "Ethiopia",
    FJI: "Fiji",
    FIN: "Finland",
    FRA: "France",
    GAB: "Gabon",
    GMB: "Gambia",
    GEO: "Georgia",
    DEU: "Germany",
    GHA: "Ghana",
    GRC: "Greece",
    GRD: "Grenada",
    GTM: "Guatemala",
    GIN: "Guinea",
    GNB: "Guinea-Bissau",
    GUY: "Guyana",
    HTI: "Haiti",
    VAT: "Holy See",
    HND: "Honduras",
    HUN: "Hungary",
    ISL: "Iceland",
    IND: "India",
    IDN: "Indonesia",
    IRN: "Iran",
    IRQ: "Iraq",
    IRL: "Ireland",
    ISR: "Israel",
    ITA: "Italy",
    JAM: "Jamaica",
    JOR: "Jordan",
    KAZ: "Kazakhstan",
    KEN: "Kenya",
    KOR: "Korea, South",
    RKS: "Kosovo",
    KWT: "Kuwait",
    KGZ: "Kyrgyzstan",
    LAO: "Laos",
    LVA: "Latvia",
    LBN: "Lebanon",
    LBR: "Liberia",
    LBY: "Libya",
    LIE: "Liechtenstein",
    LTU: "Lithuania",
    LUX: "Luxembourg",
    MDG: "Madagascar",
    MWI: "Malawi",
    MYS: "Malaysia",
    MDV: "Maldives",
    MLI: "Mali",
    MLT: "Malta",
    MRT: "Mauritania",
    MUS: "Mauritius",
    MEX: "Mexico",
    MDA: "Moldova",
    MCO: "Monaco",
    MNG: "Mongolia",
    MNE: "Montenegro",
    MAR: "Morocco",
    MOZ: "Mozambique",
    USA: "US",
    NAM: "Namibia",
    NPL: "Nepal",
    NLD: "Netherlands",
    NZL: "New Zealand",
    NIC: "Nicaragua",
    NER: "Niger",
    NGA: "Nigeria",
    MKD: "North Macedonia",
    NOR: "Norway",
    OMN: "Oman",
    PAK: "Pakistan",
    PAN: "Panama",
    PNG: "Papua New Guinea",
    PRY: "Paraguay",
    PER: "Peru",
    PHL: "Philippines",
    POL: "Poland",
    PRT: "Portugal",
    QAT: "Qatar",
    ROU: "Romania",
    RUS: "Russia",
    RWA: "Rwanda",
    KNA: "Saint Kitts and Nevis",
    LCA: "Saint Lucia",
    VCT: "Saint Vincent and the Grenadines",
    SMR: "San Marino",
    STP: "Sao Tome and Principe",
    SAU: "Saudi Arabia",
    SEN: "Senegal",
    SRB: "Serbia",
    SYC: "Seychelles",
    SLE: "Sierra Leone",
    SGP: "Singapore",
    SVK: "Slovakia",
    SVN: "Slovenia",
    SOM: "Somalia",
    ZAF: "South Africa",
    SSD: "South Sudan",
    ESP: "Spain",
    LKA: "Sri Lanka",
    SDN: "Sudan",
    SUR: "Suriname",
    SWE: "Sweden",
    CHE: "Switzerland",
    SYR: "Syria",
    TWN: "Taiwan*",
    TJK: "Tajikistan",
    TZA: "Tanzania",
    THA: "Thailand",
    TLS: "Timor-Leste",
    TGO: "Togo",
    TTO: "Trinidad and Tobago",
    TUN: "Tunisia",
    TUR: "Turkey",
    UGA: "Uganda",
    UKR: "Ukraine",
    ARE: "United Arab Emirates",
    GBR: "United Kingdom",
    URY: "Uruguay",
    UZB: "Uzbekistan",
    VEN: "Venezuela",
    VNM: "Vietnam",
    PSE: "West Bank and Gaza",
    ESH: "Western Sahara",
    YEM: "Yemen",
    ZMB: "Zambia",
    ZWE: "Zimbabwe",
    USA: "US",
  };
  let iso3to2 = {
    BD: "BGD",
    BE: "BEL",
    BF: "BFA",
    BG: "BGR",
    BA: "BIH",
    BB: "BRB",
    WF: "WLF",
    BL: "BLM",
    BM: "BMU",
    BN: "BRN",
    BO: "BOL",
    BH: "BHR",
    BI: "BDI",
    BJ: "BEN",
    BT: "BTN",
    JM: "JAM",
    BV: "BVT",
    BW: "BWA",
    WS: "WSM",
    BQ: "BES",
    BR: "BRA",
    BS: "BHS",
    JE: "JEY",
    BY: "BLR",
    BZ: "BLZ",
    RU: "RUS",
    RW: "RWA",
    RS: "SRB",
    TL: "TLS",
    RE: "REU",
    TM: "TKM",
    TJ: "TJK",
    RO: "ROU",
    TK: "TKL",
    GW: "GNB",
    GU: "GUM",
    GT: "GTM",
    GS: "SGS",
    GR: "GRC",
    GQ: "GNQ",
    GP: "GLP",
    JP: "JPN",
    GY: "GUY",
    GG: "GGY",
    GF: "GUF",
    GE: "GEO",
    GD: "GRD",
    GB: "GBR",
    GA: "GAB",
    SV: "SLV",
    GN: "GIN",
    GM: "GMB",
    GL: "GRL",
    GI: "GIB",
    GH: "GHA",
    OM: "OMN",
    TN: "TUN",
    JO: "JOR",
    HR: "HRV",
    HT: "HTI",
    HU: "HUN",
    HK: "HKG",
    HN: "HND",
    HM: "HMD",
    VE: "VEN",
    PR: "PRI",
    PS: "PSE",
    PW: "PLW",
    PT: "PRT",
    SJ: "SJM",
    PY: "PRY",
    IQ: "IRQ",
    PA: "PAN",
    PF: "PYF",
    PG: "PNG",
    PE: "PER",
    PK: "PAK",
    PH: "PHL",
    PN: "PCN",
    PL: "POL",
    PM: "SPM",
    ZM: "ZMB",
    EH: "ESH",
    EE: "EST",
    EG: "EGY",
    ZA: "ZAF",
    EC: "ECU",
    IT: "ITA",
    VN: "VNM",
    SB: "SLB",
    ET: "ETH",
    SO: "SOM",
    ZW: "ZWE",
    SA: "SAU",
    ES: "ESP",
    ER: "ERI",
    ME: "MNE",
    MD: "MDA",
    MG: "MDG",
    MF: "MAF",
    MA: "MAR",
    MC: "MCO",
    UZ: "UZB",
    MM: "MMR",
    ML: "MLI",
    MO: "MAC",
    MN: "MNG",
    MH: "MHL",
    MK: "MKD",
    MU: "MUS",
    MT: "MLT",
    MW: "MWI",
    MV: "MDV",
    MQ: "MTQ",
    MP: "MNP",
    MS: "MSR",
    MR: "MRT",
    IM: "IMN",
    UG: "UGA",
    TZ: "TZA",
    MY: "MYS",
    MX: "MEX",
    IL: "ISR",
    FR: "FRA",
    IO: "IOT",
    SH: "SHN",
    FI: "FIN",
    FJ: "FJI",
    FK: "FLK",
    FM: "FSM",
    FO: "FRO",
    NI: "NIC",
    NL: "NLD",
    NO: "NOR",
    NA: "NAM",
    VU: "VUT",
    NC: "NCL",
    NE: "NER",
    NF: "NFK",
    NG: "NGA",
    NZ: "NZL",
    NP: "NPL",
    NR: "NRU",
    NU: "NIU",
    CK: "COK",
    XK: "XKX",
    CI: "CIV",
    CH: "CHE",
    CO: "COL",
    CN: "CHN",
    CM: "CMR",
    CL: "CHL",
    CC: "CCK",
    CA: "CAN",
    CG: "COG",
    CF: "CAF",
    CD: "COD",
    CZ: "CZE",
    CY: "CYP",
    CX: "CXR",
    CR: "CRI",
    CW: "CUW",
    CV: "CPV",
    CU: "CUB",
    SZ: "SWZ",
    SY: "SYR",
    SX: "SXM",
    KG: "KGZ",
    KE: "KEN",
    SS: "SSD",
    SR: "SUR",
    KI: "KIR",
    KH: "KHM",
    KN: "KNA",
    KM: "COM",
    ST: "STP",
    SK: "SVK",
    KR: "KOR",
    SI: "SVN",
    KP: "PRK",
    KW: "KWT",
    SN: "SEN",
    SM: "SMR",
    SL: "SLE",
    SC: "SYC",
    KZ: "KAZ",
    KY: "CYM",
    SG: "SGP",
    SE: "SWE",
    SD: "SDN",
    DO: "DOM",
    DM: "DMA",
    DJ: "DJI",
    DK: "DNK",
    VG: "VGB",
    DE: "DEU",
    YE: "YEM",
    DZ: "DZA",
    US: "USA",
    UY: "URY",
    YT: "MYT",
    UM: "UMI",
    LB: "LBN",
    LC: "LCA",
    LA: "LAO",
    TV: "TUV",
    TW: "TWN",
    TT: "TTO",
    TR: "TUR",
    LK: "LKA",
    LI: "LIE",
    LV: "LVA",
    TO: "TON",
    LT: "LTU",
    LU: "LUX",
    LR: "LBR",
    LS: "LSO",
    TH: "THA",
    TF: "ATF",
    TG: "TGO",
    TD: "TCD",
    TC: "TCA",
    LY: "LBY",
    VA: "VAT",
    VC: "VCT",
    AE: "ARE",
    AD: "AND",
    AG: "ATG",
    AF: "AFG",
    AI: "AIA",
    VI: "VIR",
    IS: "ISL",
    IR: "IRN",
    AM: "ARM",
    AL: "ALB",
    AO: "AGO",
    AQ: "ATA",
    AS: "ASM",
    AR: "ARG",
    AU: "AUS",
    AT: "AUT",
    AW: "ABW",
    IN: "IND",
    AX: "ALA",
    AZ: "AZE",
    IE: "IRL",
    ID: "IDN",
    UA: "UKR",
    QA: "QAT",
    MZ: "MOZ",
  };
  let countries = [
    { name: "United States", slug: "USA" },
    { name: "Afghanistan", slug: "AFG" },
    { name: "Albania", slug: "ALB" },
    { name: "Algeria", slug: "DZA" },
    { name: "Andorra", slug: "AND" },
    { name: "Angola", slug: "AGO" },
    { name: "Antigua and Barbuda", slug: "ATG" },
    { name: "Argentina", slug: "ARG" },
    { name: "Armenia", slug: "ARM" },
    { name: "Australia", slug: "AUS" },
    { name: "Austria", slug: "AUT" },
    { name: "Azerbaijan", slug: "AZE" },
    { name: "Bahamas", slug: "BHS" },
    { name: "Bahrain", slug: "BHR" },
    { name: "Bangladesh", slug: "BGD" },
    { name: "Barbados", slug: "BRB" },
    { name: "Belarus", slug: "BLR" },
    { name: "Belgium", slug: "BEL" },
    { name: "Belize", slug: "BLZ" },
    { name: "Benin", slug: "BEN" },
    { name: "Bhutan", slug: "BTN" },
    { name: "Bolivia", slug: "BOL" },
    { name: "Bosnia and Herzegovina", slug: "BIH" },
    { name: "Botswana", slug: "BWA" },
    { name: "Brazil", slug: "BRA" },
    { name: "Brunei", slug: "BRN" },
    { name: "Bulgaria", slug: "BGR" },
    { name: "Burkina Faso", slug: "BFA" },
    { name: "Burma", slug: "MMR" },
    { name: "Burundi", slug: "BDI" },
    { name: "Cabo Verde", slug: "CPV" },
    { name: "Cambodia", slug: "KHM" },
    { name: "Cameroon", slug: "CMR" },
    { name: "Canada", slug: "CAN" },
    { name: "Central African Republic", slug: "CAF" },
    { name: "Chad", slug: "TCD" },
    { name: "Chile", slug: "CHL" },
    { name: "China", slug: "CHN" },
    { name: "Colombia", slug: "COL" },
    { name: "Comoros", slug: "COM" },
    { name: "Congo (Brazzaville)", slug: "COD" },
    { name: "Congo (Kinshasa)", slug: "COG" },
    { name: "Costa Rica", slug: "CRI" },
    { name: "Cote d'Ivoire", slug: "CIV" },
    { name: "Croatia", slug: "HRV" },
    { name: "Cuba", slug: "CUB" },
    { name: "Cyprus", slug: "CYP" },
    { name: "Czechia", slug: "CZE" },
    { name: "Denmark", slug: "DNK" },
    { name: "Djibouti", slug: "DJI" },
    { name: "Dominica", slug: "DMA" },
    { name: "Dominican Republic", slug: "DOM" },
    { name: "Ecuador", slug: "ECU" },
    { name: "Egypt", slug: "EGY" },
    { name: "El Salvador", slug: "SLV" },
    { name: "Equatorial Guinea", slug: "GNQ" },
    { name: "Eritrea", slug: "ERI" },
    { name: "Estonia", slug: "EST" },
    { name: "Eswatini", slug: "SWZ" },
    { name: "Ethiopia", slug: "ETH" },
    { name: "Fiji", slug: "FJI" },
    { name: "Finland", slug: "FIN" },
    { name: "France", slug: "FRA" },
    { name: "Gabon", slug: "GAB" },
    { name: "Gambia", slug: "GMB" },
    { name: "Georgia", slug: "GEO" },
    { name: "Germany", slug: "DEU" },
    { name: "Ghana", slug: "GHA" },
    { name: "Greece", slug: "GRC" },
    { name: "Grenada", slug: "GRD" },
    { name: "Guatemala", slug: "GTM" },
    { name: "Guinea", slug: "GIN" },
    { name: "Guinea-Bissau", slug: "GNB" },
    { name: "Guyana", slug: "GUY" },
    { name: "Haiti", slug: "HTI" },
    { name: "Holy See", slug: "VAT" },
    { name: "Honduras", slug: "HND" },
    { name: "Hungary", slug: "HUN" },
    { name: "Iceland", slug: "ISL" },
    { name: "India", slug: "IND" },
    { name: "Indonesia", slug: "IDN" },
    { name: "Iran", slug: "IRN" },
    { name: "Iraq", slug: "IRQ" },
    { name: "Ireland", slug: "IRL" },
    { name: "Israel", slug: "ISR" },
    { name: "Italy", slug: "ITA" },
    { name: "Jamaica", slug: "JAM" },
    { name: "Japan", slug: "JPN" },
    { name: "Jordan", slug: "JOR" },
    { name: "Kazakhstan", slug: "KAZ" },
    { name: "Kenya", slug: "KEN" },
    { name: "Korea, South", slug: "KOR" },
    { name: "Kosovo", slug: "RKS" },
    { name: "Kuwait", slug: "KWT" },
    { name: "Kyrgyzstan", slug: "KGZ" },
    { name: "Laos", slug: "LAO" },
    { name: "Latvia", slug: "LVA" },
    { name: "Lebanon", slug: "LBN" },
    { name: "Liberia", slug: "LBR" },
    { name: "Libya", slug: "LBY" },
    { name: "Liechtenstein", slug: "LIE" },
    { name: "Lithuania", slug: "LTU" },
    { name: "Luxembourg", slug: "LUX" },
    { name: "Madagascar", slug: "MDG" },
    { name: "Malawi", slug: "MWI" },
    { name: "Malaysia", slug: "MYS" },
    { name: "Maldives", slug: "MDV" },
    { name: "Mali", slug: "MLI" },
    { name: "Malta", slug: "MLT" },
    { name: "Mauritania", slug: "MRT" },
    { name: "Mauritius", slug: "MUS" },
    { name: "Mexico", slug: "MEX" },
    { name: "Moldova", slug: "MDA" },
    { name: "Monaco", slug: "MCO" },
    { name: "Mongolia", slug: "MNG" },
    { name: "Montenegro", slug: "MNE" },
    { name: "Morocco", slug: "MAR" },
    { name: "Mozambique", slug: "MOZ" },
    { name: "Namibia", slug: "NAM" },
    { name: "Nepal", slug: "NPL" },
    { name: "Netherlands", slug: "NLD" },
    { name: "New Zealand", slug: "NZL" },
    { name: "Nicaragua", slug: "NIC" },
    { name: "Niger", slug: "NER" },
    { name: "Nigeria", slug: "NGA" },
    { name: "North Macedonia", slug: "MKD" },
    { name: "Norway", slug: "NOR" },
    { name: "Oman", slug: "OMN" },
    { name: "Pakistan", slug: "PAK" },
    { name: "Panama", slug: "PAN" },
    { name: "Papua New Guinea", slug: "PNG" },
    { name: "Paraguay", slug: "PRY" },
    { name: "Peru", slug: "PER" },
    { name: "Philippines", slug: "PHL" },
    { name: "Poland", slug: "POL" },
    { name: "Portugal", slug: "PRT" },
    { name: "Qatar", slug: "QAT" },
    { name: "Romania", slug: "ROU" },
    { name: "Russia", slug: "RUS" },
    { name: "Rwanda", slug: "RWA" },
    { name: "Saint Kitts and Nevis", slug: "KNA" },
    { name: "Saint Lucia", slug: "LCA" },
    { name: "Saint Vincent and the Grenadines", slug: "VCT" },
    { name: "San Marino", slug: "SMR" },
    { name: "Sao Tome and Principe", slug: "STP" },
    { name: "Saudi Arabia", slug: "SAU" },
    { name: "Senegal", slug: "SEN" },
    { name: "Serbia", slug: "SRB" },
    { name: "Seychelles", slug: "SYC" },
    { name: "Sierra Leone", slug: "SLE" },
    { name: "Singapore", slug: "SGP" },
    { name: "Slovakia", slug: "SVK" },
    { name: "Slovenia", slug: "SVN" },
    { name: "Somalia", slug: "SOM" },
    { name: "South Africa", slug: "ZAF" },
    { name: "South Sudan", slug: "SSD" },
    { name: "Spain", slug: "ESP" },
    { name: "Sri Lanka", slug: "LKA" },
    { name: "Sudan", slug: "SDN" },
    { name: "Suriname", slug: "SUR" },
    { name: "Sweden", slug: "SWE" },
    { name: "Switzerland", slug: "CHE" },
    { name: "Syria", slug: "SYR" },
    { name: "Taiwan*", slug: "TWN" },
    { name: "Tajikistan", slug: "TJK" },
    { name: "Tanzania", slug: "TZA" },
    { name: "Thailand", slug: "THA" },
    { name: "Timor-Leste", slug: "TLS" },
    { name: "Togo", slug: "TGO" },
    { name: "Trinidad and Tobago", slug: "TTO" },
    { name: "Tunisia", slug: "TUN" },
    { name: "Turkey", slug: "TUR" },
    { name: "Uganda", slug: "UGA" },
    { name: "Ukraine", slug: "UKR" },
    { name: "United Arab Emirates", slug: "ARE" },
    { name: "United Kingdom", slug: "GBR" },
    { name: "Uruguay", slug: "URY" },
    { name: "US", slug: "USA" },
    { name: "Uzbekistan", slug: "UZB" },
    { name: "Venezuela", slug: "VEN" },
    { name: "Vietnam", slug: "VNM" },
    { name: "West Bank and Gaza", slug: "PSE" },
    { name: "Western Sahara", slug: "ESH" },
    { name: "Yemen", slug: "YEM" },
    { name: "Zambia", slug: "ZMB" },
    { name: "Zimbabwe", slug: "ZWE" },
  ];
  let input_country = iso3to2[input_country_iso];
  const country = isoConverter[input_country];
  let result;
  let caseData = [];
  let dailyConfirmed = {};
  let testData = await Tests.find({
    date: {
      $gte: new Date(Date.parse(startDate)),
    },
    country_slug: input_country,
  });
  testData.forEach((test) => {
    var date =
      test.date.getMonth() +
      1 +
      "/" +
      test.date.getDate() +
      "/" +
      (test.date.getYear() + 1900 + "").slice(2, 4);
    caseData.push({
      t: new Date(date),
      y: test.tests,
    });
  });
  let map_datas = await MapData.findOne({ "Data.Country": country });
  try {
    if (map_datas) {
      Object.keys(map_datas.Data).forEach((item) => {
        if (
          item == "Country" ||
          item == "Unique_Provinces" ||
          startDate > new Date(`${item}`)
        ) {
        } else {
          dailyConfirmed[new Date(item)] = map_datas["Data"][`${item}`][0];
        }
      });
      caseData = calculateRate(caseData, dailyConfirmed);
      caseData.sort((a, b) => (a.t > b.t ? 1 : -1));
      result = caseData[caseData.length - 1];
    }
  } catch (err) {
    console.log(err);
  }
  if (result && result.y) {
    return result.y;
  }
  let request_url = "https://covid19api.io/api/v1/AllReports";
  let confirmed_sum = 0;
  let tests_sum = 0;
  const fetch = await axios.get(request_url).then((response) => {
    let data = response.data.reports[0];
    data.table[0].forEach((item) => {
      if (
        item.TotalCases &&
        item.TotalTests &&
        item.TotalCases != "" &&
        item.TotalTests != ""
      ) {
        confirmed_sum += parseFloat(item.TotalCases.replace(/,/g, ""));
        tests_sum += parseFloat(item.TotalTests.replace(/,/g, ""));
      }
    });
  });
  return confirmed_sum / tests_sum;
};
const calculateRate = (caseData, dailyConifrmed) => {
  let rateData = [];
  caseData.forEach((data) => {
    rateData.push({
      t: data.t,
      y: dailyConifrmed[data.t] / data.y,
    });
  });
  return rateData;
};