import firebase from 'firebase'

class Fire {
    constructor() {
        this.init()
    }
    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyD7glTHyx00zvbpgt-XIrL1EMgSIEJmHu8",
                authDomain: "bornlang-4b452.firebaseapp.com",
                databaseURL: "https://bornlang-4b452.firebaseio.com",
                projectId: "bornlang-4b452",
                storageBucket: "bornlang-4b452.appspot.com",
                messagingSenderId: "987480787521",
                appId: "1:987480787521:web:e2d69ea173fd50659bd4c0"
            });
        }
        firebase.auth().signOut()
    };
    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    createNewUser = (email, pass) => {
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(result => {
                firebase.auth().currentUser.sendEmailVerification()
            })
            .catch(error => {
                var errorCode = error.errorCode
                var errorMessage = error.message
                if (errorCode === 'auth/email-already-in-use') alert('Email already in use')
                else alert(errorMessage)
            })
    }
    
    loginUser = (email, pass) => {
        return new Promise(resolve => {
            firebase.auth().signInWithEmailAndPassword(email, pass)
                .then(result => {
                    resolve(result.user.emailVerified)
                })
                .catch(error => {
                    alert(error)
                })
        })
    }

    sendResetPassword = async (email) => {
        var auth = firebase.auth();
        await auth.sendPasswordResetEmail(email).then(() => {
            alert('PLEASE CONTROL TO YOUR MAIL')
        }).catch(function (error) {
            alert(error)
        });
    }

}


Fire.shared = new Fire();
export default Fire;