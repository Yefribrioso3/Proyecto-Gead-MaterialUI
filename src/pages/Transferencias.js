import React, { useState } from 'react'
import Head from '../components/login/Head'
import { Transfer } from './components/Transfer'
import NewTransfer from './components/NewTransfer'

export const Transferencias = () => {

    const [mostrarMenus, setmostrarMenus] = useState(true)

    return (
        <>
            <Head />

            {mostrarMenus ? (
                <Transfer setmostrarMenus={setmostrarMenus} />    //---- Menu principal de Transferencias
            ) : (
                <NewTransfer setmostrarMenus={setmostrarMenus} />
            )
            }
        </>
    )
}
