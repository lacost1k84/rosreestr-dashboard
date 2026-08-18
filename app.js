const EXPECTED_SHEETS = [
  'ЦФО',
  'СЗФО',
  'ЮФО',
  'СКФО',
  'ПФО',
  'УФО',
  'СФО',
  'ДФО',
  'НР1',
  'Арктический гектар'
];

const MAIN_SHEETS = [
  'ЦФО',
  'СЗФО',
  'ЮФО',
  'СКФО',
  'ПФО',
  'УФО',
  'СФО',
  'ДФО',
  'НР1'
];

const $ = id => document.getElementById(id);

const norm = value =>
  String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();


// ============================================================
// ЧТЕНИЕ EXCEL
// ============================================================

function matrix(ws) {
  return XLSX.utils.sheet_to_json(ws, {
    header: 1,
    raw: true,
    defval: null
  });
}


// ============================================================
// ПОИСК ПОКАЗАТЕЛЕЙ
// ============================================================

function metricRow(m, number) {
  return m.find(row => Number(row[3]) === number);
}

function hasMetric(m, number) {
  return !!metricRow(m, number);
}


// ============================================================
// ПОИСК БЛОКА УРД
//
// В большинстве листов УРД имеет номера 80–98.
// В УФО и ПФО (пр) номера 59–77.
// Поэтому ищем не номер 80, а начало самого блока.
// ============================================================

function findUrdStart(m) {
  return m.findIndex(row => {
    const colA = norm(row[0]);
    const colC = norm(row[2]);

    return colA === 'урд' && colC === 'урд';
  });
}


// ============================================================
// ПОИСК РЕГИОНАЛЬНЫХ КОЛОНОК
//
// Ищем строку заголовков автоматически.
// Это позволяет корректно читать и НР1.
// ============================================================

function regionColumns(m) {
  let best = [];

  for (let r = 0; r < Math.min(12, m.length); r++) {
    const row = m[r] || [];
    const found = [];

    for (let c = 9; c < row.length; c++) {
      const name = String(row[c] ?? '')
        .replace(/\s+/g, ' ')
        .trim();

      if (
        name &&
        /[А-Яа-яЁё]/.test(name) &&
        !/^\d/.test(name)
      ) {
        found.push({
          col: c,
          name
        });
      }
    }

    if (found.length > best.length) {
      best = found;
    }
  }

  return best;
}


// ============================================================
// ФОРМАТИРОВАНИЕ
// ============================================================

