class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { edit: false, board: props.board };  // add board: props.board

    this.toggleEdit = this.toggleEdit.bind(this);
    this.editBoard = this.editBoard.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
  }

  toggleEdit(e) {
    if(e != undefined) {
      e.preventDefault();
    }
    this.setState({ edit: !this.state.edit });
  }

  editBoard(e) {
    e.preventDefault();
    let boardName = this.refs.boardName;

    $.ajax({
      url: `/boards/${this.props.board.id}`,
      type: 'PUT',
      data: { board: { name: boardName.value } },
      dataType: 'JSON'
    }).success ( board => {
      this.setState({ board });
      this.toggleEdit();
    }).fail( data => {
      console.log(data);
    });
  }

  nameDisplay() {
    let board = this.state.board;       // changed to state from props

    if(this.state.edit) {
      return(
        <form ref='editForm' onSubmit={this.editBoard}>
          <input
            type='text'
            defaultValue={board.name}
            required
            placeholder='Board Name'
            ref='boardName'
          />
          <input type='submit' className='btn white black-text' />
        </form>
      );
    }else{
      return(<span className="card-title">{board.name}</span>);
    }
  }

  showModal(e) {
    e.preventDefault();
    $('#show-modal').modal('open');
  }

  render() {
    let board = this.state.board; // changed to state from props

    return(
      <div className="col s12 m4">
        <div className="card black">
          <div className="card-content white-text">
            { this.nameDisplay() }
            <p>  </p>
          </div>
          <div className="card-action center">
            <a onClick={ () => this.props.setBoardId(board.id) } href="#show-modal" className='modal-trigger'>Show</a>
            <a href="#" onClick={ this.toggleEdit }>Edit</a>
            <a href="#" onClick={(e) => this.props.deleteBoard(e, board.id)}>Delete</a>
          </div>
        </div>
      </div>
    );
  }
}
