package it.nates.server.fonitori

import it.nates.server.InvalidInputException
import it.nates.server.users.UserDTO
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
class FornitoreController(private val fornitoreService: FornitoreService){
    @GetMapping("/API/fornitori/{userid}")
    @ResponseStatus(HttpStatus.OK)
    fun getAll(@PathVariable userid: String): List<FornitoreDTO>? {
        return fornitoreService.getAllByUser(userid)
    }


    @PostMapping("/API/fornitori/{userid}")
    @ResponseStatus(HttpStatus.CREATED)
    fun addFornitore(@RequestBody @Valid newFornitore:Fornitore, br: BindingResult, @PathVariable userid: String):ResponseEntity<Fornitore>{
        if(br.hasErrors()) {
            throw InvalidInputException(br.allErrors.map { it.defaultMessage }.reduce { acc, s -> "$acc; $s" })
        }
        return fornitoreService.addFornitore(newFornitore,userid)

    }

    @DeleteMapping("/API/fornitori/{fId}")
    @ResponseStatus(HttpStatus.OK)
    fun deleteFornitore(@PathVariable fId: String){
        return fornitoreService.deleteFornitore(fId)
    }


}