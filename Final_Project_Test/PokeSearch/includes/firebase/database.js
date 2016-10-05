/**
 * @class Database
 */

import * as firebase from "firebase";

class Database {

    /**
     * Sets a users mobile number
     * @param userId
     * @param mobile
     * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
     */
    static setUserPokemonCollection(userId, pokemonImage, pokemonName) {

        let userPokemonCollection = "/user/" + userId + "/pokemon/" + pokemonName ;
        this.listenUserMobile();
        return firebase.database().ref(userPokemonCollection).update({
            pokemonName: pokemonName,
            pokemonImageURL: pokemonImage
        })

    }

     static listenUserMobile(userId,callback) {

       /* let userPokemonCollection = "/user/" + userId + "/pokemon/";

          

        firebase.database().ref(userPokemonCollection).on("value",(snapshot) => {
          

        var mobile = "";

            if (snapshot.val()) {
                mobile = snapshot.val().pikachu
            }

            callback(mobile)
        });*/
    }

}

module.exports = Database;
