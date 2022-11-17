type AvailableCitiesOut = {
  [index: string]: {
    name: string;
    lat: string;
    lon: string;
  };
};

export const availableCities = (): AvailableCitiesOut => ({
  sapporo: {
    name: "北海道/札幌市",
    lat: "43.064301",
    lon: "141.346874",
  },
  aomori: {
    name: "青森県/青森市",
    lat: "40.824622",
    lon: "140.740598",
  },
  morioka: {
    name: "岩手県/盛岡市",
    lat: "39.7036",
    lon: "141.152709",
  },
  sendai: {
    name: "宮城県/仙台市",
    lat: "38.268812",
    lon: "140.872082",
  },
  akita: {
    name: "秋田県/秋田市",
    lat: "39.718611",
    lon: "140.102401",
  },
  yamagata: {
    name: "山形県/山形市",
    lat: "38.240422",
    lon: "140.363592",
  },
  fukushima: {
    name: "福島県/福島市",
    lat: "37.750301",
    lon: "140.467522",
  },
  mito: {
    name: "茨城県/水戸市",
    lat: "36.341793",
    lon: "140.446802",
  },
  utsunomiya: {
    name: "栃木県/宇都宮市",
    lat: "36.566672",
    lon: "139.883093",
  },
  maebashi: {
    name: "群馬県/前橋市",
    lat: "36.390698",
    lon: "139.060451",
  },
  saitama: {
    name: "埼玉県/さいたま市",
    lat: "35.857431",
    lon: "139.648901",
  },
  chiba: {
    name: "千葉県/千葉市",
    lat: "35.605045",
    lon: "140.123325",
  },
  shinjuku: {
    name: "東京都/新宿区",
    lat: "35.689753",
    lon: "139.691731",
  },
  yokohama: {
    name: "神奈川県/横浜市",
    lat: "35.447495",
    lon: "139.6424",
  },
  niigata: {
    name: "新潟県/新潟市",
    lat: "37.902419",
    lon: "139.023225",
  },
  toyama: {
    name: "富山県/富山市",
    lat: "36.695275",
    lon: "137.211342",
  },
  kanazawa: {
    name: "石川県/金沢市",
    lat: "36.59473",
    lon: "136.625582",
  },
  fukui: {
    name: "福井県/福井市",
    lat: "36.065219",
    lon: "136.221682",
  },
  kofu: {
    name: "山梨県/甲府市",
    lat: "35.664161",
    lon: "138.568459",
  },
  nagano: {
    name: "長野県/長野市",
    lat: "36.651296",
    lon: "138.181239",
  },
  gifu: {
    name: "岐阜県/岐阜市",
    lat: "35.391228",
    lon: "136.722311",
  },
  shizuoka: {
    name: "静岡県/静岡市",
    lat: "34.976944",
    lon: "138.383009",
  },
  nagoya: {
    name: "愛知県/名古屋市",
    lat: "35.180344",
    lon: "136.906632",
  },
  tsu: {
    name: "三重県/津市",
    lat: "34.730272",
    lon: "136.508598",
  },
  otsu: {
    name: "滋賀県/大津市",
    lat: "35.004528",
    lon: "135.868607",
  },
  kyoto: {
    name: "京都府/京都市",
    lat: "35.021393",
    lon: "135.755439",
  },
  osaka: {
    name: "大阪府/大阪市",
    lat: "34.686555",
    lon: "135.519474",
  },
  kobe: {
    name: "兵庫県/神戸市",
    lat: "34.691287",
    lon: "135.183061",
  },
  nara: {
    name: "奈良県/奈良市",
    lat: "34.685326",
    lon: "135.832751",
  },
  wakayama: {
    name: "和歌山県/和歌山市",
    lat: "34.226041",
    lon: "135.167504",
  },
  tottori: {
    name: "鳥取県/鳥取市",
    lat: "35.503867",
    lon: "134.237716",
  },
  matsue: {
    name: "島根県/松江市",
    lat: "35.472324",
    lon: "133.05052",
  },
  okayama: {
    name: "岡山県/岡山市",
    lat: "34.661759",
    lon: "133.934399",
  },
  hiroshima: {
    name: "広島県/広島市",
    lat: "34.396603",
    lon: "132.459621",
  },
  yamaguchi: {
    name: "山口県/山口市",
    lat: "34.18613",
    lon: "131.470497",
  },
  tokushima: {
    name: "徳島県/徳島市",
    lat: "34.065756",
    lon: "134.559297",
  },
  takamatsu: {
    name: "香川県/高松市",
    lat: "34.340045",
    lon: "134.043369",
  },
  matsuyama: {
    name: "愛媛県/松山市",
    lat: "33.841669",
    lon: "132.765371",
  },
  kochi: {
    name: "高知県/高知市",
    lat: "33.5597",
    lon: "133.531096",
  },
  fukuoka: {
    name: "福岡県/福岡市",
    lat: "33.606781",
    lon: "130.418307",
  },
  saga: {
    name: "佐賀県/佐賀市",
    lat: "33.24957",
    lon: "130.299804",
  },
  nagasaki: {
    name: "長崎県/長崎市",
    lat: "32.744814",
    lon: "129.8737",
  },
  kumamoto: {
    name: "熊本県/熊本市",
    lat: "32.789816",
    lon: "130.74169",
  },
  oita: {
    name: "大分県/大分市",
    lat: "33.238205",
    lon: "131.612625",
  },
  miyazaki: {
    name: "宮崎県/宮崎市",
    lat: "31.911058",
    lon: "131.423883",
  },
  kagoshima: {
    name: "鹿児島県/鹿児島市",
    lat: "31.560166",
    lon: "130.557994",
  },
  naha: {
    name: "沖縄県/那覇市",
    lat: "26.212418",
    lon: "127.680895",
  },
});
