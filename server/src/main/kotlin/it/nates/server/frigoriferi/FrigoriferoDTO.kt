package it.nates.server.frigoriferi

import it.nates.server.users.User

data class FrigoriferoDTO(
    val id:Long?,
    val user: User?,
    val name:String,
    val type:String


)


fun Frigorifero.toDTO():FrigoriferoDTO{
    return FrigoriferoDTO(getIdDoc(),user,name,type)
}