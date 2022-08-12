import React, { useEffect, useState } from 'react';
// import {Link} from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore'
import { db } from '../../Config/firestore';
import { Box, Button, Modal } from '@mui/material';
import axios from 'axios'
import SendIcon from '@mui/icons-material/Send';
// import Paginate from 'react-js-pagination';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal);


const TableAdmin = ({ user }) => {
  const [Checador, setChecador] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setorder] = useState("ASC");

  // const [currentItems, setCurrentItems] = useState(null);
  // const [pageCount, setPageCount] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  // const itemsPerPage = 6;

  const ChecadorCollection = collection(db, "Checador")

  const MONITOREOCollection = collection(db, "Monitoreo")
  // bd de checador esto para almacenar el checqueo del supervisor
  const CHECADORCollection = collection(db, "Checador")

  // estados del los campos que se almacenaran en la bd checador
  const [, setCorreo] = useState("");
  const [, setUsuarios] = useState("");
  const [, setPuesto] = useState("");
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [laborando, setLaborando] = useState("");
  const [comentario, setComentario] = useState("Buen dia");
  const [ubicacion,] = useState("");
  const [, setequipotrabajo] = useState("")

  const [comentarioMonitoreo, setcomentarioMonitoreo] = useState("")
  const [laborandoMonitoreo, setLaborandoMonitoreo] = useState("")
  const [entradahora, setentradahora] = useState("");
  const [salidahora, setsalidahora] = useState("");

  //concatanacion
  const [final] = useState(entradahora, entrada);
  const [final2] = useState(salida, salidahora, laborandoMonitoreo, comentarioMonitoreo);


  /// modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const getChecador = async () => {
    const data = await getDocs(ChecadorCollection)
    // console.log(data.docs);
    setChecador(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort()
    )
    console.log(Checador)

  }


  const deleteUser = async (id) => {
    MySwal.fire({
      title: 'Seguro que deseas eliminar el registro?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const userDoc = doc(db, "Checador", id)
        deleteDoc(userDoc)
        getChecador();
      }
      // else if (result.isDenied) {
      // }
    })

  }

  useEffect(() => {
    getChecador()

  }, [])


  // Style del modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // funcion para guardar chequeo del supervisor
  const Add = async (e) => {
    e.preventDefault();
    await addDoc(CHECADORCollection, { ['CORREO ELECTRONICO']: user['CORREO ELECTRONICO'], ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'], ['AREA FUNCIONAL']: user['AREA FUNCIONAL'], ['EQUIPO DE TRABAJO']: user['EQUIPO DE TRABAJO'], entrada: entrada, salida: salida, entradahora: entradahora, salidahora: salidahora, laborando: laborando, comentario: comentario, ubicacion: ubicacion })
    await addDoc(MONITOREOCollection, {
      ['CORREO ELECTRONICO']: user['CORREO ELECTRONICO'],
      laborandoMonitoreo: laborandoMonitoreo,
      ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'],
      ['AREA FUNCIONAL']: user['AREA FUNCIONAL'],
      ['EQUIPO DE TRABAJO']: user['EQUIPO DE TRABAJO'],
      entrada: entrada, salida: salida, entradahora: entradahora, salidahora: salidahora,
      comentarioMonitoreo: comentarioMonitoreo, ubicacion: ubicacion
    })
    console.log(e);

    const data = {
      ['NOMBRE COMPLETO']: user['NOMBRE COMPLETO'],
      ['CORREO ELECTRONICO']: user['CORREO ELECTRONICO'],
      ['AREA FUNCIONAL']: user['AREA FUNCIONAL'],
      ['EQUIPO DE TRABAJO']: user['EQUIPO DE TRABAJO'],
      laborando: laborando,
      entrada: entrada,
      salida: salida,
      comentario: comentario
    }

    axios.post('https://sheet.best/api/sheets/57301919-954a-4676-9da3-52041bfe4e1c', data).then((res) => {
      console.log(res);

      setUsuarios('');
      setCorreo('');
      setPuesto('');
      setequipotrabajo('');
      setLaborando('');
      setEntrada('');
      setSalida('');
      setComentario('');

    })
    setOpen();

    MySwal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Bienvenido Registro hecho con exito !!!',
      showConfirmButton: false,
      timer: 2500

    })


  }

  // funcion de guardar campo entrada por fecha y hora
  const Entrada = async () => {

    if (laborando === "Home Office") {
      setLaborandoMonitoreo("Home Office")
    }
    if (laborando === "Oficina") {
      setLaborandoMonitoreo("Oficina")
    } if (laborando === "De Visita con un Cliente") {
      setLaborandoMonitoreo("De Visita con un Cliente")
    }

    setcomentarioMonitoreo(comentario)

    let o = new Date();
    setentradahora(
      o =
      o.getHours() + ':' + o.getMinutes() + ':' + o.getSeconds()
    )

    let d = new Date();

    // var dia=new Array(7);
    // dia[0]="Domingo";
    // dia[1]="Lunes";
    // dia[2]="Martes";
    // dia[3]="Miercoles";
    // dia[4]="Jueves";
    // dia[5]="Viernes";
    // dia[6]="Sabado";

    var m2 = d.getMonth() + 1;
    var mesok = (m2 < 10) ? '0' + m2 : m2;
    mesok = new Array(12);
    mesok[0] = "01";
    mesok[1] = "02";
    mesok[2] = "03";
    mesok[3] = "04";
    mesok[4] = "05";
    mesok[5] = "06";
    mesok[6] = "07";
    mesok[7] = "08";
    mesok[8] = "09";
    mesok[9] = "10";
    mesok[10] = "11";
    mesok[11] = "12";



    //       console.log(

    //       dia[d.getDay()],
    //       d.getDate(),    
    //       mesok[d.getMonth()] ,
    //       d.getFullYear() ,
    // "- "+
    //       d.getHours(),    
    // ': ' +d.getMinutes(),
    // ': ' +d.getSeconds()

    // );


    var min = d.getMinutes();
    if (min < 10) {
      var minF = "0" + d.getMinutes()
    }
    else {
      var minF = d.getMinutes()
    }

    alert(d);


    setEntrada(
      d =
      d.getDate() + "/" + mesok[d.getMonth()] + "/" + d.getFullYear() + " " + d.getHours() + ':' + minF + ':' + d.getSeconds()
    )
    // setOcultarBoton(true);      
    return final;

  }

  // funcion de guardar campo Salida por fecha y hora
  const Salida = async () => {
    let o = new Date();
    setsalidahora(
      o =
      o.getHours() + ' : ' + o.getMinutes() + ' : ' + o.getSeconds()
    )

    let d = new Date();

    //      var dia=new Array(7);
    //      dia[0]="Domingo";
    //      dia[1]="Lunes";
    //      dia[2]="Martes";
    //      dia[3]="Miercoles";
    //      dia[4]="Jueves";
    //      dia[5]="Viernes";
    //      dia[6]="Sabado";

    var m2 = d.getMonth() + 1;
    var mesok = (m2 < 10) ? '0' + m2 : m2;
    mesok = new Array(12);
    mesok[0] = "01";
    mesok[1] = "02";
    mesok[2] = "03";
    mesok[3] = "04";
    mesok[4] = "05";
    mesok[5] = "06";
    mesok[6] = "07";
    mesok[7] = "08";
    mesok[8] = "09";
    mesok[9] = "10";
    mesok[10] = "11";
    mesok[11] = "12";

    //        console.log(

    //        dia[d.getDay()],
    //        d.getDate(),    
    //        mesok[d.getMonth()] ,
    //        d.getFullYear() ,
    //  "- "+
    //        d.getHours(),    
    //  ': ' +d.getMinutes(),
    //  ': ' +d.getSeconds()

    //  );

    alert(d);

    var min = d.getMinutes();
    if (min < 10) {
      var minF = "0" + d.getMinutes()
    }
    else {
      var minF = d.getMinutes()
    }

    setSalida(
      d =
      d.getDate() + "/" + mesok[d.getMonth()] + "/" + d.getFullYear() + " " + d.getHours() + ':' + minF + ':' + d.getSeconds()
    )
    //  setOcultarBoton(false);
    return final2;
  }


  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...Checador].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      )
      setChecador(sorted);
      setorder("DSC")
    }
    if (order === 'DSC') {
      const sorted = [...Checador].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      )
      setChecador(sorted);
      setorder("ASC")
    }

  }

  // //Padinacion

  // useEffect(() => {
  //   // Fetch items from another resources.
  //   const endOffset = itemOffset + itemsPerPage;
  //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  //   setCurrentItems(Checador.slice(itemOffset, endOffset));
  //   setPageCount(Math.ceil(Checador.length / itemsPerPage));
  // }, [itemOffset, itemsPerPage, Checador]);

  // // Invoke when user click to request another page.
  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % Checador.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };

  return (
    <div>

      {/* excel */}
      <div className='d-flex justify-content-evenly'>
        <ReactHTMLTableToExcel
          id='BotonExportarExcel'
          className="btn btn-success"
          table="Reporte"
          filename="Reporte de asistencia"
          sheet="REPORTE"
          buttonText="Exportar a Excel"
        />


        {/* <a href='https://docs.google.com/spreadsheets/d/18lnS2_WrJV7vWJu5PcRqRmpeUXihqi5R3Jh2tO-XfVw/edit#gid=0'><button type="button" className="btn btn-success">Google Sheets</button></a> */}

      </div>

      {/* Filter buscador */}
      <br />
      <div className="row mb-12 justify-content-center" >
        <div className="col-sm-3">
          <input className="form-control form-control-lg" type="text" placeholder="Buscar..." aria-label=".form-control-lg example"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <br />


      <Button onClick={handleOpen} variant="contained" endIcon={<SendIcon />}>Checar</Button>
      <br />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >


        <Box sx={style}>
          {/* contenido del moda --- y en el contenido tenemos todo para registrar el cheque del administrador  */}
          <form className="was-validated"
            onSubmit={Add}
          >

            <br />


            <div className="row mb-1 justify-content-center" >
              <label className="col-sm-1 col-form-label"> Nombre: </label>
              <div className="col-sm-7">
                <input

                  value={user['NOMBRE COMPLETO']}
                  onChange={() => setUsuarios(user['NOMBRE COMPLETO'])}
                  type='text'
                  className='form-control '
                  disabled
                />

              </div>
            </div>

            <div className="row mb-1 justify-content-center" >
              <label className="col-sm-1 col-form-label"> Email: </label>
              <div className="col-sm-7">
                <input

                  value={user['CORREO ELECTRONICO']}
                  onChange={() => setCorreo(user['CORREO ELECTRONICO'])}
                  type='text'
                  className='form-control '
                  disabled
                />

              </div>
            </div>

            <div className="row mb-1 justify-content-center"   >
              <label className="col-sm-1 col-form-label">Area: </label>
              <div className="col-sm-7">

                <input value={user['AREA FUNCIONAL']}
                  onChange={() => setPuesto(user['AREA FUNCIONAL'])}
                  type='text'
                  className='form-control '
                  disabled
                />
              </div>
            </div>

            <div className="row mb-1 justify-content-center"   >
              <label className="col-sm-1 col-form-label">Equipo: </label>
              <div className="col-sm-7">

                <input value={user['EQUIPO DE TRABAJO']}
                  onChange={() => setequipotrabajo(user['EQUIPO DE TRABAJO'])}
                  type='text'
                  className='form-control '
                  disabled
                />
              </div>
            </div>



            <div className="row mb-1 justify-content-center"  >
              <label className="col-sm-1 col-form-label">Laborando: </label>
              <div className="col-sm-7">
                <select
                  value={laborando}
                  onChange={(e) => setLaborando(e.target.value)}
                  className="form-select form-select-lg mb-3 is-invalid" aria-label=".form-select-md example"
                  required
                >

                  <option></option>
                  <option>Home Office</option>
                  <option>Oficina</option>
                  <option>De Visita con un Cliente</option>
                </select>

              </div>
            </div>

            <div className="row mb-1 justify-content-center form-floating" >
              <div className="col-sm-4">
                <textarea
                  placeholder="Deseas colocar un comentario: (opcional)"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  type='text'
                  className='form-control is-invalid'
                />
              </div>
            </div>
            <br /><br />
            <div className='d-flex justify-content-around '>

              <div>
                <button
                  id='btnEntrada'
                  Style="padding:15px;"
                  onClick={Entrada}
                  value={final}
                  type='submit'
                  className='btn btn-success '

                >
                    <i className="fa-solid fa-arrow-right" />&nbsp;
                  Entrada
                </button>
              </div>

              <button
                id='btnSalida'
                Style="padding:15px; "
                onClick={Salida}
                value={final2}
                className='btn btn-success '
              >
                  <i className="fa-solid fa-arrow-left" />&nbsp;
                Salida
              </button>

            </div>
          </form>

        </Box>
      </Modal>


      {/* <Link to={`/CreateUser`} className = "btn btn-primary" >Agregar </Link> */}
      <br />
      <table className="table table-bordered border-primary" id='Reporte'>
        <thead>

          <tr Style="font-family: 'Heebo', sans-serif; Font-size: 13px;">
            <th scope="col" className='text-center' onClick={() => sorting(['NOMBRE COMPLETO'])}> NOMBRE </th>
            <th scope="col" className='text-center' onClick={() => sorting(['CORREO ELECTRONICO'])}>CORREO ELECTRONICO</th>
            <th scope="col" className='text-center' onClick={() => sorting(['EQUIPO DE TRABAJO'])}>EQUIPO</th>
            <th scope="col" className='text-center' onClick={() => sorting(['AREA FUNCIONAL'])}>AREA </th>
            <th scope="col" className='text-center' onClick={() => sorting(['laborando'])}>LABORANDO </th>
            <th scope="col" className='text-center table-primary' onClick={() => sorting(['entrada'])}>ENTRADA</th>
            <th scope="col" className='text-center table-warning' onClick={() => sorting(['salida'])} >SALIDA</th>
            <th scope="col" className='text-center table-success' onClick={() => sorting(['comentario'])}>COMENTARIO</th>
            <th scope="col" className='text-center' >ACCION</th>
          </tr>
        </thead>
        <tbody>

          {Checador

            .filter(colabolador => {
              if (search === "") {
                return colabolador;
              } else if ((colabolador['NOMBRE COMPLETO'])
                .toLowerCase().includes(search.toLowerCase())) {
                return colabolador;
              }
            })


            .map((colabolador) => (

              <tr key={colabolador.id}>

                <td Style="font-family: 'Anek Latin', sans-serif; Font-size: 14px;"> {colabolador['NOMBRE COMPLETO']}</td>
                <td Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;"> {colabolador['CORREO ELECTRONICO']}</td>
                <td Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;">{colabolador['EQUIPO DE TRABAJO']}</td>
                <td Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;">{colabolador['AREA FUNCIONAL']}</td>
                <td className='text-center' Style="font-family: 'Anek Latin', sans-serif; Font-size: 13px;"><b>{colabolador.laborando}</b></td>

                <td className='table-primary text-center' Style="font-family: 'Anek Latin', sans-serif; Font-size: 15px;"><b>{colabolador.entrada}</b></td>
                <td className='table-warning text-center' Style="font-family: 'Anek Latin', sans-serif; Font-size: 15px;"><b>{colabolador.salida}</b></td>
                <td className='table-success' Style="font-family: 'Anek Latin', sans-serif; Font-size: 14px;">{colabolador.comentario}</td>

                <td>
                  {/* <Link to={`/FormEdit/${usuario.id}`} className = "btn btn-primary" >Editar</Link> */}
                  {/* <FontAwesomeIcon icon="fa-solid fa-trash-can" /> */}
                  <button onClick={() => (deleteUser(colabolador.id))} className="btn btn-danger" ><i className="fas fa-trash-alt" /></button>
                </td>
              </tr>

            ))

          }


        </tbody>

      </table>

      {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}     
      /> */}
    </div>

  )
}

export default TableAdmin

