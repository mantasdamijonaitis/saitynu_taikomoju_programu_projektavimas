if (!isTokenSet()) {
  loadTemplate(templateRoutes.login);
}

const showAlert = () => {
  $(".alert").css("display", "block");
};

const booksModal = $("#books-modal");

const booksTableBody = $(".books-table-body");

const renderTableColumn = (data) => {
  return "<td>" + (data != null ? data : "") + "</td>";
};

const renderRow = (rowData) => {
  const contentToAppend =
      "<tr data-id='" + rowData.id + "'>" +
        renderTableColumn(rowData.title) +
        renderTableColumn(rowData.description) +
        renderTableColumn(rowData.average_rating) +
        renderTableColumn(rowData.ratings.length) +
      "</tr>";
  booksTableBody.append(contentToAppend);
};

const updateAndShowModal = (data) => {
  console.log("data", data);
  $(".book-title").val(data.title);
  $(".book-description").val(data.description);
  $(".books-delete").css("display", "block");
  booksModal.attr("data-id", data.id);
  booksModal.modal("show");
};

const initializeRowClickEvents = () => {
  $(".books-table tr").click((e) => {
    let clickedElement = $(e.target);
    console.log("nodename", clickedElement.prop("nodeName"));
    if (clickedElement.prop("nodeName") === "TD") {
      clickedElement = clickedElement.parent();
    }
    const rowId = clickedElement.data("id");
    $.ajax({
      url: apiRoutes.books + "/" + rowId,
      type: 'GET',
      beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader('Authorization', getToken());
      },
      success: (e) => {
        console.log("e", e);
        updateAndShowModal(e.data);
      },
      error: (e) => {
        showAlert();
      }
    });
  });
};

const renderTableRows = (rowsData) => {
  booksTableBody.html('');
  rowsData.data.forEach((el) => {
    renderRow(el);
  });
  initializeRowClickEvents();
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
  booksModal.modal("toggle");
};

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

$(".add-book").click(() => {
  $(".books-delete").css("display", "none");
});

$(".books-delete").click(() => {
  const recordId = booksModal.data("id");
  $.ajax({
    url: apiRoutes.books + "/" + recordId,
    type: "DELETE",
    beforeSend: function(xhrObj){
      xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Accept","application/json");
      xhrObj.setRequestHeader('Authorization', getAuthenticationToken());
    },
    success: (e) => {
      closeBooksModal();
      fillTableWithData();
    },
    error: (e) => {
      showAlert();
    }
  });
});

fillTableWithData();


