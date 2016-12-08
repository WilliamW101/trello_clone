class List extends React.Component {
  constructor(props) {
    super(props);


  this.state = { edit: false, list: props.list };

  this.toggleEdit = this.toggleEdit.bind(this);
  this.editList = this.editList.bind(this);
  this.deleteList = this.deleteList.bind(this);
  }

  toggleEdit(e) {
  if(e != undefined) {
  e.preventDefault();
  }
  this.setState({ edit: !this.state.edit });
  }

  editList(e) {
    let listTitle = this.refs.listTitle;

    e.preventDefault();
    id = this.state.list.id;
    $.ajax({
      url: `/boards/${this.props.boardId}/lists/${id}`,
      type: 'PUT',
      data: { list: { title: listTitle.value } },
      dataType: 'JSON'
    }).success(list => {
      this.setState({ list });
      this.toggleEdit();
      // console.log(data);
    }).fail(data => {
      console.log(data);
    });
  }

  nameDisplay() {
   let list = this.state.list

   if(this.state.edit) {
     return(
       <form ref='editForm' onSubmit={this.editList}>
         <input
           type='text'
           defaultValue={list.title}
           required
           placeholder="ListTitle"
           ref="listTitle"
           />
           <input type='submit' className='btn black white-text' />
       </form>
     )
   } else {
     return(<span className="card-title">{list.title}</span>);
   }
  }

  deleteList() {
   id = this.state.list.id;
   $.ajax({
     url: `/boards/${this.props.boardId}/lists/${id}`,
     type: 'DELETE'
   }).success( () => {
     this.props.update(id)
   }).fail(data => {
     console.log(data);
   });
  }

  render() {
    // return(<div> {this.props.list.title} </div>);
    return(
      <div className='row'>
        <div ref='listTitle' className='col s6 m6'>
        { this.nameDisplay() }
        </div>
        <button className='btn black white-text' onClick={this.toggleEdit}><i>Edit</i></button>
  	    <button className='btn black white-text' onClick={ this.deleteList }><i>Delete</i></button>
      </div>
    );
  }
}
