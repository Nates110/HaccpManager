package it.nates.server.users
import com.fasterxml.jackson.annotation.JsonIgnore

import jakarta.persistence.*
import jakarta.validation.constraints.*
import org.springframework.data.util.ProxyUtils
import java.time.LocalDate

@Entity
@Table(name="users")
class User (
    @Id
    @field:Email(message="Provided Id is not an email")
    @field:NotBlank(message = "Email is required")
    val email: String,
    @field:NotBlank(message = "Username is required")
    var username: String,
    @field:Pattern(regexp = "^[a-zA-Z ,]+\$", message = "Name is not valid")
    var name: String,
    @field:Pattern(regexp = "^[a-zA-Z ,]+\$", message = "City is not valid")
    var city: String,
    @field:Pattern(regexp = "^[a-zA-Z ,]+\$", message = "Region is not valid")
    var region: String,
    @field:Pattern(regexp = "^((00|\\+)39[\\. ]??)??3\\d{2}[\\. ]??\\d{6,7}\$", message = "phoneNumber is not Valid")
    var phoneNumber: String,
    @field:Past(message = "Provided date of birth is not valid")
    val dateOfBirth: LocalDate,
    val manager:Boolean



){

    override fun equals(other: Any?): Boolean {
        if (other == null) return false
        if (other === this) return true
        if (javaClass != ProxyUtils.getUserClass(other))
            return false
        other as User
        return if (null == email) false
        else this.email == other.email
    }

    override fun hashCode(): Int {
        return 31
    }
}