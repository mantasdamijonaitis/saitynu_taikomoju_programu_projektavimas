<link href="{{ asset('css/home-api.css') }}" rel="stylesheet">
<div class="text-center">
    <div class="alert alert-danger">
        <strong>Error!</strong> Error! Please contact the administrator!
    </div>
    <img class="management-image" src="{{ asset('images/management.jpg') }}">
    <table class="books-table table table-hover table-striped table-bordered table-responsive">
        <thead>
            <tr>
                <th>Author</th>
                <th>Title</th>
                <th>Description</th>
                <th>Average rating</th>
                <th>Rating amount</th>
            </tr>
        </thead>
        <tbody class="books-table-body">
        </tbody>
    </table>
    <div class="btn-group" role="group" aria-label="CRUD controls">
        <button type="button" class="btn btn-success add-book" data-toggle="modal" data-target="#books-modal">Add new book</button>
    </div>
</div>
<div class="modal fade" id="books-modal" tabindex="-1" role="dialog" aria-hidden="true" data-id="">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit book data</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="books-form">
                    <div class="form-group">
                        <label>Book title</label>
                        <input type="text" class="form-control book-title" name="title" autocomplete="off" required/>
                    </div>
                    <div class="form-group">
                        <label>Book description</label>
                        <input type="text" class="form-control book-description" name="description" autocomplete="off" required/>
                    </div>
                    <div class="form-group book-rating-container">
                        <label>Your book rating</label>
                        <select class="form-control book-rating">
                            <option value="0">Not rated</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary books-save">Save</button>
                <button type="button" class="btn btn-danger books-delete">Delete</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/home-api.js') }}"></script>