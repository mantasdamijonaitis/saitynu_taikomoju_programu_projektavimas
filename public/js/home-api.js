if (!isTokenSet()) {
  loadTemplate(templateRoutes.login);
}

const showAlert = () => {
  $(".alert").css("display", "block");
};

const booksModal = $("#books-modal");
const booksRating = $(".book-rating");
const booksTableBody = $(".books-table-body");
const bookTitleInput = $(".book-title");
const bookDescriptionInput = $(".book-description");
const bookRatingContainer = $(".book-rating-container");

const renderTableColumn = (data) => {
  return "<td>" + (data != null ? data : "") + "</td>";
};

const renderRow = (rowData) => {
  const contentToAppend =
      "<tr data-id='" + rowData.id + "'>" +
        renderTableColumn(rowData.user.email) +
        renderTableColumn(rowData.title) +
        renderTableColumn(rowData.description) +
        renderTableColumn(rowData.average_rating) +
        renderTableColumn(rowData.ratings.length) +
      "</tr>";
  booksTableBody.append(contentToAppend);
};

const setBookRating = (data) => {
  const ratings = data.ratings;
  const user = data.user;
  let currentUserRating = 0;
  ratings.forEach((rating) => {
    if (rating.user_id === user.id && user.email === getCurrentUserEmail()) {
      currentUserRating = rating.rating;
    }
  });
  if (currentUserRating !== 0) {
    booksRating.val(currentUserRating);
  }
};

const updateAndShowModal = (data) => {
  bookRatingContainer.css("display", "block");
  bookTitleInput.val(data.title);
  bookDescriptionInput.val(data.description);
  $(".books-delete").css("display", "block");
  if (data.user.email !== getCurrentUserEmail()) {
    bookTitleInput.attr("disabled", "disabled");
    bookDescriptionInput.attr("disabled", "disabled");
  } else {
    bookTitleInput.removeAttr("disabled");
    bookDescriptionInput.removeAttr("disabled");
  }
  setBookRating(data);
  booksModal.attr("data-id", data.id);
  booksModal.attr("data-author", data.user.email);
  booksModal.modal("show");
};

const initializeRowClickEvents = () => {
  $(".books-table tr").click((e) => {
    let clickedElement = $(e.target);
    if (clickedElement.prop("nodeName") === "TD") {
      clickedElement = clickedElement.parent();
    }
    const rowId = clickedElement.attr("data-id");
    $.ajax({
      url: apiRoutes.books + "/" + rowId,
      type: 'GET',
      beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader('Authorization', getToken());
      },
      success: (e) => {
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
      resetModal();
    },
    error: (response) => {
      showAlert();
    }
  });
};

const closeBooksModal = () => {
  booksModal.modal("toggle");
};

const saveRating = (bookId, author) => {
  if (!bookId) {
    saveBook(bookId);
    fillTableWithData();
    closeBooksModal();
    return;
  }
  const bookRating = booksRating.val();
  $.ajax({
    url: apiRoutes.books + "/" + bookId + "/ratings",
    type: "POST",
    data: JSON.stringify({
      rating: bookRating
    }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    beforeSend: function(xhrObj){
      xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Accept","application/json");
      xhrObj.setRequestHeader('Authorization', getAuthenticationToken());
    },
    success: (e) => {
      if (author === getCurrentUserEmail()) {
        saveBook(bookId);
      }
      fillTableWithData();
      closeBooksModal();
    },
    error: (e) => {
      showAlert();
    }
  })
};

const saveBook = (recordId) => {
  const requestType = recordId ? "PUT" : "POST";
  const requestUrl = recordId ? apiRoutes.books + "/" + recordId : apiRoutes.books;
  const formData = formAsJson({target: ".books-form"});
  $.ajax({
    url: requestUrl,
    type: requestType,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(formData),
    beforeSend: function(xhrObj){
      xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Accept","application/json");
      xhrObj.setRequestHeader('Authorization', getAuthenticationToken());
    },
    success: () => {
      fillTableWithData();
      closeBooksModal();
    },
    error: () => {
      showAlert();
    }
  });
};

$(".books-save").click(() => {
  const recordId = booksModal.attr("data-id");
  const recordAuthor = booksModal.attr("data-author");
  saveRating(recordId, recordAuthor);
});

const resetModal = () => {
  $(".books-delete").css("display", "none");
  bookTitleInput.val('');
  bookDescriptionInput.val('');
  booksRating.val(0);
  bookRatingContainer.css("display", "none");
  booksModal.removeAttr("data-id");
  booksModal.removeAttr("data-author");
};

$(".add-book").click(() => {
  resetModal();
});

$(".books-delete").click(() => {
  const recordId = booksModal.attr("data-id");
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


