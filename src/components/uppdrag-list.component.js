import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Uppdrag = props => (
   <tr>
       <td>{props.uppdrag.username}</td>
       <td>{props.uppdrag.description}</td>
       <td>{props.uppdrag.duration}</td>
       <td>{props.uppdrag.date.substring(0,10)}</td>
       <td>
           <Link to={"/edit/"+props.uppdrag._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUppdrag(props.uppdrag._id) }}>delete</a>
       </td>
   </tr> 
)

export default class UppdragList extends Component {
    constructor(props) {
        super(props);

        this.deleteUppdrag = this.deleteUppdrag.bind(this);

        this.state = {uppdrag: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/uppdrag')
            .then(response => {
                this.setState({ uppdrag: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteUppdrag(id) {
        axios.delete('http://localhost:5000/uppdrag/'+id)
            .then(res => console.log(res.data));
        
            this.setState({
            uppdrag: this.state.uppdrag.filter(el => el._id !== id)
        })
    }

    uppdragList() {
        return this.state.uppdrag.map(currentuppdrag => {
            return <Uppdrag uppdrag={currentuppdrag} deleteUppdrag={this.deleteUppdrag} key={currentuppdrag._id}/>;
        })
    }
    
    
    render() {
        return (
            <div>
                <h3>Aktuella Uppdrag</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.uppdragList() }
                    </tbody>
                </table>
            </div>
        )
    }
}