package it.nates.server.frigoriferi

import it.nates.server.InvalidInputException
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*

@RestController
class FrigoriferoController(private val frigoriferoService: FrigoriferoService) {

    @GetMapping("/API/frigorifero/{userId}")
    @ResponseStatus(HttpStatus.OK)
    fun getFrigoriferiByUser(@PathVariable userId: String):List<FrigoriferoDTO>?{
        return frigoriferoService.getAllByUser(userId)

    }

    @PostMapping("/API/frigorifero/{userId}")
    @ResponseStatus(HttpStatus.CREATED)
    fun addFrigorifero(@RequestBody @Valid newFrigorifero:Frigorifero, br: BindingResult, @PathVariable userId: String):ResponseEntity<Frigorifero>{
        if(br.hasErrors()) {
            throw InvalidInputException(br.allErrors.map { it.defaultMessage }.reduce { acc, s -> "$acc; $s" })
        }
        return frigoriferoService.addFrigorifero(newFrigorifero,userId)
    }

    @DeleteMapping("/API/frigorifero/{id}")
    @ResponseStatus(HttpStatus.OK)
    fun deleteFrigorifero(@PathVariable id: Long){
        return frigoriferoService.deleteFrigorifero(id)
    }

}