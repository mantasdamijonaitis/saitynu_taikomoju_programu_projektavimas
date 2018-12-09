if (!isTokenSet()) {
  loadTemplate(templateRoutes.login);
}

const showAlert = () => {
  $(".alert").css("display", "block");
};

const booksTableBody = $(".books-table-body");

const renderTableColumn = (data) => {
  return "<td>" + (data ? data : "") + "</td>";
};

const renderRow = (rowData) => {
  const contentToAppend =
      "<tr id='" + rowData.id + "'>" +
        renderTableColumn(rowData.title) +
        renderTableColumn(rowData.description) +
        renderTableColumn(rowData.average_rating) +
        renderTableColumn(rowData.ratings.length) +
      "</tr>";
  booksTableBody.append(contentToAppend);
};

const renderTableRows = (rowsData) => {
  booksTableBody.html('');
  rowsData.data.forEach((el) => {
    renderRow(el);
  })
};

const fillTableWithData = () => {
  $.ajax({
    url: apiRoutes.books,
    type: 'GET',
    beforeSend: function(xhrObj){
      xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Accept","application/json");
      xhrObj.setRequestHeader('Authorization', getToken());
    },
    success: (response) => {
      renderTableRows(response);
      console.log("response json is", response);
    },
    error: (response) => {
      showAlert();
    }
  });
};

const closeBooksModal = () => {
  $("#books-modal").modal("toggle");
};

fillTableWithData();

$(".books-save").click(() => {
  $.ajax({
    url: apiRoutes.books,
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(formAsJson({target: ".books-form"})),
    beforeSend: function(xhrObj){
      xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Accept","application/json");
      xhrObj.setRequestHeader('Authorization', getAuthenticationToken());
    },
    success: (e) => {
      console.log("success e", e);
      fillTableWithData();
      closeBooksModal();

    },
    error: (e) => {
      console.log("error e", e);
      showAlert();
    }
  })
});

