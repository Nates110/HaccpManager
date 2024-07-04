package it.nates.server.users
import io.micrometer.observation.annotation.Observed
import io.smallrye.config.ConfigLogging.log
import it.nates.server.InvalidInputException
import jakarta.validation.Valid

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*




@RestController
@Observed
class UserController(private val userService: UserService) {

    @GetMapping("/API/profiles/")
    @ResponseStatus(HttpStatus.OK)
    fun getAll(): List<UserDTO> {
        return userService.getAll()
    }

    @GetMapping("/API/agencies/")
    @ResponseStatus(HttpStatus.OK)
    fun getAllAgencies():List<UserDTO>{
        return userService.getAllAgencies()
    }


    @GetMapping("/API/profiles/{email}")
    @ResponseStatus(HttpStatus.OK)
    fun getUser(@PathVariable email: String): UserDTO? {
        return userService.getUser(email)
    }

    @Observed
    @PostMapping("/API/profiles")
    @ResponseStatus(HttpStatus.CREATED)
    fun addUser(@RequestBody @Valid newUser: User, br: BindingResult): ResponseEntity<User> {
        if(br.hasErrors()) {
            throw InvalidInputException(br.allErrors.map { it.defaultMessage }.reduce { acc, s -> "$acc; $s" })
        }
        log.info{"test user registration: $newUser"}
        return userService.addUser(newUser)
    }

    @PutMapping("/API/profiles/{email}")
    @ResponseStatus(HttpStatus.OK)
    fun updateUser(@RequestBody @Valid updatedUser: User, br: BindingResult): ResponseEntity<User> {
        if(br.hasErrors())
            throw InvalidInputException(br.allErrors.map { it.defaultMessage }.reduce { acc, s -> "$acc; $s" })
        return userService.updateUser(updatedUser)
    }
}