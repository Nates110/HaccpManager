package it.nates.server.security

import it.nates.server.users.UserDTO
import org.keycloak.admin.client.resource.UsersResource
import org.keycloak.representations.idm.UserRepresentation
import org.springframework.http.ResponseEntity

interface KeycloakService {
    fun addUser(newUserDTO: NewUserDTO): ResponseEntity<String>
    fun readUser(email: String): List<UserRepresentation?>?
    fun updateUser(email: String, userDTO: UserDTO)
    fun deleteUser(email: String)
    fun getInstance(): UsersResource
    fun  isTokenValid(token: String):Boolean

}