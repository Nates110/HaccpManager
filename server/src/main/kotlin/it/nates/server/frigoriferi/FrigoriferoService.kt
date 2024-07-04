package it.nates.server.frigoriferi

import org.springframework.http.ResponseEntity

interface FrigoriferoService {

    fun getAllByUser(userId:String):List<FrigoriferoDTO>?
    fun addFrigorifero(newFrigorifero:Frigorifero,userId:String): ResponseEntity<Frigorifero>
    fun deleteFrigorifero(id:Long)
}