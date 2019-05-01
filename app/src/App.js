import React from 'react';
import './App.css';
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class App extends React.Component {
constructor(){
    super()
      this.state = {
        data: []
      };
      this.columns = [{
          Header:'UserId',
          accessor:'userId'
      },
      {
          Header:'Id',
          accessor:'id'
      },
      {
          Header:'Name',
          accessor:'name'
      },
      {
          Header:'Address',
          accessor:'address'
    }];
    this.eventSource = new EventSource("http://localhost:5000/events");

  }

  componentDidMount() {

      this.eventSource.addEventListener("dataUpdate", e =>
      this.updateState(JSON.parse(e.data))
    );

  axios.get("http://localhost:5000/",
  {headers: {'Access-Control-Allow-Origin': '*'}
  })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
     updateState(newState) {
        console.log("Server side event recieved at",new Date())
        this.setState(Object.assign({}, { data: newState }));
      }
  render() {
    return (
     <ReactTable data={this.state.data} columns={this.columns}/>
    )
}
}
export default App;
