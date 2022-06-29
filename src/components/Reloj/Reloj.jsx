import React from 'react'

function Reloj() {
  
  let newDate = new Date()
    let date = newDate.getDate();  // numero     
    let year = newDate.getFullYear(); // Año         
    var dia=new Array(7); // nombre del dia
     dia[0]="Domingo";
     dia[1]="Lunes";
     dia[2]="Martes";
     dia[3]="Miercoles";
     dia[4]="Jueves";
     dia[5]="Viernes";
     dia[6]="Sabado";
 
  var m2 = newDate.getMonth() + 1; // nombre del mes
  var mesok = (m2 < 10) ? '0' + m2 : m2;
    mesok=new Array(12);
     mesok[0]="Enero";
     mesok[1]="Febrero";
     mesok[2]="Marzo";
     mesok[3]="Abril";
     mesok[4]="Mayo";
     mesok[5]="Junio";
     mesok[6]="Julio";
     mesok[7]="Agosto";
     mesok[8]="Septiembre";
     mesok[9]="Octubre";
     mesok[10]="Noviembre";
     mesok[11]="Diciembre";

    
    
 function FormattedDate(props) {
      return  <h5>  {props.date.toLocaleTimeString()} </h5> ;
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
              <FormattedDate date={this.state.date} /> 
            </div>
          );
        }
      }



  return (
    <div className="rounded border w-25 p-2  mw-100 mx-auto bg-light">
      
      <div className='d-flex justify-content-center'>
          <i className="fa-solid fa-clock"></i>&nbsp;&nbsp;
          <Clock className='d-flex justify-content-center' />         
      </div>

      <div className='d-flex justify-content-center'>        
          <h5 className='d-flex justify-content-center' >
            <i className="fa-regular fa-calendar-days"></i> &nbsp;&nbsp;
            {`${dia[newDate.getDay()]} ${date} ${mesok[newDate.getMonth()]}   ${year}`} <br/>
          </h5>
      </div>
        
        
        
        
             
    </div>
  )
}

export default Reloj
