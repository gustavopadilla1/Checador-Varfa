import React from 'react'

function Reloj() {
    
    function FormattedDate(props) {
        return <h5>  {props.date.toLocaleTimeString()}.</h5>;
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
    <div id='App' 
    className='d-flex justify-content-center'
    Style="
    padding: 10px;
    border-width: 10px;

    border-radius: 50% "
    >

        {/* <h2>Reloj:</h2> */}
        
        <Clock 

        className='d-flex justify-content-center'

        
        />      
        
    </div>
  )
}

export default Reloj
