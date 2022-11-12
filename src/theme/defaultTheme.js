import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    typography: {
        fontFamily: ['Circular Std', 'sans-serif'].join(","),
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightSemiBold: 600,
        fontWeightBold: 700,
        allVariants: {
            color: '#09234B'
        }
    },
    palette: {
        primary: {
            main: '#196E82',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#EBEDEC',
            contrastText: '#356C80'
        },
    },

    colors: {
        primary: '#FEFAF7',
        secondary: '#DF5F2E',
        grayNav: "#EBEDEC",
        grayBackground: "#EBEDEC",
        navyPrimary: '#0F465A',
        navyBlack: '#122937',
        background: '#F8F8F8',
        gradients: {
            blue1: '#FEFAF7',
            blue2: '#122937',
            black1: '#F8F8F8',
            black2: '#EDEDED',
        }
    },
    shadows: {
        0: "",
        1: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        2: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        3: "0px 4px 8px rgba(0, 0, 0, 0.15)",
        4: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        5: '2px 4px 30px rgba(155, 155, 155, 0.25)',
        8: '2px 4px 30px rgba(155, 155, 155, 0.25)',
        16: "0px 4px 8px rgba(0, 0, 0, 1)",
        24: "2px 4px 30px rgba(0,0,0,0.5)"
    },
    shape: {
        borderRadius: 4
    },
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                variant: 'outlined',
                size: 'default'
            },
            styleOverrides: {
                root: {
                    "& .MuiFilledInput-root": {
                        "&::before": { borderBottom: "none", '&:hover': { border: "none" } },
                        "&::after": { borderBottom: "none", '&:hover': { border: "none" } }
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderRadius: 4,
                        },
                    },
                }
            }
        },
        MuiButton: {
            defaultProps: {
                variant: "contained",
                color: "primary",
                margin: 'normal',
                size: "large"
            },
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
                sizeLarge: {
                    paddingTop: 12
                }
            }
        },
        MuiListItemText: {
            defaultProps: {
                primaryTypographyProps: {
                    color: "inherit"
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: "none"
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    border: 'none'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'rgba(0,0,0, 1)',
                    fontSize: 14,
                    fontWeight: 400,
                    marginBottom: 8
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h2: {
                    fontWeight: 600,
                    fontSize: 32
                },
                h3: {
                    fontWeight: 600,
                    fontSize: 20
                },
                h4: {
                    fontWeight: 600,
                    fontSize: 16
                },
                h5: {
                    fontWeight: 400,
                    fontSize: 16
                }
            }
        }
    },
});

export default theme