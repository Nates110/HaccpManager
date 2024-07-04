package it.nates.server.fonitori

import it.nates.server.users.User


data class FornitoreDTO (
    val piva:String,
    val ragioneSociale:String,
    val sedeLegale:String,
    val sedeOperativa:String,
    var phoneNumber: String,
    val fax:String?,
    val email:String?,
    val referente:String,
    val prodotti:String?,
    val servizi:String?,
    var user: User?
        )

fun Fornitore.toDTO():FornitoreDTO{
    return FornitoreDTO(piva,ragioneSociale,sedeLegale,sedeOperativa,phoneNumber,
        fax,email,referente,prodotti,servizi,user)
}

