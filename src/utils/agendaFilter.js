function agendaFilter(arrFilter, arrAgenda, key) {
  if (arrFilter.length === 0) {
    return arrAgenda;
  }
  const filteredAgenda = [];
  let dataTemp = [];
  arrAgenda.forEach(agenda => {
    dataTemp = [];
    agenda.data.forEach(item => {
      if (arrFilter.includes(item[key])) {
        dataTemp.push(item);
      }
    });
    if (dataTemp.length == 0) dataTemp.push({}); // Add empty item to separate data
    filteredAgenda.push({title: agenda.title, data: dataTemp});
  });

  return filteredAgenda;
}

module.exports = {agendaFilter};
