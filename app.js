const EXPECTED_SHEETS = [
  'ЦФО','СЗФО','ЮФО','СКФО','ПФО',
  'УФО','СФО','ДФО','НР1','Арктический гектар'
];

const MAIN_SHEETS = [
  'ЦФО','СЗФО','ЮФО','СКФО',
  'ПФО','УФО','СФО','ДФО','НР1'
];

const $ = id => document.getElementById(id);

const norm = v => String(v ?? '')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase();

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

function regionColumns(m) {
  const header = m[2] || [];
  const result = [];

  for (let c = 9; c < header.length; c++) {
    const name = String(header[c] ?? '').trim();

    if (name) {
      result.push({
        col: c,
        name: name.replace(/\s+/g, ' ')
      });
    }
  }

  return result;
}

function fmt(value, type = 'number') {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    value === '-'
  ) return '—';

  if (typeof value === 'string') return value;

  const n = Number(value);
  if (!Number.isFinite(n)) return String(value);

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

function yn(v) {
  return v
    ? '<span class="ok">Найден</span>'
    : '<span class="bad">Не найден</span>';
}

function showView(name) {
  document.querySelectorAll('.view')
    .forEach(v => v.classList.add('hidden'));

  document.querySelectorAll('.nav-btn')
    .forEach(b => b.classList.remove('active'));

  const titles = {
    registry: 'Полный и точный реестр',
    urd: 'УРД',
    diagnostics: 'Диагностика файла'
  };

  $(name + 'View').classList.remove('hidden');

  document
    .querySelector(`[data-view="${name}"]`)
    .classList.add('active');

  $('viewTitle').textContent = titles[name];
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => showView(btn.dataset.view));
});

function buildRegionalData(workbook) {
  const result = [];

  MAIN_SHEETS.forEach(district => {
    const ws = workbook.Sheets[district];
    if (!ws) return;

    const m = matrix(ws);
    const regions = regionColumns(m);

    const rows = {};

    [
      8, 10, 13, 14, 18, 21, 23, 26, 29, 32, 35,
      80, 83, 84, 87, 88, 89, 92,
      93, 94, 95, 96, 97, 98
    ].forEach(no => {
      rows[no] = metricRow(m, no);
    });

    regions.forEach(region => {
      const get = no =>
        rows[no] ? rows[no][region.col] : null;

      result.push({
        district,
        region: region.name,

        egrn: get(8),
        noRights: get(10),
        landNoRights: get(13),
        landBorders: get(14),
        otherNoRights: get(18),

        regionalProperty: get(21),
        municipalProperty: get(23),

        subjectBorders: get(26),
        municipalBorders: get(29),
        settlementBorders: get(32),
        territorialZones: get(35),

        urdTotal: get(80),
        urdElectronic: get(83),

        mortgageTotal: get(84),
        mortgageElectronic: get(87),
        mortgage24: get(88),

        dduTotal: get(89),
        dduElectronic: get(92),

        grpDays: get(93),
        gkuDays: get(94),
        epDays: get(95),

        grpSusp: get(96),
        gkuSusp: get(97),
        epSusp: get(98)
      });
    });
  });

  return result;
}

