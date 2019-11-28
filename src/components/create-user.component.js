import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {
    constructor(props) {
        super(props);
        //måste binda this annars får du undifind value från funktionerna
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //skapa variabler
        this.state = {
            username: '',
        }
    }
    
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        // nu skickar vi data till databasen, sammanlänkar frontend med backend
        axios.post('http://localhost:5000/users/add', user) //skickar argumentet user som är json data
            .then(res => console.log(res.data));


        this.setState({
            username: '', //efter man har skapat en användare återställs det till normalt
        });
    }
    
    render() {
        return (
            <div>
               <h3>Skapa en ny användare</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Username: </label>
                       <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />    
                   </div>
                   <div className="form-group">
                        <input type="submit" value="Skapa Uppdrag" className="btn btn-primary" />
                    </div>
               </form>
            </div>
        )
    }
}