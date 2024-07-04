package it.nates.server.Temperatura

import it.nates.server.frigoriferi.Frigorifero

data class TemperaturaDTO(
    val id:Long?,
    val frigo: Frigorifero?,
    val day:Long,
    val month:Long,
    val year:Long
)

fun Temperatura.toDTO():TemperaturaDTO{
    return TemperaturaDTO(getIdDoc(),frigo,day,month,year)
}