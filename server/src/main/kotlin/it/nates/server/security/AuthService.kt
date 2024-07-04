package it.nates.server.security

import it.nates.server.users.User
import org.springframework.http.ResponseEntity

interface AuthService {

    fun authenticate(credentials: LoginCredentials): String?

    fun getAdminToken(): String?

    fun registerUser(adminToken: String, user: User): ResponseEntity<Any>

}