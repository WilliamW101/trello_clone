class AjaxBoards extends React.Component {
  constructor(props) {
    super(props);

    this.state = { boards: [], loading: true, boardId: null };

    this.addBoard = this.addBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.setBoardId = this.setBoardId.bind(this);
  }

  // Component Lifecycle Functions
  // ComponentWillMount
  // ComponentDidMount !
  // ComponentWillRecieveProps
  // ComponentWillUpdate
  // ComponentDidUpdate

  componentDidMount() {
    // Materialize Component Initialization
    // $('#select').materialize-select();

    // Ajax Calls To Grab Component Data
    $.ajax({
      type: 'GET',
      url: '/boards',
      dataType: 'JSON'
    }).success( boards => {
      // once we have data back, we set state
      this.setState({ boards, loading: false });     // named same, so you dont need to put data after boards:
    }).fail( data => {
      // handle with alert or flash
      this.setState({ loading: false });
      console.log(data);
    });
  }

  setBoardId(boardId) {
    this.setState({ boardId });
  }

  deleteBoard(e, id) {
    e.preventDefault();
    $.ajax({
      url: `/boards/${id}`,
      type: 'DELETE',
      dataType: 'JSON'
    }).success( data => {
      // Figure out how to set state and remove board
      let boards = this.state.boards;
      let index = boards.findIndex( b => b.id === id);
      this.setState({
        boards:
        [
          ...boards.slice(0, index),
          ...boards.slice(index + 1, boards.length)
        ]
       });

    }).fail( data => {
      console.log(data);
    });
  }

  displayBoards() {
    let boards = this.state.boards;

    if(boards.length) {
      // Map longhand
    //   let reactBoards = [];
    //   for(let i = 0; i < boards.length; i+=1) {
    //     let board = boards[i];
    //     reactBoards.push(<Board key={board.id} board={board} />);
    //   }
    //   return reactBoards;
    //
    // }else{
    //   return(<h3> No Boards, Please Add One! </h3>);
    // }

    //map Way
    return boards.map( board => {
      return(<Board
                key={board.id}
                board={board}
                deleteBoard={this.deleteBoard}
                setBoardId={this.setBoardId}
              />
            );
    });
    }else{
      return(<h3> No Boards, Please Add One! </h3>);
    }
  }

  addBoard(e) {
    e.preventDefault();
    // grab the value from the input
    let boardName = this.refs.boardName.value;
    // make the POST ajax callbacks
    $.ajax({
      type: 'POST',
      url: '/boards',
      dataType: 'JSON',
      data: { board: { name: boardName } }  // has to match controller permited strong params
    }).success( board => {
      this.setState({ boards: [...this.state.boards, board] });
      this.refs.addBoardForm.reset();
      this.refs.boardName.focus();
    }).fail( data => {
      console.log(data);
    });
    // handle success and fail
    // set state to add the new board on success
    // reset the format
    // auto focus the board name input
  }

  render() {
    if(this.state.loading) {
      return(<h3> Loading Boards... </h3>);        // since only one element you dont have to wrap in a div
    }else{
      return(
        <div className='row'>
          <div className= 'container'>
            <h1 className='center'> Beer Boards </h1>
            <form ref='addBoardForm' onSubmit={ this.addBoard }>
              <input ref='boardName' type='text' required placeholder='Board Name' />
              <div className='center'>
                <input type='submit' className='btn black white-text' />
              </div>
            </form>
          </div>
          <hr />
          {this.displayBoards()}
          <BoardModal boardId={this.state.boardId} />
        </div>
      );
    }
  }
}