function fmt(value, type = 'number') {

  if (
    value === null ||
    value === undefined ||
    value === '' ||
    value === '-'
  ) {
    return '—';
  }

  if (typeof value === 'string') {
    return value;
  }

  const n = Number(value);

  if (!Number.isFinite(n)) {
    return String(value);
  }

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


function yn(value) {
  return value
    ? '<span class="ok">Найден</span>'
    : '<span class="bad">Не найден</span>';
}


// ============================================================
// ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
// ============================================================

function showView(name) {

  document
    .querySelectorAll('.view')
    .forEach(view => view.classList.add('hidden'));

  document
    .querySelectorAll('.nav-btn')
    .forEach(btn => btn.classList.remove('active'));

  const titles = {
    registry: 'Полный и точный реестр',
    urd: 'УРД',
    diagnostics: 'Диагностика файла'
  };

  const view = $(name + 'View');

  if (view) {
    view.classList.remove('hidden');
  }

  const button = document.querySelector(
    `[data-view="${name}"]`
  );

  if (button) {
    button.classList.add('active');
  }

  if ($('viewTitle')) {
    $('viewTitle').textContent = titles[name];
  }
}


document
  .querySelectorAll('.nav-btn')
  .forEach(btn => {

    btn.addEventListener('click', () => {
      showView(btn.dataset.view);
    });

  });


// ============================================================
// ФОРМИРОВАНИЕ ЕДИНОГО МАССИВА 89 РЕГИОНОВ
// ============================================================

function buildRegionalData(workbook) {

  const result = [];

  MAIN_SHEETS.forEach(district => {

    const ws = workbook.Sheets[district];

    if (!ws) {
      return;
    }

    const m = matrix(ws);

    const regions = regionColumns(m);

    // --------------------------------------------------------
    // ПОКАЗАТЕЛИ "ПОЛНЫЙ И ТОЧНЫЙ РЕЕСТР"
    // --------------------------------------------------------

    const registryRows = {};

    [
      8,
      10,
      13,
      14,
      18,
      21,
      23,
      26,
      29,
      32,
      35
    ].forEach(number => {

      registryRows[number] =
        metricRow(m, number);

    });


    // --------------------------------------------------------
    // НАЧАЛО БЛОКА УРД
    // --------------------------------------------------------

    const urdStart = findUrdStart(m);


    // --------------------------------------------------------
    // КАЖДЫЙ РЕГИОН
    // --------------------------------------------------------

    regions.forEach(region => {

      const getRegistry = number => {

        const row = registryRows[number];

        if (!row) {
          return null;
        }

        return row[region.col];
      };


      // УРД читаем относительно начала блока,
      // а не по номеру показателя.

      const getUrd = offset => {

        if (urdStart < 0) {
          return null;
        }

        const row = m[urdStart + offset];

        if (!row) {
          return null;
        }

        return row[region.col];
      };


      result.push({

        district,

        region: region.name,


        // ====================================================
        // ПОЛНЫЙ И ТОЧНЫЙ РЕЕСТР
        // ====================================================

        egrn:
          getRegistry(8),

        noRights:
          getRegistry(10),

        landNoRights:
          getRegistry(13),

        landBorders:
          getRegistry(14),

        otherNoRights:
          getRegistry(18),

        regionalProperty:
          getRegistry(21),

        municipalProperty:
          getRegistry(23),

        subjectBorders:
          getRegistry(26),

        municipalBorders:
          getRegistry(29),

        settlementBorders:
          getRegistry(32),

        territorialZones:
          getRegistry(35),


        // ====================================================
        // УРД
        //
        // offset считается от первой строки блока УРД
        // ====================================================

        // УРД
        urdTotal:
          getUrd(0),

        urdPerDay:
          getUrd(1),

        urdElectronicCount:
          getUrd(2),

        urdElectronic:
          getUrd(3),


        // ИПОТЕКА
        mortgageTotal:
          getUrd(4),

        mortgagePerDay:
          getUrd(5),

        mortgageElectronicCount:
          getUrd(6),

        mortgageElectronic:
          getUrd(7),

        mortgage24:
          getUrd(8),


        // ДДУ
        dduTotal:
          getUrd(9),

        dduPerDay:
          getUrd(10),

        dduElectronicCount:
          getUrd(11),

        dduElectronic:
          getUrd(12),


        // СРОКИ
        grpDays:
          getUrd(13),

        gkuDays:
          getUrd(14),

        epDays:
          getUrd(15),


        // ПРИОСТАНОВЛЕНИЯ
        grpSusp:
          getUrd(16),

        gkuSusp:
          getUrd(17),

        epSusp:
          getUrd(18)

      });

    });

  });

  return result;
}


// ============================================================
// КОНТРОЛЬНАЯ ТАБЛИЦА
// ПОЛНЫЙ И ТОЧНЫЙ РЕЕСТР
// ============================================================

function renderRegistryTable(data) {

  const panel =
    document.querySelector(
      '#registryView .panel'
    );

  if (!panel) {
    return;
  }

  panel.innerHTML = `

    <h3>
      Контрольная таблица —
      «Полный и точный реестр»
    </h3>

    <p class="muted">

      Значения автоматически считаны
      из основных листов исходного Excel.

      В единой таблице:
      <strong>${data.length}</strong>
      субъектов РФ.

      Специальные листы
      «Арктический гектар»
      и «ПФО (пр)»
      не добавляются повторно,
      чтобы регионы не дублировались.

    </p>


    <div class="table-wrap">

      <table>

        <thead>

          <tr>

            <th>ФО / группа</th>

            <th>
              Субъект РФ
            </th>

            <th>
              Объектов
              в ЕГРН
            </th>

            <th>
              Объекты
              без прав
            </th>

            <th>
              ЗУ
              без прав
            </th>

            <th>
              ЗУ
              с границами
            </th>

            <th>
              Иные объекты
              без прав
            </th>

            <th>
              Региональная
              собственность
            </th>

            <th>
              Муниципальная
              собственность
            </th>

            <th>
              Границы
              субъектов
            </th>

            <th>
              Границы
              МО
            </th>

            <th>
              Границы
              НП
            </th>

            <th>
              Территориальные
              зоны
            </th>

          </tr>

        </thead>


        <tbody>

          ${data.map(r => `

            <tr>

              <td>
                <strong>
                  ${r.district}
                </strong>
              </td>

              <td>
                ${r.region}
              </td>

              <td>
                ${fmt(r.egrn, 'int')}
              </td>

              <td>
                ${fmt(r.noRights, 'percent')}
              </td>

              <td>
                ${fmt(r.landNoRights, 'percent')}
              </td>

              <td>
                ${fmt(r.landBorders, 'percent')}
              </td>

              <td>
                ${fmt(r.otherNoRights, 'percent')}
              </td>

              <td>
                ${fmt(r.regionalProperty, 'percent')}
              </td>

              <td>
                ${fmt(r.municipalProperty, 'percent')}
              </td>

              <td>
                ${fmt(r.subjectBorders, 'percent')}
              </td>

              <td>
                ${fmt(r.municipalBorders, 'percent')}
              </td>

              <td>
                ${fmt(r.settlementBorders, 'percent')}
              </td>

              <td>
                ${fmt(r.territorialZones, 'percent')}
              </td>

            </tr>

          `).join('')}

        </tbody>

      </table>

    </div>
  `;
}


// ============================================================
// КОНТРОЛЬНАЯ ТАБЛИЦА УРД
// ============================================================

function renderUrdTable(data) {

  const panel =
    document.querySelector(
      '#urdView .panel'
    );

  if (!panel) {
    return;
  }


  panel.innerHTML = `

    <h3>
      Контрольная таблица — УРД
    </h3>

    <p class="muted">

      УРД определяется
      по названию блока,
      поэтому различия
      в нумерации показателей
      между федеральными округами
      не влияют на результат.

      В таблице:
      <strong>${data.length}</strong>
      субъектов РФ.

    </p>


    <div class="table-wrap">

      <table>

        <thead>

          <tr>

            <th>
              ФО / группа
            </th>

            <th>
              Субъект РФ
            </th>


            <th>
              УРД всего
            </th>

            <th>
              УРД в день
            </th>

            <th>
              УРД электронно,
              шт.
            </th>

            <th>
              УРД электронно,
              %
            </th>


            <th>
              Ипотека
              всего
            </th>

            <th>
              Ипотека
              в день
            </th>

            <th>
              Ипотека
              электронно,
              шт.
            </th>

            <th>
              Ипотека
              электронно,
              %
            </th>

            <th>
              Ипотека
              за 24 часа
            </th>


            <th>
              ДДУ
              всего
            </th>

            <th>
              ДДУ
              в день
            </th>

            <th>
              ДДУ
              электронно,
              шт.
            </th>

            <th>
              ДДУ
              электронно,
              %
            </th>


            <th>
              ГРП,
              дней
            </th>

            <th>
              ГКУ,
              дней
            </th>

            <th>
              ЕП,
              дней
            </th>


            <th>
              Приост.
              ГРП
            </th>

            <th>
              Приост.
              ГКУ
            </th>

            <th>
              Приост.
              ЕП
            </th>

          </tr>

        </thead>


        <tbody>

          ${data.map(r => `

            <tr>

              <td>
                <strong>
                  ${r.district}
                </strong>
              </td>

              <td>
                ${r.region}
              </td>


              <td>
                ${fmt(r.urdTotal, 'int')}
              </td>

              <td>
                ${fmt(r.urdPerDay, 'int')}
              </td>

              <td>
                ${fmt(r.urdElectronicCount, 'int')}
              </td>

              <td>
                ${fmt(r.urdElectronic, 'percent')}
              </td>


              <td>
                ${fmt(r.mortgageTotal, 'int')}
              </td>

              <td>
                ${fmt(r.mortgagePerDay, 'int')}
              </td>

              <td>
                ${fmt(
                  r.mortgageElectronicCount,
                  'int'
                )}
              </td>

              <td>
                ${fmt(
                  r.mortgageElectronic,
                  'percent'
                )}
              </td>

              <td>
                ${fmt(
                  r.mortgage24,
                  'percent'
                )}
              </td>


              <td>
                ${fmt(r.dduTotal, 'int')}
              </td>

              <td>
                ${fmt(r.dduPerDay, 'int')}
              </td>

              <td>
                ${fmt(
                  r.dduElectronicCount,
                  'int'
                )}
              </td>

              <td>
                ${fmt(
                  r.dduElectronic,
                  'percent'
                )}
              </td>


              <td>
                ${fmt(
                  r.grpDays,
                  'days'
                )}
              </td>

              <td>
                ${fmt(
                  r.gkuDays,
                  'days'
                )}
              </td>

              <td>
                ${fmt(
                  r.epDays,
                  'days'
                )}
              </td>


              <td>
                ${fmt(
                  r.grpSusp,
                  'percent'
                )}
              </td>

              <td>
                ${fmt(
                  r.gkuSusp,
                  'percent'
                )}
              </td>

              <td>
                ${fmt(
                  r.epSusp,
                  'percent'
                )}
              </td>

            </tr>

          `).join('')}

        </tbody>

      </table>

    </div>
  `;
}


// ============================================================
// ЗАГРУЗКА ФАЙЛА
// ============================================================

$('fileInput').addEventListener(
  'change',
  async event => {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }


    $('fileName').textContent =
      file.name;

    $('parseStatus').textContent =
      'Чтение...';


    try {

      const buffer =
        await file.arrayBuffer();


      const workbook =
        XLSX.read(
          buffer,
          {
            type: 'array'
          }
        );


      // ======================================================
      // ОБЩАЯ ИНФОРМАЦИЯ
      // ======================================================

      $('sheetCount').textContent =
        workbook.SheetNames.length;


      const expected =
        EXPECTED_SHEETS.filter(
          name =>
            workbook.SheetNames.includes(name)
        ).length;


      $('expectedCount').textContent =
        `${expected} / ${EXPECTED_SHEETS.length}`;


      // ======================================================
      // ДИАГНОСТИКА
      // ======================================================

      let registryCount = 0;

      let urdCount = 0;

      const diagnostics = [];


      workbook.SheetNames.forEach(
        name => {

          const m =
            matrix(
              workbook.Sheets[name]
            );


          const regions =
            regionColumns(m).length;


          const registry =
            hasMetric(m, 8);


          const urd =
            findUrdStart(m) >= 0;


          if (registry) {
            registryCount++;
          }


          if (urd) {
            urdCount++;
          }


          diagnostics.push({
            name,
            regions,
            registry,
            urd
          });

        }
      );


      // ======================================================
      // ТАБЛИЦА ДИАГНОСТИКИ
      // ======================================================

      $('diagnosticsBody').innerHTML =
        diagnostics
          .map(x => `

            <tr>

              <td>
                <strong>
                  ${x.name}
                </strong>
              </td>

              <td>
                ${x.regions}
              </td>

              <td>
                ${yn(x.registry)}
              </td>

              <td>
                ${yn(x.urd)}
              </td>

            </tr>

          `)
          .join('');


      // ======================================================
      // ЕДИНАЯ БАЗА РЕГИОНОВ
      // ======================================================

      const regionalData =
        buildRegionalData(workbook);


      // ======================================================
      // KPI ПРОТОТИПА
      // ======================================================

      $('registryFound').textContent =
        registryCount;


      $('urdFound').textContent =
        urdCount;


      $('regionsFound').textContent =
        regionalData.length;


      $('regionsFoundUrd').textContent =
        regionalData.length;


      // ======================================================
      // КОНТРОЛЬНЫЕ ТАБЛИЦЫ
      // ======================================================

      renderRegistryTable(
        regionalData
      );


      renderUrdTable(
        regionalData
      );


      // ======================================================
      // СТАТУС
      // ======================================================

      $('parseStatus').textContent =
        'Данные извлечены';


      $('emptyState')
        .classList
        .add('hidden');


      $('workspace')
        .classList
        .remove('hidden');


      // После загрузки открываем
      // основной раздел

      showView('registry');


    } catch (error) {

      console.error(error);


      $('parseStatus').textContent =
        'Ошибка чтения';


      alert(
        'Не удалось обработать Excel-файл.'
      );

    }

  }
);