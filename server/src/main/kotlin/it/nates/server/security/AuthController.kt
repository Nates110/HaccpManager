package it.nates.server.security



import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthController(private val authService: AuthService) {

    @PostMapping("/API/login")
    @ResponseStatus(HttpStatus.OK)
    fun login(@RequestBody credentials: LoginCredentials): ResponseEntity<Any> {

        val jwt = authService.authenticate(credentials)
        return if (jwt != null) {
            ResponseEntity.ok(JwtResponse(jwt))
        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
    }


}