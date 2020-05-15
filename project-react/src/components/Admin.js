//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Header from './Header';
import { Button } from '@material-ui/core';


export default function Admin() {

    const [district, setDistrict] = useState("")
    const [building, setBuilding] = useState("")
    const [newDistrict, setNewDistrict] = useState("")
    const [newBuilding, setNewBuilding] = useState("")

    const [user, setUser] = useState("")
    const [newUser, setNewUser] = useState("")
    const [password, setUserPassword] = useState("")



    //Location creation, updation, deletion

    const handleUpdateD = (e) => {
        setNewDistrict(e.target.value)
        console.log(e.target.value)
    }

    const handleUpdateB = (e) => {
        setNewBuilding(e.target.value)
        console.log(e.target.value)
    }


    const handleD = (e) => {
        setDistrict(e.target.value)
        console.log(e.target.value)
    }



    const handleB = (e) => {
        setBuilding(e.target.value)
        console.log(e.target.value)
    }


    const handleCreateSubmit = () => {
        alert("Create submitted")
    }


    const handleUpdateSubmit = () => {
        alert("Update submitted")
    }

    const handleDeleteSubmit = () => {
        alert("Delete submitted")
    }


    //User creation, updation, deletion

    const handleUser = (e) => {
        setUser(e.target.value)
        console.log(e.target.value)
    }

    const handleNewUser = (e) => {
        setNewUser(e.target.value)
        console.log(e.target.value)
    }

    const handleUserPassword = (e) => {
        setUserPassword(e.target.value)
        console.log(e.target.value)
    }



    const handleUserCreateSubmit = () => {
        alert("Create user submitted")
    }


    const handleUserUpdateSubmit = () => {
        alert("Update user submitted")
    }

    const handleUserDeleteSubmit = () => {
        alert("Delete user submitted")
    }

    return (
        <div >

            <Header />
            <div style={{
                marginLeft: '50px'
            }}>
                <div style={{
                    marginTop: '50px', align: "center"
                }}>
                    <h2>Admin Mode</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <h2 style={{ marginLeft: '0px', marginTop: '50px', width: '200px', height: '20px' }}>Create Location</h2>
                        <form style={{ width: '200px', height: '40px', marginTop: '50px' }} noValidate autoComplete="off">
                            <TextField onChange={handleD} id="dictrictCreate" label="District" variant="outlined" style={{ height: '20px' }} />
                            <TextField onChange={handleB} id="buildCreate" label="Location" variant="outlined" style={{ marginTop: '40px', height: '20px' }} />
                            <Button onClick={handleCreateSubmit} variant="outlined" color="primary" style={{ height: '40px', width: '195px', marginTop: '60px' }} type="submit">Create Location</Button>
                        </form>
                    </div>
                    <div style={{ marginLeft: '30px' }}>
                        <h2 style={{ marginLeft: '0px', marginTop: '50px', width: '200px', height: '20px' }} >Update Location</h2>
                        <form style={{ width: '200px', height: '40px', marginTop: '50px' }} noValidate autoComplete="off">
                            <TextField onChange={handleD} id="outlined-basic" label="District" variant="outlined" style={{ height: '20px' }} />
                            <TextField onChange={handleB} id="outlined-basic" label="Building name" variant="outlined" style={{ marginTop: '40px', height: '20px' }} />
                            <TextField onChange={handleUpdateD} id="outlined-basic" label="New district name" variant="outlined" style={{ marginTop: '40px', height: '20px' }} />
                            <TextField onChange={handleUpdateB} id="outlined-basic" label="New building name" variant="outlined" style={{ marginTop: '40px', height: '20px' }} />
                            <Button onClick={handleUpdateSubmit} variant="outlined" color="primary" style={{ height: '40px', width: '195px', marginTop: '60px' }} type="submit">Update Location</Button>
                        </form>
                    </div>
                    <div style={{ marginLeft: '30px' }}>
                        <h2 style={{ marginLeft: '0px', marginTop: '50px', width: '200px', height: '20px' }}>Delete Location</h2>
                        <form style={{ width: '200px', height: '40px', marginTop: '50px' }} noValidate autoComplete="off">
                            <TextField onChange={handleD} id="dictrictCreate" label="District" variant="outlined" style={{ height: '20px' }} />
                            <TextField onChange={handleB} id="buildCreate" label="Location" variant="outlined" style={{ marginTop: '40px', height: '20px' }} />
                            <Button onClick={handleDeleteSubmit} variant="outlined" color="primary" style={{ height: '40px', width: '195px', marginTop: '60px' }} type="submit">Delete Location</Button>
                        </form>
                    </div>

                    <div style={{ marginLeft: '40px' }}>
                        <h2 style={{ marginLeft: '0px', marginTop: '50px', width: '200px', height: '20px' }}>Create User</h2>
                        <form style={{ width: '200px', height: '40px', marginTop: '50px' }} noValidate autoComplete="off">
                            <TextField onChange={handleUser} id="dictrictCreate" label="Username" variant="outlined" style={{ height: '20px' }} />
                            <TextField onChange={handleUserPassword} id="buildCreate" label="Password" variant="outlined" style={{ marginTop: '40px', height: '20px' }} />
                            <Button onClick={handleUserCreateSubmit} variant="outlined" color="primary" style={{ height: '40px', width: '195px', marginTop: '60px' }} type="submit">Create User</Button>
                        </form>
                    </div>
                    <div style={{ marginLeft: '30px' }}>
                        <h2 style={{ marginLeft: '0px', marginTop: '50px', width: '200px', height: '20px' }} >Update User</h2>
                        <form style={{ width: '200px', height: '40px', marginTop: '50px' }} noValidate autoComplete="off">
                            <TextField onChange={handleUser} id="outlined-basic" label="Username" variant="outlined" style={{ height: '20px' }} />
                            <TextField onChange={handleNewUser} id="outlined-basic" label="New username" variant="outlined" style={{ marginTop: '40px', height: '20px' }} />
                            <TextField onChange={handleUserPassword} id="outlined-basic" label="Password" variant="outlined" style={{ marginTop: '40px', height: '20px' }} />
                            <Button onClick={handleUserUpdateSubmit} variant="outlined" color="primary" style={{ height: '40px', width: '195px', marginTop: '60px' }} type="submit">Update User</Button>
                        </form>
                    </div>
                    <div style={{ marginLeft: '30px' }}>
                        <h2 style={{ marginLeft: '0px', marginTop: '50px', width: '200px', height: '20px' }}>Delete User</h2>
                        <form style={{ width: '200px', height: '40px', marginTop: '50px' }} noValidate autoComplete="off">
                            <TextField onChange={handleUser} id="dictrictCreate" label="Username" variant="outlined" style={{ height: '20px' }} />
                            <Button onClick={handleUserDeleteSubmit} variant="outlined" color="primary" style={{ height: '40px', width: '195px', marginTop: '60px' }} type="submit">Delete User</Button>
                        </form>
                    </div>
                </div>

                <div style={{ marginTop: '250px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                    </div>
                </div>

            </div>
        </div>
    );
}