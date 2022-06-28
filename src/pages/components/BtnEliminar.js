import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import { Delete, LockSharp } from "@material-ui/icons";
import { createTheme } from "@material-ui/core/styles";


export function BtnEliminar({ seleccionarEquipo, params, Disabled }) {

    const theme = createTheme(
        {
            palette: {
                alert: {
                    main: "#C60055",
                },
            },
        },
        //   esES
    );

    // const [Disabled, setDisabled] = useState(false)

    return (
        <>
            {
                Disabled ? (
                    <div aria-label="delete" component="span">
                        <IconButton
                            style={{
                                fontWeight: 500,
                                color: theme.palette.alert.main,
                            }}
                            disabled
                            aria-label="delete"
                        >
                            {/* <Delete /> */}
                            <LockSharp />
                        </IconButton>
                    </div>
                ) : (
                    <div
                        aria-label="delete"
                        onClick={() => seleccionarEquipo(params.row, "Eliminar")
                        }
                        component="span"
                    >
                        <IconButton
                            style={{
                                fontWeight: 500,
                                color: theme.palette.alert.main,
                            }}
                            aria-label="delete"
                        >
                            <Delete />
                        </IconButton>
                    </div >
                )
            }
        </>
    )
}