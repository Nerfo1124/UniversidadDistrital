$(document).ready( function () {
  var data = [
    ['subgroupN', 'Group1', 'sub-subgroupN', 'ElementN', '2Element N'],
    ['subgroup1', 'Group2', 'sub-subgroup1', 'Element1', '2Element 1'],
    ['subgroup2', 'Group2', 'sub-subgroup1', 'Element1', '2Element 1'],
    ['subgroup2', 'Group2', 'sub-subgroup1', 'Element2', '2Element 2'],
    ['subgroup2', 'Group2', 'sub-subgroup2', 'Element3', '2Element 2'],
    ['subgroup2', 'Group2', 'sub-subgroup2', 'Element4', '2Element 4'],
    ['subgroup2', 'Group2', 'sub-subgroup2', 'Element2', '2Element 2'],
    ['subgroup3', 'Group1', 'sub-subgroup1', 'Element1', '2Element 1'],
    ['subgroup3', 'Group1', 'sub-subgroup1', 'Element1', '2Element 1'],
    ['subgroup2', 'Group2', 'sub-subgroup2', 'Element1', '2Element 1'],
    ['subgroup4', 'Group2', 'sub-subgroup2', 'Element1', '2Element 1'],
    ['subgroup4', 'Group2', 'sub-subgroup3', 'Element10', '2Element 17'],
    ['subgroup4', 'Group2', 'sub-subgroup3', 'Element231', '2Element 211'],

  ];
  var table = $('#example').DataTable({
    columns: [
        {
            title: 'First group',
        },
        {
            name: 'second',
            title: 'Second group [order first]',
        },
        {
            title: 'Third group',
        },
        {
            title: 'Forth ungrouped',
        },
        {
            title: 'Fifth ungrouped',
        },
    ],
    data: data,
    rowsGroup: [// Always the array (!) of the column-selectors in specified order to which rows groupping is applied
                // (column-selector could be any of specified in https://datatables.net/reference/type/column-selector)
        'second:name',
        0,
        2
    ],
    pageLength: '20',
    });
} );
