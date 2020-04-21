import { Alert } from 'react-native'
var SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase({ name: 'Favorites.db', location: 'default' })

var lastId = -1
let dbFavorites = []; //todo will be change
class Database {
    constructor(){
        db.transaction(tx=>{
            //tx.executeSql('DROP TABLE Favorite')
            tx.executeSql('CREATE TABLE IF NOT EXISTS Favorite(favorite_id INTEGER PRIMARY KEY NOT NULL,source_text VARCHAR(500),target_text VARCHAR(500),source_flag INTEGER,target_flag INTEGER)', [])
        })
    }
    insertFavorite = (object) =>{
        return new Promise(resolve=>{
            db.transaction(tx => {
                tx.executeSql('INSERT INTO Favorite (source_text,target_text,source_flag,target_flag) VALUES (:source_text,:target_text,:source_flag,:target_flag)', [object.source_text, object.target_text, object.source_flag,object.target_flag]
                ,function(tx,result){
                    lastId = result.insertId
                    resolve(lastId)
                });
            })
        })
    }
    initReduxFromDb = async () => {
        return new Promise(resolve=>{
            db.transaction((tx) => { //WILL BE CHANGE
                tx.executeSql('SELECT * FROM Favorite', [], (tx, results) => {
                    for (var i = 0; i < results.rows.length; i++) {
                        dbFavorites.push(results.rows.item(i));
                    }
                    resolve(dbFavorites)
                })
            })
        })
    }

    addFavorites = async (object) => {
        const id = await this.insertFavorite(object)
        return id
    }

    deleteFavorite = (index) =>{
        db.transaction(tx => {
            tx.executeSql('DELETE FROM Favorite where favorite_id=?', [index], (tx, results) => {
                //console.log('results',results.rowAffected);
            })
        })
        Alert.alert('Deleted with success')
    }
}

Database.shared = new Database()
export default Database