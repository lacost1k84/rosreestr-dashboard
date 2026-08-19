const EXPECTED_SHEETS = [
'ЦФО','СЗФО','ЮФО','СКФО','ПФО',
'УФО','СФО','ДФО','НР1','Арктический гектар'
];
const MAIN_SHEETS = [
'ЦФО','СЗФО','ЮФО','СКФО',
'ПФО','УФО','СФО','ДФО','НР1'
];
const MAP_URL =
'https://raw.githubusercontent.com/rnekrasov-msk/geojson/master/russia_subjects_github.json';
const REGION_MAP_ALIASES = {
'город москва': 'Москва',
'moscow': 'Москва',
'moscow city': 'Москва',
'санкт петербург': 'Санкт-Петербург',
'город санкт-петербург': 'Санкт-Петербург',
'saint petersburg': 'Санкт-Петербург',
'st petersburg': 'Санкт-Петербург',
'севастополь': 'Севастополь',
'sevastopol': 'Севастополь',
'крым': 'Республика Крым',
'republic of crimea': 'Республика Крым',
'crimea': 'Республика Крым',
'ненецкий автономный округ': 'Ненецкий АО',
'ненецкий ао': 'Ненецкий АО',
'ханты-мансийский автономный округ': 'Ханты-Мансийский АО',
'ханты-мансийский автономный округ - югра': 'Ханты-Мансийский АО',
'ханты-мансийский ао - югра': 'Ханты-Мансийский АО',
'ямало-ненецкий автономный округ': 'Ямало-Ненецкий АО',
'чукотский автономный округ': 'Чукотский АО',
'еврейская автономная область': 'Еврейская АО',
'кемеровская область': 'Кемеровская область - Кузбасс',
'кузбасс': 'Кемеровская область - Кузбасс',
'чувашская республика': 'Чувашская Республика - Чувашия',
'чувашия': 'Чувашская Республика - Чувашия',
'северная осетия - алания': 'Республика Северная Осетия - Алания',
'республика северная осетия-алания': 'Республика Северная Осетия - Алания',
'северная осетия-алания': 'Республика Северная Осетия - Алания',
'саха якутия': 'Республика Саха (Якутия)',
'якутия': 'Республика Саха (Якутия)',
'тыва': 'Республика Тыва',
'тува': 'Республика Тыва',
'карелия': 'Республика Карелия',
'коми': 'Республика Коми',
'адыгея': 'Республика Адыгея',
'калмыкия': 'Республика Калмыкия',
'дагестан': 'Республика Дагестан',
'ингушетия': 'Республика Ингушетия',
'башкортостан': 'Республика Башкортостан',
'марий эл': 'Республика Марий Эл',
'мордовия': 'Республика Мордовия',
'татарстан': 'Республика Татарстан',
'удмуртия': 'Удмуртская Республика',
'бурятия': 'Республика Бурятия',
'хакасия': 'Республика Хакасия',
'nenets': 'Ненецкий АО',
'nenets autonomous': 'Ненецкий АО',
'nenets autonomous okrug': 'Ненецкий АО',
'khanty-mansiy': 'Ханты-Мансийский АО',
'khanty-mansi': 'Ханты-Мансийский АО',
'khanty-mansi autonomous okrug': 'Ханты-Мансийский АО',
'khanty-mansiyskiy': 'Ханты-Мансийский АО',
'yamal-nenets': 'Ямало-Ненецкий АО',
'yamalo-nenets': 'Ямало-Ненецкий АО',
'yamalo-nenets autonomous okrug': 'Ямало-Ненецкий АО',
'jewish autonomous': 'Еврейская АО',
'jewish autonomous oblast': 'Еврейская АО',
'chukot': 'Чукотский АО',
'chukotka': 'Чукотский АО',
'chukot autonomous okrug': 'Чукотский АО',
'karachay-cherkess': 'Карачаево-Черкесская Республика',
'karachay-cherkessia': 'Карачаево-Черкесская Республика',
'kabardin-balkar': 'Кабардино-Балкарская Республика',
'kabardino-balkar': 'Кабардино-Балкарская Республика',
'north ossetia': 'Республика Северная Осетия - Алания',
'north ossetia-alania': 'Республика Северная Осетия - Алания',
'chechnya': 'Чеченская Республика',
'chechen': 'Чеченская Республика',
'altay': 'Республика Алтай',
'altai republic': 'Республика Алтай',
'altay republic': 'Республика Алтай',
'altai krai': 'Алтайский край',
'altay krai': 'Алтайский край',
'sakha': 'Республика Саха (Якутия)',
'sakha yakutia': 'Республика Саха (Якутия)',
'buryat': 'Республика Бурятия',
'buryatia': 'Республика Бурятия',
'tuva': 'Республика Тыва',
'khakass': 'Республика Хакасия',
'khakassia': 'Республика Хакасия',
'adygey': 'Республика Адыгея',
'adygea': 'Республика Адыгея',
'kalmyk': 'Республика Калмыкия',
'kalmykia': 'Республика Калмыкия',
'dagestan': 'Республика Дагестан',
'ingushetia': 'Республика Ингушетия',
'bashkortostan': 'Республика Башкортостан',
'mari-el': 'Республика Марий Эл',
'mari el': 'Республика Марий Эл',
'mordovia': 'Республика Мордовия',
'udmurt': 'Удмуртская Республика',
'udmurtia': 'Удмуртская Республика',
'moskva': 'Москва',
'moscow federal city': 'Москва',
'city of moscow': 'Москва',
'sankt-peterburg': 'Санкт-Петербург',
'sankt peterburg': 'Санкт-Петербург',
'saint-petersburg': 'Санкт-Петербург',
'city of st petersburg': 'Санкт-Петербург',
'city of saint petersburg': 'Санкт-Петербург',
'st. petersburg': 'Санкт-Петербург',
'sevastopol city': 'Севастополь',
"sevastopol'": 'Севастополь',
'sevastopol city municipality': 'Севастополь',
'adygeya': 'Республика Адыгея',
'republic of adygea': 'Республика Адыгея',
'republic of tatarstan': 'Республика Татарстан',
'khanty-mansi autonomous area': 'Ханты-Мансийский АО'
};
const REGISTRY_METRICS = {
egrn: {
label: 'Объекты недвижимости в ЕГРН',
short: 'Объекты в ЕГРН',
format: 'int',
unit: 'шт.',
aggregate: 'sum',
ranking: 'neutral'
},
noRights: {
label: 'Объекты без прав',
short: 'Объекты без прав',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'low'
},
landNoRights: {
label: 'Земельные участки без прав',
short: 'ЗУ без прав',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'low'
},
landBorders: {
label: 'Земельные участки с границами',
short: 'ЗУ с границами',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'high'
},
otherNoRights: {
label: 'Иные объекты без прав',
short: 'Иные объекты без прав',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'low'
},
regionalProperty: {
label: 'Региональная собственность — доля объектов, не поставленных на кадастровый учет',
short: 'Региональная собственность',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'low'
},
municipalProperty: {
label: 'Муниципальная собственность — доля объектов, не поставленных на кадастровый учет',
short: 'Муниципальная собственность',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'low'
},
subjectBorders: {
label: 'Границы субъектов РФ в ЕГРН',
short: 'Границы субъектов',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'high'
},
municipalBorders: {
label: 'Границы муниципальных образований в ЕГРН',
short: 'Границы МО',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'high'
},
settlementBorders: {
label: 'Границы населенных пунктов в ЕГРН',
short: 'Границы НП',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'high'
},
territorialZones: {
label: 'Границы территориальных зон в ЕГРН',
short: 'Территориальные зоны',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'high'
}
};
const URD_METRICS = {
urdTotal: {
label: 'УРД — общее количество',
short: 'УРД всего',
format: 'int',
unit: 'шт.',
aggregate: 'sum',
ranking: 'neutral'
},
urdPerDay: {
label: 'УРД — в день',
short: 'УРД в день',
format: 'int',
unit: 'шт./день',
aggregate: 'sum',
ranking: 'neutral'
},
urdElectronicCount: {
label: 'УРД — электронно, количество',
short: 'УРД электронно',
format: 'int',
unit: 'шт.',
aggregate: 'sum',
ranking: 'neutral'
},
urdElectronic: {
label: 'УРД — доля электронной регистрации',
short: 'Доля электронных УРД',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'high'
},
mortgageTotal: {
label: 'Ипотека — общее количество',
short: 'Ипотека всего',
format: 'int',
unit: 'шт.',
aggregate: 'sum',
ranking: 'neutral'
},
mortgagePerDay: {
label: 'Ипотека — в день',
short: 'Ипотека в день',
format: 'int',
unit: 'шт./день',
aggregate: 'sum',
ranking: 'neutral'
},
mortgageElectronicCount: {
label: 'Ипотека — электронно, количество',
short: 'Ипотека электронно',
format: 'int',
unit: 'шт.',
aggregate: 'sum',
ranking: 'neutral'
},
mortgageElectronic: {
label: 'Ипотека — доля электронной регистрации',
short: 'Доля электронной ипотеки',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'high'
},
mortgage24: {
label: 'Ипотека за 24 часа',
short: 'Ипотека за 24 часа',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'high'
},
dduTotal: {
label: 'ДДУ — общее количество',
short: 'ДДУ всего',
format: 'int',
unit: 'шт.',
aggregate: 'sum',
ranking: 'neutral'
},
dduPerDay: {
label: 'ДДУ — в день',
short: 'ДДУ в день',
format: 'int',
unit: 'шт./день',
aggregate: 'sum',
ranking: 'neutral'
},
dduElectronicCount: {
label: 'ДДУ — электронно, количество',
short: 'ДДУ электронно',
format: 'int',
unit: 'шт.',
aggregate: 'sum',
ranking: 'neutral'
},
dduElectronic: {
label: 'ДДУ — доля электронной регистрации',
short: 'Доля электронных ДДУ',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'high'
},
grpDays: {
label: 'Срок ГРП',
short: 'ГРП, дней',
format: 'days',
unit: 'дн.',
aggregate: 'avg',
ranking: 'low'
},
gkuDays: {
label: 'Срок ГКУ',
short: 'ГКУ, дней',
format: 'days',
unit: 'дн.',
aggregate: 'avg',
ranking: 'low'
},
epDays: {
label: 'Срок единой процедуры',
short: 'ЕП, дней',
format: 'days',
unit: 'дн.',
aggregate: 'avg',
ranking: 'low'
},
grpSusp: {
label: 'Приостановления ГРП',
short: 'Приост. ГРП',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'low'
},
gkuSusp: {
label: 'Приостановления ГКУ',
short: 'Приост. ГКУ',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'low'
},
epSusp: {
label: 'Приостановления единой процедуры',
short: 'Приост. ЕП',
format: 'percent',
unit: '%',
aggregate: 'avg',
ranking: 'low'
}
};
const DEFAULT_METRIC = {
registry: 'noRights',
urd: 'urdElectronic'
};
const state = {
workbook: null,
data: [],
diagnostics: [],
sourceRf: {
registry: {},
urd: {}
},
activeView: 'registry',
filters: {
registry: { metric: DEFAULT_METRIC.registry, district: 'ALL', region: 'ALL' },
urd: { metric: DEFAULT_METRIC.urd, district: 'ALL', region: 'ALL' }
},
charts: {},
map: {
loaded: false,
loading: false,
error: null,
promise: null,
matchedNames: new Set()
}
};
const $ = id => document.getElementById(id);

