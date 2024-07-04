package it.nates.server.Temperatura

import it.nates.server.InvalidInputException
import it.nates.server.frigoriferi.Frigorifero
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*

@RestController
class TemperaturaController(private val temperaturaService: TemperaturaService) {

    @GetMapping("/API/temperature/{frigoId}/{month}/{year}")
    @ResponseStatus(HttpStatus.OK)
    fun getTemperatureByFrigo(@PathVariable frigoId: String, @PathVariable month: String, @PathVariable year: String):List<TemperaturaDTO>?{

        return temperaturaService.getAllByFrigoAndDate(frigoId.toLong(),month.toLong(),year.toLong())
    }

    @PostMapping("/API/temperature/{frigoId}")
    @ResponseStatus(HttpStatus.CREATED)
    fun addTemp(@RequestBody @Valid newTemp: Temperatura, br: BindingResult, @PathVariable frigoId: Long): ResponseEntity<Temperatura> {
        if (br.hasErrors()) {
            throw InvalidInputException(br.allErrors.map { it.defaultMessage }.reduce { acc, s -> "$acc; $s" })
        }
        return temperaturaService.addTemperatura(newTemp, frigoId)
    }

    @DeleteMapping("/API/temperature/{id}")
    @ResponseStatus(HttpStatus.OK)
    fun deleteTemp(@PathVariable id: String){
        return temperaturaService.deleteTemeperatura(id.toLong())
    }


}