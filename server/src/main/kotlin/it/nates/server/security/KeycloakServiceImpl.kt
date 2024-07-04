package it.nates.server.security

import it.nates.server.DuplicateProfileException
import it.nates.server.security.Credentials.createPasswordCredentials
import it.nates.server.users.UserDTO
import org.keycloak.admin.client.CreatedResponseUtil
import org.keycloak.admin.client.resource.RealmResource
import org.keycloak.admin.client.resource.UserResource
import org.keycloak.admin.client.resource.UsersResource
import org.keycloak.representations.idm.UserRepresentation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.JwtDecoders
import org.springframework.stereotype.Service
import java.time.Instant
import java.util.*

@Service
class KeycloakServiceImpl(): KeycloakService {
    override fun addUser(newUserDTO: NewUserDTO): ResponseEntity<String> {

        return try {
            val credential = createPasswordCredentials(newUserDTO.password)
            val user = UserRepresentation()
            user.username = newUserDTO.username
            //user.firstName = userDTO.name
            // user.lastName = userDTO.surname
            user.email = newUserDTO.email
            user.credentials = Collections.singletonList(credential)
            user.isEmailVerified = true
            user.isEnabled = true
            val instance: UsersResource = getInstance()
            val realm: RealmResource= KeycloakConfig.getInstance().realm(KeycloakConfig.realm)

            val response=instance.create(user)
            if(response.status==409){
                throw DuplicateProfileException()}
            println(response.status)
            val userRes : UserResource=instance.get(CreatedResponseUtil.getCreatedId(response))
            userRes.roles().realmLevel().add(mutableListOf( realm.roles().get("app_user").toRepresentation()))
            return ResponseEntity.status(response.status).body("User created succesfully")
        } catch (e: Exception) {
            if(e is DuplicateProfileException)
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username or email already used")

            println(e)
            println("non funziona")
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.message)
        }

    }

    override fun readUser(email: String): List<UserRepresentation?>? {
        val usersResource: UsersResource = getInstance()
        return usersResource.search(email, true)
    }

    override fun updateUser(email: String, userDTO: UserDTO) {
        //val credential: CredentialRepresentation = createPasswordCredentials(userDTO.password)
        val user = UserRepresentation()
        user.username = userDTO.email
        user.firstName = userDTO.name
        user.email = userDTO.email
        //user.credentials = Collections.singletonList(credential)
        val usersResource: UsersResource = getInstance()
        usersResource[email].update(user)
    }

    override fun deleteUser(email: String) {
        val usersResource: UsersResource = getInstance()
        usersResource[email]
            .remove()
    }

    override fun  getInstance(): UsersResource {
        return KeycloakConfig.getInstance().realm(KeycloakConfig.realm).users()
    }
    override fun isTokenValid(token: String): Boolean {
        val jwtDecoder: JwtDecoder =  JwtDecoders.fromIssuerLocation("http://localhost:8080/realms/SpringBootKeycloak")
        val  jwt=jwtDecoder.decode(token)
        return  !jwt.expiresAt?.isBefore(Instant.now())!!
    }


}