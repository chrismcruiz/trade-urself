import React, { useState, useEffect, useMemo } from "react";
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CancelIcon from '@material-ui/icons/Cancel';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Button, Modal } from 'react-bootstrap';
import { Input } from "../components/accountBox/common";
import { filtrarUser, recorrerObjeto } from '../utils/Utils'
import { CircularProgress } from '@material-ui/core';
import axios from 'axios'

function Admin(props) {
    props = props.props
    const [isLoading, setIsLoading] = useState(false);
    const [aUsers, setUsers] = useState([]);
    const [aUsersIniciales, setUsersIni] = useState([]);
    const [aNombres, setNombres] = useState([]);
    const [idActual, setIdActual] = useState('')

    useEffect(() => {
        async function users() {
            setIsLoading(true)
            const req = await axios.get("http://localhost:4000/app/users");
            //console.log(req.data);
            // if (req.data) {
            //     console.log(req.data)
            //     //setUsers(req.data);
            // }
            var nombres = [];
            if (req.data.length > 0) {
                for (let i = 0; i < req.data.length; i++) {
                    if (req.data[i].admin) {
                        req.data.splice(i, 1);
                        //break;
                    } else {
                        nombres[req.data[i]._id] = req.data[i].name;
                    }
                }
                //console.log(req.data)
                setNombres(nombres);
                setUsers(req.data);
                setUsersIni(req.data);
                setIsLoading(false)
            }
        }
        users()
    }, [])

    const img = recorrerObjeto(filtrarUser(props.users, props.idUser)).photo

    const alreadyRemoved = []
    const [deleteShow, setDeleteShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [viewShow, setViewShow] = useState(false);
    const childRefs = useMemo(() => Array(aUsers.length).fill(0).map(i => React.createRef()), [aUsers])
    //const [setShow] = useState(false);

    const handleCloseDelete = () => setDeleteShow(false);
    const handleCloseEdit = () => setEditShow(false);
    const handleCloseView = () => setViewShow(false);
    //const handleShow = () => setShow(true);

    const [formShow, setFormShow] = useState(false);

    const handleFormShow = () => {
        formShow ? setFormShow(true) : setFormShow(true);
    }

    const [filtroTabla, setFiltroTabla] = useState('')

    function filtroUsuarios(e) {
        var a = e.target.value
        if (a !== undefined && a !== "") {
            var aResultado = aUsers.filter(function (valor) {
                return valor.name.toLowerCase().indexOf(a) > -1
                    || valor.career.toLowerCase().indexOf(a) > -1
                    || valor.email.indexOf(a) > -1
                    || valor.Date.substr(0, 10).indexOf(a) > -1
                    || valor._id.indexOf(a) > -1;
            });
            setUsers(aResultado);
        } else {
            setUsers(aUsersIniciales);
        }
        setFiltroTabla(a);
    }

    const deleteUser = (id) => {
        setDeleteShow(true)
        setIdActual(id)
    }

    console.log(props.token)
    const borrar = async () => {
        setIsLoading(true)
        let config = { 
            headers: {
                Authorization: props.token
            },
            data: {
                _id: idActual
             
            } 
        }
        await axios.delete('http://localhost:4000/app/admin/deleteuser', config)
            .then(response => {
                    console.log(response.data);
                    setDeleteShow(false)
                    setIsLoading(false)
                    window.location.reload()
                    
                
            })
            .catch(error => {
                    console.log(error);
                    setIsLoading(false)
                    setDeleteShow(false)
            });
    }

    if (isLoading) {
        return (<div className="vertical-center"><CircularProgress color="primary" size={60} /></div>)
    }

    return (
        <div className='contenedor_admin'>
            <Modal show={deleteShow} onHide={() => setDeleteShow(false)}>
                <Modal.Header closeButton className='bg-danger'>
                    <Modal.Title className='texto-blanco'>Eliminar</Modal.Title>
                </Modal.Header>
                <Modal.Body>Seguro quieres eliminar este registro?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={borrar}
                    >
                        Si
            </Button>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        No
            </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={editShow} onHide={() => setEditShow(false)} size="md">
                <Modal.Header closeButton className='fondo-verde'>
                    <Modal.Title className='texto-blanco'>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-4'>
                    <form method='POST' encType='multipart/form-data' className='' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div className=''>
                            <Input
                                className='label_inputs border-0 pb-2 w-100 pl-0'
                                type="file"
                                name='photo'
                                accept=".png, .jpg, .jpeg"
                                id='photo'
                            />
                        </div>
                        <Input
                            className='mb-2'
                            type="text"
                            placeholder="Nombre"
                            name='name'
                            value={''}
                            required
                        />
                        <Input
                            type="email"
                            name='email'
                            placeholder="Email"
                            value={0}
                            required
                        />
                        <div className=''>
                            <label className='label_inputs py-2 pr-2' style={{ fontWeight: '700' }}>Fecha de nacimiento</label>
                            <Input
                                className='label_inputs'
                                type="date"
                                placeholder="Fecha de nacimiento"
                                required
                                name='birthday'
                                value={0}
                            />
                        </div>
                        <label className='label_inputs py-2 ps-2' style={{ fontWeight: '700' }}>Género</label>
                        <div className='d-flex ps-2' value={0}>
                            <div className='d-flex align-items-center me-3'>
                                <Input
                                    className='d-inline-block inputs_radius'
                                    type="radio"
                                    name='gender'
                                    id='male'
                                    value={'masculino'}
                                    required />
                                <label htmlFor="male" className='label_inputs'>Masculino</label>
                            </div>
                            <div className='d-flex align-items-center me-3'>
                                <Input
                                    className='d-inline-block inputs_radius'
                                    type="radio"
                                    name='gender'
                                    id='female'
                                    value={'femenino'}
                                    required />
                                <label htmlFor="female" className='label_inputs'>Femenino</label>
                            </div>
                            <div className='d-flex align-items-center'>
                                <Input
                                    className='d-inline-block inputs_radius'
                                    type="radio"
                                    name='gender'
                                    id='other'
                                    value={'otro'}
                                    required />
                                <label htmlFor="other" className='label_inputs'>Otro</label>
                            </div>
                        </div>
                        <div className='pb-2'>
                            <label className='label_inputs py-2 ps-2 d-block' style={{ fontWeight: '700' }}>Carrera</label>
                            <select
                                required
                                name='career'
                                id='career'
                                className='input_select p-1 w-100'
                                value={0}
                            >
                                <option value='' selected disabled>Escoge una opción</option>
                                <option value='ingenieria de sistemas'>Ingeniería de Sistemas</option>
                                <option value='ingenieria industrial'>Ingeniería Industrial</option>
                                <option value='ingenieria de petroleos'>Ingeniería de Petroleos</option>
                                <option value='ingenieria civil'>Ingeniería Civil</option>
                                <option value='ingenieria metalurgica'>Ingeniería Metalúrgica</option>
                                <option value='ingenieria electronica'>Ingeniería Electrónica</option>
                                <option value='licenciatura en idiomas'>Licenciatura en Idiomas</option>
                            </select>
                        </div>
                        <Input
                            className='mb-2'
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={0}
                            required
                        />
                        <Input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirmar Contraseña"
                            value={0}
                            required
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Guardar
            </Button>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Cerrar
            </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={viewShow} onHide={() => setViewShow(false)} size="lg">
                <Modal.Header closeButton className='fondo-verde'>
                    <Modal.Title className='texto-blanco'>Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='div_imagen_perfil_admin fondo-verde'>
                        <img src='' className='imagen_perfil_admin'></img>
                    </div>
                    <p className='mt-3'>Nombre: </p>
                    <p className='mt-3'>Email: </p>
                    <p className='mt-3'>Carrera: </p>
                    <p className='mt-3'>Fecha de nacimiento: </p>
                    <p className='mt-3'>Descripcion: </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseView}>
                        Cerrar
            </Button>
                </Modal.Footer>
            </Modal>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-3 px-0'>
                        <div className='menu_arriba w-100'>
                            <div className='py-3 px-4 d-flex align-items-center'>
                                <img className='imagen_perfil' src={`/images/${img}`} />
                                <p className='pl-3 m-0 text-titulos-1 texto-blanco'>
                                    Administrador
                            </p>
                            </div>
                        </div>
                        <div className='fondo-gris pantalla_match p-3'>
                            <ul className='p-0'>
                                <li className='d-flex align-items-center texto_admin mb-3 texto-negro' onClick={handleFormShow}><PersonIcon className='mr-2'></PersonIcon>Usuarios</li>
                                <a href='#' className='texto-negro'>
                                    <li onClick={props.logOut} className='d-flex align-items-center texto_admin mb-3'><ExitToAppIcon className='mr-2'></ExitToAppIcon>Salir</li>
                                </a>
                            </ul>
                        </div>
                    </div>
                    {formShow ? <div className='col-9 px-0 fondo-blanco div_contenedor_informe p-5'>

                        <p className='texto-negro h2'>Informe de tabla de usuarios</p>
                        <Input
                            placeholder='Buscar'
                            type='text'
                            className='mt-2 py-2 w-50'
                            //onKeyUp={filtroUsuarios}
                            value={filtroTabla}
                            onChange={filtroUsuarios}
                            name='txt_filtro'
                        />
                        <div className='table-responsive mt-4 shadow-sm'>
                            <table className='table'>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Photo</th>
                                        <th scope="col" className="text-center">Id</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Carrera</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Match</th>
                                        <th scope="col"># Matches</th>
                                        <th scope="col">Fecha de creacion</th>
                                        <th scope="col" className="text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {aUsers.map((user, index) =>

                                        <tr>
                                            <td>
                                                <img className='imagen_personas_matches_admin' src={`/images/${user.photo}`} />
                                            </td>
                                            <td scope="row" className="text-center">{user._id.substr(-5, 20)}</td>
                                            <td>{user.name}</td>
                                            <td>{user.career}</td>
                                            <td>{user.email}</td>
                                            <td>{
                                                user.matches.map(function (val) {
                                                    if (val != "") {
                                                        return aNombres[val]
                                                    }
                                                    //console.log(val.length)
                                                    //console.log(typeof val);
                                                }).join(' ').trim().replace(' ', ', ')
                                            }
                                            </td>
                                            <td>{user.matches.length - 1}</td>
                                            <td>{user.Date.substr(0, 10)}
                                            </td>
                                            <td className='d-flex justify-content-center'>
                                                <CancelIcon className='m-2 iconos_crud' onClick={() => deleteUser(user._id)}></CancelIcon>
                                                <CreateIcon className='m-2 iconos_crud' onClick={() => setEditShow(true)}></CreateIcon>
                                                <VisibilityIcon className='m-2 iconos_crud' onClick={() => setViewShow(true)}></VisibilityIcon>
                                            </td>
                                        </tr>

                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div> :
                        <div className='col-9 px-0 fondo-blanco div_contenedor_informe p-5 text-center position-relative'>
                            <div className='div_contenedor_logo_nombre_admin position-relative'>
                                <img className='admin_perfil' src={`/images/${img}`} ></img>
                                <h2 className='mt-5'>Administrador TRADE URSELF</h2>
                            </div>
                        </div>
                    }
                    <div className='col-12 p-0 text-center'>
                        <div className='fondo-verde py-3 div_footer_admin w-100'>
                            <p className='texto-blanco'>Copyright © 2021 TRADE URSELF® - TODOS LOS DERECHOS RESERVADOS</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
