package it.nates.server.security

import io.micrometer.observation.annotation.Observed
import it.nates.server.DuplicateProfileException
import it.nates.server.users.UserDTO
import it.nates.server.users.UserService

import jakarta.validation.Valid
import org.hibernate.query.sqm.tree.SqmNode.log
import org.springframework.web.bind.annotation.*
import org.keycloak.representations.idm.UserRepresentation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult

@RestController
@Observed
@RequestMapping("/API")
class KeyCloakController(private val service: KeycloakService, private val userService: UserService) {

    @PostMapping("/user")
    @ResponseStatus(HttpStatus.CREATED)
    fun addUser(@RequestBody newUserDTO: NewUserDTO): ResponseEntity<String> {

        try {
            log.info("Test adding user : $newUserDTO")

            return service.addUser(newUserDTO)

        } catch (e: Exception) {
            println(e)
            return if(e is DuplicateProfileException){
                ResponseEntity.status(HttpStatus.CONFLICT).body(e.message)
            } else
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
        }


    }

    @GetMapping("/user/{userName}")
    fun getUser(@PathVariable("userName") userName: String): List<UserRepresentation?>? {
        return service.readUser(userName)
    }

    @PutMapping("/user/update/{userId}")
    fun updateUser(@PathVariable("userId") userId: String, @RequestBody userDTO: UserDTO): String {
        service.updateUser(userId, userDTO)
        return "User Details Updated Successfully."
    }

    @DeleteMapping("/user/{userId}")
    fun deleteUser(@PathVariable("userId") userId: String): String {
        service.deleteUser(userId)
        return "User Deleted Successfully."
    }

    @GetMapping("/verify-token")
    fun verifyToken(@RequestHeader("Authorization") header:String ):ResponseEntity<String>{
        val token = header.replace("Bearer ", "")
        return if (service.isTokenValid(token)) {
            ResponseEntity.ok("Token is valid")
        } else {
            ResponseEntity.status(401).body("Token is invalid or expired")
        }

    }




}
