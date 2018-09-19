
export default class extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            title: this.props.title,
            nrOfPages: this.props.nrOfPages,
            newTitle: '',
            newNrOfPages: '',
        }
    }

    componentDidMount() {

    }

    onChangeTitle = (event) => {
        this.setState({
            newTitle: event.target.value
        })
    }

    onChangeNrOfPages= (event) => {
        this.setState({
            newNrOfPages: event.target.value
        })        
    }

    handleDeleteCallback = () => {
        this.props.deleteCallback({ title: this.state.id })
    }

    handleEditCallback = (event) => {
        console.log(event.target.value)
        this.props.editCallback({ title: this.state.newTitle, nrOfPages: this.state.newNrOfPages, id: this.state.id })
    }

    render() {
        return(
            <div>
                {this.state.title + " " + this.state.nrOfPages}
                <input onChange={this.onChangeTitle} type="text" placeholder="Title" />
                <input onChange={this.onChangeNrOfPages} type="text" placeholder="Number of Pages" />
                <button value={this.state.id} onClick={this.handleEditCallback}>Update</button>
                <button onClick={this.handleDeleteCallback}>Delete</button>
            </div>
        )
    }

}