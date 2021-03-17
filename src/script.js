const URL = 'https://handlers.education.launchcode.org/static/astronauts.json';

function initTable() {
  return `
    
		<div class="container-table100">
			<div class="wrap-table100">
				<div class="table100 ver1 m-b-110">
					<div class="table100-head">
						<table>
							<thead>
								<tr class="row100 head">
									<th class="cell100 column1">Astronaut Name</th>
									<th class="cell100 column2">Hours in Space</th>
									<th class="cell100 column3">Active</th>
									<th class="cell100 column4">Skills</th>
									<th class="cell100 column5">Image</th>
								</tr>
							</thead>
						</table>
					</div>
                    <div class="table100-body js-pscroll">
						<table>
							<tbody>
    `;
}

function buildInnerHTML(astronaut) {
  if (astronaut.active) {
    return `
    
	<tr class="row100 body">
		<td class="cell100 column1" style="font-weight: bold;">${astronaut.firstName} ${astronaut.lastName}</td>
		<td class="cell100 column2">${astronaut.hoursInSpace}</td>
		<td class="cell100 column3"><b style= color:green; font-weight: bold; >${astronaut.active}</b></td>
		<td class="cell100 column4">${astronaut.skills}</td>
		<td class="cell100 column5"><img class="avatar" src="${astronaut.picture}"</td>
	</tr>
        
    `;
  } else {
    return `
    <tr class="row100 body">
        <td class="cell100 column1" style="font-weight: bold;">${astronaut.firstName} ${astronaut.lastName}</td>
        <td class="cell100 column2">${astronaut.hoursInSpace}</td>
        <td class="cell100 column3"><b style= color:red; font-weight: bold; >${astronaut.active}</b></td>
        <td class="cell100 column4">${astronaut.skills}</td>
        <td class="cell100 column5"><img class="avatar" src="${astronaut.picture}"</td>
    </tr>
    `;
  }
}

window.addEventListener('load', () => {
  const fetchPromise = fetch(URL);
  fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((json) => {
      //Process to sort from most to least time in space
      const sortable = json.slice(0);
      sortable.sort((a, b) => b.hoursInSpace - a.hoursInSpace);

      //process to build an interface
      let buildInterface = initTable();
      sortable.forEach(function (astronaut) {
        buildInterface += buildInnerHTML(astronaut);
      });

      document.getElementById(
        'h1'
      ).innerHTML = `Astronauts: ${sortable.length}`;
      document.querySelector('#container').innerHTML = buildInterface;
    });
  });
});
