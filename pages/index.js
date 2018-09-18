
import Link from 'next/link'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            database: [],
            title: '',
            nrOfPages: '',
            deleteButton: ''
        }
    }

    componentDidMount() {
        fetch('api/getDatabase')
            .then(response => response.json())
            .then(json => this.setState({ database: json }))
    }

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    onChangeNrOfPages = (event) => {
        this.setState({
            nrOfPages: event.target.value
        })
    }

    addBook = (event) => {
        const obj = JSON.parse(event.target.value)
        fetch(`/api/add?title=${obj.title}&nrOfPages=${obj.nrOfPages}`)
            .then(response => response.json())
            .then(json => {
                if (json.status === 200) {
                    let newDatabase = this.state.database
                    newDatabase.push({
                        title: json.title,
                        nrOfPages: json.nrOfPages
                    })
                    this.setState({
                        database: newDatabase
                    })
                }
            })
    }

    deleteBook = (event) => {
        fetch(`/api/delete?title=${event.target.value}`)
            .then(response => response.json())
            .then(json => {
                if (json.status === 200) {
                    let newDatabase = this.state.database.filter(x => x.title !== json.title)
                    this.setState({
                        database: newDatabase
                    })
                }
            })
    }

    updateBook = (event) => {
        const obj = JSON.parse(event.target.value)
        fetch(`/api/edit?title=${obj.title}&nrOfPages=${obj.nrOfPages}`)
            .then(response => response.json())
            .then(json => {
                if (json.status === 200) {
                    let newDatabase = this.state.database.filter(x => x.title !== json.title)
                    this.setState({
                        database: newDatabase
                    })
                }
            })
    }

    render() {

        let list = this.state.database.map(x => (
            <li key={x.title}>
                {x.title + " " + x.nrOfPages}
                <input type="text" placeholder="New Title" />
                <input type="text" placeholder="New Number of Pages" />
                <button onClick={this.editBook} value={x.title}>Update</button>
                <button onClick={this.deleteBook} value={x.title}>Delete</button>
            </li>
        ))
        
        /*
        < div className = "editDiv" >
            <input id={x.name + 'Title'} type="text" placeholder="Title" />
            <input id={x.name + 'NrOfPages'} type="text" placeholder="Number of pages" />
            <button onClick={this.updateBook} value={x.name}>Update</button>
        </div >
        */

        return (
            <div>
                {this.state.text}
                <div>
                    <input onChange={this.onChangeTitle} type="text" placeholder="Title" />
                    <input onChange={this.onChangeNrOfPages} type="text" placeholder="Number of pages" />
                    <button onClick={this.addBook} value={JSON.stringify({ title: this.state.title, nrOfPages: this.state.nrOfPages })} >Add book to database</button>
                </div>

                <div>
                    <ul>
                        {list}
                    </ul>
                </div>
            </div>
        )
    }

}