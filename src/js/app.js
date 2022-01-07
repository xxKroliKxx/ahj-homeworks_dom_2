const table = document.getElementById('table');
const tableHeader = document.getElementById('table__header');
let sortType = 1;
const upArrow = String.fromCharCode(8593);
const downArrow = String.fromCharCode(8595);

function struct() {
  return [
    {
      id: 26,
      title: 'Побег из Шоушенка',
      imdb: 9.30,
      year: 1994,
    },
    {
      id: 25,
      title: 'Крёстный отец',
      imdb: 9.20,
      year: 1972,
    },
    {
      id: 27,
      title: 'Крёстный отец 2',
      imdb: 9.00,
      year: 1974,
    },
    {
      id: 1047,
      title: 'Тёмный рыцарь',
      imdb: 9.00,
      year: 2008,
    },
    {
      id: 223,
      title: 'Криминальное чтиво',
      imdb: 8.90,
      year: 1994,
    },
  ];
}

function initialTable() {
  const films = struct();
  for (const film of films) {
    const element = document.createElement('tr');
    element.innerHTML = `<tr>
               <td>#${film.id}</td>
               <td>${film.title}</td>
               <td>(${film.imdb.toFixed(2)})</td>
               <td>imdb: ${film.year}</td>
             </tr>`;
    element.classList.add('data');
    element.dataset.id = film.id;
    element.dataset.title = film.title;
    element.dataset.imdb = film.imdb;
    element.dataset.year = film.year;
    table.insertAdjacentElement('beforeend', element);
  }
}

function sort() {
  const htmlElements = document.getElementsByClassName('data');
  const tableRows = Array.from(htmlElements);
  tableRows.sort((a, b) => {
    switch (sortType) {
      case 1:
        return Number(a.dataset.id) - Number(b.dataset.id);
      case 2:
        return Number(b.dataset.id) - Number(a.dataset.id);
      case 3:
        return a.dataset.title > b.dataset.title ? 1 : -1;
      case 4:
        return a.dataset.title > b.dataset.title ? -1 : 1;
      case 5:
        return Number(a.dataset.imdb) - Number(b.dataset.imdb);
      case 6:
        return Number(a.dataset.imdb) - Number(b.dataset.imdb);
      case 7:
        return Number(a.dataset.year) - Number(b.dataset.year);
      case 8:
        return Number(b.dataset.year) - Number(a.dataset.year);
      default:
        return 1;
    }
  });

  const arrow = sortType % 2 === 0 ? downArrow : upArrow;
  for (const td of tableHeader.getElementsByTagName('td')) {
    if (td.innerText.includes(upArrow) || td.innerText.includes(downArrow)) {
      td.innerText = td.innerText.replace(upArrow, '').replaceAll(downArrow, '');
    }
    if ((sortType === 1 || sortType === 2) && td.dataset.index === '1') {
      td.innerText += ` ${arrow}`;
    } else if ((sortType === 3 || sortType === 4) && td.dataset.index === '2') {
      td.innerText += ` ${arrow}`;
    } else if ((sortType === 5 || sortType === 6) && td.dataset.index === '3') {
      td.innerText += ` ${arrow}`;
    } else if ((sortType === 7 || sortType === 8) && td.dataset.index === '4') {
      td.innerText += ` ${arrow}`;
    }
  }

  for (let index = -htmlElements.length + 1; index <= 0; index += 1) {
    htmlElements[-index].remove();
  }

  for (const e of tableRows) {
    table.insertAdjacentElement('beforeend', e);
  }
}

initialTable();

setInterval(() => {
  sortType = sortType === 8 ? 1 : sortType + 1;
  sort();
}, 5000);
