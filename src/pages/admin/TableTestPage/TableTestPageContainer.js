import React, { useState, useEffect } from 'react';
import EnhancedTable from 'components/molecules/table/EnhancedTable';
import AdminTemplate from 'pages/templates/AdminTemplate';
import * as adAPI from 'lib/api/ad';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Dessert (100g serving)'
  },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' }
];

// 객체로 return
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0)
// ];

const TableTestPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    adAPI
      .adcodeList({})
      .then(response => {
        setData(response);
      })
      .catch(error => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminTemplate>
      <div>api req 테스트 / error , loading 사용해야함</div>
      <EnhancedTable
        rows={data}
        error={error}
        loading={loading}
        headCells={headCells}
        hasCheckbox={false}
      />
    </AdminTemplate>
  );
};

export default TableTestPage;