function renderRegistryTable(data) {
  const panel =
    document.querySelector('#registryView .panel');

  panel.innerHTML = `
    <h3>Контрольная таблица — «Полный и точный реестр»</h3>

    <p class="muted">
      Значения автоматически считаны из 8 федеральных округов.
      Сейчас здесь ${data.length} субъектов.
      Дополнительные листы НР1, «Арктический гектар»
      и «ПФО (пр)» не смешиваются с основной таблицей,
      чтобы регионы не дублировались.
    </p>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ФО</th>
            <th>Субъект РФ</th>
            <th>Объектов в ЕГРН</th>
            <th>Объекты без прав</th>
            <th>ЗУ без прав</th>
            <th>ЗУ с границами</th>
            <th>Иные объекты без прав</th>
            <th>Региональная собственность</th>
            <th>Муниципальная собственность</th>
            <th>Границы субъектов</th>
            <th>Границы МО</th>
            <th>Границы НП</th>
            <th>Территориальные зоны</th>
          </tr>
        </thead>

        <tbody>
          ${data.map(r => `
            <tr>
              <td><strong>${r.district}</strong></td>
              <td>${r.region}</td>
              <td>${fmt(r.egrn, 'int')}</td>
              <td>${fmt(r.noRights, 'percent')}</td>
              <td>${fmt(r.landNoRights, 'percent')}</td>
              <td>${fmt(r.landBorders, 'percent')}</td>
              <td>${fmt(r.otherNoRights, 'percent')}</td>
              <td>${fmt(r.regionalProperty, 'percent')}</td>
              <td>${fmt(r.municipalProperty, 'percent')}</td>
              <td>${fmt(r.subjectBorders, 'percent')}</td>
              <td>${fmt(r.municipalBorders, 'percent')}</td>
              <td>${fmt(r.settlementBorders, 'percent')}</td>
              <td>${fmt(r.territorialZones, 'percent')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderUrdTable(data) {
  const panel =
    document.querySelector('#urdView .panel');

  panel.innerHTML = `
    <h3>Контрольная таблица — УРД</h3>

    <p class="muted">
      Все значения ниже берутся непосредственно
      из строк УРД исходного Excel.
    </p>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ФО</th>
            <th>Субъект РФ</th>

            <th>УРД всего</th>
            <th>Электронно</th>

            <th>Ипотека всего</th>
            <th>Ипотека электронно</th>
            <th>Ипотека за 24 часа</th>

            <th>ДДУ всего</th>
            <th>ДДУ электронно</th>

            <th>ГРП, дней</th>
            <th>ГКУ, дней</th>
            <th>ЕП, дней</th>

            <th>Приост. ГРП</th>
            <th>Приост. ГКУ</th>
            <th>Приост. ЕП</th>
          </tr>
        </thead>

        <tbody>
          ${data.map(r => `
            <tr>
              <td><strong>${r.district}</strong></td>
              <td>${r.region}</td>

              <td>${fmt(r.urdTotal, 'int')}</td>
              <td>${fmt(r.urdElectronic, 'percent')}</td>

              <td>${fmt(r.mortgageTotal, 'int')}</td>
              <td>${fmt(r.mortgageElectronic, 'percent')}</td>
              <td>${fmt(r.mortgage24, 'percent')}</td>

              <td>${fmt(r.dduTotal, 'int')}</td>
              <td>${fmt(r.dduElectronic, 'percent')}</td>

              <td>${fmt(r.grpDays, 'days')}</td>
              <td>${fmt(r.gkuDays, 'days')}</td>
              <td>${fmt(r.epDays, 'days')}</td>

              <td>${fmt(r.grpSusp, 'percent')}</td>
              <td>${fmt(r.gkuSusp, 'percent')}</td>
              <td>${fmt(r.epSusp, 'percent')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

$('fileInput').addEventListener('change', async e => {
  const file = e.target.files?.[0];
  if (!file) return;

  $('fileName').textContent = file.name;
  $('parseStatus').textContent = 'Чтение...';

  try {
    const buffer = await file.arrayBuffer();

    const workbook = XLSX.read(buffer, {
      type: 'array'
    });

    $('sheetCount').textContent =
      workbook.SheetNames.length;

    const expected = EXPECTED_SHEETS.filter(
      name => workbook.SheetNames.includes(name)
    ).length;

    $('expectedCount').textContent =
      `${expected} / ${EXPECTED_SHEETS.length}`;

    let registryCount = 0;
    let urdCount = 0;

    const diagnostics = [];

    workbook.SheetNames.forEach(name => {
      const m = matrix(workbook.Sheets[name]);

      const regions = regionColumns(m).length;
      const registry = hasMetric(m, 8);
      const urd = hasMetric(m, 80);

      if (registry) registryCount++;
      if (urd) urdCount++;

      diagnostics.push({
        name,
        regions,
        registry,
        urd
      });
    });

    $('diagnosticsBody').innerHTML =
      diagnostics.map(x => `
        <tr>
          <td><strong>${x.name}</strong></td>
          <td>${x.regions}</td>
          <td>${yn(x.registry)}</td>
          <td>${yn(x.urd)}</td>
        </tr>
      `).join('');

    const regionalData =
      buildRegionalData(workbook);

    $('registryFound').textContent =
      registryCount;

    $('urdFound').textContent =
      urdCount;

    $('regionsFound').textContent =
      regionalData.length;

    $('regionsFoundUrd').textContent =
      regionalData.length;

    renderRegistryTable(regionalData);
    renderUrdTable(regionalData);

    $('parseStatus').textContent =
      'Данные извлечены';

    $('emptyState').classList.add('hidden');
    $('workspace').classList.remove('hidden');

    showView('registry');

  } catch (err) {
    console.error(err);

    $('parseStatus').textContent =
      'Ошибка чтения';

    alert(
      'Не удалось обработать Excel-файл. ' +
      'Откройте консоль для подробностей.'
    );
  }
});