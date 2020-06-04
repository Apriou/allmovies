import React from 'react'
import firebase from 'firebase'

import { Paypal } from '../components'

const client = {
    sandbox: "Ac97GV8gS382bnVPrbJ4N7GCvcpLeMg9oK-b8OZK5aGiJaB4Gs-1aSEzqBF4T8iKuDOUMYtw36q39P2g",
    production: "pxxxxx"
}

//Utile si notre appli est en prod ou en dev
const env = process.env.NODE_ENV === "production" ? "production" : "sandbox"

//Pour tester sanbox en prod
//const env = "sandbox"

const total = 10; //exemple de montant que l'utilisateur doit payer

const currency = "USD"

const onError = (error) => {
    console.log('Erreur: ', error);
    
}

const onCancel = data => console.log('Paiement annulé ', data)


const Payment = props => {

    //On met onSuccess dans Payment car on a besoin des props pour la redirection
    const onSuccess = payment => {
        console.log('Paiement réussi');    
 
        //On est obligé de passer par onAuthStateChanged car la demande de l'authentification firebase.auth() est asynchrone
        firebase.auth().onAuthStateChanged(function(user) { 
            if (user) {
                // User is signed in.
                console.log('Utilisateur connecté');
               console.log('user.uid ', user.uid);  
                const dbRef = firebase.database().ref(`users/${user.uid}`);
                const now = new Date();
                const newDate = now.setDate(now.getDate() + 30); //On a un abonnement de 30 jours par exemple
                console.log('newDate ', newDate);
                dbRef
                    .set({validUntil: newDate})
                    .then(() => {
                        console.log('Opération réussie')
                        //On redirige vers Home
                        props.history.push({pathname: "/"})
                    })
                    .catch(e => {
                        console.log('Opération échouée');            
                    })
            } else {
                // No user is signed in.
                console.log('Utilisateur non connecté');      
                this.props.history.push({pathname: '/login'});        
            }
        });        
           
    }

    return (
        <Paypal 
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        />
    )
}

export { Payment }