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
    matchedNames: new Set()
  }
};

const $ = id => document.getElementById(id);

const norm = value =>
  String(value ?? '')
    .replace(/ё/g, 'е')
    .replace(/[‐‑‒–—―]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

function cleanRegionLabel(value) {
  return String(value ?? '')
    .replace(/\s*\(\s*НСПД[^)]*\)/gi, '')
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
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
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
  $('diagnosticsBody').innerHTML = state.diagnostics.map(x => `
    <tr>
      <td><strong>${escapeHtml(x.name)}</strong></td>
      <td>${x.regions}</td>
      <td>${yn(x.registry)}</td>
      <td>${yn(x.urd)}</td>
    </tr>
  `).join('');
}

function dashboardTemplate(view) {
  const title = view === 'registry'
    ? 'Полный и точный реестр'
    : 'УРД';

  const subtitle = view === 'registry'
    ? 'Ключевые показатели качества и полноты ЕГРН'
    : 'Учетно-регистрационные действия, электроника, сроки и приостановления';

  return `
    <div class="section-title-row">
      <div>
        <div class="eyebrow">АНАЛИТИКА ПО 89 РЕГИОНАЛЬНЫМ СТРОКАМ</div>
        <h2>${title}</h2>
        <p>${subtitle}</p>
      </div>
      <div class="local-badge">Excel обработан локально</div>
    </div>

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

  $(view + 'TableBody').addEventListener('click', event => {
    const row = event.target.closest('tr[data-region]');
    if (!row) return;

    const region = row.dataset.region;
    const found = state.data.find(x => x.region === region);
    if (!found) return;

    state.filters[view].district = found.district;
    state.filters[view].region = found.region;

    $(view + 'District').value = found.district;
    populateRegionSelect(view);
    $(view + 'Region').value = found.region;

    renderDashboard(view);
  });
}

function filteredData(view) {
  const filter = state.filters[view];

  return state.data.filter(row => {
    if (filter.district !== 'ALL' && row.district !== filter.district) {
      return false;
    }
    if (filter.region !== 'ALL' && row.region !== filter.region) {
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

function aggregateValue(rows, metricKey, cfg) {
  const values = rows
    .map(row => finiteNumber(row[metricKey]))
    .filter(value => value !== null);

  if (!values.length) return null;

  if (cfg.aggregate === 'sum') {
    return values.reduce((sum, value) => sum + value, 0);
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function rankRows(rows, metricKey, cfg, best = true) {
  const valid = validMetricRows(rows, metricKey);

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
  if (f.region !== 'ALL') return f.region;
  if (f.district !== 'ALL') return f.district;
  return 'Все регионы';
}

function renderKpis(view, rows, metricKey, cfg) {
  const valid = validMetricRows(rows, metricKey);
  const aggregate = aggregateValue(rows, metricKey, cfg);

  const best = rankRows(rows, metricKey, cfg, true)[0] || null;
  const worst = rankRows(rows, metricKey, cfg, false)[0] || null;

  const isAll =
    state.filters[view].district === 'ALL' &&
    state.filters[view].region === 'ALL';

  const sourceRf = isAll
    ? finiteNumber(state.sourceRf[view][metricKey])
    : null;

  const primaryValue = sourceRf !== null ? sourceRf : aggregate;

  const primaryLabel = sourceRf !== null
    ? 'Показатель по РФ в исходном файле'
    : (cfg.aggregate === 'sum' ? 'Сумма по выборке' : 'Среднее по выборке');

  const secondLabel = cfg.aggregate === 'sum'
    ? 'Сумма по текущему фильтру'
    : 'Среднее по текущему фильтру';

  $(view + 'Kpis').innerHTML = `
    <div class="kpi-card primary">
      <span>${primaryLabel}</span>
      <strong>${fmt(primaryValue, cfg.format)}</strong>
      <small>${escapeHtml(scopeLabel(view))}</small>
    </div>

    <div class="kpi-card blue">
      <span>${secondLabel}</span>
      <strong>${fmt(aggregate, cfg.format)}</strong>
      <small>Регионов с данными: ${valid.length}</small>
    </div>

    <div class="kpi-card">
      <span>${cfg.ranking === 'neutral' ? 'Максимальное значение' : 'Лучший результат'}</span>
      <strong>${best ? fmt(best.__value, cfg.format) : '—'}</strong>
      <small>${best ? escapeHtml(best.region) : 'Нет данных'}</small>
    </div>

    <div class="kpi-card attention">
      <span>${cfg.ranking === 'neutral' ? 'Минимальное значение' : 'Зона внимания'}</span>
      <strong>${worst ? fmt(worst.__value, cfg.format) : '—'}</strong>
      <small>${worst ? escapeHtml(worst.region) : 'Нет данных'}</small>
    </div>
  `;
}

function rankTitles(cfg) {
  if (cfg.ranking === 'neutral') {
    return ['Максимальные значения', 'Минимальные значения'];
  }
  return ['ТОП-10', 'АНТИ-10'];
}

function renderRankLists(view, rows, metricKey, cfg) {
  const [topTitle, bottomTitle] = rankTitles(cfg);
  $(view + 'TopTitle').textContent = topTitle;
  $(view + 'BottomTitle').textContent = bottomTitle;

  const top = rankRows(rows, metricKey, cfg, true).slice(0,10);
  const bottom = rankRows(rows, metricKey, cfg, false).slice(0,10);

  $(view + 'TopList').innerHTML = top.length
    ? top.map((row, index) => `
        <div class="rank-row">
          <div class="rank-pos">${index + 1}</div>
          <div class="rank-name" title="${escapeHtml(row.region)}">
            ${escapeHtml(row.region)}
          </div>
          <div class="rank-value">${fmt(row.__value, cfg.format)}</div>
        </div>
      `).join('')
    : '<div class="map-note">Нет данных для текущего фильтра.</div>';

  $(view + 'BottomList').innerHTML = bottom.length
    ? bottom.map((row, index) => `
        <div class="rank-row attn">
          <div class="rank-pos">${index + 1}</div>
          <div class="rank-name" title="${escapeHtml(row.region)}">
            ${escapeHtml(row.region)}
          </div>
          <div class="rank-value">${fmt(row.__value, cfg.format)}</div>
        </div>
      `).join('')
    : '<div class="map-note">Нет данных для текущего фильтра.</div>';
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

  $(view + 'DistrictSubtitle').textContent =
    `${cfg.short}: ${cfg.aggregate === 'sum' ? 'сумма' : 'среднее'} по субъектам`;

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
      data: data.map(x => x.value),
      barMaxWidth: 22,
      itemStyle: {
        color: '#0d68b2',
        borderRadius: [0,6,6,0]
      },
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

  $(view + 'ValueHeader').textContent = cfg.short;
  $(view + 'TableSubtitle').textContent =
    `${scopeLabel(view)} • ${ranked.length} регионов с числовым значением`;

  $(view + 'TableBody').innerHTML = ranked.length
    ? ranked.map((row, index) => `
      <tr
        data-region="${escapeHtml(row.region)}"
        class="${state.filters[view].region === row.region ? 'selected' : ''}"
      >
        <td>${index + 1}</td>
        <td><strong>${escapeHtml(row.district)}</strong></td>
        <td>${escapeHtml(row.region)}</td>
        <td class="value-cell">${fmt(row.__value, cfg.format)}</td>
      </tr>
    `).join('')
    : '<tr><td colspan="4">Нет данных для текущего фильтра.</td></tr>';
}

function prepareNameMatcher() {
  const exact = new Map();
  const reducedBuckets = new Map();

  state.data.forEach(row => {
    exact.set(nameKey(row.region), row.region);

    const reduced = reducedNameKey(row.region);
    if (!reducedBuckets.has(reduced)) reducedBuckets.set(reduced, []);
    reducedBuckets.get(reduced).push(row.region);
  });

  return rawName => {
    const exactMatch = exact.get(nameKey(rawName));
    if (exactMatch) return exactMatch;

    const reduced = reducedNameKey(rawName);
    const bucket = reducedBuckets.get(reduced);
    if (bucket && bucket.length === 1) return bucket[0];

    return null;
  };
}

async function ensureRussiaMap() {
  if (state.map.loaded || state.map.loading || state.map.error) return;
  if (typeof echarts === 'undefined') {
    state.map.error = 'Библиотека карты не загрузилась';
    return;
  }

  state.map.loading = true;

  try {
    const response = await fetch(MAP_URL, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const geoJson = await response.json();
    const matchName = prepareNameMatcher();
    const matched = new Set();

    (geoJson.features || []).forEach(feature => {
      const props = feature.properties || (feature.properties = {});
      const rawName =
        props.NL_NAME_1 ||
        props.NAME_1 ||
        props['name:ru'] ||
        props.name ||
        '';

      const dashboardName = matchName(rawName);

      if (dashboardName) {
        props.dashboardName = dashboardName;
        matched.add(dashboardName);
      } else {
        props.dashboardName = cleanRegionLabel(rawName);
      }
    });

    echarts.registerMap('rosreestr-russia', geoJson);
    state.map.matchedNames = matched;
    state.map.loaded = true;
  } catch (error) {
    console.warn('Не удалось загрузить GeoJSON карты:', error);
    state.map.error = 'Географическая карта недоступна';
  } finally {
    state.map.loading = false;
  }
}

function valueRange(rows, metricKey) {
  const values = validMetricRows(rows, metricKey).map(x => x.__value);
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

async function renderMap(view, rows, metricKey, cfg) {
  const badge = $(view + 'MapBadge');
  const note = $(view + 'MapNote');
  const subtitle = $(view + 'MapSubtitle');

  subtitle.textContent = `${cfg.label} • ${scopeLabel(view)}`;
  badge.textContent = 'Подготовка карты';
  note.textContent = '';

  await ensureRussiaMap();

  if (!state.map.loaded) {
    renderTileMap(view, rows, metricKey, cfg);
    badge.textContent = 'Схематическая карта';
    note.textContent =
      'Географический GeoJSON не загрузился. Показана интерактивная картограмма всех строк текущей выборки.';
    return;
  }

  const chart = getChart(view + 'Map', view + 'Map');
  if (!chart) {
    renderTileMap(view, rows, metricKey, cfg);
    return;
  }

  const valid = validMetricRows(rows, metricKey);
  const mapData = valid.map(row => ({
    name: row.region,
    value: row.__value
  }));

  const range = valueRange(rows, metricKey);
  const colors = mapColors(cfg);

  chart.setOption({
    animationDuration: 350,
    tooltip: {
      trigger: 'item',
      formatter: params => {
        const val = finiteNumber(params.value);
        return `
          <strong>${escapeHtml(params.name)}</strong><br>
          ${escapeHtml(cfg.label)}: ${fmt(val, cfg.format)}
        `;
      }
    },
    visualMap: {
      min: range.min,
      max: range.max,
      left: 14,
      bottom: 12,
      orient: 'horizontal',
      calculable: false,
      itemWidth: 14,
      itemHeight: 120,
      text: ['выше','ниже'],
      textStyle: { color: '#71849a', fontSize: 10 },
      inRange: { color: colors }
    },
    series: [{
      type: 'map',
      map: 'rosreestr-russia',
      nameProperty: 'dashboardName',
      roam: true,
      zoom: 1.05,
      scaleLimit: { min: .75, max: 6 },
      emphasis: {
        label: { show: false },
        itemStyle: { borderColor: '#063f79', borderWidth: 1.5 }
      },
      select: {
        disabled: true
      },
      label: { show: false },
      itemStyle: {
        areaColor: '#e9eff5',
        borderColor: '#ffffff',
        borderWidth: .8
      },
      data: mapData
    }]
  }, true);

  chart.off('click');
  chart.on('click', params => {
    const region = params.name;
    const found = state.data.find(x => x.region === region);
    if (!found) return;

    state.filters[view].district = found.district;
    state.filters[view].region = found.region;

    $(view + 'District').value = found.district;
    populateRegionSelect(view);
    $(view + 'Region').value = found.region;

    renderDashboard(view);
  });

  const matchedCurrent = valid.filter(row =>
    state.map.matchedNames.has(row.region)
  ).length;

  badge.textContent = `На карте: ${matchedCurrent}/${valid.length}`;

  const missing = valid.length - matchedCurrent;
  note.textContent = missing > 0
    ? `В аналитике учтены все ${valid.length} строк с данными. Для ${missing} строк в подключенном публичном GeoJSON нет сопоставленной геометрии — они остаются в KPI, рейтингах и таблице.`
    : `Все ${valid.length} строк текущей выборки сопоставлены с геометрией карты.`;

  requestAnimationFrame(() => chart.resize());
}

function tileColor(value, min, max, cfg) {
  const t = max === min ? .5 : Math.max(0, Math.min(1, (value - min) / (max - min)));
  let effective = t;

  if (cfg.ranking === 'low') effective = 1 - t;

  const alpha = .16 + effective * .58;
  return `rgba(38,162,105,${alpha.toFixed(3)})`;
}

function renderTileMap(view, rows, metricKey, cfg) {
  disposeChart(view + 'Map');

  const host = $(view + 'Map');
  const valid = validMetricRows(rows, metricKey);
  const range = valueRange(rows, metricKey);

  host.innerHTML = `
    <div class="tile-map">
      ${valid.map(row => `
        <div
          class="tile"
          data-region="${escapeHtml(row.region)}"
          style="background:${tileColor(row.__value, range.min, range.max, cfg)}"
        >
          <span>${escapeHtml(row.region)}</span>
          <strong>${fmt(row.__value, cfg.format)}</strong>
        </div>
      `).join('')}
    </div>
  `;

  host.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const region = tile.dataset.region;
      const found = state.data.find(x => x.region === region);
      if (!found) return;

      state.filters[view].district = found.district;
      state.filters[view].region = found.region;
      $(view + 'District').value = found.district;
      populateRegionSelect(view);
      $(view + 'Region').value = found.region;
      renderDashboard(view);
    });
  });
}

function renderDashboard(view) {
  if (!state.data.length) return;

  const metricKey = state.filters[view].metric;
  const cfg = getMetrics(view)[metricKey];
  const rows = filteredData(view);

  renderKpis(view, rows, metricKey, cfg);
  renderRankLists(view, rows, metricKey, cfg);
  renderDistrictChart(view, rows, metricKey, cfg);
  renderTable(view, rows, metricKey, cfg);
  renderMap(view, rows, metricKey, cfg);
}

function resetMapState() {
  state.map.loaded = false;
  state.map.loading = false;
  state.map.error = null;
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