// ===== HEX POSITIONS: [row, col] в hex-сетке =====
// Запад слева, восток справа, север сверху
const HEX_POSITIONS = {
// Северо-Запад
'Мурманская область': [1, 3],
'Республика Карелия': [2, 3],
'Архангельская область': [2, 4],
'Ненецкий АО': [1, 4],
'Республика Коми': [3, 4],
'Вологодская область': [3, 3],
'Калининградская область': [5, 1],
'Ленинградская область': [4, 2],
'Санкт-Петербург': [4, 3],
'Новгородская область': [4, 4],
'Псковская область': [5, 2],
'Тверская область': [5, 3],
// Центр
'Москва': [5, 4],
'Московская область': [5, 5],
'Ярославская область': [4, 5],
'Костромская область': [3, 5],
'Ивановская область': [4, 6],
'Владимирская область': [5, 6],
'Калужская область': [6, 4],
'Тульская область': [6, 5],
'Рязанская область': [6, 6],
'Смоленская область': [6, 3],
'Брянская область': [7, 3],
'Орловская область': [7, 4],
'Курская область': [7, 5],
'Белгородская область': [8, 4],
'Воронежская область': [8, 5],
'Липецкая область': [7, 6],
'Тамбовская область': [7, 7],
'Пензенская область': [8, 6],
'Нижегородская область': [6, 7],
'Кировская область': [4, 7],
// Поволжье
'Республика Марий Эл': [6, 8],
'Чувашская Республика - Чувашия': [7, 8],
'Республика Мордовия': [8, 7],
'Ульяновская область': [7, 9],
'Самарская область': [8, 8],
'Саратовская область': [9, 7],
'Волгоградская область': [9, 6],
'Астраханская область': [10, 6],
'Республика Калмыкия': [10, 5],
'Республика Татарстан': [7, 10],
'Республика Башкортостан': [8, 9],
'Оренбургская область': [9, 8],
// Урал
'Пермский край': [6, 9],
'Удмуртская Республика': [6, 10],
'Курганская область': [8, 10],
'Свердловская область': [7, 11],
'Челябинская область': [8, 11],
'Ханты-Мансийский АО': [6, 11],
'Ямало-Ненецкий АО': [5, 11],
'Тюменская область': [7, 12],
// Сибирь
'Омская область': [8, 12],
'Новосибирская область': [9, 10],
'Томская область': [8, 13],
'Кемеровская область - Кузбасс': [9, 11],
'Алтайский край': [10, 10],
'Республика Алтай': [10, 11],
'Красноярский край': [7, 13],
'Республика Хакасия': [9, 12],
'Республика Тыва': [10, 12],
'Иркутская область': [8, 14],
'Республика Бурятия': [9, 13],
'Забайкальский край': [9, 14],
// Дальний Восток
'Республика Саха (Якутия)': [6, 14],
'Амурская область': [8, 15],
'Еврейская АО': [9, 15],
'Хабаровский край': [8, 16],
'Приморский край': [10, 15],
'Сахалинская область': [9, 17],
'Магаданская область': [7, 16],
'Чукотский АО': [6, 17],
'Камчатский край': [8, 17],
// Юг
'Республика Адыгея': [9, 4],
'Краснодарский край': [9, 5],
'Ростовская область': [9, 3],
'Ставропольский край': [10, 4],
'Республика Дагестан': [11, 4],
'Республика Ингушетия': [11, 3],
'Чеченская Республика': [11, 2],
'Республика Северная Осетия - Алания': [11, 5],
'Кабардино-Балкарская Республика': [10, 3],
'Карачаево-Черкесская Республика': [10, 2],
// Крым
'Республика Крым': [10, 1],
'Севастополь': [11, 1],
// НР1
'НР1': [12, 6]
};

