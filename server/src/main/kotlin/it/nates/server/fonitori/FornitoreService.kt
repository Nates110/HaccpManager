package it.nates.server.fonitori

import org.springframework.http.ResponseEntity

interface FornitoreService {
    fun getAllByUser(userId:String):List<FornitoreDTO>?
    fun addFornitore(newFornitore:Fornitore,userId:String):ResponseEntity<Fornitore>
    fun updateFornitore(updatedFornitore:Fornitore):ResponseEntity<Fornitore>
    fun deleteFornitore(id:String)
}