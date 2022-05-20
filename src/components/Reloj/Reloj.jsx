import React from 'react'

function Reloj() {
    
    function FormattedDate(props) {
        return <h4>  {props.date.toLocaleTimeString()}.</h4>;
      }
      
      class Clock extends React.Component {
        constructor(props) {
          super(props);
          this.state = {date: new Date()};
        }
      
        componentDidMount() {
          this.timerID = setInterval(
            () => this.tick(),
            1000
          );
        }
      
        componentWillUnmount() {
          clearInterval(this.timerID);
        }
      
        tick() {
          this.setState({
            date: new Date()
          });
        }
      
        render() {
          return (
            <div>
              {/* <h1></h1> */}
              <FormattedDate date={this.state.date} />
            </div>
          );
        }
      }

  return (
    <div id='App'>
        {/* <h2>Reloj:</h2> */}
        <Clock />      
    </div>
  )
}

export default Reloj