function ensureV9Styles() {
if (document.getElementById('v9RuntimeStyles')) return;
const style = document.createElement('style');
style.id = 'v9RuntimeStyles';
style.textContent = `.v9-region-focus{ margin-bottom:12px; border-top:4px solid #26a269; background: linear-gradient(135deg,rgba(234,247,240,.88),rgba(255,255,255,.98) 45%); } .v9-focus-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:14px; margin-bottom:14px; } .v9-focus-title{ margin:3px 0 2px; color:#063f79; font-size:20px; line-height:1.15; font-weight:900; } .v9-focus-meta{ color:#71849a; font-size:12px; } .v9-focus-reset{ border:1px solid #cbdbe8; background:#fff; color:#063f79; border-radius:10px; min-height:36px; padding:8px 11px; font-weight:800; cursor:pointer; white-space:nowrap; } .v9-focus-grid{ display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:9px; } .v9-focus-metric{ min-width:0; padding:11px 12px; border:1px solid #dbe6f0; border-radius:12px; background:rgba(255,255,255,.92); } .v9-focus-metric span{ display:block; min-height:27px; color:#71849a; font-size:9px; line-height:1.25; font-weight:900; text-transform:uppercase; letter-spacing:.45px; } .v9-focus-metric strong{ display:block; margin-top:5px; color:#063f79; font-size:20px; line-height:1.05; } .v9-tech-zero{ color:#bd812b!important; } .v9-tech-note{ margin-top:9px; color:#8a6a32; font-size:11px; line-height:1.35; } .v9-rank-note{ margin-bottom:8px; padding:8px 9px; border-radius:9px; color:#8a6a32; background:#fff7e8; border:1px solid #f0deb9; font-size:10px; line-height:1.35; } .v9-rank-meta{ display:block; margin-top:2px; color:#8494a6; font-size:9px; font-weight:600; } .v9-table-tech{ background:#fffaf0!important; } .v9-table-status{ color:#bd812b; font-size:9px; font-weight:800; white-space:nowrap; } @media(max-width:820px){ .v9-focus-grid{grid-template-columns:repeat(2,minmax(0,1fr))} .v9-focus-title{font-size:18px} .v9-focus-reset{font-size:11px} }`;
document.head.appendChild(style);
}
const norm = value =>
String(value ?? '')
.replace(/ё/g, 'е')
.replace(/[‐‑‒–—―]/g, '-')
.replace(/\s+/g, ' ')
.trim()
.toLowerCase();
function cleanRegionLabel(value) {
return String(value ?? '')
.replace(/\s*(\sНСПД[^)])/gi, '')
.replace(/\s+/g, ' ')
.trim();
}
function nameKey(value) {
return norm(cleanRegionLabel(value))
.replace(/[«»"'.,()]/g, '')
.replace(/\s*-\s*/g, '-')
.trim();
}
function reducedNameKey(value) {
return nameKey(value)
.replace(/\bгород федерального значения\b/g, '')
.replace(/\bавтономная область\b/g, '')
.replace(/\bавтономный округ\b/g, '')
.replace(/\bреспублика\b/g, '')
.replace(/\bобласть\b/g, '')
.replace(/\bкрай\b/g, '')
.replace(/\bгород\b/g, '')
.replace(/\bао\b/g, '')
.replace(/\s+/g, ' ')
.trim();
}
function canonicalNameKey(value) {
return reducedNameKey(value)
.replace(/\bюгра\b/g, '')
.replace(/\bкузбасс\b/g, '')
.replace(/\bчувашия\b/g, '')
.replace(/-/g, ' ')
.replace(/\s+/g, ' ')
.trim();
}
function aliasMapName(rawName) {
const direct = REGION_MAP_ALIASES[nameKey(rawName)];
if (direct) return direct;
const reduced = REGION_MAP_ALIASES[reducedNameKey(rawName)];
if (reduced) return reduced;
return null;
}
function matrix(ws) {
return XLSX.utils.sheet_to_json(ws, {
header: 1,
raw: true,
defval: null
});
}
function metricRow(m, number) {
return m.find(row => Number(row[3]) === number);
}
function hasMetric(m, number) {
return !!metricRow(m, number);
}
function findUrdStart(m) {
return m.findIndex(row =>
norm(row[0]) === 'урд' &&
norm(row[2]) === 'урд'
);
}
function regionColumns(m) {
let best = [];
for (let r = 0; r < Math.min(12, m.length); r++) {
const row = m[r] || [];
const found = [];
for (let c = 9; c < row.length; c++) {
  const raw = String(row[c] ?? '').trim();
  const name = cleanRegionLabel(raw);
  if (
    name &&
    /[А-Яа-яЁё]/.test(name) &&
    !/^\d/.test(name)
  ) {
    found.push({ col: c, name });
  }
}
if (found.length > best.length) {
  best = found;
}
}
return best;
}
function finiteNumber(value) {
if (value === null || value === undefined || value === '' || value === '-') {
return null;
}
if (typeof value === 'number') {
return Number.isFinite(value) ? value : null;
}
const s = String(value)
.replace(/\s/g, '')
.replace('%', '')
.replace(',', '.');
const n = Number(s);
if (!Number.isFinite(n)) return null;
return String(value).includes('%') ? n / 100 : n;
}
function fmt(value, type = 'number') {
const n = finiteNumber(value);
if (n === null) return '—';
if (type === 'percent') {
return (n * 100).toLocaleString('ru-RU', {
maximumFractionDigits: 1
}) + '%';
}
if (type === 'int') {
return Math.round(n).toLocaleString('ru-RU');
}
if (type === 'days') {
return n.toLocaleString('ru-RU', {
minimumFractionDigits: 0,
maximumFractionDigits: 1
});
}
return n.toLocaleString('ru-RU', {
maximumFractionDigits: 2
});
}
function escapeHtml(value) {
return String(value ?? '')
.replaceAll('&', '&')
.replaceAll('<', '<')
.replaceAll('>', '>')
.replaceAll('"', '"')
.replaceAll("'", ''');
}
function yn(value) {
return value
? '<span class="ok">Найден</span>'
: '<span class="bad">Не найден</span>';
}
function showView(name) {
state.activeView = name;
document.querySelectorAll('.view')
.forEach(view => view.classList.add('hidden'));
document.querySelectorAll('.nav-btn')
.forEach(btn => btn.classList.remove('active'));
const view = $(name + 'View');
if (view) view.classList.remove('hidden');
const navButton = document.querySelector(`[data-view="${name}"]`);
if (navButton) navButton.classList.add('active');
if (name === 'registry' || name === 'urd') {
requestAnimationFrame(() => {
Object.values(state.charts).forEach(chart => {
try { chart && chart.resize(); } catch (_) {}
});
});
}
}
document.querySelectorAll('.nav-btn').forEach(btn => {
btn.addEventListener('click', () => showView(btn.dataset.view));
});
function readRegistryRows(m) {
const rows = {};
[8,10,13,14,18,21,23,26,29,32,35].forEach(no => {
rows[no] = metricRow(m, no);
});
return rows;
}
function buildRegionalData(workbook) {
const result = [];
MAIN_SHEETS.forEach(district => {
const ws = workbook.Sheets[district];
if (!ws) return;
const m = matrix(ws);
 const regions = regionColumns(m);
 const registryRows = readRegistryRows(m);
 const urdStart = findUrdStart(m);
 regions.forEach(region => {
   const getRegistry = no =>
     registryRows[no] ? registryRows[no][region.col] : null;
   const getUrd = offset =>
     urdStart >= 0 && m[urdStart + offset]
       ? m[urdStart + offset][region.col]
       : null;
   result.push({
     district,
     region: region.name,
     egrn: getRegistry(8),
     noRights: getRegistry(10),
     landNoRights: getRegistry(13),
     landBorders: getRegistry(14),
     otherNoRights: getRegistry(18),
     regionalProperty: getRegistry(21),
     municipalProperty: getRegistry(23),
     subjectBorders: getRegistry(26),
     municipalBorders: getRegistry(29),
     settlementBorders: getRegistry(32),
     territorialZones: getRegistry(35),
     urdTotal: getUrd(0),
     urdPerDay: getUrd(1),
     urdElectronicCount: getUrd(2),
     urdElectronic: getUrd(3),
     mortgageTotal: getUrd(4),
     mortgagePerDay: getUrd(5),
     mortgageElectronicCount: getUrd(6),
     mortgageElectronic: getUrd(7),
     mortgage24: getUrd(8),
     dduTotal: getUrd(9),
     dduPerDay: getUrd(10),
     dduElectronicCount: getUrd(11),
     dduElectronic: getUrd(12),
     grpDays: getUrd(13),
     gkuDays: getUrd(14),
     epDays: getUrd(15),
     grpSusp: getUrd(16),
     gkuSusp: getUrd(17),
     epSusp: getUrd(18)
   });
 });
});
return result;
}
function readSourceRf(workbook) {
const baseSheet = workbook.Sheets['ЦФО'];
if (!baseSheet) return;
const m = matrix(baseSheet);
const registryRows = readRegistryRows(m);
const urdStart = findUrdStart(m);
const regMap = {
egrn: 8,
noRights: 10,
landNoRights: 13,
landBorders: 14,
otherNoRights: 18,
regionalProperty: 21,
municipalProperty: 23,
subjectBorders: 26,
municipalBorders: 29,
settlementBorders: 32,
territorialZones: 35
};
Object.entries(regMap).forEach(([key, no]) => {
state.sourceRf.registry[key] =
registryRows[no] ? registryRows[no][6] : null;
});
const urdOffsets = {
urdTotal: 0,
urdPerDay: 1,
urdElectronicCount: 2,
urdElectronic: 3,
mortgageTotal: 4,
mortgagePerDay: 5,
mortgageElectronicCount: 6,
mortgageElectronic: 7,
mortgage24: 8,
dduTotal: 9,
dduPerDay: 10,
dduElectronicCount: 11,
dduElectronic: 12,
grpDays: 13,
gkuDays: 14,
epDays: 15,
grpSusp: 16,
gkuSusp: 17,
epSusp: 18
};
Object.entries(urdOffsets).forEach(([key, offset]) => {
const row = urdStart >= 0 ? m[urdStart + offset] : null;
state.sourceRf.urd[key] = row ? row[6] : null;
});
}
function buildDiagnostics(workbook) {
const diagnostics = [];
workbook.SheetNames.forEach(name => {
const m = matrix(workbook.Sheets[name]);
diagnostics.push({
  name,
  regions: regionColumns(m).length,
  registry: hasMetric(m, 8),
  urd: findUrdStart(m) >= 0
});
});
return diagnostics;
}
function renderDiagnostics() {
$('diagnosticsBody').innerHTML = state.diagnostics.map(x => `<tr> <td><strong>${escapeHtml(x.name)}</strong></td> <td>${x.regions}</td> <td>${yn(x.registry)}</td> <td>${yn(x.urd)}</td> </tr>`).join('');
}
function dashboardTemplate(view) {
const title = view === 'registry'
? 'Полный и точный реестр'
: 'УРД';
const subtitle = view === 'registry'
? 'Ключевые показатели качества и полноты ЕГРН'
: 'Учетно-регистрационные действия, электроника, сроки и приостановления';
return `
 <div class= "section-title-row " >
 <div >
 <div class= "eyebrow " >АНАЛИТИКА ПО 89 РЕГИОНАЛЬНЫМ СТРОКАМ </div >
 <h2 >${title} </h2 >
 <p >${subtitle} </p >
 </div >
 <div class= "local-badge " >Excel обработан локально </div >
 </div >
<div class="panel controls-panel">
   <div class="controls-grid">
     <div class="field">
       <label>Показатель</label>
       <select id="${view}Metric"></select>
     </div>
     <div class="field">
       <label>Федеральный округ / группа</label>
       <select id="${view}District"></select>
     </div>
     <div class="field">
       <label>Субъект РФ</label>
       <select id="${view}Region"></select>
     </div>
   </div>
 </div>
 <div id="${view}RegionFocus" class="panel v9-region-focus hidden"></div>
 <div id="${view}Kpis" class="kpi-grid"></div>
 <div class="dashboard-grid">
   <div class="panel map-panel">
     <div class="panel-title">
       <div>
         <h3>Карта регионов</h3>
         <p id="${view}MapSubtitle"></p>
       </div>
       <div id="${view}MapBadge" class="map-badge">Подготовка карты</div>
     </div>
     <div id="${view}MapWrap" class="map-wrap">
       <div id="${view}Map" class="map-chart"></div>
     </div>
     <div id="${view}MapNote" class="map-note"></div>
   </div>
   <div class="rank-column">
     <div class="panel rank-panel">
       <div class="panel-title">
         <div>
           <h3 id="${view}TopTitle">ТОП-10</h3>
           <p>По выбранному показателю</p>
         </div>
       </div>
       <div id="${view}TopList" class="rank-list"></div>
     </div>
     <div class="panel rank-panel">
       <div class="panel-title">
         <div>
           <h3 id="${view}BottomTitle">АНТИ-10</h3>
           <p>По выбранному показателю</p>
         </div>
       </div>
       <div id="${view}BottomList" class="rank-list"></div>
     </div>
   </div>
 </div>
 <div class="panel district-panel">
   <div class="panel-title">
     <div>
       <h3>Сравнение федеральных округов / групп</h3>
       <p id="${view}DistrictSubtitle"></p>
     </div>
   </div>
   <div id="${view}DistrictChart" class="district-chart"></div>
 </div>
 <div class="panel table-panel">
   <div class="panel-title">
     <div>
       <h3>Рейтинг субъектов РФ</h3>
       <p id="${view}TableSubtitle"></p>
     </div>
   </div>
   <div class="table-wrap">
     <table class="data-table">
       <thead>
         <tr>
           <th>№</th>
           <th>ФО / группа</th>
           <th>Субъект РФ</th>
           <th id="${view}ValueHeader">Значение</th>
         </tr>
       </thead>
       <tbody id="${view}TableBody"></tbody>
     </table>
   </div>
 </div>
`;
}
function getMetrics(view) {
return view === 'registry' ? REGISTRY_METRICS : URD_METRICS;
}
function setupDashboard(view) {
const host = $(view + 'Dashboard');
host.innerHTML = dashboardTemplate(view);
populateMetricSelect(view);
populateDistrictSelect(view);
populateRegionSelect(view);
bindDashboardControls(view);
renderDashboard(view);
}
function populateMetricSelect(view) {
const metrics = getMetrics(view);
const select = $(view + 'Metric');
select.innerHTML = Object.entries(metrics)
.map(([key, cfg]) =>
`<option value="${key}">${escapeHtml(cfg.label)}</option>`
).join('');
select.value = state.filters[view].metric;
}
function populateDistrictSelect(view) {
const select = $(view + 'District');
select.innerHTML =
'<option value="ALL">Все регионы</option>' +
MAIN_SHEETS.map(name =>
`<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`
).join('');
select.value = state.filters[view].district;
}
function populateRegionSelect(view) {
const select = $(view + 'Region');
const district = state.filters[view].district;
const regions = state.data
.filter(row => district === 'ALL' || row.district === district)
.map(row => row.region)
.sort((a,b) => a.localeCompare(b, 'ru'));
select.innerHTML =
'<option value="ALL">Все субъекты</option>' +
regions.map(name =>
`<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`
).join('');
const selected = state.filters[view].region;
select.value = regions.includes(selected) ? selected : 'ALL';
if (select.value === 'ALL') {
state.filters[view].region = 'ALL';
}
}
function bindDashboardControls(view) {
$(view + 'Metric').addEventListener('change', event => {
state.filters[view].metric = event.target.value;
renderDashboard(view);
});
$(view + 'District').addEventListener('change', event => {
state.filters[view].district = event.target.value;
state.filters[view].region = 'ALL';
populateRegionSelect(view);
renderDashboard(view);
});
$(view + 'Region').addEventListener('change', event => {
state.filters[view].region = event.target.value;
renderDashboard(view);
});
const selectRegion = region => {
const found = state.data.find(x => x.region === region);
if (!found) return;
state.filters[view].region = found.region;
populateRegionSelect(view);
$(view + 'Region').value = found.region;
renderDashboard(view);
};
$(view + 'TableBody').addEventListener('click', event => {
const row = event.target.closest('tr[data-region]');
if (!row) return;
selectRegion(row.dataset.region);
});
[view + 'TopList', view + 'BottomList'].forEach(id => {
$(id).addEventListener('click', event => {
const row = event.target.closest('[data-region]');
if (!row) return;
selectRegion(row.dataset.region);
});
});
$(view + 'RegionFocus').addEventListener('click', event => {
const reset = event.target.closest('[data-reset-region]');
if (!reset) return;
state.filters[view].region = 'ALL';
populateRegionSelect(view);
renderDashboard(view);
});
}
function filteredData(view) {
const filter = state.filters[view];
return state.data.filter(row => {
if (filter.district !== 'ALL' && row.district !== filter.district) {
return false;
}
return true;
});
}
function validMetricRows(data, metricKey) {
return data
.map(row => ({ ...row, __value: finiteNumber(row[metricKey]) }))
.filter(row => row.__value !== null);
}
function isTechnicalZero(row, metricKey, cfg) {
const value = finiteNumber(row[metricKey]);
return (
cfg.ranking !== 'neutral' &&
row.district === 'НР1' &&
value === 0
);
}
function analyticMetricRows(data, metricKey, cfg) {
return validMetricRows(data, metricKey)
.filter(row => !isTechnicalZero(row, metricKey, cfg));
}
function technicalZeroRows(data, metricKey, cfg) {
return validMetricRows(data, metricKey)
.filter(row => isTechnicalZero(row, metricKey, cfg));
}
function aggregateValue(rows, metricKey, cfg) {
const values = analyticMetricRows(rows, metricKey, cfg)
.map(row => row.__value);
if (!values.length) return null;
if (cfg.aggregate === 'sum') {
return values.reduce((sum, value) => sum + value, 0);
}
return values.reduce((sum, value) => sum + value, 0) / values.length;
}
function medianValue(rows, metricKey, cfg) {
const values = analyticMetricRows(rows, metricKey, cfg)
.map(row => row.__value)
.sort((a,b) => a - b);
if (!values.length) return null;
const middle = Math.floor(values.length / 2);
if (values.length % 2 === 1) {
return values[middle];
}
return (values[middle - 1] + values[middle]) / 2;
}
function rankRows(rows, metricKey, cfg, best = true) {
let valid = analyticMetricRows(rows, metricKey, cfg);
if (cfg.ranking === 'neutral' && !best) {
const positive = valid.filter(row => row.__value > 0);
if (positive.length) valid = positive;
}
if (cfg.ranking === 'low') {
valid.sort((a,b) =>
best ? a.__value - b.__value : b.__value - a.__value
);
} else {
valid.sort((a,b) =>
best ? b.__value - a.__value : a.__value - b.__value
);
}
return valid;
}
function scopeLabel(view) {
const f = state.filters[view];
if (f.district !== 'ALL') return f.district;
return 'Все регионы';
}
function regionContextMetricKeys(view, currentKey) {
const base = view === 'registry'
? ['egrn', 'noRights', 'landBorders', 'territorialZones']
: ['urdTotal', 'urdElectronic', 'mortgage24', 'grpDays'];
const unique = [currentKey, ...base]
.filter((key, index, arr) => arr.indexOf(key) === index);
return unique.slice(0, 4);
}
function renderRegionFocus(view, metricKey, cfg) {
const host = $(view + 'RegionFocus');
const selected = state.filters[view].region;
if (!host || selected === 'ALL') {
if (host) host.classList.add('hidden');
return;
}
const row = state.data.find(item => item.region === selected);
if (!row) {
host.classList.add('hidden');
return;
}
const metrics = getMetrics(view);
const keys = regionContextMetricKeys(view, metricKey);
const cells = keys.map(key => {
const metricCfg = metrics[key];
const value = finiteNumber(row[key]);
const techZero = isTechnicalZero(row, key, metricCfg);
return `
  <div class="v9-focus-metric">
    <span>${escapeHtml(metricCfg.short)}</span>
    <strong class="${techZero ? 'v9-tech-zero' : ''}">
      ${fmt(value, metricCfg.format)}
    </strong>
  </div>
`;
}).join('');
const currentTechZero = isTechnicalZero(row, metricKey, cfg);
const comparisonRows = filteredData(view);
const ranking = rankRows(comparisonRows, metricKey, cfg, true);
const position = ranking.findIndex(item => item.region === row.region);
const positionText = currentTechZero
? 'вне рейтинга: технический ноль'
: (position >= 0
? `место ${position + 1} из ${ranking.length}`
: 'нет числового значения для рейтинга');
host.innerHTML = `
 <div class= "v9-focus-head " >
 <div >
 <div class= "eyebrow " >ВЫБРАННЫЙ СУБЪЕКТ </div >
 <div class= "v9-focus-title " >${escapeHtml(row.region)} </div >
 <div class= "v9-focus-meta " >
${escapeHtml(row.district)} • ${escapeHtml(positionText)}
 </div >
 </div >
  <button class="v9-focus-reset" type="button" data-reset-region>
     Сбросить субъект
   </button>
 </div>
 <div class="v9-focus-grid">${cells}</div>
 ${currentTechZero ? `
   <div class="v9-tech-note">
     Значение 0 по выбранному качественному показателю на листе НР1
     показано как исходное, но считается техническим нулем:
     оно не участвует в среднем, ТОП/АНТИ и цветовой шкале карты.
   </div>
 ` : `
   <div class="v9-tech-note">
     Выбор субъекта не сужает аналитику до одной строки.
     KPI, ТОП/АНТИ, карта и рейтинг продолжают показывать
     ${escapeHtml(scopeLabel(view))}; выбранный субъект подсвечивается для сравнения.
   </div>
 `}
`;
host.classList.remove('hidden');
}
function renderKpis(view, rows, metricKey, cfg) {
const valid = analyticMetricRows(rows, metricKey, cfg);
const techZeros = technicalZeroRows(rows, metricKey, cfg);
const aggregate = aggregateValue(rows, metricKey, cfg);
const median = medianValue(rows, metricKey, cfg);
const best = rankRows(rows, metricKey, cfg, true)[0] || null;
const worst = rankRows(rows, metricKey, cfg, false)[0] || null;
const isAll =
state.filters[view].district === 'ALL';
const sourceRf = isAll
? finiteNumber(state.sourceRf[view][metricKey])
: null;
if (cfg.ranking === 'neutral') {
const primaryValue = sourceRf !== null ? sourceRf : aggregate;
const primaryLabel = sourceRf !== null
? 'Показатель по РФ в исходном файле'
: 'Сумма по текущему фильтру';
$(''+view+'Kpis').innerHTML = `
   <div class="kpi-card primary">
     <span>${primaryLabel}</span>
     <strong>${fmt(primaryValue, cfg.format)}</strong>
     <small>${escapeHtml(scopeLabel(view))}</small>
   </div>
   <div class="kpi-card blue">
     <span>Максимальное значение</span>
     <strong>${best ? fmt(best.__value, cfg.format) : '—'}</strong>
     <small>${best ? escapeHtml(best.region) : 'Нет данных'}</small>
   </div>
   <div class="kpi-card">
     <span>Медиана субъектов</span>
     <strong>${fmt(median, cfg.format)}</strong>
     <small>Медианное значение текущей выборки</small>
   </div>
   <div class="kpi-card attention">
     <span>Регионов с данными</span>
     <strong>${valid.length}</strong>
     <small>Из ${rows.length} строк текущей выборки</small>
   </div>
 `;
 return;
}
const primaryValue = sourceRf !== null ? sourceRf : aggregate;
const primaryLabel = sourceRf !== null
? 'Показатель по РФ в исходном файле'
: 'Среднее по текущему фильтру';
$(''+view+'Kpis').innerHTML = `
 <div class= "kpi-card primary " >
 <span >${primaryLabel} </span >
 <strong >${fmt(primaryValue, cfg.format)} </strong >
 <small >${escapeHtml(scopeLabel(view))} </small >
 </div >
<div class="kpi-card blue">
  <span>Среднее значение субъектов</span>
  <strong>${fmt(aggregate, cfg.format)}</strong>
  <small>В расчете: ${valid.length}${techZeros.length ? ` • тех. нулей исключено: ${techZeros.length}` : ''}</small>
</div>
<div class="kpi-card">
  <span>Лучший результат</span>
  <strong>${best ? fmt(best.__value, cfg.format) : '—'}</strong>
  <small>${best ? escapeHtml(best.region) : 'Нет данных'}</small>
</div>
<div class="kpi-card attention">
  <span>Зона внимания</span>
  <strong>${worst ? fmt(worst.__value, cfg.format) : '—'}</strong>
  <small>${worst ? escapeHtml(worst.region) : 'Нет данных'}</small>
</div>
`;
}
function rankTitles(cfg) {
if (cfg.ranking === 'neutral') {
return ['Наибольшие значения', 'Наименьшие ненулевые значения'];
}
return ['ТОП-10', 'АНТИ-10'];
}
function renderRankLists(view, rows, metricKey, cfg) {
const [topTitle, bottomTitle] = rankTitles(cfg);
$(view + 'TopTitle').textContent = topTitle;
$(view + 'BottomTitle').textContent = bottomTitle;
const top = rankRows(rows, metricKey, cfg, true).slice(0,10);
const bottom = rankRows(rows, metricKey, cfg, false).slice(0,10);
const techZeros = technicalZeroRows(rows, metricKey, cfg);
const exclusionNote = techZeros.length
? `<div class="v9-rank-note"> Технические нули НР1 исключены из рейтинга: ${techZeros.length}. </div>`
: '';
$(view + 'TopList').innerHTML = exclusionNote + (
top.length
? top.map((row, index) => `<div class="rank-row" data-region="${escapeHtml(row.region)}"> <div class="rank-pos">${index + 1}</div> <div class="rank-name" title="${escapeHtml(row.region)}"> ${escapeHtml(row.region)} <span class="v9-rank-meta">${escapeHtml(row.district)}</span> </div> <div class="rank-value">${fmt(row.__value, cfg.format)}</div> </div>`).join('')
: '<div class="map-note">Нет данных для текущего фильтра.</div>'
);
$(view + 'BottomList').innerHTML = exclusionNote + (
bottom.length
? bottom.map((row, index) => `<div class="rank-row attn" data-region="${escapeHtml(row.region)}"> <div class="rank-pos">${index + 1}</div> <div class="rank-name" title="${escapeHtml(row.region)}"> ${escapeHtml(row.region)} <span class="v9-rank-meta">${escapeHtml(row.district)}</span> </div> <div class="rank-value">${fmt(row.__value, cfg.format)}</div> </div>`).join('')
: '<div class="map-note">Нет данных для текущего фильтра.</div>'
);
}
function districtAggregates(rows, metricKey, cfg) {
const groups = new Map();
rows.forEach(row => {
if (!groups.has(row.district)) groups.set(row.district, []);
groups.get(row.district).push(row);
});
const result = [];
groups.forEach((items, district) => {
const value = aggregateValue(items, metricKey, cfg);
if (value !== null) {
result.push({ district, value });
}
});
result.sort((a,b) => {
if (cfg.ranking === 'low') return a.value - b.value;
return b.value - a.value;
});
return result;
}
function getChart(key, elementId) {
if (typeof echarts === 'undefined') return null;
const el = $(elementId);
if (!el) return null;
if (!state.charts[key]) {
state.charts[key] = echarts.init(el, null, { renderer: 'canvas' });
}
return state.charts[key];
}
function disposeChart(key) {
const chart = state.charts[key];
if (chart) {
try { chart.dispose(); } catch (_) {}
delete state.charts[key];
}
}
function disposeAllCharts() {
Object.keys(state.charts).forEach(disposeChart);
}
function renderDistrictChart(view, rows, metricKey, cfg) {
const chart = getChart(view + 'District', view + 'DistrictChart');
if (!chart) return;
const data = districtAggregates(rows, metricKey, cfg);
const selectedDistrict = state.filters[view].district;
$(view + 'DistrictSubtitle').textContent =
`${cfg.short}: ${cfg.aggregate === 'sum' ? 'сумма' : 'среднее'} по субъектам • сравнение всех ФО / групп`;
chart.setOption({
animationDuration: 350,
grid: { left: 80, right: 26, top: 16, bottom: 38, containLabel: true },
tooltip: {
trigger: 'axis',
axisPointer: { type: 'shadow' },
formatter: params => {
const item = params[0];
return `<strong>${escapeHtml(item.name)}</strong><br>${escapeHtml(cfg.label)}: ${fmt(item.value, cfg.format)}`;
}
},
xAxis: {
type: 'value',
axisLabel: {
color: '#71849a',
formatter: value => compactAxis(value, cfg.format)
},
splitLine: { lineStyle: { color: '#e9f0f6' } }
},
yAxis: {
type: 'category',
inverse: true,
data: data.map(x => x.district),
axisLabel: { color: '#12345b', fontWeight: 700 },
axisTick: { show: false },
axisLine: { show: false }
},
series: [{
type: 'bar',
data: data.map(x => ({
value: x.value,
itemStyle: {
color:
selectedDistrict !== 'ALL' && x.district === selectedDistrict
? '#26a269'
: '#0d68b2',
borderRadius: [0,6,6,0]
}
})),
barMaxWidth: 22,
label: {
show: true,
position: 'right',
color: '#12345b',
formatter: p => fmt(p.value, cfg.format)
}
}]
}, true);
requestAnimationFrame(() => chart.resize());
}
function compactAxis(value, format) {
if (format === 'percent') return Math.round(value * 100) + '%';
if (Math.abs(value) >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'м';
if (Math.abs(value) >= 1_000) return (value / 1_000).toFixed(0) + 'к';
return String(Math.round(value * 10) / 10);
}
function renderTable(view, rows, metricKey, cfg) {
const ranked = rankRows(rows, metricKey, cfg, true);
const techZeros = technicalZeroRows(rows, metricKey, cfg);
$(view + 'ValueHeader').textContent = cfg.short;
$(view + 'TableSubtitle').textContent =
`${scopeLabel(view)} • в рейтинге: ${ranked.length}` +
(techZeros.length ? `• технических нулей: ${techZeros.length}` : '');
const rankedHtml = ranked.map((row, index) => `<tr data-region="${escapeHtml(row.region)}" class="${state.filters[view].region === row.region ? 'selected' : ''}" > <td>${index + 1}</td> <td><strong>${escapeHtml(row.district)}</strong></td> <td>${escapeHtml(row.region)}</td> <td class="value-cell">${fmt(row.__value, cfg.format)}</td> </tr>`).join('');
const technicalHtml = techZeros.map(row => `<tr data-region="${escapeHtml(row.region)}" class="v9-table-tech ${state.filters[view].region === row.region ? 'selected' : ''}" > <td>—</td> <td><strong>${escapeHtml(row.district)}</strong></td> <td> ${escapeHtml(row.region)} <span class="v9-table-status">технический ноль</span> </td> <td class="value-cell v9-tech-zero">${fmt(row.__value, cfg.format)}</td> </tr>`).join('');
$(view + 'TableBody').innerHTML =
(rankedHtml || technicalHtml)
? rankedHtml + technicalHtml
: '<tr><td colspan="4">Нет данных для текущего фильтра.</td></tr>';
}
function prepareNameMatcher() {
const exact = new Map();
const reducedBuckets = new Map();
const canonicalBuckets = new Map();
state.data.forEach(row => {
exact.set(nameKey(row.region), row.region);
const reduced = reducedNameKey(row.region);
if (!reducedBuckets.has(reduced)) reducedBuckets.set(reduced, []);
reducedBuckets.get(reduced).push(row.region);
const canonical = canonicalNameKey(row.region);
if (!canonicalBuckets.has(canonical)) canonicalBuckets.set(canonical, []);
canonicalBuckets.get(canonical).push(row.region);
});
return rawName => {
const alias = aliasMapName(rawName);
if (alias && state.data.some(row => row.region === alias)) {
return alias;
}
const exactMatch = exact.get(nameKey(rawName));
if (exactMatch) return exactMatch;
const reduced = reducedNameKey(rawName);
const reducedBucket = reducedBuckets.get(reduced);
if (reducedBucket && reducedBucket.length === 1) {
  return reducedBucket[0];
}
const canonical = canonicalNameKey(rawName);
const canonicalBucket = canonicalBuckets.get(canonical);
if (canonicalBucket && canonicalBucket.length === 1) {
  return canonicalBucket[0];
}
return null;
};
}
function shiftNegativeLongitudes(node) {
if (!Array.isArray(node)) return;
if (
node.length >= 2 &&
typeof node[0] === 'number' &&
typeof node[1] === 'number'
) {
if (node[0] < 0) node[0] += 360;
return;
}
node.forEach(shiftNegativeLongitudes);
}
async function ensureRussiaMap() {
if (state.map.loaded) return true;
if (state.map.error) return false;
if (state.map.promise) {
return state.map.promise;
}
if (typeof echarts === 'undefined') {
state.map.error = 'Библиотека карты не загрузилась';
return false;
}
state.map.loading = true;
state.map.promise = (async () => {
try {
const response = await fetch(MAP_URL, { cache: 'force-cache' });
if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const geoJson = await response.json();
   const matchName = prepareNameMatcher();
   const matched = new Set();
   (geoJson.features || []).forEach(feature => {
     const props = feature.properties || (feature.properties = {});
     const candidates = [];
     [
       props.NL_NAME_1,
       props.NAME_1,
       props['name:ru'],
       props.name,
       props.NAME_ENG,
       props.ENG_NAME,
       props.VARNAME_1
     ].forEach(value => {
       if (!value) return;
       String(value)
         .split('|')
         .map(x => x.trim())
         .filter(Boolean)
         .forEach(x => candidates.push(x));
     });
     let dashboardName = null;
     for (const candidate of candidates) {
       dashboardName = matchName(candidate);
       if (dashboardName) break;
     }
     if (dashboardName) {
       props.dashboardName = dashboardName;
       matched.add(dashboardName);
     } else {
       props.dashboardName =
         cleanRegionLabel(candidates[0] || props.NAME_1 || props.name || '');
     }
     if (feature.geometry && feature.geometry.coordinates) {
       shiftNegativeLongitudes(feature.geometry.coordinates);
     }
   });
   echarts.registerMap('rosreestr-russia', geoJson);
   state.map.matchedNames = matched;
   state.map.loaded = true;
   state.map.error = null;
   return true;
 } catch (error) {
   console.warn('Не удалось загрузить GeoJSON карты:', error);
   state.map.error = 'Географическая карта недоступна';
   return false;
 } finally {
   state.map.loading = false;
 }
})();
const result = await state.map.promise;
return result;
}
function valueRange(rows, metricKey, cfg) {
const values = analyticMetricRows(rows, metricKey, cfg).map(x => x.__value);
if (!values.length) return { min: 0, max: 1 };
let min = Math.min(...values);
let max = Math.max(...values);
if (min === max) {
min = min * .95;
max = max * 1.05 || 1;
}
return { min, max };
}
function mapColors(cfg) {
if (cfg.ranking === 'low') {
return ['#7bc494','#efc46d','#d96b67'];
}
if (cfg.ranking === 'high') {
return ['#e9f3fb','#72aeda','#1e9b65'];
}
return ['#e9f3fb','#76add4','#0d68b2'];
}
function tileColor(value, min, max, cfg) {
const t = max === min
? .5
: Math.max(0, Math.min(1, (value - min) / (max - min)));
if (cfg.ranking === 'neutral') {
const alpha = .16 + t * .62;
return `rgba(13,104,178,${alpha.toFixed(3)})`;
}
let effective = t;
if (cfg.ranking === 'low') {
effective = 1 - t;
}
const alpha = .16 + effective * .58;
return `rgba(38,162,105,${alpha.toFixed(3)})`;
}

// ===== HEX MAP RENDER =====
function renderHexMap(view, rows, metricKey, cfg) {
const host = $(view + 'Map');
const badge = $(view + 'MapBadge');
const note = $(view + 'MapNote');
const subtitle = $(view + 'MapSubtitle');
const selectedRegion = state.filters[view].region;

subtitle.textContent =
`${cfg.label} • ${scopeLabel(view)}` +
(selectedRegion !== 'ALL' ? ` • выбран: ${selectedRegion}` : '');

const valid = analyticMetricRows(rows, metricKey, cfg);
const range = valueRange(rows, metricKey, cfg);
const colors = mapColors(cfg);

// Определяем цвета для легенды
const legendColors = cfg.ranking === 'low'
? ['#7bc494','#efc46d','#d96b67']
: cfg.ranking === 'high'
? ['#e9f3fb','#72aeda','#1e9b65']
: ['#e9f3fb','#76add4','#0d68b2'];

host.innerHTML = `
<div class="hex-map-container">
  <div class="hex-grid" id="${view}HexGrid"></div>
</div>
<div class="hex-legend">
  <span class="hex-legend-label">ниже</span>
  <div class="hex-legend-bar" style="background:linear-gradient(to right,${legendColors.join(',')})"></div>
  <span class="hex-legend-label">выше</span>
</div>
`;

const grid = $(view + 'HexGrid');

// Собираем все занятые ячейки
const occupiedCells = new Map();
valid.forEach(row => {
const pos = HEX_POSITIONS[row.region];
if (pos) {
  const key = `${pos[0]},${pos[1]}`;
  occupiedCells.set(key, row);
}
});

// Определяем границы сетки
let minRow = Infinity, maxRow = -Infinity, minCol = Infinity, maxCol = -Infinity;
occupiedCells.forEach((row, key) => {
const [r, c] = key.split(',').map(Number);
if (r < minRow) minRow = r;
if (r > maxRow) maxRow = r;
if (c < minCol) minCol = c;
if (c > maxCol) maxCol = c;
});

// Добавляем все регионы из HEX_POSITIONS (даже без данных)
Object.entries(HEX_POSITIONS).forEach(([regionName, pos]) => {
const [r, c] = pos;
if (r < minRow) minRow = r;
if (r > maxRow) maxRow = r;
if (c < minCol) minCol = c;
if (c > maxCol) maxCol = c;
});

// Рендерим ячейки
Object.entries(HEX_POSITIONS).forEach(([regionName, pos]) => {
const [r, c] = pos;
const div = document.createElement('div');
div.className = 'hex-cell';
div.style.gridColumn = (c - minCol + 1);
div.style.gridRow = (r - minRow + 1);

const row = occupiedCells.get(`${r},${c}`);
if (row) {
  const color = tileColor(row.__value, range.min, range.max, cfg);
  const isSelected = selectedRegion !== 'ALL' && row.region === selectedRegion;
  const shortName = row.region.length > 12
    ? row.region.split(' ')[0]
    : row.region;

  div.innerHTML = `
    <div class="hex-shape" style="background:${color}">
      <div class="hex-label" title="${escapeHtml(row.region)}">${escapeHtml(shortName)}</div>
      <div class="hex-value">${fmt(row.__value, cfg.format)}</div>
    </div>
    <div class="hex-tooltip">
      <strong>${escapeHtml(row.region)}</strong><br>
      ${escapeHtml(cfg.label)}: ${fmt(row.__value, cfg.format)}
    </div>
  `;

  if (isSelected) {
    div.classList.add('selected');
  }

  div.addEventListener('click', () => {
    state.filters[view].region = row.region;
    populateRegionSelect(view);
    $(view + 'Region').value = row.region;
    renderDashboard(view);
  });
} else {
  // Пустая ячейка — показываем только название региона
  const shortName = regionName.length > 12
    ? regionName.split(' ')[0]
    : regionName;
  div.innerHTML = `
    <div class="hex-shape" style="background:#d0d8e0">
      <div class="hex-label" style="color:#71849a">${escapeHtml(shortName)}</div>
    </div>
    <div class="hex-tooltip">
      <strong>${escapeHtml(regionName)}</strong><br>
      Нет данных
    </div>
  `;
  div.style.opacity = '0.5';
}

grid.appendChild(div);
});

badge.textContent = `На карте: ${valid.length}/${rows.length}`;
note.textContent = `Показано ${valid.length} регионов в виде шестиугольников.`;
}

async function renderMap(view, rows, metricKey, cfg) {
const badge = $(view + 'MapBadge');
const note = $(view + 'MapNote');
const subtitle = $(view + 'MapSubtitle');
const selectedRegion = state.filters[view].region;
subtitle.textContent =
`${cfg.label} • ${scopeLabel(view)}` +
(selectedRegion !== 'ALL' ? `• выбран: ${selectedRegion}` : '');
badge.textContent = 'Подготовка карты';
note.textContent = '';

// Всегда используем hex-карту
renderHexMap(view, rows, metricKey, cfg);
}

function renderDashboard(view) {
if (!state.data.length) return;
const metricKey = state.filters[view].metric;
const cfg = getMetrics(view)[metricKey];
const rows = filteredData(view);
renderRegionFocus(view, metricKey, cfg);
renderKpis(view, rows, metricKey, cfg);
renderRankLists(view, rows, metricKey, cfg);
renderDistrictChart(view, state.data, metricKey, cfg);
renderTable(view, rows, metricKey, cfg);
renderMap(view, rows, metricKey, cfg);
}
function resetMapState() {
state.map.loaded = false;
state.map.loading = false;
state.map.error = null;
state.map.promise = null;
state.map.matchedNames = new Set();
disposeChart('registryMap');
disposeChart('urdMap');
}
async function processFile(file) {
$('fileName').textContent = file.name;
$('parseStatus').textContent = 'Чтение...';
try {
if (typeof XLSX === 'undefined') {
throw new Error('Библиотека XLSX не загрузилась');
}
const buffer = await file.arrayBuffer();
 const workbook = XLSX.read(buffer, { type: 'array' });
 state.workbook = workbook;
 state.data = buildRegionalData(workbook);
 state.diagnostics = buildDiagnostics(workbook);
 state.sourceRf = { registry: {}, urd: {} };
 disposeAllCharts();
 readSourceRf(workbook);
 resetMapState();
 $('sheetCount').textContent = workbook.SheetNames.length;
 const expected = EXPECTED_SHEETS.filter(
   name => workbook.SheetNames.includes(name)
 ).length;
 $('expectedCount').textContent =
   `${expected} / ${EXPECTED_SHEETS.length}`;
 $('regionCount').textContent = state.data.length;
 $('parseStatus').textContent = 'Данные извлечены';
 renderDiagnostics();
 ensureV9Styles();
 $('emptyState').classList.add('hidden');
 $('workspace').classList.remove('hidden');
 setupDashboard('registry');
 setupDashboard('urd');
 showView('registry');
} catch (error) {
console.error(error);
$('parseStatus').textContent = 'Ошибка чтения';
alert(
  'Не удалось обработать Excel-файл. ' +
  (error?.message || '')
);
}
}
$('fileInput').addEventListener('change', async event => {
const file = event.target.files?.[0];
if (!file) return;
await processFile(file);
});
window.addEventListener('resize', () => {
Object.values(state.charts).forEach(chart => {
try { chart && chart.resize(); } catch (_) {}
});
});
