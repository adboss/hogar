

export interface report {
    company: string;
    activos: activo;
    pasivos: pasivo;
    patrimonioNeto: patrimonioNeto;
    cuentaResultados: resultados;
} 



export interface activo {
    ActivoCirculante: number;
    ActivoFinanciero: number;
    ActivoFijo: number;
}

export interface pasivo {
    PasivoCirculante: number;
    AcreedoresOperacionesComun: number;
    AcreedoresLargoPlazo: number;
}

export interface patrimonioNeto {
    CapitalSocial: number;
    Reservas: number;
    AjustesPorCambioValor: number;
    ResultadosPendientesAplicacion: number;
}



export interface resultados {
    ingresosDividendos: number;
    gastosCustodia: number;
    gastosMantenimiento: number;
    gastosComisiones: number;
    resultadoDelEjercicio: number;
}

