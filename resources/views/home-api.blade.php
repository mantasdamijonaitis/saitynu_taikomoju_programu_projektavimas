<link href="{{ asset('css/home-api.css') }}" rel="stylesheet">
<div class="text-center">
    <div class="alert alert-danger">
        <strong>Error!</strong> Error! Please contact the administrator!
    </div>
    <table class="table table-hover table-striped table-bordered">
        <thead>
            <tr>
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
<div class="modal fade" id="books-modal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add new book</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="books-form">
                    <div class="form-group">
                        <label>Book title</label>
                        <input type="text" class="form-control" name="title" autocomplete="off" required/>
                    </div>
                    <div class="form-group">
                        <label>Book description</label>
                        <input type="text" class="form-control" name="description" autocomplete="off" required$/>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary books-save">Save changes</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/home-api.js') }}"></script>