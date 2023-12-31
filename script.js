// Fetch data from the COVID-19 India API
const fetchData = async () => {
  const response = await fetch("https://data.covid19india.org/data.json");
  return await response.json();
};

// Populate the dropdown list with state names
const populateDropdown = (data) => {
  const stateDropdown = document.getElementById("stateDropdown");
  data.statewise.slice(1).forEach((state) => {
    const option = document.createElement("option");
    option.value = state.statecode;
    option.text = state.state;
    stateDropdown.appendChild(option);
  });
};

// Display state details in a table
const displayStateDetails = (stateDetails) => {
  const tableHtml = `
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Confirmed</th>
            <th>Active</th>
            <th>Recovered</th>
            <th>Deceased</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> ${parseInt(stateDetails.confirmed).toLocaleString()}</td>
            <td>${parseInt(stateDetails.active).toLocaleString()}</td>
            <td>${parseInt(stateDetails.recovered).toLocaleString()}</td>
            <td>${parseInt(stateDetails.deaths).toLocaleString()}</td>
            <td>${stateDetails.lastupdatedtime}</td>
          </tr>
        </tbody>
      </table>
    `;
  document.getElementById("stateDetailsTable").innerHTML = tableHtml;
};

document.getElementById("fetchDataBtn").addEventListener("click", () => {
  const selectedStateCode = document.getElementById("stateDropdown").value;

  fetchData()
    .then((data) => {
      const selectedState = data.statewise.find(
        (state) => state.statecode === selectedStateCode
      );
      if (selectedState) {
        displayStateDetails(selectedState);
      } else {
        console.error("State not found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

// Initial population of dropdown
fetchData()
  .then(populateDropdown)
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
