
import Item from '../components/Item.js'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            database: [],
            title: '',
            nrOfPages: '',
            deleteButton: '',
            idCounter: 2
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
                    console.log(newDatabase)
                    newDatabase.push({
                        title: json.title,
                        nrOfPages: json.nrOfPages,
                        id: json.id
                    })
                    this.setState({
                        database: newDatabase
                    })
                }
            })
    }

    deleteCallback = (data) => {
        fetch(`/api/delete?id=${data.title}`)
            .then(response => response.json())
            .then(json => {
                if (json.status === 200) {
                    let newDatabase = this.state.database.filter(x => x.id !== json.id)
                    this.setState({
                        database: newDatabase
                    })
                }
            })
    }

    editCallback = (data) => {
        console.log('Called in index: edit')
        fetch(`/api/edit?title=${data.title}&nrOfPages=${data.nrOfPages}&id=${data.id}`)
        .then(response => response.json())
        .then(json => {
            if(json.status === 200) {

                let newDatabase = this.state.database

                let newItem = {
                    title: json.title,
                    nrOfPages: json.nrOfPages,
                    id: json.id
                }

                for(let i = 0; i < newDatabase.length; i++) {
                    if(newDatabase[i].id == json.id) {
                        newDatabase[i] = newItem
                    }
                }

                this.setState({
                    database: newDatabase
                })
            }
        })
    }

    render() {

        let list = this.state.database.map(x => (
            <li key={x.title}>
                <Item title={x.title} nrOfPages={x.nrOfPages} deleteCallback={this.deleteCallback} editCallback={this.editCallback} id={x.id}/>
            </li>
        ))

        return (
            <div>
                {this.state.text}
                <div>
                    <input onChange={this.onChangeTitle} type="text" placeholder="Title" />
                    <input onChange={this.onChangeNrOfPages} type="text" placeholder="Number of pages" />
                    <button onClick={this.addBook} value={JSON.stringify(
                        { title: this.state.title, nrOfPages: this.state.nrOfPages, id: this.state.id }
                    )} >Add book to database</button>
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