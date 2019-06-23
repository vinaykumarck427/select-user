import React from 'react'
import axios from 'axios'
import {
  Card, CardText, 
  CardBody,
  CardTitle
} from 'reactstrap';
import _ from 'lodash';

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      users:[],
      id:'',
      user:{},
      selectName:''
    }
  }
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      console.log(response.data)
      this.setState({users:response.data})
    })
  }
  handleSelect = (e) => {
    const name = e.target.value
      axios.get(`https://jsonplaceholder.typicode.com/users?name=${name}`)
        .then(response => {
          console.log(response.data)
          this.setState({ user: response.data, selectName:response.data.name})
        })
   
  }
  render(){
    return(
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="choose"><h2>Choose user</h2></label>
            <select className="form-control" to="choose" onChange={this.handleSelect} value={this.state.selectName}>
              <option value="">select</option>
              {this.state.users.map(user => <option key={`${user.id}`} value={`${user.name}`}>{user.name}</option>)}
            </select>
          </div>
        </form>
        
        <br />

        {!_.isEmpty(this.state.user) && (
          <Card>
            <CardBody>
              <CardTitle><b>{this.state.user[0].name}</b></CardTitle>
              <CardText>
                <p><b>Id:</b>{this.state.user[0].id}</p><br />
                <p><b>Username:</b>{this.state.user[0].username}</p><br />
                <p><b>Email:</b>{this.state.user[0].email}</p>
              </CardText>
            </CardBody>
          </Card>
        )}
      </div>
    )
  }
}
export default App