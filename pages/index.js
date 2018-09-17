
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
        fetch('/getDatabase')
            .then( response => response.json() )
            .then( json => this.setState({ database: json}))
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

    render() {

        let list = this.state.database.map(x => (
            <li key={x.title}>
                {x.title + " "+ x.nrOfPages}
                <Link href={`/delete/?title=${x.title}`}>
                    <button value={x.title}>Delete</button>
                </Link>
            </li>
        ))

        return (
            <div>
                {this.state.text}
                <div>
                    <input onChange={this.onChangeTitle} type="text" placeholder="Title"/>
                    <input onChange={this.onChangeNrOfPages} type="text" placeholder="Number of pages"/>
                    <Link href={`/api?title=${this.state.title}&nrOfPages=${this.state.nrOfPages}`} >
                        <button>Add book to database</button>
                    </Link>
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