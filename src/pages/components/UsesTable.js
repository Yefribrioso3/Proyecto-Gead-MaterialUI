import { Table, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

export default function UsesTable(getAllList, headCells) {
    
    const tblContainer = props => (
        <Table>
            {props.children}
        </Table>
    )

    const tableHead = props => {

        return (<TableHead>
            <TableRow>
                {
                    headCells.map( headCells => ( <TableCell key={headCells.id}>
                        { headCells.label }
                    </TableCell>))
                }
            </TableRow>
        </TableHead>)
    }

    return {
        tblContainer,
        tableHead
     }
}
