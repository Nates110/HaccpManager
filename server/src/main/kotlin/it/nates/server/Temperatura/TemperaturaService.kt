package it.nates.server.Temperatura

import it.nates.server.frigoriferi.Frigorifero
import org.springframework.http.ResponseEntity

interface TemperaturaService {
    fun getAllByFrigoAndDate(frigoId:Long,month:Long,year:Long):List<TemperaturaDTO>?
    fun addTemperatura(newTemp:Temperatura,frigoId:Long): ResponseEntity<Temperatura>
    fun deleteTemeperatura(id:Long)
}