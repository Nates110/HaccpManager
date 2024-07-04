package it.nates.server.fonitori

import it.nates.server.users.User
import jakarta.persistence.*
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Pattern


@Entity
@Table(name="fornitori")
class Fornitore(
    @Id
    @field:NotBlank(message="P.IVA/C.F. required")
    val piva:String,
    @field:NotBlank(message="Ragione sociale required")
    val ragioneSociale:String,
    @field:NotBlank(message="Sede Legale required")
    val sedeLegale:String,
    @field:NotBlank(message="Sede Operativa required")
    val sedeOperativa:String,
    @field:Pattern(regexp = "^((00|\\+)39[\\. ]??)??3\\d{2}[\\. ]??\\d{6,7}\$", message = "phoneNumber is not Valid")
    var phoneNumber: String,
    val fax:String?,
    val email:String?,
    val referente:String,
    val prodotti:String?,
    val servizi:String?,
    @ManyToOne
    var user:User?

) {

}