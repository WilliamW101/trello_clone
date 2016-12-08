class BoardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { board: {}, loading: true }

    this.modalDisplay = this.modalDisplay.bind(this);
    this.addList = this.addList.bind(this);
    this.updateLists = this.updateLists.bind(this);
  }

  componentWillReceiveProps(newProps) {
    $.ajax({
      url: `/boards/${newProps.boardId}`,
      type: 'GET',
      dataType: 'JSON'
    }).success( board => {
      this.setState({ board, loading: false });
    }).fail( data => {
      this.setState({ loading: false });
    });
  }

  displayLists() {
    let board = this.state.board

    if(board.lists.length){
      return board.lists.map( list => {
        return(<List key={list.id} list={list} />);

      });
    }else{
      return(<h4> No Lists, Please Add One! </h4>);
    }
  }

  addList(e) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${this.state.board.id}/lists`,
      type: 'POST',
      dataType: 'JSON',
      data: { list: { title: this.refs.listName.value }}
    }).success( list => {
      let board = this.state.board;

      board.lists.push(list);
      this.setState({ board })
      this.refs.addListForm.reset();
      this.refs.listName.focus();
    }).fail( data => {
      console.log(data);
    });
  }

  updateLists(id) {
    let lists = this.state.lists;
    let index = lists.findIndex( l => l.id === id);

    this.setState({
      lists:
      [
        ...lists.slice(0, index),
        ...lists.slice(index + 1, lists.length)
      ]
    });
  }

  modalDisplay() {
    // add a new form to add a list to a board
    let board = this.state.board;

    if(this.state.loading) {
      return(<h4> Loading Data... </h4>)
    }else{
      return(
        <div>
          <div className='container'>
            <h4 className='center'> {board.name} </h4>
            <form ref='addListForm' onSubmit={this.addList}>
              <input type='text' required ref='listName' placeholder='List Name' />
              <div className ='center'>
                <input type='submit' className='btn black white-text' />
              </div>
            </form>
          </div>
          <hr />
          { this.displayLists() }
        </div>
      );
    }
  }

  render() {
    return(
      <div id="show-modal" className="modal modal-fixed-footer">
        <div className="modal-content">
          { this.modalDisplay() }
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
        </div>
      </div>
    );
  }
}
