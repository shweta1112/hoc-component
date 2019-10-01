import React from "react";

function asyncHOC(CustomComponent, url) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        componentData: []
      };
    }
    componentDidMount() {
      fetch(url)
        .then(resp => resp.json())
        .then(response => {
          if (response.length) {
            this.setState({
              componentData: response
            });
          }
        });
    }
    render() {
      const getAPIDate = () => {
        return <CustomComponent componentData={this.state.componentData} />;
      };
      return (
        <div>
          <h1>API Data:</h1>
          {this.state.componentData.length ? (
            getAPIDate()
          ) : (
            <div>Loading.....</div>
          )}
        </div>
      );
    }
  };
}
const RenderComponent = props => {
  return props.componentData.map(e => {
    return (
      <div>
        <div>EMPLOYEE_ID: {e.id}</div>
        <div>EMPLOYEE_NAME: {e.employee_name}</div>
        <div>EMPLOYEE_SALARY: {e.employee_salary}</div>
        <div>EMPLOYEE_AGE: {e.employee_age}</div>
      </div>
    );
  });
};
const App = asyncHOC(
  RenderComponent,
  "http://dummy.restapiexample.com/api/v1/employees"
);
export default App;
