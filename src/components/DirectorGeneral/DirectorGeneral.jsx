import React from 'react'
// import TEAMADMIN from '../TEAMADMIN/TEAMADMIN'
// import TEAMFISCAL from '../TEAMFISCAL/TEAMFISCAL'
// import TEAMFOREING from '../TEAMFOREING/TEAMFOREING'
// import TEAMDIRECCIÓN from '../TEAMDIRECCIÓN/TEAMDIRECCIÓN'
// import {Link} from 'react-router-dom';



function DirectorGeneral({user}) {
  
  
  return (
    
<div className='container'>
 
<div className="row">
  <div className="col-sm-3">
    <div className="card">
    <img src="https://img.milanuncios.com/fg/3310/73/331073934_1.jpg?VersionId=io0iZgSV86LwROLnljJhgaebXdk1cNX3" class="card-img-top" Style="width: 100%; height: 110px; " alt="..."/>
      <div className="card-body">
        <h5 className="card-title text-center">TEAM ADMIN</h5>
        
        {/* <Link to={`/TEAMADMIN`} className = "btn btn-primary text-center" >Ver Mas </Link> */}

      </div>
    </div>
  </div>
  <div className="col-sm-3">
    <div className="card">
    <img src="https://discovery.rsm.nl/fileadmin/_generated_/download/image/45234bae16abe75140d05161c6570f13-f8fb3c90-ec19-11e5-b5fd-11b23e44bddd.jpg" 
    Style="width: 100%; height: 110px;"
    className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title text-center">TEAM FOREING</h5>
        {/* <Link to={`/TEAMFOREING`} className = "btn btn-primary text-center" >Ver Mas </Link>     */}
      </div>
    </div>
  </div>

  <div className="col-sm-3">
    <div className="card">
    <img src="https://w1.pngwing.com/pngs/250/753/png-transparent-building-team-team-building-organization-leadership-management-senior-management-change-management.png" 
    className="card-img-top"
    Style="width: 100%; height: 110px;"
    alt="..."/>
      <div className="card-body">
        <h5 className="card-title text-center">TEAM DIRECCION</h5>
        {/* <Link to={`/TEAMDIRECCIÓN`} className = "btn btn-primary text-center" >Ver Mas </Link> */}

      </div>
    </div>
  </div>
  <div className="col-sm-3">
    <div className="card">
    <img src="https://cdn.shopify.com/s/files/1/0408/5986/1160/articles/maxresdefault_1___._455x300@2x.png?v=1596905212" 
    className="card-img-top" 
    Style="width: 100%; height: 110px;"
    alt="..."/>
      <div className="card-body">
        <h5 className="card-title text-center">TEAM FISCAL</h5>
        {/* <Link to={`/TEAMFISCAL`} className = "btn btn-primary text-center" >Ver Mas </Link> */}

      </div>
    </div>
  </div>
</div>  
    </div>
  )
}

export default DirectorGeneral
